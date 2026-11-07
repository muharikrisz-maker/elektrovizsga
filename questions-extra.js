const EXTRA_BANK = [
  {
    "id": "fz01",
    "topic": "Villamos hálózatok",
    "q": "Egy 10 kV-os oldalra vonatkoztatott, 2 MVA névleges teljesítményű transzformátor rövidzárási feszültsége 5%. Mennyi a névleges impedanciájának nagysága?",
    "opts": [
      "0,25 Ω",
      "1,25 Ω",
      "2,50 Ω",
      "5,00 Ω"
    ],
    "a": 2,
    "why": "Z = 0,05 × (10 kV)² / 2 MVA = 2,50 Ω.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "fz02",
    "topic": "Villamos hálózatok",
    "q": "Két azonos, egyenként 2,5 Ω impedanciájú transzformátor impedanciáját párhuzamosan kapcsoljuk. Mennyi az eredő?",
    "opts": [
      "5,00 Ω",
      "2,50 Ω",
      "1,25 Ω",
      "0,625 Ω"
    ],
    "a": 2,
    "why": "Két azonos párhuzamos impedancia eredője Z/2 = 1,25 Ω.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "fz03",
    "topic": "Villamos hálózatok",
    "q": "Egy transzformátor 10 kV-os oldali impedanciája 2,5 Ω. A feszültségáttétel 10/0,4 = 25. Mennyi az impedancia a 0,4 kV-os oldalra átszámítva?",
    "opts": [
      "0,004 Ω",
      "0,10 Ω",
      "0,0016 Ω",
      "0,0625 Ω"
    ],
    "a": 0,
    "why": "Az impedancia az áttétel négyzetével módosul: 2,5 / 25² = 0,004 Ω.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "fz04",
    "topic": "Villamos hálózatok",
    "q": "Két azonos transzformátor mindegyikének a kisfeszültségű oldalra átszámított impedanciája 0,004 Ω. Mennyi a két párhuzamos transzformátor eredő impedanciája?",
    "opts": [
      "0,008 Ω",
      "0,004 Ω",
      "0,002 Ω",
      "0,001 Ω"
    ],
    "a": 2,
    "why": "Azonos impedanciák párhuzamosan: 0,004/2 = 0,002 Ω.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "fz05",
    "topic": "Villamos hálózatok",
    "q": "Háromfázisú, szimmetrikus zárlatnál a vonali feszültség 400 V, a teljes helyettesítő impedancia 0,020 Ω. Az egyszerűsített I = U/(√3·Z) képlettel mekkora a zárlati áram?",
    "opts": [
      "5,77 kA",
      "11,55 kA",
      "20,00 kA",
      "34,64 kA"
    ],
    "a": 1,
    "why": "I = 400/(√3 × 0,020) ≈ 11 547 A, azaz 11,55 kA. Ez egyszerűsített modell.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "fz06",
    "topic": "Villamos hálózatok",
    "q": "Egy háromfázisú hálózat zárlati teljesítménye 60 MVA, a vonali feszültség 10 kV. Az S = √3·U·I összefüggés alapján mekkora az áram?",
    "opts": [
      "2,00 kA",
      "3,46 kA",
      "6,00 kA",
      "10,39 kA"
    ],
    "a": 1,
    "why": "I = 60 MVA/(√3 × 10 kV) ≈ 3,46 kA.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "fz07",
    "topic": "Villamos hálózatok",
    "q": "Szimmetrikus zárlatnál a kezdeti effektív áram 3,0 kA és a csúcstényező κ = 1,8. Az iₚ = κ√2·I'' képlettel mekkora a lökőáram?",
    "opts": [
      "3,82 kA",
      "5,40 kA",
      "7,64 kA",
      "10,80 kA"
    ],
    "a": 2,
    "why": "iₚ = 1,8 × √2 × 3,0 ≈ 7,64 kA.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "fz08",
    "topic": "Villamos hálózatok",
    "q": "Egy kábel pozitív sorrendű fajlagos reaktanciája 0,33 Ω/km, hossza 5 km. Mennyi a teljes reaktanciája, ha az érték állandó?",
    "opts": [
      "0,066 Ω",
      "0,33 Ω",
      "1,65 Ω",
      "6,60 Ω"
    ],
    "a": 2,
    "why": "X = 0,33 Ω/km × 5 km = 1,65 Ω.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "fz09",
    "topic": "Villamos hálózatok",
    "q": "Ha a transzformátor százalékos rövidzárási feszültsége 5%-ról 10%-ra nő, miközben Uₙ és Sₙ állandó, hogyan változik a számított impedancia?",
    "opts": [
      "Felére csökken",
      "Kétszeresére nő",
      "Négyzetére nő",
      "Nem változik"
    ],
    "a": 1,
    "why": "Z = (uₖ%/100) × Uₙ²/Sₙ, tehát az uₖ megduplázása megduplázza Z-t.",
    "source": "Saját füzet • zárlatszámítás"
  },
  {
    "id": "os01",
    "topic": "Villamos biztonságtechnika",
    "q": "230/400 V-os berendezés szigetelési ellenállásának szokásos, 500 V DC vizsgálatához melyik műszer való?",
    "opts": [
      "Lakatszorító pusztán árammérésre",
      "Szigetelésvizsgáló műszer",
      "Fázissorrend-mérő",
      "Frekvenciamérő"
    ],
    "a": 1,
    "why": "A szigetelésmérő meghatározott egyenfeszültségű próbával méri a szigetelési ellenállást; a vizsgálati feltételeket be kell tartani.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os02",
    "topic": "Villamos biztonságtechnika",
    "q": "Mit ellenőriz az áram-védőkapcsoló beépített TEST gombjának működtetése?",
    "opts": [
      "A teljes PE-hálózat folytonosságát",
      "Az ÁVK saját működését a beépített próbáramkörrel",
      "A hurokimpedanciát",
      "Minden csatlakozó polaritását"
    ],
    "a": 1,
    "why": "A TEST gomb belső próbaáramot idéz elő; nem helyettesíti a teljes villamos biztonsági felülvizsgálatot.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os03",
    "topic": "Villamos biztonságtechnika",
    "q": "Egy TN-rendszerű végáramkörben U₀ = 230 V, a védelemhez szükséges kioldóáram Iₐ = 50 A. Az egyszerűsített Zₛ ≤ U₀/Iₐ feltétel szerint mennyi a legnagyobb megengedett hurokimpedancia?",
    "opts": [
      "0,22 Ω",
      "2,17 Ω",
      "4,60 Ω",
      "11,50 Ω"
    ],
    "a": 2,
    "why": "Zₛ,max = 230/50 = 4,60 Ω. A gyakorlati ellenőrzésnél a szabványos korrekciók és feltételek is fontosak.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os04",
    "topic": "Villamos biztonságtechnika",
    "q": "Egy 230 V-os TN végáramkört B10-es kismegszakító véd. Ha a számításhoz az 5·Iₙ kioldóárammal számolunk, mekkora a Zₛ,max egyszerűsített értéke?",
    "opts": [
      "0,46 Ω",
      "2,30 Ω",
      "4,60 Ω",
      "23,0 Ω"
    ],
    "a": 2,
    "why": "Iₐ = 5 × 10 = 50 A, így Zₛ,max = 230/50 = 4,60 Ω.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os05",
    "topic": "Villamos biztonságtechnika",
    "q": "Mi a PE jelű vezető fő rendeltetése?",
    "opts": [
      "Üzemi áram vezetése minden esetben",
      "Villamos védelmi célú összekötés",
      "Meddő teljesítmény kompenzálása",
      "Feszültségszabályozás"
    ],
    "a": 1,
    "why": "A PE védővezető a hibavédelmi rendszer része; normál üzemi áram vezetésére nem szolgál.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os06",
    "topic": "Villamos biztonságtechnika",
    "q": "Melyik állítás helyes egy hagyományos, túláramvédelem nélküli ÁVK-ról?",
    "opts": [
      "Önmagában mindig zárlatvédelmet is ad",
      "Csak túlfeszültségre működik",
      "Nem helyettesíti a megfelelő túláramvédelmet",
      "Csak háromfázisú rendszeren használható"
    ],
    "a": 2,
    "why": "A hagyományos ÁVK maradékáram-védelemre szolgál; a túláramvédelem külön eszközt igényelhet.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os07",
    "topic": "Villamos biztonságtechnika",
    "q": "Egy hálózati készülék érinthető fémháza I. érintésvédelmi osztályú. Melyik megoldás alapvető része a hibavédelemnek?",
    "opts": [
      "Fémház csatlakoztatása a védővezetőhöz",
      "A fémház üzemi nullavezetővé alakítása",
      "Csak a burkolat befestése",
      "Csak egy jelzőlámpa felszerelése"
    ],
    "a": 0,
    "why": "Az I. érintésvédelmi osztályú készülék hozzáférhető vezetőképes részeit megfelelő védővezetőhöz kell kapcsolni.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os08",
    "topic": "Villamos gépek és fogyasztók",
    "q": "Egy háromfázisú transzformátor névleges teljesítménye 6,9 kVA, vonali szekunder feszültsége 400 V. Mekkora a névleges vonali szekunder áram közelítőleg?",
    "opts": [
      "5 A",
      "10 A",
      "17,25 A",
      "30 A"
    ],
    "a": 1,
    "why": "I₂n = 6900/(√3 × 400) ≈ 9,96 A, azaz közel 10 A.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os09",
    "topic": "Villamos gépek és fogyasztók",
    "q": "Egy áramváltó névleges áttétele 200/5 A. Ha a primer áram 80 A, mekkora az ideális szekunder áram?",
    "opts": [
      "1 A",
      "2 A",
      "5 A",
      "8 A"
    ],
    "a": 1,
    "why": "Az áttétel 40:1, így I₂ = 80/40 = 2 A.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os10",
    "topic": "Villamos gépek és fogyasztók",
    "q": "Egy 50 Hz-es, négypólusú aszinkronmotor szinkron fordulatszáma mennyi?",
    "opts": [
      "750 1/min",
      "1000 1/min",
      "1500 1/min",
      "3000 1/min"
    ],
    "a": 2,
    "why": "nₛ = 120f/p = 120 × 50/4 = 1500 1/min.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os11",
    "topic": "Villamos gépek és fogyasztók",
    "q": "Egy aszinkronmotor szinkron fordulatszáma 1500 1/min, tényleges fordulatszáma 1440 1/min. Mekkora a szlip?",
    "opts": [
      "2%",
      "4%",
      "6%",
      "10%"
    ],
    "a": 1,
    "why": "s = (1500−1440)/1500 = 0,04 = 4%.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os12",
    "topic": "Villamos gépek és fogyasztók",
    "q": "Egy háromfázisú motor 400 V vonali feszültségről 10 A vonali áramot vesz fel, cosφ = 0,8. Mekkora a felvett hatásos teljesítmény közelítőleg?",
    "opts": [
      "3,20 kW",
      "4,00 kW",
      "5,54 kW",
      "6,93 kW"
    ],
    "a": 2,
    "why": "P = √3 × 400 × 10 × 0,8 ≈ 5543 W = 5,54 kW.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os13",
    "topic": "Villamos gépek és fogyasztók",
    "q": "Egy villamos motor forgásirányát háromfázisú táplálás esetén hogyan lehet megfordítani?",
    "opts": [
      "Két fázisvezető felcserélésével",
      "A PE-vezető megszakításával",
      "A frekvencia duplázásával minden esetben",
      "A névleges feszültség megfelezésével"
    ],
    "a": 0,
    "why": "Két tápláló fázis felcserélése a forgómező irányát megfordítja, ezért a motor forgásiránya is megváltozik.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os14",
    "topic": "Villamos hálózatok",
    "q": "Háromfázisú, szimmetrikus 400/230 V-os rendszerben melyik feszültség mérhető egy fázis és a nulla között?",
    "opts": [
      "133 V",
      "230 V",
      "400 V",
      "690 V"
    ],
    "a": 1,
    "why": "A fázis–nulla feszültség kb. 230 V; a fázisok között a vonali feszültség 400 V.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os15",
    "topic": "Villamos hálózatok",
    "q": "Egy 40 m hosszú vezető ellenállása 0,20 Ω. Azonos anyag és keresztmetszet mellett mekkora az ellenállás 80 m hosszúság esetén?",
    "opts": [
      "0,10 Ω",
      "0,20 Ω",
      "0,40 Ω",
      "0,80 Ω"
    ],
    "a": 2,
    "why": "R = ρl/A, így azonos anyag és keresztmetszet mellett a hossz megduplázása az ellenállást is megduplázza.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os16",
    "topic": "Villamos hálózatok",
    "q": "Egy szimmetrikus háromfázisú fogyasztó hatásos teljesítménye 12 kW, meddő teljesítménye 5 kvar. Mennyi a látszólagos teljesítménye?",
    "opts": [
      "7 kVA",
      "12 kVA",
      "13 kVA",
      "17 kVA"
    ],
    "a": 2,
    "why": "S = √(P²+Q²) = √(12²+5²) = 13 kVA.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os17",
    "topic": "Villamos hálózatok",
    "q": "Egy 400 V-os háromfázisú hálózaton 20 A folyik, a teljesítménytényező 1. Mennyi a hatásos teljesítmény közelítőleg?",
    "opts": [
      "4,62 kW",
      "8,00 kW",
      "13,86 kW",
      "20,00 kW"
    ],
    "a": 2,
    "why": "P = √3 × 400 × 20 × 1 ≈ 13,86 kW.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  },
  {
    "id": "os18",
    "topic": "Villamos biztonságtechnika",
    "q": "Melyik jelölés utal arra, hogy a többeres kábel tartalmaz zöld-sárga védővezető eret is a 3G2,5 jelölésben?",
    "opts": [
      "A 3 számjegy",
      "A G betű",
      "A 2,5 számjegy",
      "A kábel külső átmérője"
    ],
    "a": 1,
    "why": "A G jelölés azt fejezi ki, hogy a többérű kábel zöld-sárga eret is tartalmaz.",
    "source": "OSZTV 2024 témái alapján • új feladat"
  }
];
