// Minden vizsgakérdés saját tanulási segédanyaga. Új kérdésnél kötelező minden mező!
const TEACHING_MATERIALS = {
  "n1": {
    "intro": "Ohmos fogyasztónál az áram, a feszültség és az ellenállás közül két ismert mennyiségből kiszámítható a harmadik.",
    "hint": "Figyeld meg, melyik két mennyiség adott, és az Ohm-törvény melyik átrendezése kell.",
    "worked": "Másik eset: U = 48 V, R = 16 Ω. I = 48/16 = 3 A.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "n2": {
    "intro": "Háromfázisú hálózatban a fázis–nulla és a fázis–fázis feszültség nem azonos.",
    "hint": "Először döntsd el, hogy fázis–nulla vagy két különböző fázis közötti feszültségről beszélünk.",
    "worked": "690 V vonali feszültség mellett U_f = 690/√3 ≈ 398,4 V (szimmetrikus csillagrendszer).",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "n3": {
    "intro": "Párhuzamos és soros elemeknél az eredő érték a kapcsolás módjától függ.",
    "hint": "Írd fel a kapcsolási módhoz tartozó eredőképletet, ne csak a számokat add össze.",
    "worked": "Két azonos 60 Ω-os párhuzamos ág: 1/R_e = 1/60+1/60, ezért R_e = 30 Ω.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "g1": {
    "intro": "A transzformátor menetszám- és feszültségáttétele megadja a különböző oldalak közti kapcsolatot.",
    "hint": "A primer és szekunder mennyiségeket mindig azonos oldali adatokra vonatkoztasd.",
    "worked": "Ideális transzformátor: 1000 primer és 100 szekunder menet esetén 230 V primerből körülbelül 23 V szekunder feszültség lesz.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "g2": {
    "intro": "Aszinkronmotornál a forgómező fordulatszáma és a tengely tényleges fordulata eltér.",
    "hint": "Különítsd el a szinkron és a tényleges fordulatszámot; a pólusszámot se keverd a póluspárszámmal.",
    "worked": "Szinkron fordulat 1500 1/min, tényleges 1470 1/min: s = (1500−1470)/1500 = 2%.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "g3": {
    "intro": "A villamos teljesítmény a fogyasztás sebességét, az energia pedig az idő alatt elfogyasztott mennyiséget írja le.",
    "hint": "A W és kW közti váltást végezd el, majd az üzemidővel számolj.",
    "worked": "Egy 1,5 kW-os radiátor 4 óra alatt E = 1,5·4 = 6 kWh energiát használ el folyamatos üzemben.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "b1": {
    "intro": "A védővezető és a hibavédelem célja, hogy a hozzáférhető vezetőképes részek hibája ne okozhasson veszélyes állapotot.",
    "hint": "A PE, N és PEN jelölések rendeltetését különböztesd meg.",
    "worked": "Fémházas, I. érintésvédelmi osztályú mosógépnél a gépház a PE-hez kapcsolódik; normál üzemi áram nem a PE-n folyik.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "b2": {
    "intro": "Az áram-védőkapcsoló különbözeti áramra reagál, működése eltér a túláramvédelmi eszközétől.",
    "hint": "Gondold végig, mit vizsgál az ÁVK és mire nem alkalmas önmagában.",
    "worked": "Ha a fázison 5,00 A, a nullán 4,97 A folyik, a különbségi áram 0,03 A = 30 mA. Ezt érzékeli az ÁVK.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "b3": {
    "intro": "A védővezető és a hibavédelem célja, hogy a hozzáférhető vezetőképes részek hibája ne okozhasson veszélyes állapotot.",
    "hint": "A PE, N és PEN jelölések rendeltetését különböztesd meg.",
    "worked": "Az L1 fázisvezető, az N nullavezető, a PE védővezető; a PEN egyesített védő- és nullavezető.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "b4": {
    "intro": "Túlterhelés és zárlat esetén a megfelelő védelmi eszköz és az áramkör összehangolása számít.",
    "hint": "A névleges áram, a tényleges terhelés és a vezeték terhelhetősége együtt fontos.",
    "worked": "B16 kismegszakító megfelelő méretezés esetén túláram ellen véd; hagyományos 30 mA-es ÁVK önmagában nem.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "fz01": {
    "intro": "A transzformátor rövidzárási feszültsége összefügg a helyettesítő impedanciával.",
    "hint": "A százalékértéket váltsd tizedestörtté, és mindig jelöld a vonatkoztatási oldalt.",
    "worked": "U_n = 20 kV, S_n = 4 MVA, u_k = 6%: Z = 0,06·20 000²/4 000 000 = 6 Ω a 20 kV-os oldalra.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "fz02": {
    "intro": "Két azonos, azonos fázisú impedancia párhuzamos eredője a felére csökken.",
    "hint": "Ha az impedanciák azonosak, az eredő kiszámításához oszd kettővel az egyedi értéket.",
    "worked": "Két azonos, egyenként 4 Ω komplex impedancia párhuzamos eredőjének nagysága 2 Ω.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "fz03": {
    "intro": "A transzformátor menetszám- és feszültségáttétele megadja a különböző oldalak közti kapcsolatot.",
    "hint": "A primer és szekunder mennyiségeket mindig azonos oldali adatokra vonatkoztasd.",
    "worked": "6/0,4 kV áttételnél a = 15; a primerre megadott 9 Ω a szekunderen 9/15² = 0,04 Ω.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "fz04": {
    "intro": "Két azonos, azonos fázisú impedancia párhuzamos eredője a felére csökken.",
    "hint": "Ha az impedanciák azonosak, az eredő kiszámításához oszd kettővel az egyedi értéket.",
    "worked": "Két azonos, 0,006 Ω-os transzformátorimpedancia párhuzamos eredője 0,003 Ω.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "fz05": {
    "intro": "A zárlati áram és a védelmi feltételek számításakor fontos a megfelelő egyszerűsített modell.",
    "hint": "Olvasd le a képletben előírt feszültséget, áramot és korrekciós tényezőt.",
    "worked": "400 V-os háromfázisú zárlati modellben Z = 0,04 Ω esetén I = 400/(√3·0,04) ≈ 5774 A.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "fz06": {
    "intro": "A zárlati áram és a védelmi feltételek számításakor fontos a megfelelő egyszerűsített modell.",
    "hint": "Olvasd le a képletben előírt feszültséget, áramot és korrekciós tényezőt.",
    "worked": "S_k = 30 MVA és U_v = 10 kV: I_k = 30/(√3·10) ≈ 1,73 kA.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "fz07": {
    "intro": "A zárlati áram és a védelmi feltételek számításakor fontos a megfelelő egyszerűsített modell.",
    "hint": "Olvasd le a képletben előírt feszültséget, áramot és korrekciós tényezőt.",
    "worked": "Ha I″ = 5 kA és κ = 1,5, akkor i_p = 1,5·√2·5 ≈ 10,61 kA.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "fz08": {
    "intro": "Az egyenletes vezető hossza arányosan befolyásolja a teljes ellenállást vagy reaktanciát.",
    "hint": "Az egységnyi hosszra megadott értéket a teljes hosszal szorozd.",
    "worked": "0,25 Ω/km fajlagos reaktancia és 8 km hossz esetén X = 0,25·8 = 2 Ω.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "fz09": {
    "intro": "A transzformátor rövidzárási feszültsége összefügg a helyettesítő impedanciával.",
    "hint": "A százalékértéket váltsd tizedestörtté, és mindig jelöld a vonatkoztatási oldalt.",
    "worked": "Ha u_k 4%-ról 8%-ra emelkedik azonos U_n és S_n mellett, a számított impedancia megduplázódik.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "os01": {
    "intro": "A szigetelésmérés különleges mérési eljárás, nem egyszerű üzemi feszültségmérés.",
    "hint": "A vizsgálófeszültség típusa és a műszer rendeltetése alapján válassz.",
    "worked": "500 V DC vizsgálófeszültségnél 1 MΩ szigetelési ellenálláshoz elméletben 0,5 mA szivárgóáram tartozik. A vizsgálatot előírás szerint végezzük.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "os02": {
    "intro": "Az áram-védőkapcsoló különbözeti áramra reagál, működése eltér a túláramvédelmi eszközétől.",
    "hint": "Gondold végig, mit vizsgál az ÁVK és mire nem alkalmas önmagában.",
    "worked": "Egy 30 mA-es ÁVK TEST gombja belső próbaáramot idéz elő; a kioldási időt azonban nem méri meg.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "os03": {
    "intro": "A zárlati áram és a védelmi feltételek számításakor fontos a megfelelő egyszerűsített modell.",
    "hint": "Olvasd le a képletben előírt feszültséget, áramot és korrekciós tényezőt.",
    "worked": "U_0 = 230 V, I_a = 100 A: az egyszerűsített határ Z_s,max = 230/100 = 2,3 Ω.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "os04": {
    "intro": "A zárlati áram és a védelmi feltételek számításakor fontos a megfelelő egyszerűsített modell.",
    "hint": "Olvasd le a képletben előírt feszültséget, áramot és korrekciós tényezőt.",
    "worked": "B16 védelemnél az oktatási 5·I_n feltétellel I_a = 80 A, így Z_s,max = 230/80 = 2,875 Ω.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "os05": {
    "intro": "A védővezető és a hibavédelem célja, hogy a hozzáférhető vezetőképes részek hibája ne okozhasson veszélyes állapotot.",
    "hint": "A PE, N és PEN jelölések rendeltetését különböztesd meg.",
    "worked": "Fémházas I. osztályú gépen a hozzáférhető fémrészeket a PE-hez kapcsolják, hogy az előírt hibavédelmi feltételek teljesüljenek.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "os06": {
    "intro": "Az áram-védőkapcsoló különbözeti áramra reagál, működése eltér a túláramvédelmi eszközétől.",
    "hint": "Gondold végig, mit vizsgál az ÁVK és mire nem alkalmas önmagában.",
    "worked": "A 25 A/30 mA feliratú hagyományos ÁVK 25 A névleges árama nem jelenti, hogy saját túláramvédelme is van.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "os07": {
    "intro": "A védővezető és a hibavédelem célja, hogy a hozzáférhető vezetőképes részek hibája ne okozhasson veszélyes állapotot.",
    "hint": "A PE, N és PEN jelölések rendeltetését különböztesd meg.",
    "worked": "Szigetelési hiba miatt egy motor fémvázán veszélyes érintési feszültség jelenhet meg; az előírt hibavédelemhez PE és megfelelő lekapcsolás szükséges.",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "os08": {
    "intro": "A szimmetrikus háromfázisú teljesítményszámításban a vonali mennyiségek és a √3 tényező szerepelnek.",
    "hint": "Ellenőrizd, hogy a megadott teljesítmény hatásos vagy látszólagos.",
    "worked": "S_n = 13,8 kVA, U_v = 400 V: I_n = 13 800/(√3·400) ≈ 19,9 A.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "os09": {
    "intro": "Az áramváltó a primer és szekunder áram közt névleges áttételt hoz létre.",
    "hint": "Az áttétel arányából indulj, és ne keverd össze a primer és szekunder oldalt.",
    "worked": "100/5 A áramváltó áttétele 20:1; 60 A primeráramnál ideálisan 3 A a szekunderáram. A terhelt szekundert nem szabad nyitni.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "os10": {
    "intro": "Aszinkronmotornál a forgómező fordulatszáma és a tengely tényleges fordulata eltér.",
    "hint": "Különítsd el a szinkron és a tényleges fordulatszámot; a pólusszámot se keverd a póluspárszámmal.",
    "worked": "Hatpólusú 50 Hz-es motor szinkron fordulata n_s = 120·50/6 = 1000 1/min.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "os11": {
    "intro": "Aszinkronmotornál a forgómező fordulatszáma és a tengely tényleges fordulata eltér.",
    "hint": "Különítsd el a szinkron és a tényleges fordulatszámot; a pólusszámot se keverd a póluspárszámmal.",
    "worked": "1000 1/min szinkron és 970 1/min üzemi fordulat esetén a szlip (1000−970)/1000 = 3%.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "os12": {
    "intro": "A szimmetrikus háromfázisú teljesítményszámításban a vonali mennyiségek és a √3 tényező szerepelnek.",
    "hint": "Ellenőrizd, hogy a megadott teljesítmény hatásos vagy látszólagos.",
    "worked": "Háromfázisú 400 V, 5 A, cosφ = 0,9 esetén P = √3·400·5·0,9 ≈ 3,12 kW.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "os13": {
    "intro": "A forgómező irányát a háromfázisú táplálás sorrendje határozza meg.",
    "hint": "A fázissorrendet vizsgáld; a védővezetőnek nincs szerepe a forgásirány-váltásban.",
    "worked": "Háromfázisú aszinkronmotornál két megfelelő tápláló fázis felcserélése megfordítja a forgómező irányát. Beavatkozás csak biztonságos leválasztás után.",
    "real": "Gépek telepítése és üzemeltetése közben a névleges adatokat és a tényleges méréseket is össze kell vetni."
  },
  "os14": {
    "intro": "Háromfázisú hálózatban a fázis–nulla és a fázis–fázis feszültség nem azonos.",
    "hint": "Először döntsd el, hogy fázis–nulla vagy két különböző fázis közötti feszültségről beszélünk.",
    "worked": "Szimmetrikus 400/230 V-os hálózatban L2–N körülbelül 230 V, L2–L3 körülbelül 400 V.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "os15": {
    "intro": "Az egyenletes vezető hossza arányosan befolyásolja a teljes ellenállást vagy reaktanciát.",
    "hint": "Az egységnyi hosszra megadott értéket a teljes hosszal szorozd.",
    "worked": "Ha 30 m ellenállása 0,15 Ω, azonos keresztmetszettel 90 m ellenállása 0,45 Ω.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "os16": {
    "intro": "A látszólagos teljesítmény a hatásos és meddő teljesítménnyel derékszögű teljesítményháromszöget alkot.",
    "hint": "P és Q négyzetösszegéből számíts S-t, az egységekre figyelve.",
    "worked": "8 kW hatásos és 6 kvar meddő teljesítménynél S = √(8²+6²) = 10 kVA.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "os17": {
    "intro": "A szimmetrikus háromfázisú teljesítményszámításban a vonali mennyiségek és a √3 tényező szerepelnek.",
    "hint": "Ellenőrizd, hogy a megadott teljesítmény hatásos vagy látszólagos.",
    "worked": "400 V vonali feszültség, 10 A és cosφ = 1 esetén P = √3·400·10 ≈ 6,93 kW.",
    "real": "Villamos áramkörök mérésénél és méretezésénél segít eligazodni a különböző mennyiségek között."
  },
  "os18": {
    "intro": "A kábelek szabványos érjelölésében a G betű a zöld-sárga eret jelzi.",
    "hint": "Az erek számát és a névleges keresztmetszetet külön olvasd ki.",
    "worked": "Az 5G1,5 kábel öt eret tartalmaz, köztük zöld-sárgát; egy-egy ér névleges keresztmetszete 1,5 mm².",
    "real": "Villamos biztonsági ellenőrzéskor az elméleti összefüggést a készülék adataival és a vonatkozó előírásokkal együtt kell értelmezni."
  },
  "p01": {
    "intro": "Ha tudod a teljesítményt és a feszültséget, kiszámolhatod, mekkora árammal terheli a készülék az áramkört.",
    "hint": "Az I = P/U képletet használd, a wattot oszd volttal.",
    "worked": "Egy 920 W-os ohmos készülék 230 V-on I = 920/230 = 4 A-t vesz fel.",
    "real": "Háztartási készülékek terhelésének becslése; a tényleges áram a készülék üzemétől függ."
  },
  "p02": {
    "intro": "Párhuzamos ágaknál az áramok a közös betápláló vezetéken összeadódnak.",
    "hint": "Számold ki előbb egyetlen ág áramát!",
    "worked": "Két 80 Ω-os ág párhuzamosan 160 V-on: mindkettő 2 A, az összáram 4 A.",
    "real": "A közös tápkábel terhelőáramát kell figyelembe venni, nem csak az egyik ágét."
  },
  "p03": {
    "intro": "Soros körben az ellenállások összeadódnak, és minden elemen ugyanaz az áram folyik.",
    "hint": "Először az eredő ellenállást számold ki.",
    "worked": "30 Ω és 70 Ω sorosan 100 V-on: R_e = 100 Ω és I = 100/100 = 1 A.",
    "real": "A kapcsolás módja drasztikusan módosíthatja egy fűtőberendezés teljesítményét; valódi berendezést csak gyártói előírás szerint szabad kapcsolni."
  },
  "p04": {
    "intro": "A hosszabbítón a feszültségesés a teljes áramútra és a terhelőáramra is függ.",
    "hint": "Előbb R = ρ×l/A, utána ΔU = I×R.",
    "worked": "15 m hosszú 2,5 mm² réz hosszabbító 8 A-rel: R = 0,0175·30/2,5 = 0,21 Ω, ΔU = 1,68 V.",
    "real": "Hosszú kábelnél és nagy fogyasztónál a feszültségesés mellett a melegedés és a gyártói terhelhetőség is számít."
  },
  "p05": {
    "intro": "A motor villamos bemenő teljesítménye nem ugyanaz, mint a tengelyen leadott mechanikai teljesítménye.",
    "hint": "Három fázisnál P = √3×U×I×cosφ.",
    "worked": "Háromfázisú 400 V-os motor 6 A-rel és cosφ = 0,75-tel: P ≈ √3·400·6·0,75 = 3,12 kW.",
    "real": "Motoros berendezések áramfelvételét és villamos energiaigényét így is ellenőrizheted."
  },
  "p06": {
    "intro": "A vezeték keresztmetszetét nem lehet kizárólag az amperértékből kiválasztani.",
    "hint": "Gondold végig, mitől melegszik a kábel, és hogy működik a védelem.",
    "worked": "Két 10 A-es áramkör közül a hőszigetelésbe épített hosszú vezeték és a szabadon szerelt rövid vezeték méretezése eltérhet.",
    "real": "Valódi lakás- vagy műhelyáramkör tervezésekor több ellenőrzésből áll a kábelméretezés."
  },
  "p07": {
    "intro": "A kismegszakító túlterhelés ellen is véd; nemcsak zárlatra kell figyelni.",
    "hint": "Hasonlítsd össze az üzemi áramot és a védelem névleges áramát.",
    "worked": "18 A tartós áramot nem lehet egyszerűen 16 A-es kismegszakító nagyobbra cserélésével megoldani: a kábelt és a teljes kört ellenőrizni kell.",
    "real": "Túlterhelt műhely-áramkörnél nem szabad pusztán nagyobb kismegszakítót betenni a kábel ellenőrzése nélkül."
  },
  "p08": {
    "intro": "A közös áramkörön egyszerre működő fogyasztók együttes terhelésével kell számolni.",
    "hint": "Előbb összegezd a teljesítményeket, utána oszd 230 V-tal.",
    "worked": "Három 460 W-os ohmos eszköz 230 V-on összesen 1380 W-ot vesz fel, a közös áram I = 1380/230 = 6 A.",
    "real": "Terhelési felméréskor a tényleges egyidejűséget és a védelmeket is vizsgálni kell."
  },
  "p09": {
    "intro": "Minél kisebb a hurokimpedancia, annál nagyobb hibaaram tud kialakulni; a védelem működése időfüggő is.",
    "hint": "A képletben U₀ = 230 V és Iₐ = 80 A.",
    "worked": "Egyszerűsített TN-példa: U_0 = 230 V, I_a = 100 A esetén Z_s,max = 2,3 Ω.",
    "real": "Egy villamos biztonsági felülvizsgálatban a hurokimpedancia és a lekapcsolási feltételek összetartoznak."
  },
  "p10": {
    "intro": "Összetett példa: vezetékhossz → ellenállás → feszültségesés.",
    "hint": "Az oda-vissza hosszt használd, majd szorozz az áramerősséggel.",
    "worked": "25 m hosszú, 4 mm²-es kétvezetős réz tápkör 12 A-rel: R = 0,0175·50/4 = 0,21875 Ω, ΔU = 2,625 V.",
    "real": "A feszültségesést a vezeték üzemi melegedése is befolyásolhatja; ez közelítő számítás."
  },
  "p11": {
    "intro": "A kW a pillanatnyi teljesítmény, a kWh az idő alatt felhasznált energia.",
    "hint": "Előbb váltsd a 2000 W-ot kilowattra.",
    "worked": "750 W-os fűtőtest 4 órán át: E = 0,75 kW·4 h = 3 kWh.",
    "real": "Így becsülhető a villanyszámla energiarésze és egy fogyasztó üzemeltetése."
  },
  "p12": {
    "intro": "Nem minden leoldás zárlat; túlterhelés vagy hiba is lehet.",
    "hint": "A biztonságos döntés mérésen és méretezésen alapul.",
    "worked": "Ha új hegesztőgép bekötése után leold a védelem, előbb fel kell mérni a terheléseket és a hibát; a kismegszakító önkényes cseréje nem megoldás.",
    "real": "Ez gyakori valós szakmai helyzet; feszültség alatti munkát csak megfelelő jogosultság és eljárás szerint szabad végezni."
  },
  "o01": {
    "intro": "Az áramerősség azt mutatja, hogy másodpercenként mekkora töltés áramlik át egy keresztmetszeten.",
    "hint": "A napot váltsd másodpercre, majd szorozd meg az amperértékkel.",
    "worked": "0,5 A áram 2 óra alatt Q = 0,5·7200 = 3600 C töltést szállít.",
    "real": "Az áram és az idő kapcsolatából megérthető az akkumulátorok Ah-ban megadott kapacitása."
  },
  "o02": {
    "intro": "Az amperóra a kapacitás mértékegysége, nem pillanatnyi áramerősség.",
    "hint": "Oszd a kapacitást a terhelőárammal.",
    "worked": "24 Ah akkumulátor 3 A állandó terheléssel elméletben t = 24/3 = 8 órán át használható.",
    "real": "Autóakkumulátor vagy szünetmentes tápegység üzemidejének első becslése; a valós érték terheléstől és állapottól függ."
  },
  "o03": {
    "intro": "Az Ohm-törvény előtt az eltérő mértékegység-előtagokat egységesítsd.",
    "hint": "A kΩ-ot ohmra, a mA-t amperre váltsd.",
    "worked": "0,22 kΩ = 220 Ω, 20 mA = 0,02 A; U = 220·0,02 = 4,4 V.",
    "real": "Egy ellenálláson mérhető feszültségesésből következtethetsz az áramerősségre."
  },
  "o04": {
    "intro": "Az ellenállás az áram és a feszültség kapcsolatát írja le.",
    "hint": "Az R = U/I képletet keresd.",
    "worked": "12 V és 0,15 A esetén R = 12/0,15 = 80 Ω.",
    "real": "Egy ellenállás mérési adatokból becsülhető, ha a fogyasztó közel ohmos jellegű."
  },
  "o05": {
    "intro": "A névleges teljesítmény és feszültség alapján becsülhetjük a fogyasztó áramát.",
    "hint": "A wattot oszd volttal.",
    "worked": "230 V-os, 46 W-os izzó névleges árama 46/230 = 0,2 A.",
    "real": "Izzólámpánál a hideg és az izzó szál ellenállása jelentősen eltérhet."
  },
  "o06": {
    "intro": "Ohmos fogyasztónál a feszültség négyzete osztva az ellenállással a teljesítmény.",
    "hint": "Használd a P = U²/R képletet.",
    "worked": "40 Ω fűtőellenállás 100 V-on P = 100²/40 = 250 W.",
    "real": "A villamos fűtőtestek teljesítményének becslésére szolgál; a tényleges ellenállás hőmérsékletfüggő lehet."
  },
  "o07": {
    "intro": "A hosszú tápvezetéknek is van ellenállása, ezért a fogyasztóra jutó feszültség kisebb lehet.",
    "hint": "Előbb hanyagold el a vezeték ellenállását, és alkalmazd az Ohm-törvényt.",
    "worked": "100 Ω terhelés 200 V-on ideálisan I = 200/100 = 2 A áramot vesz fel.",
    "real": "Ez az első lépés a vezeték feszültségesésének méretezésénél."
  },
  "o08": {
    "intro": "Egyfázisú táplálásnál az oda- és visszavezető teljes hosszával számolj.",
    "hint": "A 20 m kábelhosszt duplázd, utána R = ρ·l/A.",
    "worked": "15 m távolságú, 1,5 mm² réz ér-páron 10 A folyik: R = 0,0175·30/1,5 = 0,35 Ω és ΔU = 3,5 V.",
    "real": "A hosszabbítók és távoli fogyasztók működését a feszültségesés is befolyásolja."
  },
  "o09": {
    "intro": "A fajlagos ellenállás képletében a hossz méterben, a keresztmetszet mm²-ben szerepel.",
    "hint": "Először R = ρ·l/A, utána ΔU = I·R.",
    "worked": "500 m hosszú, 2 mm²-es rézvezető ellenállása 4,375 Ω; 2 A-nél a vezetőn 8,75 V esik.",
    "real": "Valós kábelméretezésnél a teljes áramút, a hőmérséklet és a megengedett feszültségesés is fontos."
  },
  "o10": {
    "intro": "A valós áramforrás belső ellenállása is fogyaszt feszültséget.",
    "hint": "Teljes ellenállás = E/I, ebből vond ki a külső ellenállást.",
    "worked": "9 V-os forrásban 1 A folyik 8 Ω külső terhelésen: R_b = 9/1−8 = 1 Ω.",
    "real": "Az akkumulátor kapocsfeszültsége nagy terhelésnél emiatt csökkenhet."
  },
  "o11": {
    "intro": "Belső ellenálláson is Ohm törvénye érvényes.",
    "hint": "Szorozd meg a belső ellenállást az áramerősséggel.",
    "worked": "12 V-os telep 0,2 Ω belső ellenállással és 3 A-rel: belső feszültségesés 0,6 V, kapocsfeszültség 11,4 V.",
    "real": "Elemek terhelés alatti kapocsfeszültségének megértését segíti."
  },
  "o12": {
    "intro": "A fémek ellenállása általában változik a hőmérséklettel.",
    "hint": "ΔT = 360 °C; számold ki az 1+αΔT szorzót.",
    "worked": "50 Ω ellenállás 20 °C-ról 220 °C-ra változik α = 0,00025 1/°C mellett: R = 50·1,05 = 52,5 Ω.",
    "real": "Fűtőszálaknál és hosszú vezetékeknél a hőmérséklet módosítja a villamos jellemzőket."
  },
  "o13": {
    "intro": "Soros kondenzátorok eredő kapacitása kisebb bármelyik különálló kapacitásnál.",
    "hint": "A két kapacitás szorzatát oszd az összegükkel.",
    "worked": "4 µF és 12 µF sorba kötve: C_e = (4·12)/(4+12) = 3 µF.",
    "real": "Kondenzátortelepek, feszültségosztók és elektronikai áramkörök alapja."
  },
  "o14": {
    "intro": "Soros kondenzátorokban a töltés nagysága azonos; az eredő kapacitást használd.",
    "hint": "Előbb a soros eredő kapacitást számold ki.",
    "worked": "4 µF és 12 µF kondenzátor sorosan C_e = 3 µF; 6 µC töltésnél U = 6/3 = 2 V.",
    "real": "A kondenzátorok feszültségeloszlását és energiatárolását alapozza meg."
  },
  "o15": {
    "intro": "A tekercs ellenzi az áram gyors változását; a feszültség a változás sebességétől függ.",
    "hint": "Rendezd át: L = |u|·Δt/ΔI.",
    "worked": "Ha 0,2 s alatt 2 A az áramváltozás és az indukált feszültség abszolútértéke 5 V, L = 5·0,2/2 = 0,5 H.",
    "real": "Kapcsolóüzemű tápegységekben és reléknél az indukciós feszültség fontos."
  },
  "o16": {
    "intro": "A frekvencia azt mutatja, hány teljes periódus történik egy másodperc alatt.",
    "hint": "A periódusidő reciproka a frekvencia.",
    "worked": "Az 50 Hz-es hálózat periódusideje T = 1/50 = 0,02 s = 20 ms, eltérően a kérdés 100 Hz-es példájától.",
    "real": "Hálózatok, frekvenciaváltók és motorvezérlések alapfogalma."
  },
  "o17": {
    "intro": "Szinuszos feszültségnél az effektív érték a hőhatás szerint egyenértékű egyenfeszültség.",
    "hint": "Oszd a csúcsértéket √2-vel.",
    "worked": "Tiszta szinusznál 325 V csúcsértékhez 325/√2 ≈ 230 V effektív érték tartozik.",
    "real": "A multiméterek jellemzően effektív feszültséget jeleznek, az oszcilloszkóp a hullámalakot mutatja."
  },
  "o18": {
    "intro": "A tekercs váltakozó árammal szembeni reaktanciája a frekvenciával nő.",
    "hint": "A X_L = 2πfL összefüggést rendezd f-re.",
    "worked": "0,5 H tekercs 50 Hz-en X_L = 2π·50·0,5 ≈ 157,1 Ω reaktanciájú.",
    "real": "Frekvenciaváltós hajtások és szűrők vizsgálatánál hasznos."
  },
  "o19": {
    "intro": "Az impedanciában az ohmos és az induktív összetevőket négyzetesen összegezzük.",
    "hint": "Előbb X_L = 2πfL, aztán Z = √(R²+X_L²).",
    "worked": "R = 30 Ω, X_L = 40 Ω soros R–L körben Z = √(30²+40²) = 50 Ω.",
    "real": "Tekercsek váltakozó áramú viselkedését és frekvenciafüggését így számoljuk."
  },
  "o20": {
    "intro": "A kondenzátor kapacitív reaktanciája a frekvencia növekedésével csökken.",
    "hint": "A µF-et váltsd faradra (10⁻⁶).",
    "worked": "10 µF-os kondenzátor 50 Hz-en X_C = 1/(2π·50·10·10⁻⁶) ≈ 318,3 Ω.",
    "real": "Fázisjavítás és szűrőáramkörök számításainál fontos."
  },
  "o21": {
    "intro": "Az egyfázisú villamos teljesítmény nem mindig egyszerűen U·I: a teljesítménytényező is számít.",
    "hint": "Az U·I szorzatot még szorozd meg cosφ-vel.",
    "worked": "Egyfázisú 230 V, 10 A, cosφ = 0,8: P = 230·10·0,8 = 1840 W.",
    "real": "Motoros fogyasztók energiaigényének értelmezésénél fontos; nem azonos a tengelyteljesítménnyel."
  },
  "o22": {
    "intro": "A veszteségek miatt a motor több villamos teljesítményt vesz fel, mint amennyit mechanikusan lead.",
    "hint": "A leadott teljesítményt oszd a hatásfokkal (0,81).",
    "worked": "900 W leadott mechanikai teljesítmény és η = 75% mellett P_be = 900/0,75 = 1200 W, a veszteség 300 W.",
    "real": "A motortáblákon szereplő teljesítmény és a villanyfogyasztás nem feltétlenül ugyanaz."
  },
  "o23": {
    "intro": "A teljesítmény kW, a felhasznált energia kWh; számolj a bemenő villamos teljesítménnyel.",
    "hint": "A wattot váltsd kilowattra, majd szorozd órával.",
    "worked": "1,5 kW villamos bemenő teljesítmény 6 órán át: E = 1,5·6 = 9 kWh.",
    "real": "Üzemeltetési költség és motoros gépek fogyasztása számítható így."
  },
  "o24": {
    "intro": "Soros R–L körben az ohmos és induktív feszültségeket nem egyszerűen összeadjuk.",
    "hint": "A reaktanciából és ellenállásból számold ki az impedanciát.",
    "worked": "R = 30 Ω, X_L = 40 Ω, U = 100 V effektív: Z = 50 Ω és I = 100/50 = 2 A.",
    "real": "Motorok és tekercsek váltakozó áramú mérésének alapja."
  }
};
