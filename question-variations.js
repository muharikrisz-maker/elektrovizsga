/* ElektroVizsga – változó számadatú feladatok. A kiinduló kérdésbankot nem módosítja. */
(function(global){
"use strict";
const pick=a=>a[Math.floor(Math.random()*a.length)];
const fmt=(n,d=2)=>new Intl.NumberFormat("hu-HU",{maximumFractionDigits:d}).format(n);
const num=(n,d=2)=>Number(n.toFixed(d));
function task(base,question,value,unit,formula,alternatives,scenario){
 const answer=fmt(value)+(unit?" "+unit:"");
 const opts=[answer,...alternatives.map(x=>fmt(x)+(unit?" "+unit:""))].filter((x,i,a)=>a.indexOf(x)===i);
 if(opts.length!==4)throw Error("Duplicate options: "+base.id);
 const shuffled=[...opts].sort(()=>Math.random()-.5);
 return {...base,q:question,opts:shuffled,a:shuffled.indexOf(answer),why:formula,scenario:scenario||base.scenario};
}
const f={
n1:b=>{const u=pick([24,48,120,230]),i=pick([2,3,4,5,8]);const r=u/i;return task(b,"Egy "+fmt(u)+" V feszültségre kapcsolt, "+fmt(r)+" Ω ellenállású fogyasztón mekkora áram folyik?",i,"A","I = U/R = "+fmt(u)+"/"+fmt(r)+" = "+fmt(i)+" A.",[i*2,i/2,i+2]);},
n3:b=>{const r=pick([40,60,80,120,200,300]);return task(b,"Két "+r+" Ω-os azonos ellenállást párhuzamosan kapcsolunk. Mennyi az eredő?",r/2,"Ω","Rₑ = R/2 = "+r+"/2 = "+r/2+" Ω.",[r,r*2,r/4]);},
g2:b=>{const ns=pick([1000,1500,3000]),pc=pick([1,2,3,4,5]);const n=ns*(1-pc/100);return task(b,"Egy aszinkronmotor forgómezejének szinkron fordulatszáma "+ns+" 1/min, a forgórészé "+n+" 1/min. Mekkora a szlip?",pc,"%","s = (nₛ−n)/nₛ · 100 = ("+ns+"−"+n+")/"+ns+" · 100 = "+pc+"%.",[pc/2,pc*2,pc+2]);},
g3:b=>{const p=pick([0.5,1,1.5,2,2.5,3]),h=pick([2,3,4,5,6,8]),e=p*h;return task(b,"Egy "+fmt(p)+" kW teljesítményű, állandó teljesítményen üzemelő fűtőtest "+h+" óra alatt mennyi energiát fogyaszt?",e,"kWh","E = P·t = "+fmt(p)+" kW · "+h+" h = "+fmt(e)+" kWh.",[e/2,e*2,e+p]);},
p01:b=>{const u=230,i=pick([3,4,5,6,8,10,12]),p=u*i;return task(b,"Egy 230 V-os, "+p+" W-os névleges teljesítményű vízforraló működik. Mennyi a névleges áramfelvétele?",i,"A","I = P/U = "+p+"/230 = "+i+" A.",[i/2,i*2,i+1],"Villanyszerelőként megbízást kapsz egy konyha villamos hálózatának felújítására. A megrendelő új, "+p+" W-os vízforralót is használna; a terhelésfelméréshez az áramfelvételét kell kiszámítanod.");},
p02:b=>{const r=pick([40,50,80,100,125,200]),u=pick([100,200,230]),i=2*u/r;return task(b,"Két "+r+" Ω-os fűtőellenállást párhuzamosan kapcsolunk "+u+" V-ra. Mekkora az összes betápláló áram?",i,"A","Egy ág árama "+u+"/"+r+" = "+fmt(u/r)+" A; két ág együtt "+fmt(i)+" A.",[u/r,i*2,i/2]);},
p03:b=>{const r=pick([40,60,80,100,120,150]),u=pick([120,200,230,240]),i=u/(2*r);return task(b,"Két "+r+" Ω-os ellenállást sorba kapcsolunk "+u+" V-ra. Mekkora áram folyik a körben?",i,"A","Rₑ = "+r+" + "+r+" = "+2*r+" Ω; I = "+u+"/"+(2*r)+" = "+fmt(i,3)+" A.",[u/r,i*2,i/2]);},
p04:b=>wire(b,true),
p10:b=>wire(b,false),
p05:b=>threePower(b,"motor"),
os12:b=>threePower(b,"motor"),
os17:b=>threePower(b,"fogyasztó",true),
p08:b=>{const p1=pick([460,690,920,1150,1380]),p2=pick([690,920,1150,1610,1840]),i=(p1+p2)/230;return task(b,"Egy műhelyben "+p1+" W-os fűtőtest és "+p2+" W-os vízmelegítő működik egyidejűleg ugyanazon a 230 V-os áramkörön. Mennyi az összáram?",i,"A","Pₒ = "+p1+" + "+p2+" = "+(p1+p2)+" W; I = "+(p1+p2)+"/230 = "+fmt(i)+" A.",[p1/230,p2/230,i*2]);},
p09:b=>loop(b),
os03:b=>loop(b),
os04:b=>{const rated=pick([6,10,13,16,20,25]),ia=5*rated,z=230/ia;return task(b,"230 V-os TN végáramkört B"+rated+"-es kismegszakító véd. A számításhoz 5·Iₙ kioldóárammal számolva mekkora Zₛ,max?",z,"Ω","Iₐ = 5 · "+rated+" = "+ia+" A; Zₛ,max = 230/"+ia+" = "+fmt(z,3)+" Ω. Oktatási egyszerűsítés.",[z*2,z/2,z+1]);},
p11:b=>{const p=pick([500,750,1000,1500,2000,2500]),h=pick([2,3,4,5,6]),e=p*h/1000;return task(b,"Egy "+p+" W-os elektromos fűtőtest "+h+" órán át folyamatosan működik. Mennyi energiát használ fel?",e,"kWh","E = ("+p+"/1000) · "+h+" = "+fmt(e)+" kWh.",[e/2,e*2,e+1]);},
o01:b=>{const i=pick([0.5,1,1.5,2,3,4,5]),h=pick([2,4,6,8,12,24]),q=i*h*3600;return task(b,"Egy vezetőn "+fmt(i)+" A áram folyik "+h+" órán keresztül. Mennyi töltés halad át rajta?",q,"C","Q = I·t = "+fmt(i)+" · ("+h+" · 3600) = "+fmt(q)+" C.",[q/2,q*2,i*h]);},
o02:b=>{const ah=pick([24,40,50,60,75,100,120,150,200]),i=pick([5,8,10,12,15,20,25]),h=ah/i;return task(b,"Egy "+ah+" Ah névleges kapacitású akkumulátort állandó "+i+" A-rel terhelünk. Ideális számításban meddig tart?",h,"h","t = Q/I = "+ah+" Ah / "+i+" A ≈ "+fmt(h)+" h. Valódi rendszernél a hasznos kapacitás és veszteségek is számítanak.",[ah/(i*2),h*2,h+2],"Villanyszerelőként megbízást kapsz egy meglévő napelemes rendszer akkumulátoros bővítésére. A megrendelő az energiatároló várható tartalékidejére kíváncsi. Először az idealizált Ah/A számítást végzed el; a végleges méretezéshez a feszültséget, hasznos energiatartalmat és inverterkompatibilitást is meg kell vizsgálnod.");},
o03:b=>{const r=pick([0.1,0.15,0.22,0.33,0.47,0.68,1]),i=pick([10,20,30,40,50,75,100]);const v=r*i;return task(b,"Egy "+fmt(r)+" kΩ-os ellenálláson "+i+" mA folyik. Mekkora feszültség mérhető rajta?",v,"V","R = "+fmt(r*1000)+" Ω; I = "+fmt(i/1000,3)+" A; U = I·R = "+fmt(v)+" V.",[v/2,v*2,v+1]);},
o04:b=>{const i=pick([0.1,0.2,0.25,0.4,0.5,0.8]),r=pick([40,60,80,100,120,150,200]),u=i*r;return task(b,"Egy "+fmt(u)+" V-os táplálású ellenálláson "+fmt(i)+" A folyik. Mekkora az ellenállás?",r,"Ω","R = U/I = "+fmt(u)+"/"+fmt(i)+" = "+r+" Ω.",[r/2,r*2,r+i]);},
o05:b=>{const u=pick([110,220,230,240]),i=pick([0.1,0.2,0.25,0.3,0.4,0.5]),p=u*i;return task(b,"Egy "+u+" V-os, "+fmt(p)+" W-os névleges izzó mekkora áramot vesz fel névleges üzemben?",i,"A","I = P/U = "+fmt(p)+"/"+u+" = "+fmt(i)+" A.",[i*2,i/2,i+0.1]);},
o06:b=>{const r=pick([20,40,50,80,100,125,200]),u=pick([100,120,200,220,230,240]),p=u*u/r;return task(b,"Egy "+r+" Ω-os ohmos melegítőt "+u+" V-ra kötünk. Mennyi a felvett teljesítmény?",p,"W","P = U²/R = "+u+"²/"+r+" = "+fmt(p)+" W.",[p/2,p*2,p+100]);},
o07:b=>{const r=pick([20,40,50,80,100,125,200]),u=pick([100,120,200,220,230,240]),i=u/r;return task(b,"Egy "+r+" Ω-os fogyasztó "+u+" V-os forráshoz csatlakozik. A vezeték ellenállását elhanyagolva mekkora a számított áram?",i,"A","I = U/R = "+u+"/"+r+" = "+fmt(i)+" A.",[i/2,i*2,i+1]);},
o08:b=>wire(b,true),o09:b=>{const len=pick([100,200,500,800,1000]),a=pick([1,1.5,2,2.5,4]),i=pick([1,2,3,4,5]),rho=.0175,r=rho*len/a,drop=i*r;return task(b,"Egy "+len+" m hosszú rézvezető egyetlen erén "+i+" A folyik; A = "+fmt(a)+" mm², ρ = 0,0175 Ω·mm²/m. Mennyi az egy szálon eső feszültség?",drop,"V","R = 0,0175 · "+len+"/"+fmt(a)+" = "+fmt(r,3)+" Ω; ΔU = "+i+" · "+fmt(r,3)+" = "+fmt(drop,3)+" V.",[drop/2,drop*2,drop+i]);},
o10:b=>{const e=pick([6,9,12,18,24]),r=pick([2,4,5,8,10,15]),rb=pick([.5,1,2,3]),i=e/(r+rb);return task(b,"Egy "+e+" V elektromotoros erejű telep "+r+" Ω-os terhelésén "+fmt(i,3)+" A folyik. Mennyi a telep belső ellenállása (a közölt áramot pontosnak tekintve)?",rb,"Ω","R_b = E/I − R_k = "+e+"/"+fmt(i,3)+" − "+r+" ≈ "+fmt(rb)+" Ω.",[rb*2,rb/2,rb+r]);},
o11:b=>{const i=pick([.2,.25,.5,1,2,3]),r=pick([.1,.2,.4,.5,1,2]),v=i*r;return task(b,"Egy elem belső ellenállása "+fmt(r)+" Ω, a köráram "+fmt(i)+" A. Mennyi a belső feszültségesés?",v,"V","U_b = I·R_b = "+fmt(i)+" · "+fmt(r)+" = "+fmt(v)+" V.",[v/2,v*2,v+1]);},
o12:b=>{const r=pick([40,50,60,76,80,100]),delta=pick([100,160,200,300,360]),alpha=pick([.0002,.00025,.0003]),end=20+delta,result=r*(1+alpha*delta);return task(b,"Egy "+r+" Ω-os fűtőszál ellenállását 20 °C-ról "+end+" °C-ra melegítjük; α = "+fmt(alpha,5)+" 1/°C. Mekkora a közelítő ellenállása?",result,"Ω","R = R₂₀·[1+α·ΔT] = "+r+" · [1+"+fmt(alpha,5)+" · "+delta+"] = "+fmt(result)+" Ω.",[r,result*2,result/2]);},
o13:b=>{const c1=pick([2,3,4,6,8,10]),c2=pick([4,6,8,12,15,20]),result=c1*c2/(c1+c2);return task(b,"Két kondenzátort ("+c1+" µF és "+c2+" µF) sorba kötünk. Mennyi az eredő kapacitás?",result,"µF","Cₑ = C₁·C₂/(C₁+C₂) = "+c1+" · "+c2+"/"+(c1+c2)+" ≈ "+fmt(result)+" µF.",[c1+c2,Math.min(c1,c2),result*2]);},
o14:b=>{const c1=pick([2,4,6,8]),c2=pick([3,6,12,16]),q=pick([2,4,6,8,10]),ce=c1*c2/(c1+c2),v=q/ce;return task(b,"Két soros kondenzátor ("+c1+" µF és "+c2+" µF) összesen "+q+" µC töltéssel rendelkezik. Mekkora a teljes feszültség ideális esetben?",v,"V","Cₑ = "+c1+" · "+c2+"/"+(c1+c2)+" ≈ "+fmt(ce,3)+" µF; U = Q/Cₑ = "+q+"/"+fmt(ce,3)+" ≈ "+fmt(v)+" V.",[v/2,v*2,v+1]);},
o15:b=>{const di=pick([.5,1,2,3]),dt=pick([.1,.2,.4,.5,1]),l=pick([.05,.1,.2,.5,1]),u=l*di/dt;return task(b,"Egy tekercs "+fmt(di)+" A-es áramváltozása "+fmt(dt)+" s alatt "+fmt(u)+" V önindukciós feszültséget okoz. Mennyi az induktivitás?",l,"H","L = |u|·Δt/ΔI = "+fmt(u)+" · "+fmt(dt)+"/"+fmt(di)+" = "+fmt(l)+" H.",[l/2,l*2,l+1]);},
o16:b=>{const h=pick([10,20,25,40,50,100,200,250]),t=1/h;return task(b,"Egy szinuszos váltakozó feszültség periódusideje "+fmt(t,4)+" s. Mennyi a frekvenciája?",h,"Hz","f = 1/T = 1/"+fmt(t,4)+" = "+h+" Hz.",[h/2,h*2,h+50]);},
o17:b=>{const eff=pick([50,100,120,200,230,300,400]),peak=eff*Math.SQRT2;return task(b,"Egy szinuszos feszültség csúcsértéke közelítőleg "+fmt(peak,2)+" V. Mennyi az effektív értéke (egész voltra kerekítve)?",eff,"V","U_eff = U_max/√2 = "+fmt(peak,2)+"/√2 ≈ "+eff+" V.",[eff/2,eff*2,eff*Math.SQRT2]);},
o18:b=>{const l=pick([.2,.4,.5,.8,1]),freq=pick([10,20,25,50,60,100]),x=2*Math.PI*freq*l;return task(b,"Egy "+fmt(l)+" H induktivitású ideális tekercs reaktanciája közelítőleg "+fmt(x,2)+" Ω. Mekkora a frekvenciája (egész Hz-re kerekítve)?",freq,"Hz","f = X_L/(2πL) = "+fmt(x,2)+"/(2π · "+fmt(l)+") ≈ "+freq+" Hz.",[freq/2,freq*2,freq+10]);},
o20:b=>{const c=pick([2,4,5,8,10,20]),freq=pick([25,50,60,100,200]),xc=1/(2*Math.PI*freq*c*1e-6);return task(b,"Mekkora egy ideális "+c+" µF-os kondenzátor kapacitív reaktanciája "+freq+" Hz-en (közelítőleg)?",xc,"Ω","X_C = 1/(2πfC) = 1/(2π · "+freq+" · "+c+" · 10⁻⁶) ≈ "+fmt(xc)+" Ω.",[xc/2,xc*2,xc+100]);},
o21:b=>{const u=pick([110,220,230,240]),i=pick([5,10,15,20,30,40]),pf=pick([.6,.7,.8,.85,.9,1]),p=u*i*pf;return task(b,"Egy egyfázisú "+u+" V-os gép "+i+" A-t vesz fel, cosφ = "+fmt(pf)+". Mekkora a hatásos villamos teljesítménye?",p,"W","P = U·I·cosφ = "+u+" · "+i+" · "+fmt(pf)+" = "+fmt(p)+" W.",[u*i,p/2,p*2]);},
o22:b=>{const p=pick([750,900,1200,1500,1800,2200]),eta=pick([.6,.75,.8,.85,.9]),pin=p/eta;return task(b,"Egy motor "+p+" W mechanikai teljesítményt ad le, hatásfoka "+fmt(eta*100)+"%. Mennyi a villamos bemenő hatásos teljesítménye (közelítőleg)?",pin,"W","P_be = P_ki/η = "+p+"/"+fmt(eta)+" ≈ "+fmt(pin)+" W.",[p,p*eta,pin*2]);},
o23:b=>{const p=pick([.75,1,1.5,2,2.5,3]),h=pick([2,4,6,8,10]),energy=p*h;return task(b,"Egy motor "+fmt(p)+" kW bemenő hatásos teljesítménnyel "+h+" órán át dolgozik. Mennyi energiát fogyaszt?",energy,"kWh","E = P_be·t = "+fmt(p)+" · "+h+" = "+fmt(energy)+" kWh.",[energy/2,energy*2,energy+p]);},
o24:b=>{const r=pick([30,40,50,60,80]),x=pick([40,60,80,100]),u=pick([100,120,200,230]),z=Math.hypot(r,x),amps=u/z;return task(b,"Soros R–L körben R = "+r+" Ω, X_L = "+x+" Ω és U = "+u+" V effektív. Mekkora a kör árama (közelítőleg)?",amps,"A","Z = √("+r+"²+"+x+"²) ≈ "+fmt(z)+" Ω; I = "+u+"/"+fmt(z)+" ≈ "+fmt(amps)+" A.",[amps/2,amps*2,u/r]);},
os08:b=>{const u=pick([230,400,690]),i=pick([5,10,15,20,25]),sn=Math.sqrt(3)*u*i;return task(b,"Egy háromfázisú transzformátor névleges látszólagos teljesítménye közelítőleg "+fmt(sn/1000,3)+" kVA, vonali szekunder feszültsége "+u+" V. Mekkora a névleges vonali áram (egész A-ra kerekítve)?",i,"A","I₂n = S/(√3·U) ≈ "+fmt(sn/1000,3)+" kVA / (√3 · "+u+" V) ≈ "+i+" A.",[i/2,i*2,i+5]);},
os10:b=>{const p=pick([2,4,6,8,10,12]),freq=pick([50,60]),ns=120*freq/p;return task(b,"Egy "+freq+" Hz-es, "+p+" pólusú aszinkronmotor szinkron fordulatszáma mennyi?",ns,"1/min","nₛ = 120·f/p = 120 · "+freq+"/"+p+" = "+ns+" 1/min.",[ns/2,ns*2,ns+250]);},
os11:b=>f.g2(b),
os15:b=>{const len=pick([20,30,40,50]),r=pick([.1,.15,.2,.25,.4]),factor=pick([2,3,4]),total=r*factor;return task(b,"Egy "+len+" m hosszú vezető ellenállása "+fmt(r)+" Ω. Azonos anyag és keresztmetszet mellett mekkora az ellenállás "+(len*factor)+" m hosszúságnál?",total,"Ω","R₂ = R₁·l₂/l₁ = "+fmt(r)+" · "+factor+" = "+fmt(total)+" Ω.",[r,total/2,total*2]);},
os16:b=>{const p=pick([3,5,6,8,9,12]),q=pick([4,5,8,12,15,16]),sn=Math.hypot(p,q);return task(b,"Egy háromfázisú fogyasztó hatásos teljesítménye "+p+" kW, meddő teljesítménye "+q+" kvar. Mennyi a látszólagos teljesítménye (közelítőleg)?",sn,"kVA","S = √(P²+Q²) = √("+p+"²+"+q+"²) ≈ "+fmt(sn)+" kVA.",[p+q,sn/2,sn*2]);}
};
function wire(b,isShort){
 const distance=pick([10,15,20,25,30,40]),area=pick([1,1.5,2.5,4,6]),i=pick([4,6,8,10,12,16]),len=distance*2;
 const r=.0175*len/area,du=r*i;
 return task(b,"Egy "+distance+" m hosszú rézvezetékpáron (oda-vissza "+len+" m) "+i+" A folyik. A = "+fmt(area)+" mm², ρ = 0,0175 Ω·mm²/m. Mekkora a közelítő feszültségesés?",du,"V","R = 0,0175 · "+len+"/"+fmt(area)+" = "+fmt(r,3)+" Ω; ΔU = "+i+" · "+fmt(r,3)+" ≈ "+fmt(du)+" V.",[du/2,du*2,du+i]);
}
function threePower(b,name,unity=false){
 const u=pick([230,400,690]),i=pick([5,8,10,12,16,20]),pf=unity?1:pick([.6,.75,.8,.85,.9]),p=Math.sqrt(3)*u*i*pf/1000;
 return task(b,"Egy szimmetrikus, háromfázisú "+name+" "+u+" V vonali feszültségről "+i+" A vonali áramot vesz fel, cosφ = "+fmt(pf)+". Mekkora a felvett hatásos teljesítmény (közelítőleg)?",p,"kW","P = √3·U·I·cosφ = √3 · "+u+" · "+i+" · "+fmt(pf)+" ≈ "+fmt(p)+" kW.",[p/2,p*2,p+1]);
}
function loop(b){
 const ia=pick([25,40,50,80,100,125,160]),z=230/ia;
 return task(b,"TN-rendszerű, 230 V-os végáramkörben a szükséges kioldóáram "+ia+" A. Az egyszerűsített Zₛ ≤ U₀/Iₐ feltétel szerint mennyi a legnagyobb hurokimpedancia?",z,"Ω","Zₛ,max = 230/"+ia+" ≈ "+fmt(z,3)+" Ω. A szabvány szerinti ellenőrzés további feltételeket tartalmaz.",[z/2,z*2,z+1]);
}
function recent(id){
 try{return JSON.parse(localStorage.getItem("elektrovizsga-numeric-history-v1")||"{}")[id]||[];}catch{return [];}
}
function save(id,key){
 try{const all=JSON.parse(localStorage.getItem("elektrovizsga-numeric-history-v1")||"{}");all[id]=[key,...(all[id]||[]).filter(x=>x!==key)].slice(0,8);localStorage.setItem("elektrovizsga-numeric-history-v1",JSON.stringify(all));}catch{}
}
function vary(base){
 if(!f[base.id])return {...base};
 const previous=recent(base.id);
 let candidate,key;
 for(let i=0;i<120;i++){
  candidate=f[base.id](base);key=candidate.q;
  if(!previous.includes(key))break;
 }
 if(previous.includes(key))return {...base};
 save(base.id,key);
 return candidate;
}
global.ElektroVariations={vary,supportedIds:Object.keys(f)};
})(window);
