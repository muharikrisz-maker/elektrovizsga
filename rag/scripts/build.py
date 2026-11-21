"""Build a private pgvector import from reviewed documents."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
import unicodedata
from urllib.request import Request, urlopen

import tiktoken

ROOT = Path(__file__).resolve().parents[1]
MODEL = "text-embedding-3-small"
WINDOW = 600
OVERLAP = 80
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".tif", ".tiff", ".webp"}


def command(*args):
    return subprocess.run(args, check=True, stdout=subprocess.PIPE).stdout.decode("utf-8")


def normalize(text):
    text = unicodedata.normalize("NFC", text).replace("\u00ad", "")
    return "\n".join(re.sub(r"[^\S\n]+", " ", line).strip()
                     for line in text.splitlines()).strip()


def ocr(path):
    return command("tesseract", str(path), "stdout", "-l", "hun+eng")


def split_pages(text):
    pages = text.split("\f")
    if len(pages) > 1 and not pages[-1].strip():
        pages.pop()
    return pages


def extract_pages(path, force_ocr):
    suffix = path.suffix.lower()
    if suffix in IMAGE_EXTENSIONS:
        return split_pages(ocr(path))
    if suffix in {".txt", ".md"}:
        return path.read_text(encoding="utf-8-sig").split("\f")
    if suffix != ".pdf":
        raise ValueError(f"Nem támogatott formátum: {path.name}")

    pages = split_pages(command("pdftotext", "-layout", "-enc", "UTF-8", str(path), "-"))
    with tempfile.TemporaryDirectory() as directory:
        for idx, page in enumerate(pages, 1):
            if idx in force_ocr or not page.strip():
                stem = str(Path(directory) / "page")
                command("pdftoppm", "-f", str(idx), "-l", str(idx), "-r", "300",
                        "-singlefile", "-png", str(path), stem)
                pages[idx - 1] = ocr(stem + ".png")
    return pages


def sections(text, headings):
    heading = ""
    lines = []
    for line in text.splitlines():
        match = re.match(r"^#{1,6}\s+(.+)$", line)
        if match or line in headings:
            if any(lines):
                yield heading, "\n".join(lines).strip()
            heading = match[1] if match else line
            lines = []
        else:
            lines.append(line)
    if any(lines):
        yield heading, "\n".join(lines).strip()


def windows(text):
    encoding = tiktoken.get_encoding("cl100k_base")
    tokens = encoding.encode_ordinary(text)
    start = 0
    while start < len(tokens):
        end = min(start + WINDOW, len(tokens))
        if 0 < len(tokens) - end < 400 - OVERLAP:
            end = min(start + 800, len(tokens))
        if 0 < len(tokens) - end < 400 - OVERLAP:
            end = len(tokens) - (400 - OVERLAP)
        yield encoding.decode(tokens[start:end], errors="ignore").strip()
        if end == len(tokens):
            return
        start = end - OVERLAP


def chunks_for(directory, document):
    filename = document["filename"]
    if Path(filename).name != filename:
        raise ValueError(f"Érvénytelen fájlnév: {filename}")
    path = directory / filename
    if not path.is_file():
        raise FileNotFoundError(f"Hiányzó eredeti forrás: {filename}")
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if digest != document["reviewed_sha256"]:
        raise ValueError(f"A forrás ellenőrzése szükséges: {filename} (SHA-256: {digest})")
    pages = extract_pages(path, document.get("ocr_pages", []))
    if hashlib.sha256(path.read_bytes()).hexdigest() != digest:
        raise ValueError(f"A feldolgozás közben megváltozott a forrás: {filename}")
    if len(pages) != document["page_count"]:
        raise ValueError(f"Eltérő oldalszám: {filename} ({len(pages)})")
    headings = document.get("heading_topics", {})
    reviewed = document["approved_pages"]
    if not reviewed or len(set(reviewed)) != len(reviewed) or any(
        type(page) is not int or page < 1 or page > len(pages) for page in reviewed
    ):
        raise ValueError(f"Hibás jóváhagyott oldallista: {filename}")
    result = []
    topic = document["topic"]
    for page, text in enumerate(pages, 1):
        for heading, section in sections(normalize(text), headings):
            topic = headings.get(heading, topic)
            if page not in reviewed:
                continue
            for snippet in windows(section):
                result.append({
                    "document_id": document["document_id"], "part": len(result),
                    "filename": filename, "page": page,
                    "topic": topic, "heading": heading, "version": document["version"],
                    "source_hash": digest, "content": snippet,
                })
    if not result:
        raise ValueError(f"Nincs indexelhető szöveg: {filename}")
    return result


def post(url, key, payload, supabase=False):
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {key}"}
    if supabase:
        headers["apikey"] = key
    request = Request(url, data=json.dumps(payload, ensure_ascii=False).encode(), headers=headers)
    with urlopen(request, timeout=60) as response:
        body = response.read()
        return json.loads(body) if body else None


def rpc(name, payload):
    url = os.environ["SUPABASE_URL"].rstrip("/")
    return post(f"{url}/rest/v1/rpc/{name}", os.environ["SUPABASE_SERVICE_ROLE_KEY"],
                payload, supabase=True)


def embed(chunks):
    key = os.environ["OPENAI_API_KEY"]
    for start in range(0, len(chunks), 64):
        batch = chunks[start:start + 64]
        inputs = [f'{c["heading"]}\n{c["content"]}' if c["heading"] else c["content"] for c in batch]
        result = post("https://api.openai.com/v1/embeddings", key, {"model": MODEL, "input": inputs})
        vectors = sorted(result["data"], key=lambda row: row["index"])
        if [row["index"] for row in vectors] != list(range(len(batch))):
            raise ValueError("Hiányos embedding-válasz")
        for chunk, row in zip(batch, vectors):
            chunk["embedding"] = row["embedding"]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--sources", type=Path, default=ROOT / "source-docs")
    parser.add_argument("--manifest", type=Path)
    parser.add_argument("--output", type=Path, default=ROOT / "index" / "chunks.json")
    actions = parser.add_mutually_exclusive_group()
    actions.add_argument("--extract-only", action="store_true")
    actions.add_argument("--publish", action="store_true")
    actions.add_argument("--delete", metavar="DOCUMENT_ID")
    actions.add_argument("--inspect", metavar="FILENAME")
    parser.add_argument("--ocr-page", type=int, action="append", default=[])
    args = parser.parse_args()
    if args.delete:
        rpc("rag_replace_document", {"p_document": args.delete, "p_chunks": []})
        return

    if args.inspect:
        if Path(args.inspect).name != args.inspect:
            parser.error("A forrás nevét add meg, elérési út nélkül.")
        path = args.sources / args.inspect
        print(f"SHA-256: {hashlib.sha256(path.read_bytes()).hexdigest()}")
        for page, text in enumerate(extract_pages(path, args.ocr_page), 1):
            print(f"\n--- {page}. oldal ---\n{normalize(text)}")
        return

    manifest = args.manifest or args.sources / "manifest.json"
    documents = json.loads(manifest.read_text(encoding="utf-8"))
    if not documents:
        parser.error("A jegyzékben nincs jóváhagyott dokumentum.")
    corpus = {}
    for document in documents:
        document_id = document["document_id"]
        if document_id in corpus:
            raise ValueError(f"Ismételt dokumentumazonosító: {document_id}")
        corpus[document_id] = chunks_for(args.sources, document)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    if not args.extract_only:
        for chunks in corpus.values():
            embed(chunks)
    fd, temporary = tempfile.mkstemp(dir=args.output.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            json.dump({"embedding_model": None if args.extract_only else MODEL,
                       "documents": corpus}, stream, ensure_ascii=False, indent=2)
        os.replace(temporary, args.output)
    finally:
        Path(temporary).unlink(missing_ok=True)
    if args.publish:
        for document_id, chunks in corpus.items():
            rpc("rag_replace_document", {"p_document": document_id, "p_chunks": chunks})


if __name__ == "__main__":
    main()
