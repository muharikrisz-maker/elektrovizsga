// ElektroVizsga: tanulási taxonómia az Erősáramú elektrotechnikus KKK 2024.08.29. v4, 8.3.2 és 8.4.2 alapján.
// A 19 korábbi tanulási témakör és az új, még kidolgozandó KKK-területek.
const EXAM_FRAMEWORK = {
  "version": "2024-08-29-v4",
  "exam": {
    "interactive": {
      "durationMinutes": 45,
      "overallWeight": 20,
      "sections": [
        {
          "id": "network",
          "title": "Villamos hálózatok és jellemzői",
          "weight": 30,
          "description": "Hálózatok, KIF/KÖF, TR állomások, vezetékek, zárlatok, kapcsolókészülékek és automatikák."
        },
        {
          "id": "machines",
          "title": "Villamos gépek és fogyasztók jellemzői",
          "weight": 30,
          "description": "Gépek, épületvillamosság, motorvezérlés, fázisjavítás, villámvédelem és mérések."
        },
        {
          "id": "safety",
          "title": "Villamos biztonságtechnika, üzemeltetési előírások",
          "weight": 40,
          "description": "Áramütés elleni védelem, munkabiztonság, MSZ 1585 és feszültségmentesítés."
        }
      ]
    },
    "project": {
      "durationMinutes": 345,
      "overallWeight": 80,
      "parts": [
        {
          "id": "portfolio",
          "title": "Portfólió és szóbeli megvédése",
          "weight": 10,
          "description": "Dokumentált projektmunka, munkanaplók, rajzok, önreflexió",
          "status": "planned"
        },
        {
          "id": "meter-panel",
          "title": "Áramváltós fogyasztásmérőhely és főelosztó",
          "weight": 30,
          "description": "Mérőhely, túlfeszültség-védelem, alap- és hibavédelem, mérési adatok",
          "status": "planned"
        },
        {
          "id": "motor-project",
          "title": "Motorvezérlési projekt és mérések",
          "weight": 30,
          "description": "Dokumentációból összeállított motorvezérlés, mérés, dokumentálás",
          "status": "planned"
        },
        {
          "id": "drawing",
          "title": "Kapcsolási rajz, szerszám- és anyagjegyzék",
          "weight": 15,
          "description": "Kapcsolási rajz és alkatrész-azonosítás, szükséges eszközök",
          "status": "planned"
        },
        {
          "id": "sizing",
          "title": "Méretezési és kiválasztási feladatok",
          "weight": 15,
          "description": "Vezeték, védelem, zárlati impedancia és energiaigény",
          "status": "planned"
        }
      ]
    }
  },
  "topics": [
    {
      "id": "ohm",
      "title": "Ohm törvénye és alapmérések",
      "group": "Villamos hálózatok",
      "intro": "Feszültség, áram és ellenállás kapcsolata; az ismeretlen mennyiséget a megfelelő átrendezéssel számoljuk.",
      "example": "24 V és 12 Ω esetén I = 24/12 = 2 A.",
      "questionIds": [
        "n1",
        "o03",
        "o04",
        "o07",
        "p01"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "connections",
      "title": "Soros és párhuzamos kapcsolások",
      "group": "Villamos hálózatok",
      "intro": "Soros körben az ellenállások összeadódnak, párhuzamos kapcsolásnál az ágáramok összeadódnak.",
      "example": "Két 60 Ω-os párhuzamos ellenállás eredője 30 Ω.",
      "questionIds": [
        "n3",
        "p02",
        "p03"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "voltage",
      "title": "230/400 V és fázisfeszültség",
      "group": "Villamos hálózatok",
      "intro": "Szimmetrikus háromfázisú hálózatban egy fázis és nulla között 230 V, két különböző fázis között 400 V van.",
      "example": "A nulla és egy másik fázis összecserélése 230 V-os aljzatban akár 400 V-ot okozhat.",
      "questionIds": [
        "n2",
        "os14"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "energy",
      "title": "Teljesítmény, energia, fogyasztás",
      "group": "Villamos gépek és fogyasztók",
      "intro": "A teljesítmény W vagy kW, az idő alatt felhasznált energia Wh vagy kWh. Az ismert adatokból többféle módon számolhatunk teljesítményt.",
      "example": "1,5 kW-os fűtőtest 4 óra alatt 6 kWh energiát fogyaszt.",
      "questionIds": [
        "g3",
        "p11",
        "p08",
        "o05",
        "o06",
        "o21",
        "o23"
      ],
      "section": "machines",
      "status": "ready"
    },
    {
      "id": "source",
      "title": "Áramforrások, akkumulátor, töltés",
      "group": "Villamos hálózatok",
      "intro": "Az áramerősség az időegység alatt áthaladó töltés, az akkumulátor kapacitását Ah-ban adják meg. Az áramforrásnak belső ellenállása is lehet.",
      "example": "24 Ah akkumulátor 3 A terheléssel ideálisan 8 óráig tart.",
      "questionIds": [
        "o01",
        "o02",
        "o10",
        "o11"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "wires",
      "title": "Vezeték-ellenállás és feszültségesés",
      "group": "Villamos hálózatok",
      "intro": "A vezető hossza, keresztmetszete és fajlagos ellenállása együtt határozza meg a feszültségesést; egyfázisú körben az oda-vissza út számít.",
      "example": "20 m hosszú 1,5 mm²-es rézvezetékpáron 10 A esetén ΔU ≈ 4,67 V.",
      "questionIds": [
        "p04",
        "p06",
        "p10",
        "o08",
        "o09",
        "os15",
        "fz08"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "capacitors",
      "title": "Kondenzátorok és kapacitás",
      "group": "Villamos hálózatok",
      "intro": "A soros kondenzátorok eredő kapacitása kisebb az egyedi kapacitásoknál. A töltés és a feszültség összefügg.",
      "example": "4 µF és 12 µF soros eredője 3 µF.",
      "questionIds": [
        "o13",
        "o14"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "ac",
      "title": "Frekvencia és effektív érték",
      "group": "Villamos hálózatok",
      "intro": "A frekvencia a periódusidő reciproka; szinuszos váltakozó feszültségnél a csúcsérték és az effektív érték eltér.",
      "example": "50 Hz periódusideje T = 1/50 = 0,02 s = 20 ms.",
      "questionIds": [
        "o16",
        "o17"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "reactance",
      "title": "Tekercs, indukció és impedancia",
      "group": "Villamos hálózatok",
      "intro": "A tekercs áramváltozásra feszültséggel reagál; váltakozó áramnál az ohmos ellenállás és a reaktancia együtt határozza meg az impedanciát.",
      "example": "R = 30 Ω és X_L = 40 Ω esetén Z = 50 Ω.",
      "questionIds": [
        "o15",
        "o18",
        "o19",
        "o20",
        "o24"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "transformers",
      "title": "Transzformátorok és áttétel",
      "group": "Villamos gépek és fogyasztók",
      "intro": "A transzformátor működése elektromágneses indukción alapul. Fontos a feszültség- és impedanciaáttétel, a rövidzárási impedancia.",
      "example": "10:1 menetszámaránynál 230 V primerből ideálisan 23 V lesz a szekunderen.",
      "questionIds": [
        "g1",
        "os08",
        "os09",
        "fz01",
        "fz02",
        "fz03",
        "fz04",
        "fz09"
      ],
      "section": "machines",
      "status": "ready"
    },
    {
      "id": "motors",
      "title": "Motorok, fordulatszám, hatásfok",
      "group": "Villamos gépek és fogyasztók",
      "intro": "Az aszinkronmotor tengelyének fordulatszáma eltér a forgómezőétől; a hatásfok a leadott és felvett teljesítmény aránya.",
      "example": "1000 1/min szinkron, 970 1/min tényleges fordulat: szlip 3%.",
      "questionIds": [
        "g2",
        "os10",
        "os11",
        "os13",
        "o22"
      ],
      "section": "machines",
      "status": "ready"
    },
    {
      "id": "3power",
      "title": "Háromfázisú teljesítmény",
      "group": "Villamos gépek és fogyasztók",
      "intro": "Szimmetrikus háromfázisú rendszerben P = √3·U_v·I_v·cosφ; a hatásos, meddő és látszólagos teljesítményt különböztessük meg.",
      "example": "400 V, 10 A, cosφ = 1 esetén P ≈ 6,93 kW.",
      "questionIds": [
        "p05",
        "os12",
        "os16",
        "os17"
      ],
      "section": "machines",
      "status": "ready"
    },
    {
      "id": "pe",
      "title": "Védővezető és kábeljelölés",
      "group": "Villamos biztonságtechnika",
      "intro": "A PE a hibavédelmet szolgálja, az N üzemi nullavezető. A kábel jelöléséből megállapítható az erek száma és a védőér jelenléte.",
      "example": "3G2,5: három ér, köztük zöld-sárga, egyenként 2,5 mm² keresztmetszettel.",
      "questionIds": [
        "b1",
        "b3",
        "os05",
        "os07",
        "os18"
      ],
      "section": "safety",
      "status": "ready"
    },
    {
      "id": "rcd",
      "title": "Áram-védőkapcsoló (ÁVK)",
      "group": "Villamos biztonságtechnika",
      "intro": "Az ÁVK a rajta átvezetett áramok különbségét érzékeli, nem váltja ki a túláramvédelmet.",
      "example": "5,00 A kifolyó és 4,97 A visszatérő áram különbsége 30 mA.",
      "questionIds": [
        "b2",
        "os02",
        "os06"
      ],
      "section": "safety",
      "status": "ready"
    },
    {
      "id": "breakers",
      "title": "Kismegszakító és túláramvédelem",
      "group": "Villamos biztonságtechnika",
      "intro": "A kismegszakító túlterhelés és zárlati túláram ellen véd a megfelelően méretezett áramkörben.",
      "example": "16 A-es védelem és 20 A tartós áram esetén a terhelést és a vezetéket is vizsgálni kell.",
      "questionIds": [
        "b4",
        "p07",
        "p12"
      ],
      "section": "safety",
      "status": "ready"
    },
    {
      "id": "loop",
      "title": "Hibahurok és lekapcsolás",
      "group": "Villamos biztonságtechnika",
      "intro": "A hurokimpedancia és a kioldóáram együtt meghatározza az automatikus lekapcsolás egyszerűsített feltételét.",
      "example": "230 V és 80 A esetén Z_s,max = 230/80 = 2,875 Ω.",
      "questionIds": [
        "os03",
        "os04",
        "p09"
      ],
      "section": "safety",
      "status": "ready"
    },
    {
      "id": "short",
      "title": "Zárlati áramok és zárlati teljesítmény",
      "group": "Villamos hálózatok",
      "intro": "A hálózat impedanciája és zárlati teljesítménye befolyásolja a zárlati és a lökőáramot.",
      "example": "400 V, Z = 0,04 Ω esetén háromfázisú zárlatnál I ≈ 5,77 kA.",
      "questionIds": [
        "fz05",
        "fz06",
        "fz07"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "insulation",
      "title": "Szigetelésvizsgálat",
      "group": "Villamos biztonságtechnika",
      "intro": "A szigetelési ellenállást erre készült műszerrel, előírt próbafeszültséggel és eljárással vizsgáljuk.",
      "example": "500 V DC és 1 MΩ esetén az elvi szivárgóáram 0,5 mA.",
      "questionIds": [
        "os01"
      ],
      "section": "safety",
      "status": "ready"
    },
    {
      "id": "temperature",
      "title": "Hőmérsékletfüggő ellenállás",
      "group": "Villamos hálózatok",
      "intro": "A vezető ellenállása a hőmérséklettel változhat, ezért a megadott α hőfoktényezőt is figyelembe kell venni.",
      "example": "50 Ω-ról 200 °C emelkedés és α = 0,00025 1/°C mellett R = 52,5 Ω.",
      "questionIds": [
        "o12"
      ],
      "section": "network",
      "status": "ready"
    },
    {
      "id": "grid-topology",
      "title": "KIF/KÖF hálózatok felépítése és topológiája",
      "group": "network",
      "intro": "Hálózati topológiák, sugaras és hurkolt elrendezések, kis- és középfeszültségű rendszerek",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "network"
    },
    {
      "id": "station-plans",
      "title": "Transzformátorállomások és műszaki tervek",
      "group": "network",
      "intro": "Transzformátorállomások elemei, egyvonalas rajzok, tervolvasás és készülékjelölések",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "network"
    },
    {
      "id": "switchgear",
      "title": "Kapcsolókészülékek kiválasztása",
      "group": "network",
      "intro": "Megszakítók, szakaszolók, terheléskapcsolók, névleges jellemzők és alkalmazás",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "network"
    },
    {
      "id": "grid-protection",
      "title": "Hálózati védelmek és automatikák",
      "group": "network",
      "intro": "Túláram-, földzárlatvédelem, szelektivitás és hálózati automatika alapjai",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "network"
    },
    {
      "id": "reconstruction",
      "title": "Hálózat-rekonstrukció és megszüntetés",
      "group": "network",
      "intro": "Tervezés, dokumentáció, leválasztás, bontási és létesítési folyamatok",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "network"
    },
    {
      "id": "building-install",
      "title": "Épületvillamossági szerelési módok",
      "group": "machines",
      "intro": "Vezeték- és kábelfektetés, szerelési rendszerek és elosztószekrények",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "machines"
    },
    {
      "id": "generator-pv",
      "title": "Generátorok és energiaforrások",
      "group": "machines",
      "intro": "Generátorok működése, energiaforrások és fotovoltaikus rendszerek alapjai",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "machines"
    },
    {
      "id": "motor-control",
      "title": "Motorvezérlés és fékezési módok",
      "group": "machines",
      "intro": "Indítás, forgásirányváltás, fékezés és kapcsolási rajzok értelmezése",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "machines"
    },
    {
      "id": "power-factor",
      "title": "Fázisjavítás és meddőgazdálkodás",
      "group": "machines",
      "intro": "Teljesítménytényező, kompenzálás és kondenzátortelepek",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "machines"
    },
    {
      "id": "lightning-surge",
      "title": "Villám- és túlfeszültségvédelem",
      "group": "machines",
      "intro": "Villámvédelmi rendszer, SPD típusok és koordináció alapjai",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "machines"
    },
    {
      "id": "measurement",
      "title": "Villamos üzemi és biztonsági mérések",
      "group": "machines",
      "intro": "Áram-, feszültség-, teljesítmény-, energia- és biztonsági mérések, dokumentáció",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "machines"
    },
    {
      "id": "safe-work",
      "title": "Villamos munkabiztonság és üzemszervezés",
      "group": "safety",
      "intro": "Munkaterület előkészítése, kockázatértékelés, felelős személyek szerepe",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "safety"
    },
    {
      "id": "msz1585",
      "title": "MSZ 1585 szerinti villamos üzemeltetés",
      "group": "safety",
      "intro": "Villamos üzemeltetési eljárások, munkavégzési módok és személyi feltételek",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "safety"
    },
    {
      "id": "isolation",
      "title": "Feszültségmentesítés és visszakapcsolás",
      "group": "safety",
      "intro": "Az öt biztonsági szabály, feszültségmentes állapot ellenőrzése és visszakapcsolás",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "safety"
    },
    {
      "id": "surge-touch",
      "title": "Áramütés és túlfeszültség elleni védelem alkalmazása",
      "group": "safety",
      "intro": "Érintési feszültség, védelmi módok, SPD és hibavédelmi eszközök összehangolása",
      "example": "",
      "questionIds": [],
      "status": "planned",
      "section": "safety"
    }
  ],
  "source": "https://api.ikk.hu/v1/media/documents/11337?filename=Er%C5%91s%C3%A1ram%C3%BA-elektrotechnikus-2024.08.29.-v4.pdf"
};
