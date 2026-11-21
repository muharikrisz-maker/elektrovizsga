import hashlib
from pathlib import Path
import tempfile
import unittest

import tiktoken

from build import chunks_for, normalize, windows


class BuildTests(unittest.TestCase):
    def test_normalization_preserves_hungarian_accents_and_units(self):
        self.assertEqual(normalize(" Szu\u030bro\u030b  ellenállás\u00ad \r\n 12 Ω "), "Szűrő ellenállás\n12 Ω")

    def test_chunk_size_and_overlap(self):
        source = " ".join(f"vezeték{i} Ω" for i in range(320))
        chunks = list(windows(source))
        self.assertGreater(len(chunks), 1)
        encoding = tiktoken.get_encoding("cl100k_base")
        for chunk in chunks:
            self.assertTrue(399 <= len(encoding.encode_ordinary(chunk)) <= 800)
        self.assertIn(" ".join(chunks[1].split()[2:10]), chunks[0])

    def test_reviewed_pages_topic_mapping_and_hash(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "fixture.md"
            path.write_text("# Ohm\nEllenállás.\fMásodik oldal.\f# Kondenzátor\nKapacitás.", encoding="utf-8")
            document = {
                "document_id": "fixture",
                "filename": path.name,
                "page_count": 3,
                "topic": "ohm",
                "heading_topics": {"Kondenzátor": "capacitors"},
                "version": "teszt",
                "approved_pages": [1, 3],
                "reviewed_sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            }
            chunks = chunks_for(path.parent, document)
            self.assertEqual([row["page"] for row in chunks], [1, 3])
            self.assertEqual([row["topic"] for row in chunks], ["ohm", "capacitors"])
            self.assertEqual(chunks, chunks_for(path.parent, document))
            path.write_text("Változott.", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "fixture.md"):
                chunks_for(path.parent, document)
            path.unlink()
            with self.assertRaisesRegex(FileNotFoundError, "fixture.md"):
                chunks_for(path.parent, document)


if __name__ == "__main__":
    unittest.main()
