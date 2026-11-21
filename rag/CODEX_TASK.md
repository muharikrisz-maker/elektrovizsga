# Codex projektfeladat: ElektroVizsga – RAG és tanulófelület

## Kiindulás
Repo: `muharikrisz-maker/elektrovizsga`, munkabranche: `feature/tananyag-rag`. A meglévő statikus frontend `index.html`, a kérdésbank `questions-extra.js`, a témakörök `topic-catalog.js`.

## Feladat
1. A `rag/source-docs/` alatt megtalálható PDF-, képi és szövegforrásokat dolgozd fel. Az `Oktav_feladatok.pdf` eredeti 5 oldalas példányát a felhasználó Library-jából kell ide importálni, nem szerepel automatikusan a repóban. Minden más korábbi feltöltéshez explicit fájlhozzáférés szükséges.
2. Készíts dokumentum- és témakörönként szakmai összefoglalót a `rag/summaries/` mappába. Jelöld a bizonytalan jelöléseket, hiányzó ábrákat és esetleges forráshibákat; ne találj ki adatokat.
3. Készíts reprodukálható indexelő pipeline-t: PDF extract/OCR szükség szerint, magyar szövegnormalizálás, fejléc-alapú chunkolás (400–800 token átfedéssel), metaadat (document_id, fájlnév, oldal, témakör, verzió, forráshash); embedding és pgvector index lehetőleg Supabase-ben, idempotens upsert és delete.
4. Implementálj jogosultságkezelt server-side `POST /rag/ask` végpontot; kérdésből keresés, relevanciaküszöb, top-k forrásrészlet, generált válasz csak idézett bizonyítékra támaszkodva, pontos forráshivatkozásokkal. Ne kerüljenek titkos kulcsok kliensoldalra. Ha nincs forrás, mondja ki.
5. Kapcsold a tanulófelülethez magyar „Kérdezz a tananyagtól” modulként. Válasz: lépésenkénti magyarázat, kapcsolódó témakör, hivatkozások; gyors link az adott témakör gyakorlásához. A meglévő vizsgamódot, 73 kérdést és 19 témakört ne törd el.
6. Legyen `rag/index/` generált kimenet, `rag/scripts/` indexépítés és `rag/tests/` tesztek. Tesztelj valódi kérdésekkel (Ohm-törvény, feszültségesés, rövidzárlat, teljesítmény, kondenzátor, meddőkompenzáció, vezetékhőmérséklet). Ellenőrizd, hogy nem kapunk kitalált hivatkozást.
7. A változásokat ne közvetlenül mainre írd. Készíts PR-t és ellenőrizd a GitHub Pages működést.

## Elfogadási feltételek
- Forrás és oldalszám visszakereshető minden releváns válasznál.
- Dokumentum újrafeltöltése nem duplikálja az indexet.
- Nincs nyilvános API-kulcs vagy privát PDF a publikus Pages alatt.
- Üres/bizonytalan találatnál nincs hallucinált magyarázat.
- Jelenlegi teszt és gyakorló módok továbbra is működnek.
