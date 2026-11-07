/* ElektroVizsga – Supabase e-mail OTP login. Public anon key only; never put service-role keys in this file. */
(function(){
"use strict";
const cfg=window.ELEKTRO_AUTH_CONFIG||{};
let client=null, initialized=false, session=null;
const listeners=new Set();
function available(){return Boolean(cfg.url&&cfg.anonKey&&window.supabase?.createClient)}
function init(){
 if(initialized)return client;initialized=true;
 if(!available())return null;
 client=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}});
 client.auth.onAuthStateChange((event,next)=>{session=next;listeners.forEach(fn=>fn(session))});
 client.auth.getSession().then(({data,error})=>{if(!error){session=data.session;listeners.forEach(fn=>fn(session))}});
 return client;
}
window.ElektroAuth={
 init,available,
 getClient(){return init()},
 getUser(){return session?.user||null},
 onChange(fn){listeners.add(fn);return ()=>listeners.delete(fn)},
 async sendLink(email){const c=init();if(!c)throw Error("Az e-mailes belépés szerveroldali beállítása még hiányzik.");const {error}=await c.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin+window.location.pathname,shouldCreateUser:true}});if(error)throw error},
 async getProfile(){const c=init();if(!c||!session?.user)return null;const {data,error}=await c.from("learner_profiles").select("username").eq("user_id",session.user.id).maybeSingle();if(error)throw error;return data},
 async saveUsername(rawName){const c=init();if(!c||!session?.user)throw Error("Előbb jelentkezz be e-maillel.");const username=String(rawName||"").trim();if(!/^[A-Za-z0-9_]{3,24}$/.test(username))throw Error("A felhasználónév 3–24 karakteres lehet: betű, szám vagy aláhúzás.");const existing=await this.getProfile();const operation=existing?c.from("learner_profiles").update({username}).eq("user_id",session.user.id):c.from("learner_profiles").insert({user_id:session.user.id,username});const {error}=await operation;if(error){if(error.code==="23505")throw Error("Ez a felhasználónév már foglalt.");throw error}return username},
 async signOut(){const c=init();if(!c)return;const {error}=await c.auth.signOut();if(error)throw error;session=null;listeners.forEach(fn=>fn(session))},
 async saveAttempt(record){const c=init();if(!c||!session?.user)return false;const {error}=await c.from("exam_attempts").insert({user_id:session.user.id,score:record.score,total:record.total,topic:record.topic,answers:record.answers,created_at:new Date().toISOString()});if(error)throw error;return true},
 async history(){const c=init();if(!c||!session?.user)return[];const {data,error}=await c.from("exam_attempts").select("id,score,total,topic,answers,created_at").eq("user_id",session.user.id).order("created_at",{ascending:false}).limit(200);if(error)throw error;return data||[]}
};
})();