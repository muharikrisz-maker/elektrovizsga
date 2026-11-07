/* ElektroVizsga – OKTÁV-alapú, változatos, egyszer használatos számítási feladatok. */
(function(){
"use strict";
const random=(min,max)=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return min+a[0]%(max-min+1)};
const pick=a=>a[random(0,a.length-1)];
const fmt=x=>new Intl.NumberFormat("hu-HU",{maximumFractionDigits:2}).format(x);
const exercises=[
 "current_ur","voltage_ir","resistance_ui","power_ui","power_ur","power_ir",
 "current_pu","resistance_up","energy_pt","time_ep","battery","series",
 "parallel","voltage_drop","internal_resistance","heated_resistance"
];
const recentSession=[];
function createQuestion(type){
 const load=pick(["egy műhely mérőpadján","egy szerelőasztalon","egy vezérlőszekrény próbakörében","egy laboratóriumi kísérlet során"]);
 const ohms=pick([10,12,15,20,25,30,40,50,60,75,80,100,120,150,200]);
 const current=pick([0.2,0.4,0.5,0.8,1,1.2,1.5,2,2.5,3,4,5,6,8,10]);
 const volts=pick([6,9,12,18,24,30,36,48,60,90,110,120,180,200,220,230]);
 let q,why,answer,unit,signatureParts;
 const set=(question,value,u,solution,parts)=>{q=question;answer=value;unit=u;why=solution;signatureParts=parts};
 switch(type){
 case "current_ur":{
  const u=pick([12,24,36,48,60,90,120,180,230]),r=ohms;
  set("Egy "+r+" Ω-os ohmos fogyasztó kapcsain "+u+" V-ot mérsz "+load+". Mekkora áram folyik rajta?",u/r,"A",
  "Ohm törvénye alapján I = U/R = "+u+"/"+r+" = "+fmt(u/r)+" A.",[u,r]);break;
 }
 case "voltage_ir":{
  const i=current,r=ohms;
  set("Méréskor "+fmt(i)+" A áram halad át egy "+r+" Ω-os ellenálláson. Mekkora feszültség esik rajta?",i*r,"V",
  "U = I·R = "+fmt(i)+"·"+r+" = "+fmt(i*r)+" V.",[i,r]);break;
 }
 case "resistance_ui":{
  const r=ohms,i=current,u=r*i;
  set("Egy ismeretlen ellenálláson "+fmt(u)+" V feszültséget és "+fmt(i)+" A áramot mérsz. Mekkora az ellenállása?",r,"Ω",
  "R = U/I = "+fmt(u)+"/"+fmt(i)+" = "+r+" Ω.",[u,i]);break;
 }
 case "power_ui":{
  const u=pick([12,24,48,110,220,230]),i=current;
  set("Egy tisztán ohmos fogyasztón "+u+" V feszültség mellett "+fmt(i)+" A áram folyik. Mekkora a felvett teljesítménye?",u*i,"W",
  "P = U·I = "+u+"·"+fmt(i)+" = "+fmt(u*i)+" W.",[u,i]);break;
 }
 case "power_ur":{
  const u=pick([12,24,48,120,220,230]),r=ohms;
  set("Egy "+r+" Ω-os fűtőellenállásra "+u+" V egyenfeszültséget kapcsolunk. Mekkora teljesítményt ad le ideális, állandó ellenállás mellett?",u*u/r,"W",
  "P = U²/R = "+u+"²/"+r+" = "+fmt(u*u/r)+" W.",[u,r]);break;
 }
 case "power_ir":{
  const i=current,r=ohms;
  set("Egy "+r+" Ω-os ellenállású terhelésen "+fmt(i)+" A áram folyik. Mennyi a hővé alakuló villamos teljesítmény?",i*i*r,"W",
  "P = I²·R = "+fmt(i)+"²·"+r+" = "+fmt(i*i*r)+" W.",[i,r]);break;
 }
 case "current_pu":{
  const u=pick([12,24,48,120,220,230]),i=pick([0.5,1,1.5,2,3,4,5,6,8,10]),p=u*i;
  set("Egy "+u+" V-os ohmos készülék adattábláján "+fmt(p)+" W szerepel. Mekkora a névleges árama?",i,"A",
  "I = P/U = "+fmt(p)+"/"+u+" = "+fmt(i)+" A.",[p,u]);break;
 }
 case "resistance_up":{
  const u=pick([12,24,48,120,220,230]),r=ohms,p=u*u/r;
  set("Egy "+u+" V-ra méretezett tisztán ohmos fogyasztó teljesítménye "+fmt(p)+" W. Mekkora az üzemi ellenállása?",r,"Ω",
  "R = U²/P = "+u+"²/"+fmt(p)+" = "+r+" Ω.",[u,r]);break;
 }
 case "energy_pt":{
  const p=pick([250,400,500,750,800,1000,1200,1500,1800,2000,2400]),t=pick([0.5,1,1.5,2,3,4,5,6]);
  set("Egy "+p+" W-os elektromos fűtőtest "+fmt(t)+" órán keresztül névleges teljesítményen működik. Mennyi energiát fogyaszt?",p*t/1000,"kWh",
  "P = "+fmt(p/1000)+" kW; E = P·t = "+fmt(p/1000)+"·"+fmt(t)+" = "+fmt(p*t/1000)+" kWh.",[p,t]);break;
 }
 case "time_ep":{
  const p=pick([400,500,750,1000,1200,1500,2000]),t=pick([1,2,3,4,5,6]),e=p*t/1000;
  set("Egy "+p+" W-os villamos melegítő "+fmt(e)+" kWh energiát használ fel állandó teljesítménnyel. Mennyi ideig működött?",t,"h",
  "P = "+fmt(p/1000)+" kW; t = E/P = "+fmt(e)+"/"+fmt(p/1000)+" = "+t+" h.",[p,t]);break;
 }
 case "battery":{
  const i=pick([0.2,0.5,1,2,4,5,8,10,12]),t=pick([2,3,4,5,6,8,10]),ah=i*t;
  set("Egy "+fmt(ah)+" Ah névleges kapacitású akkumulátort állandó "+fmt(i)+" A-rel terhelünk. Ideális számításban mennyi az üzemidő?",t,"h",
  "t = kapacitás/áram = "+fmt(ah)+"/"+fmt(i)+" = "+t+" h. Valós üzemben a kapacitás és veszteségek módosíthatják.",[i,t]);break;
 }
 case "series":{
  const r1=pick([10,15,20,25,30,40,50,75,100]),r2=pick([10,15,20,25,30,40,50,75,100]);
  set("Két fűtőellenállás ("+r1+" Ω és "+r2+" Ω) soros kapcsolásba kerül. Mennyi az eredő ellenállás?",r1+r2,"Ω",
  "Soros kapcsolásnál Rₑ = R₁+R₂ = "+r1+"+"+r2+" = "+(r1+r2)+" Ω.",[r1,r2]);break;
 }
 case "parallel":{
  const r=pick([20,30,40,50,60,80,100,120,150,200]);
  set("Egy próbapadon két azonos, "+r+" Ω-os ellenállást párhuzamosan kapcsolnak. Mennyi az eredő ellenállás?",r/2,"Ω",
  "Két azonos ellenállás párhuzamosan: Rₑ = R/2 = "+r+"/2 = "+fmt(r/2)+" Ω.",[r]);break;
 }
 case "voltage_drop":{
  const length=pick([10,15,20,25,30,40,50]),area=pick([1,1.5,2.5,4,6]),i=pick([2,4,5,6,8,10,12,16]);
  const delta=0.0175*2*length*i/area;
  set("Egy "+length+" m hosszú, "+fmt(area)+" mm² keresztmetszetű réz tápkábelen "+i+" A folyik (egyfázisú oda-vissza áramút). ρ = 0,0175 Ω·mm²/m. Mekkora a közelítő feszültségesés?",delta,"V",
  "Az áramút 2·"+length+" = "+2*length+" m. R = ρ·l/A = 0,0175·"+2*length+"/"+fmt(area)+" Ω; ΔU = I·R = "+fmt(delta)+" V.",[length,area,i]);break;
 }
 case "internal_resistance":{
  const e=pick([6,9,12,18,24]),i=pick([0.5,1,1.5,2,3]),rb=pick([0.2,0.5,1,1.5,2]),u=e-i*rb;
  set("Egy "+e+" V elektromotoros erejű áramforrás "+fmt(i)+" A terhelőáramnál "+fmt(u)+" V kapocsfeszültséget ad. Mekkora a belső ellenállása?",rb,"Ω",
  "A belső feszültségesés "+fmt(e-u)+" V. R_b = (E−U_k)/I = ("+e+"−"+fmt(u)+")/"+fmt(i)+" = "+fmt(rb)+" Ω.",[e,i,rb]);break;
 }
 case "heated_resistance":{
  const r20=pick([20,30,40,50,60,76,80,100]),temp=pick([120,220,320,420]),alpha=0.00025;
  const result=r20*(1+alpha*(temp-20));
  set("Egy fűtőszál ellenállása 20 °C-on "+r20+" Ω. Az üzemi hőmérséklet "+temp+" °C, α = 0,00025 1/°C (állandónak véve). Mekkora a meleg ellenállás?",result,"Ω",
  "R = R₂₀·[1+α·(T−20)] = "+r20+"·[1+0,00025·"+(temp-20)+"] = "+fmt(result)+" Ω.",[r20,temp]);break;
 }
 default: throw Error("Ismeretlen feladattípus");
 }
 const signature="oktav-v2|"+type+"|"+signatureParts.join("|");
 return {signature,type,q,why,answer,unit,topic:"Villamos hálózatok",source:"OKTÁV feladattípus alapján szerkesztett, új számítási feladat"};
}
async function recentTypes(client,userId){
 // A korábbi típusokat az adatbázisból olvassuk: friss böngészőből belépve sem indul mindig ugyanaz.
 const {data,error}=await client.from("generated_questions").select("signature")
   .eq("user_id",userId).order("created_at",{ascending:false}).limit(8);
 if(error)return recentSession.slice();
 return (data||[]).map(x=>String(x.signature||"").split("|")[1]).filter(x=>exercises.includes(x));
}
function chooseType(recent){
 const lastFive=recent.slice(0,5);
 const eligible=exercises.filter(t=>!lastFive.includes(t));
 return pick(eligible.length?eligible:exercises);
}
async function next(){
 const auth=window.ElektroAuth,user=auth?.getUser();
 if(!user)throw Error("A feladatok ismétlésmentes tárolásához jelentkezz be a tanulói fiókodba.");
 const client=auth.getClient();
 if(!client)throw Error("A Supabase-kapcsolat nem érhető el.");
 const recently=await recentTypes(client,user.id);
 for(let attempt=0;attempt<35;attempt++){
  const type=chooseType([...recentSession,...recently]);
  const question=createQuestion(type);
  const {data,error}=await client.from("generated_questions")
   .insert({user_id:user.id,signature:question.signature,topic:"Ohm-törvény és alkalmazásai",question})
   .select("id").single();
  if(!error){recentSession.unshift(type);if(recentSession.length>8)recentSession.pop();return {...question,id:data.id};}
  if(error.code==="23505")continue;
  throw Error("A feladat mentése nem sikerült: "+error.message);
 }
 throw Error("Most nem sikerült új feladatot találni. Próbáld újra.");
}
async function submit(q,rawAnswer){
 const user=window.ElektroAuth?.getUser();
 if(!user)throw Error("A mentéshez jelentkezz be.");
 const trimmed=String(rawAnswer||"").trim();
 const parsed=Number(trimmed.replace(/\s/g,"").replace(",","."));
 if(!trimmed||!Number.isFinite(parsed))throw Error("Érvényes számot adj meg.");
 const correct=Math.abs(parsed-q.answer)<=Math.max(0.011,Math.abs(q.answer)*0.001);
 const {data,error}=await window.ElektroAuth.getClient().from("generated_questions")
  .update({answer_text:trimmed,is_correct:correct,answered_at:new Date().toISOString()})
  .eq("id",q.id).eq("user_id",user.id).is("answered_at",null).select("id").maybeSingle();
 if(error)throw Error("A válasz mentése nem sikerült: "+error.message);
 if(!data)throw Error("Ezt a feladatot már megválaszoltad.");
 return {correct,why:q.why};
}
window.ElektroGenerator={next,submit};
})();
