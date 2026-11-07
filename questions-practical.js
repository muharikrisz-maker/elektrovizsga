// Gyakorlati feladatok: a helyes válasz eredeti indexe megmarad a véletlen megjelenítés mellett.
const PRACTICAL_BANK = [
  {
    "id": "p01",
    "topic": "Villamos hálózatok",
    "level": "Kezdő",
    "q": "Otthon egy 230 V-os, 1150 W-os vízforraló működik. Mennyi a névleges áramfelvétele a megadott értékekből számítva?",
    "opts": [
      "0,5 A",
      "5 A",
      "10 A",
      "115 A"
    ],
    "a": 1,
    "why": "I = P/U = 1150/230 = 5 A.",
    "intro": "Ha tudod a teljesítményt és a feszültséget, kiszámolhatod, mekkora árammal terheli a készülék az áramkört.",
    "hint": "Az I = P/U képletet használd, a wattot oszd volttal.",
    "real": "Háztartási készülékek terhelésének becslése; a tényleges áram a készülék üzemétől függ.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p02",
    "topic": "Villamos hálózatok",
    "level": "Kezdő",
    "q": "Két 100 Ω-os fűtőellenállást párhuzamosan kapcsolunk 230 V-ra. Mekkora az összes betápláló áram, ha az ellenállások állandók?",
    "opts": [
      "1,15 A",
      "2,3 A",
      "4,6 A",
      "9,2 A"
    ],
    "a": 2,
    "why": "Egy ág árama 230/100 = 2,3 A; két ág együtt 4,6 A. Az eredő 50 Ω.",
    "intro": "Párhuzamos ágaknál az áramok a közös betápláló vezetéken összeadódnak.",
    "hint": "Számold ki előbb egyetlen ág áramát!",
    "real": "A közös tápkábel terhelőáramát kell figyelembe venni, nem csak az egyik ágét.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p03",
    "topic": "Villamos hálózatok",
    "level": "Kezdő",
    "q": "Ugyanezt a két 100 Ω-os ellenállást sorba kapcsoljuk 230 V-ra. Mekkora áram folyik a soros körben?",
    "opts": [
      "1,15 A",
      "2,3 A",
      "4,6 A",
      "0,5 A"
    ],
    "a": 0,
    "why": "Rₑ = 100 + 100 = 200 Ω, ezért I = 230/200 = 1,15 A.",
    "intro": "Soros körben az ellenállások összeadódnak, és minden elemen ugyanaz az áram folyik.",
    "hint": "Először az eredő ellenállást számold ki.",
    "real": "A kapcsolás módja drasztikusan módosíthatja egy fűtőberendezés teljesítményét; valódi berendezést csak gyártói előírás szerint szabad kapcsolni.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p04",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy 20 m hosszú réz hosszabbító 1,5 mm² keresztmetszetű. A teljes áramút 40 m (oda-vissza). 10 A mellett, 0,0175 Ω·mm²/m fajlagos ellenállással mekkora a közelítő feszültségesés?",
    "opts": [
      "2,33 V",
      "4,67 V",
      "7,00 V",
      "11,67 V"
    ],
    "a": 1,
    "why": "R = 0,0175 × 40 / 1,5 ≈ 0,467 Ω; ΔU = I×R ≈ 10×0,467 = 4,67 V.",
    "intro": "A hosszabbítón a feszültségesés a teljes áramútra és a terhelőáramra is függ.",
    "hint": "Előbb R = ρ×l/A, utána ΔU = I×R.",
    "real": "Hosszú kábelnél és nagy fogyasztónál a feszültségesés mellett a melegedés és a gyártói terhelhetőség is számít.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p05",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Középhaladó",
    "q": "Egy műhely 400 V-os, szimmetrikus háromfázisú motorja 8 A-t vesz fel, a cosφ = 0,8. Mekkora a felvett hatásos villamos teljesítmény közelítőleg?",
    "opts": [
      "2,56 kW",
      "3,69 kW",
      "4,43 kW",
      "5,54 kW"
    ],
    "a": 2,
    "why": "P = √3×400×8×0,8 ≈ 4434 W, azaz 4,43 kW.",
    "intro": "A motor villamos bemenő teljesítménye nem ugyanaz, mint a tengelyen leadott mechanikai teljesítménye.",
    "hint": "Három fázisnál P = √3×U×I×cosφ.",
    "real": "Motoros berendezések áramfelvételét és villamos energiaigényét így is ellenőrizheted.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p06",
    "topic": "Villamos biztonságtechnika",
    "level": "Középhaladó",
    "q": "Egy 230 V-os, 10 A tervezési áramú végáramkörhöz kábelt választasz. Melyik adatcsomag szükséges még a felelős keresztmetszet- és védelemválasztáshoz?",
    "opts": [
      "Csak a fal színe",
      "Csak a fogyasztó márkája",
      "Csak a konnektor alakja",
      "Fektetési mód, hossz, környezeti feltételek, védelmi eszköz és hibavédelmi feltételek"
    ],
    "a": 3,
    "why": "Az áramerősség önmagában nem elegendő. Terhelhetőséget, feszültségesést, túláramvédelmet és hibavédelmet is ellenőrizni kell.",
    "intro": "A vezeték keresztmetszetét nem lehet kizárólag az amperértékből kiválasztani.",
    "hint": "Gondold végig, mitől melegszik a kábel, és hogy működik a védelem.",
    "real": "Valódi lakás- vagy műhelyáramkör tervezésekor több ellenőrzésből áll a kábelméretezés.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p07",
    "topic": "Villamos biztonságtechnika",
    "level": "Középhaladó",
    "q": "Egy kismegszakító névleges árama 16 A, de egy áramkör üzemi terhelése 20 A. Mi a helyes következtetés?",
    "opts": [
      "A 20 A mindig megfelelő",
      "A túlterhelés lehetősége miatt meg kell vizsgálni az áramkör és a védelem méretezését",
      "A PE vezetőt kell kikötni",
      "A kismegszakító csak zárlatnál működhet"
    ],
    "a": 1,
    "why": "Az üzemi terhelőáram és a védelem összehangolását ellenőrizni kell; a 20 A meghaladja a 16 A névleges értéket.",
    "intro": "A kismegszakító túlterhelés ellen is véd; nemcsak zárlatra kell figyelni.",
    "hint": "Hasonlítsd össze az üzemi áramot és a védelem névleges áramát.",
    "real": "Túlterhelt műhely-áramkörnél nem szabad pusztán nagyobb kismegszakítót betenni a kábel ellenőrzése nélkül.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p08",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Haladó",
    "q": "Egy műhelyben 230 V-os, 1000 W-os fűtőtest és 230 V-os, 1500 W-os vízmelegítő ugyanarról az egyfázisú áramkörről működik, mindkettő névleges teljesítményen. Mennyi a közelítő összáram?",
    "opts": [
      "5,4 A",
      "6,5 A",
      "10,9 A",
      "16,0 A"
    ],
    "a": 2,
    "why": "Pössz = 1000 + 1500 = 2500 W; I = P/U = 2500/230 ≈ 10,87 A.",
    "intro": "A közös áramkörön egyszerre működő fogyasztók együttes terhelésével kell számolni.",
    "hint": "Előbb összegezd a teljesítményeket, utána oszd 230 V-tal.",
    "real": "Terhelési felméréskor a tényleges egyidejűséget és a védelmeket is vizsgálni kell.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p09",
    "topic": "Villamos biztonságtechnika",
    "level": "Haladó",
    "q": "Egy 230 V-os TN végáramkör tervezési számításában a szükséges kioldóáram 80 A. Az egyszerűsített Zₛ ≤ U₀/Iₐ képlet alapján mekkora a felső hurokimpedancia-határ?",
    "opts": [
      "0,2875 Ω",
      "1,84 Ω",
      "2,875 Ω",
      "18,4 Ω"
    ],
    "a": 2,
    "why": "Zₛ,max = 230/80 = 2,875 Ω. A valós ellenőrzéshez a vonatkozó szabvány feltételeit és korrekcióit is alkalmazni kell.",
    "intro": "Minél kisebb a hurokimpedancia, annál nagyobb hibaaram tud kialakulni; a védelem működése időfüggő is.",
    "hint": "A képletben U₀ = 230 V és Iₐ = 80 A.",
    "real": "Egy villamos biztonsági felülvizsgálatban a hurokimpedancia és a lekapcsolási feltételek összetartoznak.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p10",
    "topic": "Villamos hálózatok",
    "level": "Haladó",
    "q": "Egy 30 m-es rézvezeték 2,5 mm² keresztmetszetű, egyfázisú körben az oda-vissza áramút 60 m. 16 A áramnál, ρ = 0,0175 Ω·mm²/m mellett mekkora a közelítő feszültségesés?",
    "opts": [
      "3,36 V",
      "6,72 V",
      "10,08 V",
      "13,44 V"
    ],
    "a": 1,
    "why": "R = 0,0175×60/2,5 = 0,42 Ω; ΔU = 16×0,42 = 6,72 V.",
    "intro": "Összetett példa: vezetékhossz → ellenállás → feszültségesés.",
    "hint": "Az oda-vissza hosszt használd, majd szorozz az áramerősséggel.",
    "real": "A feszültségesést a vezeték üzemi melegedése is befolyásolhatja; ez közelítő számítás.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p11",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Kezdő",
    "q": "Egy 2000 W-os elektromos fűtőtest 2 órán át folyamatosan működik. Mennyi villamos energiát használ fel?",
    "opts": [
      "1 kWh",
      "2 kWh",
      "4 kWh",
      "8 kWh"
    ],
    "a": 2,
    "why": "E = P×t = 2 kW×2 h = 4 kWh.",
    "intro": "A kW a pillanatnyi teljesítmény, a kWh az idő alatt felhasznált energia.",
    "hint": "Előbb váltsd a 2000 W-ot kilowattra.",
    "real": "Így becsülhető a villanyszámla energiarésze és egy fogyasztó üzemeltetése.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  },
  {
    "id": "p12",
    "topic": "Villamos biztonságtechnika",
    "level": "Haladó",
    "q": "Egy műhely terhelése megnőtt, és rendszeresen leold a 16 A-es kismegszakító. Mi a szakmailag megfelelő első lépés?",
    "opts": [
      "Azonnal 25 A-esre cserélni",
      "A PE vezetőt megszakítani",
      "A fogyasztókat és az áramkör terhelését felmérni, majd a vezetéket és a védelmet összehangoltan ellenőrizni",
      "Az ÁVK-t kiiktatni"
    ],
    "a": 2,
    "why": "A leoldás okát fel kell tárni. A kismegszakító névleges áramát nem lehet a vezeték és a védelem ellenőrzése nélkül növelni.",
    "intro": "Nem minden leoldás zárlat; túlterhelés vagy hiba is lehet.",
    "hint": "A biztonságos döntés mérésen és méretezésen alapul.",
    "real": "Ez gyakori valós szakmai helyzet; feszültség alatti munkát csak megfelelő jogosultság és eljárás szerint szabad végezni.",
    "source": "Életszerű villanyszerelési feladat • saját szerkesztés"
  }
];
