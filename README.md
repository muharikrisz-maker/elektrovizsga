# ElektroVizsga ⚡

Erősáramú elektrotechnikus interaktív vizsga gyakorlóalkalmazás.

## Kipróbálás
https://muharikrisz-maker.github.io/elektrovizsga/

## Aktuális kérdésbank (2026-11-07)
- 10 alapozó mintakérdés
- 18 új, önállóan megfogalmazott kérdés a 2024-es OSZTV feladattípusai alapján
- 9 új kérdés a tanulói füzetben szereplő transzformátor- és zárlatszámítás témákból
- 12 új, hétköznapi, villanyszerelési és ipari szituációra épülő feladat, három nehézségi szinten
- 24 új, az OKTÁV 2025-ös elektrotechnikai számítási feladatsora alapján szerkesztett gyakorlófeladat, kezdő–haladó szinteken
- Összesen: **73 kérdés**

A 2024-es archívumi feladatsor elemzett témái: villamos szerelési rajzok, motorvezérlés, védelmi eszközök, szigetelésmérés, védővezető, hurokimpedancia, transzformátor, villamos teljesítmények. Az oldalra feltöltött kérdések **nem szó szerinti OSZTV-kérdések**, hanem saját készítésű gyakorlófeladatok. A források tartalmi ellenőrzése és több év anyagának feldolgozása folytatandó. 

### OKTÁV-gyakorlás
- A 2025. február 21-i, Égető Tamás nevével jelölt OKTÁV-feladatgyűjteményből átdolgozott példák: töltés, akkumulátor, Ohm-törvény, feszültségesés, kondenzátorok, önindukció, váltakozó áramú impedancia, gépek és hatásfok.
- Az OKTÁV-alapú feladatok a próbavizsgában és a háromszintű tanulásban is szerepelnek; segítség, számítási magyarázat és külön életszerű alkalmazás tartozik hozzájuk.
- A szöveget oktatási célra szerkesztettük; az eredetiben hiányzó ábrát/adatot igénylő kérdéseket nem vettük át megoldhatatlanként.

### Források
- OKTÁV: *Elektrotechnikai számítások – Feladatok*, Égető Tamás (2025. február 21.), felhasználó által feltöltött PDF.
- [Szakma Sztár – hivatalos feladatarchívum](https://szakmasztar.hu/szakmai-versenyek/feladatok)
- [2024-es erősáramú elektrotechnikus OSZTV feladatsor (PDF)](https://s3-eu-west-1.amazonaws.com/szakmavilag/osztv-szktv/2024/Erosaramu-elektrotechnikus_Feladatsor_2024.pdf)
- Saját, kézzel írott jegyzet 2026. november 7-i fotója: 10/0,4 kV, két 2 MVA-es transzformátor, 5% rövidzárási feszültség, zárlati áram, lökőáram, 5 km kábel, 60 MVA hálózati zárlati teljesítmény. Bizonytalan kézírásos adatokból nem állítunk elő hitelesített numerikus feladatot.

## Gyakorlati tanulási módszer
- Az új gyakorlati feladatok rövid, életszerű bevezetést és külön megnyitható, a megoldást nem eláruló segítséget adnak.
- Válaszadás után számítási levezetés és „Hol veszed hasznát a hétköznapokban?” magyarázat jelenik meg.
- A kezdő, középhaladó és haladó szinten is elérhető új kérdések, a fokozatos tanulási út és a próbavizsga is használja őket.
- A–B–C–D lehetőségek minden új körben keverednek, az értékelés az eredeti helyes válaszra épül.
- A vezeték- és védelmi példák oktatási célúak, nem helyettesítik a helyszíni méretezést és a szabvány szerinti ellenőrzést.

## Vizsgamód
- 45 perces időkeret
- kérdésenként egyetlen átugrás, a végén második kör
- A–B–C–D válaszok, témakör szerinti válogatás
- pontozás és megoldási magyarázat
- statikus GitHub Pages; eredmény csak a böngésző helyi tárhelyén tárolódik

## Fejlesztés
A `main` ágon lévő `index.html` a GitHub Pages belépési pontja; a `questions-extra.js` az új kérdésbank. Éles használat előtt a kérdéseket szakmai felülvizsgálattal ajánlott ellenőrizni.
