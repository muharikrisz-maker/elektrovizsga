# ElektroVizsga tananyagkereső (RAG)

A cél: a tanulófelületen belül forráshivatkozással alátámasztott válaszok a vizsgatananyagokból.

## Mappák
- `source-docs/`: a felhasználó által rendelkezésre bocsátott eredeti PDF-ek és képek (külön feltöltendők)
- `extracted/`: az eredeti dokumentumok oldalszámmal jelölt szövege
- `summaries/`: dokumentumonkénti és témaköri összefoglalók
- `index/`: kereshető, generált darabok és vektorindex
- `scripts/`: automatikus feldolgozás, újraindexelés
- `tests/`: forrásvisszakeresési tesztek

## Biztonságos megvalósítás
A jelenlegi tanulófelület statikus GitHub Pages oldal. A RAG válaszgenerálást szerveroldali API-n keresztül kell szolgáltatni (például Supabase Edge Function), a titkos AI/API kulcs nem kerülhet böngészőbe vagy GitHub forráskódba. Embedding és tároló legyen a szerveren, megfelelő jogosultságellenőrzéssel és költségkorláttal. Válasznál kötelező a dokumentumnév és az oldalszám; ha nincs releváns forrás, ezt jelezze.

A jelenlegi tananyagok egy része korábbi beszélgetésekben lett megosztva, nem a GitHub tárolóban; ezek fizikailag nem kerültek át automatikusan. Ne állítsd, hogy minden forrás már indexelve van.

A részletes Codex munkaterv: `CODEX_TASK.md`.

## Forrásellenőrzés és indexépítés

A név szerint ismert hiányzó eredeti az Égető Tamás által készített, 2025. február 21-i, **5 oldalas `Oktav_feladatok.pdf`**. A korábbi feltöltések további fájlnevei nem szerepelnek a repóban. A `rag/index/status.json` az üres kiinduló állapotot rögzíti. A magánforrások, a helyi jegyzék és a generált szöveg/vektorok Git által figyelmen kívül hagyott fájlok.

Python 3.10+, Poppler (`pdftotext`, `pdftoppm`) és OCR szükség esetén Tesseract `hun` és `eng` nyelvi modellekkel.

```sh
python3 -m pip install -r rag/scripts/requirements.txt
python3 rag/scripts/build.py --inspect Oktav_feladatok.pdf
```

Képes vagy hibás szövegrétegű oldalhoz az ellenőrzés során ismételhető `--ocr-page 3` kapcsoló használható. Az üres PDF-oldalakat a pipeline automatikusan OCR-ezi. A forráskép és a kinyert szöveg összevetése után írd a helyi `rag/source-docs/manifest.json` tömbjébe dokumentumonként a következő mezőket.

| Mező | Érték |
| --- | --- |
| `document_id` | Stabil azonosító, pl. `oktav-2025` |
| `filename` | Az eredeti fájl neve |
| `reviewed_sha256` | Az ellenőrzött fájl SHA-256 hash-e |
| `page_count` | Fizikai oldalak száma. Képnél 1, szövegfájlnál a lapokat form feed választja el |
| `version` | Forrásverzió, pl. `2025-02-21` |
| `topic` | Alapértelmezett témakör-azonosító az `exam-framework.js` katalógusából |
| `heading_topics` | Opcionális objektum a fejléc pontos szövegétől a témakör-azonosítóig |
| `ocr_pages` | Opcionális tömb a kézi OCR-t igénylő fizikai oldalszámokkal |
| `approved_pages` | Az eredetivel összevetett oldalak sorszámai. Az elveszett ábráktól függő és bizonytalan oldalakat hagyd ki |

```sh
python3 rag/scripts/build.py --extract-only
python3 rag/scripts/build.py
python3 rag/scripts/build.py --publish
python3 rag/scripts/build.py --delete oktav-2025
```

A második parancs az OpenAI `text-embedding-3-small` modelljével készít vektorokat. A `--publish` az elkészült `rag/index/chunks.json` után dokumentumonként, tranzakcióban frissít, és törli a már nem létező szakaszokat. A `--delete` a teljes megadott dokumentumot törli. A parancssori környezet változói `OPENAI_API_KEY`, feltöltéshez és törléshez továbbá `SUPABASE_URL` és `SUPABASE_SERVICE_ROLE_KEY`. A helyi JSON a tananyag szövegét is tartalmazza.

## Tesztelés és staging

```sh
PYTHONPATH=rag/scripts python3 -m unittest discover -s rag/tests
node --test rag/tests/*.test.mjs
```

Staging Supabase-projekten alkalmazd a migrációt, állítsd be az Edge Function `RAG_OPENAI_API_KEY` titkát és a `RAG_ALLOWED_ORIGINS` vesszővel elválasztott originlistáját, majd telepítsd a `rag` függvényt ugyanoda. A staging statikus oldal helyi `auth-config.js` példánya használja a staging projekt publikus beállításait. A végpont `POST /functions/v1/rag/ask`, törzse `{"question":"…"}`. Hitelesített, e-mailes munkamenetet vár. A költségkorlát UTC naponta 20 keresés fiókonként és 300 a teljes projektre.

A válasz legfeljebb öt, legalább 0,45 koszinusz-hasonlóságú részletből válogat. A modell az ellenőrizhető idézeteket rendezi magyar magyarázó lépésekbe. A végpont a fájlnevet, oldalszámot, témakört, verziót és hash-t az adatbázisból rendeli az idézetekhez. A fizikai oldalszám a PDF-néző oldalpozícióját jelenti. Az élesítés előtt stagingen ellenőrizd a hét mintakérdést és a relevanciaküszöböt az eredeti anyagokon. Ezeket az ellenőrzéseket a hiányzó PDF jelenleg blokkolja.

A `rag/tests/database.sql` szintetikus vektorokkal ellenőrzi a küszöböt, újrafeltöltést, törlést, kvótát és hozzáférést. A migráció alkalmazása után egy üres, eldobható adatbázison futtasd a tesztet `psql -v ON_ERROR_STOP=1 -f rag/tests/database.sql` paranccsal. A tokenizer az első indexeléskor tölti le a `cl100k_base` szótárát, majd a helyi gyorsítótárat használja.
