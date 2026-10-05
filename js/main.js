/* ---------- Helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const arrow='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12L12 4M5 4h7v7"/></svg>';
const mailto=e=>e.includes("@")?"mailto:"+e:"#contact";
const link=v=>/^https?:/.test(v)?v:"#contact";

/* Generated preview mockups (shown until real screenshots load) */
const bl=n=>Array.from({length:n},(_,i)=>`<b style="--k:${i}"></b>`).join("");
const tb='<div class="tb"><i></i><i></i><i></i></div>';
function mock(p){
  const m=p.mock;
  if(m==="bloom"||m==="deco")return `<div class="pf one v-${m}"><span class="nt"></span><div class="bd">${m==="deco"?'<span class="hero2"></span><div class="chips"><b></b><b></b><b></b></div>':bl(4)}</div></div><div class="pf two v-${m}"><span class="nt"></span><div class="bd">${bl(3)}</div></div>`;
  const body={film:'<span class="h"></span><div class="rowp">'+bl(6)+'</div><div class="rowp s">'+bl(6)+'</div>',news:'<span class="h big"></span><span class="h"></span><div class="cols">'+bl(3)+'</div>',time:'<u></u>'+bl(4),spa:'<span class="orb"></span><span class="h"></span><span class="h s"></span><em></em>'}[m];
  return `<div class="bf v-${m}">${tb}<div class="bd">${body}</div></div>`;
}
/* Generated preview: shows if the project image file is missing */
function shot(p,i){
  const mobile=/mobile/i.test(p.type);
  const art=`<div class="art" data-n="${esc(p.title[0])}" style="--h:${p.hue}">${mock(p)}</div>`;
  return `<div class="shot${p.soon?" soon":""}">${art}${p.soon?'<span class="soon-l">Preview coming soon</span>':""}<img src="${esc(p.image)}" style="object-position:${esc(p.focus||"center")}" alt="${esc(p.title)} preview" loading="lazy" onerror="this.remove()"><span class="cur">View project</span></div>`;
}

/* ---------- Projects ---------- */
const layout=["","c7","c5","","c5","c7"]; // repeating editorial rhythm (full / 7+5 / full / 5+7)
let filter="All";
function renderFilters(){
  const cats=["All",...new Set(projects.map(p=>p.category))];
  $("#filters").innerHTML=cats.map(c=>`<button aria-pressed="${c===filter}" data-c="${c}">${c}</button>`).join("");
}
function renderGrid(){
  const list=projects.filter(p=>filter==="All"||p.category===filter);
  const fixed=filter==="All"?layout:["c6"];
  $("#grid").innerHTML=list.map((p,i)=>{
    const cls=filter==="All"||list.length>1?fixed[i%fixed.length]:"";
    return `<button class="card pre ${cls}" data-id="${p.id}" aria-label="Open ${esc(p.title)}">
      ${shot(p,i)}
      <div class="meta"><div><div class="t">${esc(p.type)}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
      <div class="stack">${p.technologies.slice(0,4).map(t=>`<span>${esc(t)}</span>`).join("")}</div></div>
      <span class="go" title="${p.live?"Visit site":"View project"}">${arrow}</span></div></button>`;
  }).join("");
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove("pre");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".card").forEach((c,i)=>{c.style.transitionDelay=(i%2)*70+"ms";io.observe(c)});
}
$("#filters").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  filter=b.dataset.c;renderFilters();renderGrid();
});
$("#grid").addEventListener("click",e=>{
  const c=e.target.closest(".card");if(!c)return;
  const p=projects.find(x=>x.id===c.dataset.id);
  if(e.target.closest(".go")&&p.live){window.open(p.live,"_blank","noopener");return} // arrow = go straight to the site
  openProject(c.dataset.id);
});

$("#grid").addEventListener("mousemove",e=>{const sh=e.target.closest(".shot");if(!sh)return;const r=sh.getBoundingClientRect();sh.style.setProperty("--x",e.clientX-r.left+"px");sh.style.setProperty("--y",e.clientY-r.top+"px")});
/* ---------- Detail overlay ---------- */
let current=null,lastFocus=null;
function openProject(id){
  const i=projects.findIndex(p=>p.id===id),p=projects[i],n=projects[(i+1)%projects.length];
  current=id;lastFocus=document.activeElement;
  const btns=[p.live&&`<a class="btn pri" href="${esc(p.live)}" target="_blank" rel="noopener">Visit live site ${arrow}</a>`,
              p.github&&`<a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ${arrow}</a>`].filter(Boolean).join("")
              ||`<a class="btn pri" href="#contact" data-close>Ask about this project ${arrow}</a>`;
  $("#detail").innerHTML=`${shot(p,i)}
    <div class="d-grid"><div><div class="label">${esc(p.type)}</div><h2>${esc(p.title)}</h2><p class="desc">${esc(p.description)}</p>
      <div class="btns" style="margin-top:30px">${btns}</div></div>
      <div class="d-side"><div><h4>Technologies</h4><ul>${p.technologies.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>
      <div><h4>My contribution</h4><p>${esc(p.contribution)}</p></div></div></div>
    <button class="next" data-next="${n.id}"><div><span class="muted" style="font-size:13px">Next project</span><b>${esc(n.title)}</b></div><span class="go">${arrow}</span></button>`;
  const ov=$("#ov");ov.scrollTop=0;ov.classList.add("open");document.body.classList.add("lock");
  history.replaceState(null,"","#"+id);$("#close").focus({preventScroll:true});
}
function closeProject(){
  $("#ov").classList.remove("open");document.body.classList.remove("lock");current=null;
  history.replaceState(null,"",location.pathname+location.search);
  if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});
}
$("#close").addEventListener("click",closeProject);
$("#detail").addEventListener("click",e=>{
  const nx=e.target.closest("[data-next]");if(nx){openProject(nx.dataset.next);return}
  if(e.target.closest("[data-close]")){e.preventDefault();closeProject();$("#contact").scrollIntoView()}
});
addEventListener("keydown",e=>{if(e.key==="Escape"){if(current)closeProject();else toggleMenu(false)}});

/* ---------- About / skills / stats / contact ---------- */
$("#skills").innerHTML=`<div class="label" style="margin-bottom:18px">What I work with</div>`+skills.map(([k,v])=>`<div class="skill"><b>${k}</b><span>${v}</span></div>`).join("");
$("#stats").innerHTML=stats.map(([n,s,l])=>`<div class="stat"><strong data-to="${n}" data-s="${s}">${n}${s}</strong><span>${l}</span></div>`).join("");
const si=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON={
  Email:si('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  WhatsApp:si('<path d="M3 21l1.6-4.6A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4-1L3 21z"/><path d="M9 9c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>'),
  Phone:si('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'),
  LinkedIn:si('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.6v.01M12 16v-5.5M12 13c0-1.7 1-2.7 2.5-2.7S17 11.3 17 13v3"/>'),
  GitHub:'<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
  Instagram:si('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7"/>')
};
const contacts=[["Email",CONFIG.email,"mailto:"+CONFIG.email],["WhatsApp","Chat on WhatsApp",CONFIG.whatsapp],["Phone",CONFIG.phone,"tel:"+CONFIG.phone.replace(/\s/g,"")],["LinkedIn","Ernestina Boakye Dankwah",CONFIG.linkedin||"#contact"],["GitHub","@TinaCode-b",CONFIG.github],["Instagram","@iam_akuah",CONFIG.instagram]];
$("#rows").innerHTML=contacts.map(([k,v,h])=>`<div class="crow"><span><i class="ic">${ICON[k]}</i>${k}</span><a href="${esc(h)}" ${h[0]==="h"?'target="_blank" rel="noopener"':""}>${esc(v)}</a></div>`).join("");
$("#foot").innerHTML=contacts.filter(c=>["Email","LinkedIn","GitHub","Instagram"].includes(c[0])).map(([k,v,h])=>`<a href="${esc(h)}">${k}</a>`).join("");
$("#cform").addEventListener("submit",e=>{
  e.preventDefault();const f=e.target,m=$("#fmsg"),v=n=>f.elements[n].value.trim();
  f.querySelectorAll("input,textarea").forEach(x=>x.removeAttribute("aria-invalid"));
  let bad=null;
  if(!v("name"))bad="name";else if(!/^\S+@\S+\.\S+$/.test(v("email")))bad="email";else if(v("msg").length<10)bad="msg";
  if(bad){f.elements[bad].setAttribute("aria-invalid","true");f.elements[bad].focus();
    m.textContent={name:"Please enter your name.",email:"Enter a valid email address so I can reply.",msg:"Write a short message (at least 10 characters)."}[bad];return}
  const body=v("msg")+"\n\n"+v("name")+"\n"+v("email")+(v("phone")?"\n"+v("phone"):"");
  m.textContent="Opening your email app. If nothing opens, write to "+CONFIG.email+" directly.";
  location.href="mailto:"+CONFIG.email+"?subject="+encodeURIComponent("Portfolio enquiry from "+v("name"))+"&body="+encodeURIComponent(body);
});

/* counters (years / projects count up; 2026 stays static) */
const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;co.unobserve(e.target);
  const t=+e.target.dataset.to;if(t>1000)return;
  const t0=performance.now();(function f(now){const k=Math.min((now-t0)/1200,1);
    e.target.textContent=Math.round(t*(1-Math.pow(1-k,3)))+e.target.dataset.s;if(k<1)requestAnimationFrame(f)})(t0);
}),{threshold:.6});
document.querySelectorAll("[data-to]").forEach(el=>co.observe(el));

/* scroll reveal */
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");rv.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>rv.observe(el));

/* ---------- Nav: scroll state, active link, mobile menu ---------- */
const nav=$("#nav"),menu=$("#links"),burger=$("#burger");
const prog=$("#prog");
const onScroll=()=>{nav.classList.toggle("scrolled",scrollY>16);prog.style.transform=`scaleX(${scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`};
addEventListener("scroll",onScroll,{passive:true});onScroll();
function toggleMenu(o){const open=o===undefined?!menu.classList.contains("open"):o;menu.classList.toggle("open",open);burger.setAttribute("aria-expanded",open);document.body.classList.toggle("lock",open||!!current)}
burger.addEventListener("click",()=>toggleMenu());
menu.addEventListener("click",e=>{if(e.target.closest("a"))toggleMenu(false)});
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll(".links a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id&&!a.classList.contains("cta")))}),{rootMargin:"-45% 0px -50% 0px"});
["work","about","skills"].forEach(id=>spy.observe($("#"+id)));

/* ---------- Theme ---------- */
const root=document.documentElement;
try{const t=localStorage.getItem("theme");if(t)root.dataset.theme=t}catch(e){}
$("#tg").addEventListener("click",()=>{const t=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=t;try{localStorage.setItem("theme",t)}catch(e){}});

/* ---------- Hero phone: before / after ---------- */
const pal={before:{wall:"#d9d6e6",floor:"#bbb5cf"},calm:{wall:"#c8dac7",floor:"#c28a52",sofa:"#3d3563",cush:"#2aa7b8",rug:"#2aa7b8"},
 warm:{wall:"#f2d3bd",floor:"#a9683b",sofa:"#8c3b2e",cush:"#e7a23b",rug:"#d9824a"},bold:{wall:"#27386e",floor:"#7a5a3a",sofa:"#e4505b",cush:"#f5c542",rug:"#2bd4c0"}};
const roomSVG=(c,full)=>`<svg viewBox="0 0 300 355" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="355" fill="${c.wall}"/><rect y="250" width="300" height="105" fill="${c.floor}"/>
<rect x="46" y="44" width="112" height="104" fill="#fff" fill-opacity=".9" stroke="#17122e" stroke-opacity=".25" stroke-width="3"/><path d="M102 44v104M46 96h112" stroke="#17122e" stroke-opacity=".2" stroke-width="3"/>
${full?`<rect x="150" y="40" width="20" height="116" rx="4" fill="#efe6d8"/><rect x="208" y="58" width="58" height="62" rx="3" fill="#fff" stroke="#17122e" stroke-width="3"/><circle cx="237" cy="82" r="10" fill="#f0a52c"/><path d="M216 112q21-22 42 0z" fill="#25915b"/>
<ellipse cx="120" cy="318" rx="100" ry="24" fill="${c.rug}"/><rect x="150" y="190" width="132" height="72" rx="14" fill="${c.sofa}"/><rect x="168" y="200" width="46" height="34" rx="9" fill="${c.cush}"/>
<rect x="256" y="236" width="24" height="30" fill="#e0a366"/><path d="M268 236c-16-6-14-26-8-34 6 10 14 18 8 34zM268 236c14-4 18-22 16-32-12 8-20 16-16 32z" fill="#25915b"/>`:""}</svg>`;
let style="calm",pos=50,drag=false;
const paint=()=>{$("#before").innerHTML=roomSVG(pal.before,false);$("#after").innerHTML=roomSVG(pal[style],true)};
const setPos=v=>{pos=Math.max(4,Math.min(96,v));$("#after").style.clipPath=`inset(0 0 0 ${pos}%)`;$("#knob").style.left=$("#bar").style.left=pos+"%";$("#room").setAttribute("aria-valuenow",Math.round(pos))};
const room=$("#room"),from=e=>{const r=room.getBoundingClientRect();setPos((e.clientX-r.left)/r.width*100)};
room.addEventListener("pointerdown",e=>{drag=true;room.setPointerCapture(e.pointerId);from(e)});
room.addEventListener("pointermove",e=>{if(drag)from(e)});
["pointerup","pointercancel"].forEach(t=>room.addEventListener(t,()=>drag=false));
room.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")setPos(pos-5);if(e.key==="ArrowRight")setPos(pos+5)});
$("#styles").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;style=b.dataset.s;
  document.querySelectorAll("#styles button").forEach(x=>x.setAttribute("aria-pressed",x===b));paint()});
paint();setPos(50);

/* ---------- Init ---------- */
renderFilters();renderGrid();
if(projects.some(p=>"#"+p.id===location.hash))openProject(location.hash.slice(1));
