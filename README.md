# ElektroVizsga ⚡

Erősáramú elektrotechnikus interaktív vizsga gyakorlóalkalmazás.

## Kipróbálás
https://muharikrisz-maker.github.io/elektrovizsga/

## Aktuális kérdésbank (2026-11-07)
- 10 alapozó mintakérdés
- 18 új, önállóan megfogalmazott kérdés a 2024-es OSZTV feladattípusai alapján
- 9 új kérdés a tanulói füzetben szereplő transzformátor- és zárlatszámítás témákból
- Összesen: **37 kérdés**

A 2024-es archívumi feladatsor elemzett témái: villamos szerelési rajzok, motorvezérlés, védelmi eszközök, szigetelésmérés, védővezető, hurokimpedancia, transzformátor, villamos teljesítmények. Az oldalra feltöltött kérdések **nem szó szerinti OSZTV-kérdések**, hanem saját készítésű gyakorlófeladatok. A források tartalmi ellenőrzése és több év anyagának feldolgozása folytatandó. 

### Források
- [Szakma Sztár – hivatalos feladatarchívum](https://szakmasztar.hu/szakmai-versenyek/feladatok)
- [2024-es erősáramú elektrotechnikus OSZTV feladatsor (PDF)](https://s3-eu-west-1.amazonaws.com/szakmavilag/osztv-szktv/2024/Erosaramu-elektrotechnikus_Feladatsor_2024.pdf)
- Saját, kézzel írott jegyzet 2026. november 7-i fotója: 10/0,4 kV, két 2 MVA-es transzformátor, 5% rövidzárási feszültség, zárlati áram, lökőáram, 5 km kábel, 60 MVA hálózati zárlati teljesítmény. Bizonytalan kézírásos adatokból nem állítunk elő hitelesített numerikus feladatot.

## Vizsgamód
- 45 perces időkeret
- kérdésenként egyetlen átugrás, a végén második kör
- A–B–C–D válaszok, témakör szerinti válogatás
- pontozás és megoldási magyarázat
- statikus GitHub Pages; eredmény csak a böngésző helyi tárhelyén tárolódik

## Fejlesztés
A `main` ágon lévő `index.html` a GitHub Pages belépési pontja; a `questions-extra.js` az új kérdésbank. Éles használat előtt a kérdéseket szakmai felülvizsgálattal ajánlott ellenőrizni.
