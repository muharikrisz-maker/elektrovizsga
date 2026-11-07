import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const ORIGIN="https://muharikrisz-maker.github.io";
const headers=(req:Request)=>({
  "Access-Control-Allow-Origin":ORIGIN,
  "Access-Control-Allow-Methods":"POST, OPTIONS",
  "Access-Control-Allow-Headers":"authorization, apikey, content-type, x-client-info",
  "Content-Type":"application/json; charset=utf-8",
  "Vary":"Origin",
});
const reply=(req:Request,body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:headers(req)});
Deno.serve(async req=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:headers(req)});
  if(req.method!=="POST") return reply(req,{error:"Nem támogatott kérés."},405);
  if(req.headers.get("Origin") && req.headers.get("Origin")!==ORIGIN) return reply(req,{error:"Nem engedélyezett webhely."},403);
  const token=req.headers.get("Authorization")?.replace(/^Bearer\s+/i,"");
  if(!token) return reply(req,{error:"Jelentkezz be."},401);
  const url=Deno.env.get("SUPABASE_URL"), pub=Deno.env.get("SUPABASE_ANON_KEY"), secret=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if(!url||!pub||!secret) return reply(req,{error:"A biztonságos kulcstárolás szerveroldali beállítása hiányzik."},503);
  const auth=createClient(url,pub,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:{user},error:err}=await auth.auth.getUser(token);
  if(err||!user) return reply(req,{error:"A bejelentkezés lejárt."},401);
  let input:{action?:string;key?:string}={};
  try{input=await req.json()}catch{return reply(req,{error:"Érvénytelen kérés."},400)}
  const admin=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
  if(input.action==="status"){
    const {data,error}=await admin.rpc("ai_key_status",{p_user:user.id});
    if(error)return reply(req,{error:"Nem sikerült lekérdezni a kulcsállapotot."},503);
    return reply(req,{connected:Boolean(data)});
  }
  if(input.action==="disconnect"){
    const {error}=await admin.rpc("ai_key_delete",{p_user:user.id});
    if(error)return reply(req,{error:"Nem sikerült leválasztani a kulcsot."},503);
    return reply(req,{connected:false});
  }
  if(input.action==="connect"){
    const key=String(input.key||"").trim();
    if(!/^sk-[A-Za-z0-9_-]{16,380}$/.test(key))return reply(req,{error:"Érvénytelen OpenAI API-kulcs formátum."},400);
    // Verify the key at OpenAI directly; never log or return its value.
    let check:Response;
    try{check=await fetch("https://api.openai.com/v1/models",{
      headers:{Authorization:"Bearer "+key},signal:AbortSignal.timeout(12000),
    })}catch{return reply(req,{error:"Nem sikerült ellenőrizni az API-kulcsot."},503)}
    if(check.status===401)return reply(req,{error:"Az OpenAI elutasította az API-kulcsot."},400);
    if(!check.ok&&check.status!==403)return reply(req,{error:"A kulcs ellenőrzése nem sikerült. Próbáld újra."},503);
    // A restricted key may return 403 for model listing but still work on Responses API.
    const {error}=await admin.rpc("ai_key_store",{p_user:user.id,p_secret:key});
    if(error)return reply(req,{error:"A titkosított kulcsmentés nem sikerült."},503);
    return reply(req,{connected:true});
  }
  return reply(req,{error:"Ismeretlen művelet."},400);
});