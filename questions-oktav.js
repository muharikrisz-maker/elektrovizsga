// OKTÁV (Égető Tamás, 2025. 02. 21.) elektrotechnikai számításai alapján
// Oktatási célú, szerkesztett változatok; hiányos ábrás és adatú tételek kihagyva.
const OKTAV_BANK = [
  {
    "id": "o01",
    "topic": "Villamos hálózatok",
    "level": "Kezdő",
    "q": "Egy vezetőn 2 A áram folyik. Mennyi töltés halad át rajta egy nap alatt?",
    "opts": [
      "172 800 C",
      "7 200 C",
      "86 400 C",
      "48 C"
    ],
    "a": 0,
    "why": "Q = I·t = 2 A · (24·3600 s) = 172 800 C.",
    "intro": "Az áramerősség azt mutatja, hogy másodpercenként mekkora töltés áramlik át egy keresztmetszeten.",
    "hint": "A napot váltsd másodpercre, majd szorozd meg az amperértékkel.",
    "real": "Az áram és az idő kapcsolatából megérthető az akkumulátorok Ah-ban megadott kapacitása.",
    "source": "OKTÁV 2025, 1.11/1038 – átdolgozva"
  },
  {
    "id": "o02",
    "topic": "Villamos hálózatok",
    "level": "Kezdő",
    "q": "Egy 50 Ah névleges kapacitású akkumulátort állandó 12 A-rel terhelünk. Ideális számításban meddig tart?",
    "opts": [
      "0,24 óra",
      "4,17 óra",
      "12 óra",
      "50 óra"
    ],
    "a": 1,
    "why": "t = 50 Ah / 12 A ≈ 4,17 h, vagyis kb. 4 óra 10 perc.",
    "intro": "Az amperóra a kapacitás mértékegysége, nem pillanatnyi áramerősség.",
    "hint": "Oszd a kapacitást a terhelőárammal.",
    "real": "Autóakkumulátor vagy szünetmentes tápegység üzemidejének első becslése; a valós érték terheléstől és állapottól függ.",
    "source": "OKTÁV 2025, 1.13/1045 – átdolgozva"
  },
  {
    "id": "o03",
    "topic": "Villamos hálózatok",
    "level": "Kezdő",
    "q": "Egy 0,15 kΩ-os ellenálláson 50 mA folyik. Mekkora feszültség mérhető rajta?",
    "opts": [
      "0,75 V",
      "3 V",
      "7,5 V",
      "75 V"
    ],
    "a": 2,
    "why": "0,15 kΩ = 150 Ω és 50 mA = 0,05 A. U = I·R = 0,05·150 = 7,5 V.",
    "intro": "Az Ohm-törvény előtt az eltérő mértékegység-előtagokat egységesítsd.",
    "hint": "A kΩ-ot ohmra, a mA-t amperre váltsd.",
    "real": "Egy ellenálláson mérhető feszültségesésből következtethetsz az áramerősségre.",
    "source": "OKTÁV 2025, 1.16/1048 – átdolgozva"
  },
  {
    "id": "o04",
    "topic": "Villamos hálózatok",
    "level": "Kezdő",
    "q": "Egy 30 V-os táplálású ellenálláson 0,2 A folyik. Mekkora az ellenállás?",
    "opts": [
      "6 Ω",
      "30 Ω",
      "60 Ω",
      "150 Ω"
    ],
    "a": 3,
    "why": "R = U/I = 30/0,2 = 150 Ω.",
    "intro": "Az ellenállás az áram és a feszültség kapcsolatát írja le.",
    "hint": "Az R = U/I képletet keresd.",
    "real": "Egy ellenállás mérési adatokból becsülhető, ha a fogyasztó közel ohmos jellegű.",
    "source": "OKTÁV 2025, 1.15/1047 – átdolgozva"
  },
  {
    "id": "o05",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Kezdő",
    "q": "Egy 220 V-os, 60 W-os névleges izzó mekkora áramot vesz fel a névleges pontján?",
    "opts": [
      "0,273 A",
      "3,67 A",
      "60 A",
      "13,2 A"
    ],
    "a": 0,
    "why": "I = P/U = 60/220 ≈ 0,273 A.",
    "intro": "A névleges teljesítmény és feszültség alapján becsülhetjük a fogyasztó áramát.",
    "hint": "A wattot oszd volttal.",
    "real": "Izzólámpánál a hideg és az izzó szál ellenállása jelentősen eltérhet.",
    "source": "OKTÁV 2025, 1.24/1192 – átdolgozva"
  },
  {
    "id": "o06",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Kezdő",
    "q": "Egy 80 Ω-os ohmos melegítőt 220 V-ra kötünk. Mennyi a felvett teljesítmény?",
    "opts": [
      "2,75 W",
      "605 W",
      "1760 W",
      "48 400 W"
    ],
    "a": 1,
    "why": "P = U²/R = 220²/80 = 605 W.",
    "intro": "Ohmos fogyasztónál a feszültség négyzete osztva az ellenállással a teljesítmény.",
    "hint": "Használd a P = U²/R képletet.",
    "real": "A villamos fűtőtestek teljesítményének becslésére szolgál; a tényleges ellenállás hőmérsékletfüggő lehet.",
    "source": "OKTÁV 2025, 1.28/1200 – átdolgozva"
  },
  {
    "id": "o07",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy 50 Ω-os fogyasztó 200 V-os forráshoz csatlakozik. A vezetéken kívül mekkora a fogyasztó névleges számított árama?",
    "opts": [
      "0,25 A",
      "2 A",
      "4 A",
      "10 A"
    ],
    "a": 2,
    "why": "I = U/R = 200/50 = 4 A. A vezetéken eső feszültség miatt a valós áram kissé eltérhet.",
    "intro": "A hosszú tápvezetéknek is van ellenállása, ezért a fogyasztóra jutó feszültség kisebb lehet.",
    "hint": "Előbb hanyagold el a vezeték ellenállását, és alkalmazd az Ohm-törvényt.",
    "real": "Ez az első lépés a vezeték feszültségesésének méretezésénél.",
    "source": "OKTÁV 2025, 1.10/1051 – részfeladat alapján"
  },
  {
    "id": "o08",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy 20 m-re lévő egyfázisú fogyasztót két rézér táplál (oda-vissza 40 m), I = 4 A, A = 1 mm², ρ = 0,0175 Ω·mm²/m. Mekkora a feszültségesés?",
    "opts": [
      "0,7 V",
      "1,4 V",
      "14 V",
      "2,8 V"
    ],
    "a": 3,
    "why": "R = ρ·l/A = 0,0175·40/1 = 0,7 Ω; ΔU = I·R = 4·0,7 = 2,8 V.",
    "intro": "Egyfázisú táplálásnál az oda- és visszavezető teljes hosszával számolj.",
    "hint": "A 20 m kábelhosszt duplázd, utána R = ρ·l/A.",
    "real": "A hosszabbítók és távoli fogyasztók működését a feszültségesés is befolyásolja.",
    "source": "OKTÁV 2025, 1.10/1051 – új, számszerűsített gyakorlat"
  },
  {
    "id": "o09",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy 1 km hosszú rézvezetőn 1 A folyik; A = 2 mm² és ρ = 0,0175 Ω·mm²/m. Mennyi a vezetőn eső feszültség (csak ezen az egy szálon)?",
    "opts": [
      "8,75 V",
      "17,5 V",
      "0,875 V",
      "35 V"
    ],
    "a": 0,
    "why": "R = 0,0175·1000/2 = 8,75 Ω, ezért ΔU = 1·8,75 = 8,75 V.",
    "intro": "A fajlagos ellenállás képletében a hossz méterben, a keresztmetszet mm²-ben szerepel.",
    "hint": "Először R = ρ·l/A, utána ΔU = I·R.",
    "real": "Valós kábelméretezésnél a teljes áramút, a hőmérséklet és a megengedett feszültségesés is fontos.",
    "source": "OKTÁV 2025, 1.9/1049 – átdolgozva"
  },
  {
    "id": "o10",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy 12 V elektromotoros erejű telep 15 Ω terhelésén 0,75 A folyik. Mennyi a telep belső ellenállása?",
    "opts": [
      "0,25 Ω",
      "1 Ω",
      "2 Ω",
      "16 Ω"
    ],
    "a": 1,
    "why": "R_b = E/I − R_k = 12/0,75 − 15 = 16 − 15 = 1 Ω.",
    "intro": "A valós áramforrás belső ellenállása is fogyaszt feszültséget.",
    "hint": "Teljes ellenállás = E/I, ebből vond ki a külső ellenállást.",
    "real": "Az akkumulátor kapocsfeszültsége nagy terhelésnél emiatt csökkenhet.",
    "source": "OKTÁV 2025, 1.18/1090 – átdolgozva"
  },
  {
    "id": "o11",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy 2 V elektromotoros erejű elem belső ellenállása 0,5 Ω; a köráram 0,25 A. Mennyi a belső feszültségesés?",
    "opts": [
      "0,0125 V",
      "0,5 V",
      "0,125 V",
      "1,875 V"
    ],
    "a": 2,
    "why": "U_b = I·R_b = 0,25·0,5 = 0,125 V.",
    "intro": "Belső ellenálláson is Ohm törvénye érvényes.",
    "hint": "Szorozd meg a belső ellenállást az áramerősséggel.",
    "real": "Elemek terhelés alatti kapocsfeszültségének megértését segíti.",
    "source": "OKTÁV 2025, 1.20/1096 – átdolgozva"
  },
  {
    "id": "o12",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Középhaladó",
    "q": "Egy 76 Ω-os fűtőszál ellenállását 20 °C-ról 380 °C-ra melegítjük; α = 0,00025 1/°C. Mekkora a közelítő ellenállása?",
    "opts": [
      "68,4 Ω",
      "76 Ω",
      "76,09 Ω",
      "82,84 Ω"
    ],
    "a": 3,
    "why": "R = R20·[1+α·(380−20)] = 76·1,09 = 82,84 Ω.",
    "intro": "A fémek ellenállása általában változik a hőmérséklettel.",
    "hint": "ΔT = 360 °C; számold ki az 1+αΔT szorzót.",
    "real": "Fűtőszálaknál és hosszú vezetékeknél a hőmérséklet módosítja a villamos jellemzőket.",
    "source": "OKTÁV 2025, 1.22/1112 – átdolgozva"
  },
  {
    "id": "o13",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Két kondenzátort (3,5 µF és 2,8 µF) sorba kötünk. Mennyi az eredő kapacitás?",
    "opts": [
      "1,556 µF",
      "6,3 µF",
      "0,7 µF",
      "3,15 µF"
    ],
    "a": 0,
    "why": "C_e = C1·C2/(C1+C2) = 3,5·2,8/6,3 ≈ 1,556 µF.",
    "intro": "Soros kondenzátorok eredő kapacitása kisebb bármelyik különálló kapacitásnál.",
    "hint": "A két kapacitás szorzatát oszd az összegükkel.",
    "real": "Kondenzátortelepek, feszültségosztók és elektronikai áramkörök alapja.",
    "source": "OKTÁV 2025, 1.7/1023 – részfeladat alapján"
  },
  {
    "id": "o14",
    "topic": "Villamos hálózatok",
    "level": "Haladó",
    "q": "Két soros kondenzátor (3,5 µF és 2,8 µF) szabad végére 4 µC töltést viszünk a földelt másik véghez képest. Mekkora a teljes feszültség ideális esetben?",
    "opts": [
      "0,64 V",
      "2,57 V",
      "4 V",
      "6,3 V"
    ],
    "a": 1,
    "why": "C_e ≈ 1,5556 µF. U = Q/C_e = 4 µC / 1,5556 µF ≈ 2,57 V.",
    "intro": "Soros kondenzátorokban a töltés nagysága azonos; az eredő kapacitást használd.",
    "hint": "Előbb a soros eredő kapacitást számold ki.",
    "real": "A kondenzátorok feszültségeloszlását és energiatárolását alapozza meg.",
    "source": "OKTÁV 2025, 1.7/1023 – átdolgozva"
  },
  {
    "id": "o15",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy tekercs 0,5 A-es áramváltozása 0,5 s alatt 0,12 V önindukciós feszültséget okoz. Mennyi az induktivitás?",
    "opts": [
      "0,024 H",
      "0,06 H",
      "0,12 H",
      "0,24 H"
    ],
    "a": 2,
    "why": "|u| = L·ΔI/Δt, így L = 0,12·0,5/0,5 = 0,12 H.",
    "intro": "A tekercs ellenzi az áram gyors változását; a feszültség a változás sebességétől függ.",
    "hint": "Rendezd át: L = |u|·Δt/ΔI.",
    "real": "Kapcsolóüzemű tápegységekben és reléknél az indukciós feszültség fontos.",
    "source": "OKTÁV 2025, 2.7/1362 – átdolgozva"
  },
  {
    "id": "o16",
    "topic": "Villamos hálózatok",
    "level": "Kezdő",
    "q": "Egy szinuszos váltakozó feszültség periódusideje 0,01 s. Mennyi a frekvenciája?",
    "opts": [
      "10 Hz",
      "50 Hz",
      "60 Hz",
      "100 Hz"
    ],
    "a": 3,
    "why": "f = 1/T = 1/0,01 = 100 Hz.",
    "intro": "A frekvencia azt mutatja, hány teljes periódus történik egy másodperc alatt.",
    "hint": "A periódusidő reciproka a frekvencia.",
    "real": "Hálózatok, frekvenciaváltók és motorvezérlések alapfogalma.",
    "source": "OKTÁV 2025, 3.2/1372 – részfeladat alapján"
  },
  {
    "id": "o17",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy szinuszos feszültség csúcsértéke 500 V. Mennyi az effektív értéke?",
    "opts": [
      "353,6 V",
      "250 V",
      "707,1 V",
      "500 V"
    ],
    "a": 0,
    "why": "U_eff = U_max/√2 = 500/√2 ≈ 353,6 V.",
    "intro": "Szinuszos feszültségnél az effektív érték a hőhatás szerint egyenértékű egyenfeszültség.",
    "hint": "Oszd a csúcsértéket √2-vel.",
    "real": "A multiméterek jellemzően effektív feszültséget jeleznek, az oszcilloszkóp a hullámalakot mutatja.",
    "source": "OKTÁV 2025, 3.2/1372 – átdolgozva"
  },
  {
    "id": "o18",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Egy 0,8 H induktivitású ideális tekercs induktív reaktanciája 70 Ω. Mekkora a frekvencia?",
    "opts": [
      "8,75 Hz",
      "13,93 Hz",
      "55,8 Hz",
      "87,5 Hz"
    ],
    "a": 1,
    "why": "X_L = 2πfL, ezért f = 70/(2π·0,8) ≈ 13,93 Hz.",
    "intro": "A tekercs váltakozó árammal szembeni reaktanciája a frekvenciával nő.",
    "hint": "A X_L = 2πfL összefüggést rendezd f-re.",
    "real": "Frekvenciaváltós hajtások és szűrők vizsgálatánál hasznos.",
    "source": "OKTÁV 2025, 4.2/1380 – átdolgozva"
  },
  {
    "id": "o19",
    "topic": "Villamos hálózatok",
    "level": "Haladó",
    "q": "Egy tekercs R = 10 Ω, L = 150 mH. Mekkora az impedanciája 5000 Hz frekvencián (közelítőleg)?",
    "opts": [
      "4712 Ω",
      "10 Ω",
      "4712,4 Ω",
      "150 Ω"
    ],
    "a": 2,
    "why": "X_L = 2π·5000·0,15 ≈ 4712,39 Ω; Z = √(10²+4712,39²) ≈ 4712,40 Ω.",
    "intro": "Az impedanciában az ohmos és az induktív összetevőket négyzetesen összegezzük.",
    "hint": "Előbb X_L = 2πfL, aztán Z = √(R²+X_L²).",
    "real": "Tekercsek váltakozó áramú viselkedését és frekvenciafüggését így számoljuk.",
    "source": "OKTÁV 2025, 4.3/1381 – átdolgozva"
  },
  {
    "id": "o20",
    "topic": "Villamos hálózatok",
    "level": "Középhaladó",
    "q": "Mekkora egy ideális 4 µF-os kondenzátor kapacitív reaktanciája 50 Hz-en?",
    "opts": [
      "79,6 Ω",
      "796 Ω",
      "1250 Ω",
      "5000 Ω"
    ],
    "a": 3,
    "why": "X_C = 1/(2πfC) = 1/(2π·50·4·10⁻⁶) ≈ 795,8 Ω.",
    "intro": "A kondenzátor kapacitív reaktanciája a frekvencia növekedésével csökken.",
    "hint": "A µF-et váltsd faradra (10⁻⁶).",
    "real": "Fázisjavítás és szűrőáramkörök számításainál fontos.",
    "source": "OKTÁV 2025, 4.4/1382 – átdolgozva"
  },
  {
    "id": "o21",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Haladó",
    "q": "Egy egyfázisú 220 V-os gép 40 A-t vesz fel, cosφ = 0,85. Mekkora a hatásos villamos teljesítménye?",
    "opts": [
      "7480 W",
      "8800 W",
      "10 353 W",
      "3740 W"
    ],
    "a": 0,
    "why": "P = U·I·cosφ = 220·40·0,85 = 7480 W.",
    "intro": "Az egyfázisú villamos teljesítmény nem mindig egyszerűen U·I: a teljesítménytényező is számít.",
    "hint": "Az U·I szorzatot még szorozd meg cosφ-vel.",
    "real": "Motoros fogyasztók energiaigényének értelmezésénél fontos; nem azonos a tengelyteljesítménnyel.",
    "source": "OKTÁV 2025, 4.11/1412 – egyfázisú feltevéssel átdolgozva"
  },
  {
    "id": "o22",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Haladó",
    "q": "Egy egyfázisú motor 1700 W mechanikai teljesítményt ad le, hatásfoka 81%. Mennyi a villamos bemenő hatásos teljesítmény?",
    "opts": [
      "1377 W",
      "2099 W",
      "1700 W",
      "2295 W"
    ],
    "a": 1,
    "why": "P_be = P_ki/η = 1700/0,81 ≈ 2098,77 W.",
    "intro": "A veszteségek miatt a motor több villamos teljesítményt vesz fel, mint amennyit mechanikusan lead.",
    "hint": "A leadott teljesítményt oszd a hatásfokkal (0,81).",
    "real": "A motortáblákon szereplő teljesítmény és a villanyfogyasztás nem feltétlenül ugyanaz.",
    "source": "OKTÁV 2025, 4.12/1414 – részfeladat alapján"
  },
  {
    "id": "o23",
    "topic": "Villamos gépek és fogyasztók",
    "level": "Haladó",
    "q": "Az előző motor P_be ≈ 2098,77 W bemenő hatásos teljesítménnyel 8 órán át dolgozik. Mennyi villamos energiát használ fel?",
    "opts": [
      "2,10 kWh",
      "8 kWh",
      "16,79 kWh",
      "20,99 kWh"
    ],
    "a": 2,
    "why": "E = P_be·t ≈ 2,09877 kW·8 h = 16,79 kWh.",
    "intro": "A teljesítmény kW, a felhasznált energia kWh; számolj a bemenő villamos teljesítménnyel.",
    "hint": "A wattot váltsd kilowattra, majd szorozd órával.",
    "real": "Üzemeltetési költség és motoros gépek fogyasztása számítható így.",
    "source": "OKTÁV 2025, 4.12/1414 – részfeladat alapján"
  },
  {
    "id": "o24",
    "topic": "Villamos hálózatok",
    "level": "Haladó",
    "q": "Egy soros R–L körben R = 50 Ω és X_L = 62,8 Ω, U = 100 V effektív. Mekkora a kör árama?",
    "opts": [
      "2 A",
      "1,59 A",
      "0,62 A",
      "1,25 A"
    ],
    "a": 3,
    "why": "Z = √(50²+62,8²) ≈ 80,27 Ω; I = 100/80,27 ≈ 1,246 A ≈ 1,25 A.",
    "intro": "Soros R–L körben az ohmos és induktív feszültségeket nem egyszerűen összeadjuk.",
    "hint": "A reaktanciából és ellenállásból számold ki az impedanciát.",
    "real": "Motorok és tekercsek váltakozó áramú mérésének alapja.",
    "source": "OKTÁV 2025, 4.1/1379 – átdolgozva"
  }
];
