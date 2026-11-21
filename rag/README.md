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
