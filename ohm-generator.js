/* ElektroVizsga – ellenőrzött, egyszer használatos Ohm-törvény feladatok. */
(function() {
  "use strict";
  const random=(min,max)=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return min+a[0]%(max-min+1)};
  const fmt=x=>new Intl.NumberFormat("hu-HU",{maximumFractionDigits:2}).format(x);
  function createQuestion() {
    const type=random(0,3), u=random(12,240), i=random(1,20), r=random(2,100);
    const scenes=[
      "egy laboratóriumi mérőpadon",
      "egy kisfeszültségű egyenáramú áramkörben",
      "egy műhelyben végzett mérés során",
      "egy ellenállásos próbakapcsoláson"
    ];
    const sceneIndex=random(0,scenes.length-1), scene=scenes[sceneIndex];
    let answer, unit, q, why, signature;
    if(type===0) {
      answer=u/r;unit="A";
      q="Egy "+r+" Ω-os ellenállás két kapcsa között "+u+" V feszültséget mérsz "+scene+". Mekkora áram folyik az ellenálláson?";
      why="Ohm törvénye: I = U / R = "+u+" / "+r+" = "+fmt(answer)+" A.";
      signature="I|"+u+"|"+r;
    } else if(type===1) {
      answer=i*r;unit="V";
      q="Egy "+r+" Ω-os ellenálláson "+i+" A áram folyik "+scene+". Mekkora a rajta eső feszültség?";
      why="U = I · R = "+i+" × "+r+" = "+fmt(answer)+" V.";
      signature="U|"+i+"|"+r;
    } else if(type===2) {
      answer=u/i;unit="Ω";
      q="Egy ismeretlen ohmos ellenálláson "+u+" V feszültséget és "+i+" A áramot mérsz "+scene+". Mekkora az ellenállás?";
      why="R = U / I = "+u+" / "+i+" = "+fmt(answer)+" Ω.";
      signature="R|"+u+"|"+i;
    } else {
      answer=i*i*r;unit="W";
      q="Egy "+r+" Ω-os ohmos ellenálláson "+i+" A áram folyik "+scene+". Mekkora teljesítmény disszipálódik rajta?";
      why="P = I² · R = "+i+"² × "+r+" = "+fmt(answer)+" W.";
      signature="P|"+i+"|"+r;
    }
    const candidates=[answer,answer*2,answer/2,answer*1.5].map(x=>fmt(x)+" "+unit);
    // Kerekítés miatt egybeeső opcióknál újra generálunk.
    if(new Set(candidates).size!==4)return createQuestion();
    const right=candidates[0];
    for(let k=candidates.length-1;k>0;k--){const j=random(0,k);[candidates[k],candidates[j]]=[candidates[j],candidates[k]];}
    return {signature,q,opts:candidates,a:candidates.indexOf(right),why,topic:"Villamos hálózatok",source:"Új, számítással ellenőrzött Ohm-törvény feladat",answer,unit};
  }
  async function next() {
    const auth=window.ElektroAuth, user=auth?.getUser();
    if(!user) throw Error("A feladatok ismétlésmentes tárolásához jelentkezz be a tanulói fiókodba.");
    const client=auth.getClient();
    if(!client)throw Error("A Supabase-kapcsolat nem érhető el.");
    // Az egyedi (user_id,signature) korlát adatbázis-szinten is megakadályozza az ismétlést.
    for(let attempt=0;attempt<25;attempt++){
      const question=createQuestion();
      const {data,error}=await client.from("generated_questions")
        .insert({user_id:user.id,signature:question.signature,topic:"Ohm-törvény",question})
        .select("id").single();
      if(!error)return {...question,id:data.id};
      if(error.code==="23505")continue;
      throw Error("A feladat mentése nem sikerült: "+error.message);
    }
    throw Error("Most nem sikerült új, korábban nem látott feladatot találni. Próbáld újra.");
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