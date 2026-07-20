const SUPABASE_URL='https://bepoprqexssswjhsetzr.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_zR7gYUeMpgrF68uRdOX-ow_QdgxIZ-U';
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const $=id=>document.getElementById(id);
let currentUser=null;
function setSync(text){const el=$('syncStatus');if(el)el.textContent=text}
function mondayOf(d=new Date()){const x=new Date(d);const day=x.getDay();x.setDate(x.getDate()+((day===0?-6:1)-day));x.setHours(12,0,0,0);return x}
function firstOfMonth(d=new Date()){return new Date(d.getFullYear(),d.getMonth(),1,12)}
function isoDate(d){return d.toISOString().slice(0,10)}
function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x}
function addMonths(d,n){const x=new Date(d);x.setMonth(x.getMonth()+n,1);return x}
function weekLabel(date){return 'Week of '+new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric'}).format(new Date(date+'T12:00:00'))}
function monthLabel(date){return new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'}).format(new Date(date+'T12:00:00'))}
function linesToObject(text){const obj={};String(text||'').split('\n').map(x=>x.trim()).filter(Boolean).forEach(line=>{const p=line.split('|');const name=(p[0]||'').trim();const hours=Number((p[1]||'0').trim());if(name)obj[name]=Number.isFinite(hours)?hours:0});return obj}
function objectToLines(obj){return Object.entries(obj||{}).map(([k,v])=>`${k} | ${v}`).join('\n')}
function sumObject(obj){return Object.values(obj||{}).reduce((a,b)=>a+(Number(b)||0),0)}
async function signOut(){await db.auth.signOut();location.reload()}
async function requireAuth(onReady){const auth=$('authScreen'),form=$('loginForm'),error=$('authError');form?.addEventListener('submit',async e=>{e.preventDefault();error.textContent='';const btn=form.querySelector('button');btn.disabled=true;btn.textContent='Signing in…';const{data, error:err}=await db.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value});btn.disabled=false;btn.textContent='Sign in';if(err){error.textContent=err.message;return}currentUser=data.user;auth.classList.add('hidden');$('userEmail')&&($('userEmail').textContent=currentUser.email||'');await onReady()});$('logoutBtn')?.addEventListener('click',signOut);const{data:{session}}=await db.auth.getSession();if(session){currentUser=session.user;auth?.classList.add('hidden');$('userEmail')&&($('userEmail').textContent=currentUser.email||'');await onReady()}else{auth?.classList.remove('hidden')}}
function authMarkup(){return `<div class="auth-screen" id="authScreen"><form class="auth-card" id="loginForm"><div class="eyebrow">NoLie Leadership Hub</div><h2>Sign in</h2><p>Use your Supabase editor account to access the shared workspace.</p><label>Email<input id="email" type="email" autocomplete="email" required></label><label style="margin-top:12px">Password<input id="password" type="password" autocomplete="current-password" required></label><div class="auth-error" id="authError"></div><button class="btn primary" style="width:100%" type="submit">Sign in</button></form></div>`}
