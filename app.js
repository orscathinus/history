const {sectors,exhibits,timeline}=window.HISTORY_DATA;
const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
const sector=id=>sectors.find(s=>s.id===id), exhibit=id=>exhibits.find(e=>e.id===id);
const href=e=>`exhibits/${e.id}/`, sectorHref=s=>`sectors/${s.id}/`;
const formatYear=y=>y<0?`${Math.abs(y).toLocaleString()} BCE`:y===0?'1 BCE/CE':`${y} CE`;
const kind=e=>{
  if(e.interactive==='mission') return 'Space Mission';
  if(['computing','printing-press','steam-engine','industrial-revolution','age-of-railroads'].includes(e.id)) return 'Technology';
  if(['alexander-the-great'].includes(e.id)) return 'Person';
  if(['world-war-i','world-war-ii','holocaust','black-death','bronze-age-collapse','collapse-soviet-union'].includes(e.id)) return 'Event';
  if(['ancient-egypt','mesopotamia','persian-empire','roman-empire','han-china','mongol-empire','byzantine-empire'].includes(e.id)) return 'Civilization';
  if(['human-migration','neolithic-revolution','decolonization','age-of-exploration','renaissance'].includes(e.id)) return 'Movement';
  return 'Exhibit';
};

function imageTag(e,alt=e.title){return `<img src="${e.image}" alt="${alt.replaceAll('"','&quot;')}" loading="lazy" onerror="this.closest('figure,div')?.classList.add('image-failed')">`;}

function renderHero(){
  const ids=['cave-art','ancient-egypt','roman-empire','world-war-ii','apollo-11'];
  $('#heroCollage').innerHTML=ids.map((id,i)=>{const e=exhibit(id);return `<figure class="hero-tile tile-${i+1}">${imageTag(e,'')}</figure>`}).join('');
  $('#heroEraRibbon').innerHTML=sectors.map(s=>`<a href="${sectorHref(s)}" style="--c:${s.accent}"><i></i>${s.name}</a>`).join('');
  $('#statExhibits').textContent=exhibits.length;
}
function renderSectors(){
  $('#sectorGrid').innerHTML=sectors.map((s,i)=>{
    const count=exhibits.filter(e=>e.sector===s.id).length;
    return `<a class="sector-card reveal" href="${sectorHref(s)}" style="--sector-a:${s.a};--sector-b:${s.b};--sector-accent:${s.accent}"><div class="sector-top"><span>${String(i+1).padStart(2,'0')}</span><span>${s.tag}</span></div><div><h3>${s.name}</h3><p>${s.desc}</p></div><div class="sector-footer"><span class="sector-count">${count} ${count===1?'gallery':'galleries'}</span><span class="sector-arrow">↗</span></div></a>`;
  }).join('');
}
function exhibitCard(e,small=false){const s=sector(e.sector);return `<a class="exhibit-card reveal ${small?'compact':''}" href="${href(e)}" style="--card-accent:${s.accent}"><figure>${imageTag(e)}</figure><div class="exhibit-card-copy"><div class="exhibit-meta"><span>${s.name}</span><span>${e.date}</span></div><h3>${e.title}</h3><p>${e.intro}</p><span class="exhibit-badge">${kind(e)} · Enter gallery →</span></div></a>`;}
function renderFeatured(){
  const ids=['human-migration','roman-empire','black-death','industrial-revolution','world-war-ii','apollo-11'];
  $('#featuredGrid').innerHTML=ids.map(id=>exhibitCard(exhibit(id))).join('');
  const strip=['mesopotamia','renaissance','voyager'].map(id=>exhibit(id));
  $('#featureStrip').innerHTML=strip.map(e=>`<a class="feature-card" href="${href(e)}">${imageTag(e)}<span>${e.title}</span></a>`).join('');
}

let timelineFilter='all';
const eraGroup=e=>{
  const id=e[3], ex=exhibit(id); if(!ex)return 'all';
  if(['prehistory','bronze','iron','classical'].includes(ex.sector))return 'ancient';
  if(ex.sector==='medieval')return 'medieval'; if(ex.sector==='early-modern')return 'early-modern';
  if(['industrial','world-wars'].includes(ex.sector))return 'industrial'; if(ex.sector==='space')return 'space'; return 'modern';
};
function renderTimelineFilters(){
  const filters=[['all','All'],['ancient','Ancient'],['medieval','Medieval'],['early-modern','Early Modern'],['industrial','Industry & Wars'],['modern','Modern'],['space','Space']];
  $('#timelineEraFilter').innerHTML=filters.map(([id,label])=>`<button class="era-filter ${id==='all'?'active':''}" data-era="${id}">${label}</button>`).join('');
}
function renderTimeline(){
  const list=timeline.filter(t=>timelineFilter==='all'||eraGroup(t)===timelineFilter);
  $('#timelineTrack').innerHTML=list.map((t,i)=>{const [year,title,place,id]=t,e=exhibit(id),s=e?sector(e.sector):sectors[0];return `<button class="timeline-event ${i===0?'active':''}" data-timeline-index="${timeline.indexOf(t)}" style="--event-color:${s.accent}"><span class="time">${formatYear(year)}</span><span class="timeline-dot"></span><strong>${title}</strong><small>${place}</small></button>`}).join('');
  if(list.length) showTimeline(timeline.indexOf(list[0]));
}
function showTimeline(i){
  const [year,title,place,id]=timeline[i],e=exhibit(id); $$('.timeline-event').forEach(b=>b.classList.toggle('active',Number(b.dataset.timelineIndex)===i));
  $('#timelineDetail').innerHTML=`<span class="detail-location">${place} · ${formatYear(year)}</span><div><h3>${title}</h3><p>${e?e.intro:'A turning point in the museum timeline.'}</p></div>${e?`<a href="${href(e)}">Enter gallery →</a>`:''}`;
}
function nearestMoment(value){return timeline.reduce((best,t)=>Math.abs(t[0]-value)<Math.abs(best[0]-value)?t:best,timeline[0]);}
function updateYear(){const v=Number($('#yearSlider').value),t=nearestMoment(v),e=exhibit(t[3]);$('#yearDisplay').textContent=formatYear(v);$('#yearTitle').textContent=t[1];$('#yearContext').textContent=e?e.intro:`Nearest museum marker: ${t[1]}.`;$('#yearLink').href=e?href(e):'#timeline';$('#yearLink').textContent=e?'Open connected exhibit →':'View timeline →';}

const pulse={
  1:[['Mediterranean','Rome dominates the Mediterranean under Augustus and his successors.','classical'],['East Asia','Han China governs a vast agrarian empire and engages Central Asian networks.','classical'],['South & Central Asia','Indo-Scythian and early Kushan powers reshape overland exchange.','classical'],['Americas','Complex urban and ceremonial societies develop independently in Mesoamerica and the Andes.','prehistory']],
  1250:[['East Asia','The Southern Song presides over dense cities, commerce, printing, and technological innovation.','medieval'],['Eurasian steppe','Mongol successor forces link enormous territories through conquest and tribute.','medieval'],['West Africa','Mali is emerging as a major Sahelian power connected to trans-Saharan exchange.','medieval'],['Mediterranean','Byzantine, Latin, Islamic, and Italian merchant powers compete across sea routes.','medieval']],
  1500:[['East Asia','Ming China anchors one of the world’s largest commercial systems.','early-modern'],['Indian Ocean','Merchants connect East Africa, Arabia, India, Southeast Asia, and China.','early-modern'],['Americas','Aztec and Inca imperial systems dominate large regions shortly before Spanish invasions.','early-modern'],['Atlantic','Iberian oceanic voyages are creating sustained and violent links between hemispheres.','early-modern']],
  1969:[['Moon','Apollo 11 lands humans on another world.','space'],['Southeast Asia','The Vietnam War continues with enormous civilian and military costs.','modern'],['Computing','ARPANET connects its first nodes, an early step toward networked computing.','science'],['Africa','Newly independent states pursue competing development and political strategies after decolonization.','modern']]
};
function renderPulse(year=1969){
  $$('.pulse-year-row button').forEach(b=>b.classList.toggle('active',Number(b.dataset.pulseYear)===year));
  $('#pulseGrid').innerHTML=pulse[year].map(([region,text,sec])=>`<article class="pulse-card" style="--pulse-color:${sector(sec).accent}"><span>${region}</span><h3>${year===1?'c. 1 CE':year}</h3><p>${text}</p></article>`).join('');
}

function populateFilters(){
  $('#sectorFilter').innerHTML='<option value="all">All sectors</option>'+sectors.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  const regions=[...new Set(exhibits.map(e=>e.region))].sort(); $('#regionFilter').innerHTML='<option value="all">All regions</option>'+regions.map(r=>`<option>${r}</option>`).join('');
  const types=[...new Set(exhibits.map(kind))].sort(); $('#typeFilter').innerHTML='<option value="all">All types</option>'+types.map(t=>`<option>${t}</option>`).join('');
}
function renderDirectory(){
  const q=$('#directorySearch').value.trim().toLowerCase(),sf=$('#sectorFilter').value,rf=$('#regionFilter').value,tf=$('#typeFilter').value;
  const list=exhibits.filter(e=>(sf==='all'||e.sector===sf)&&(rf==='all'||e.region===rf)&&(tf==='all'||kind(e)===tf)&&(!q||[e.title,e.date,e.region,sector(e.sector).name,e.intro,kind(e)].join(' ').toLowerCase().includes(q)));
  $('#directoryCount').textContent=`${list.length} of ${exhibits.length} galleries`;
  $('#directoryList').innerHTML=list.map(e=>{const s=sector(e.sector);return `<a class="directory-card reveal" href="${href(e)}" style="--card-accent:${s.accent}"><div class="directory-thumb">${imageTag(e)}</div><div class="directory-copy"><span class="directory-kicker">${s.name} · ${kind(e)}</span><h3>${e.title}</h3><p>${e.intro}</p><div class="directory-date"><span>${e.date}</span><span>${e.region}</span></div></div></a>`}).join('')||'<div class="empty-state">No gallery matches those filters yet.</div>'; observe();
}
function clearFilters(){['directorySearch'].forEach(id=>$('#'+id).value='');['sectorFilter','regionFilter','typeFilter'].forEach(id=>$('#'+id).value='all');renderDirectory();}

function searchResults(q=''){
  q=q.trim().toLowerCase(); const list=exhibits.filter(e=>!q||[e.title,e.region,e.date,sector(e.sector).name,e.intro].join(' ').toLowerCase().includes(q)).slice(0,10);
  $('#searchResults').innerHTML=list.map((e,i)=>`<a class="search-result" href="${href(e)}"><span class="result-index">${String(i+1).padStart(2,'0')}</span><div><strong>${e.title}</strong><small>${sector(e.sector).name} · ${e.date} · ${e.region}</small></div><span>→</span></a>`).join('')||'<p class="empty-search">No matching galleries.</p>';
}
function openRandom(){location.href=href(exhibits[Math.floor(Math.random()*exhibits.length)]);}
let observer;
function observe(){if(!('IntersectionObserver'in window)){$$('.reveal').forEach(x=>x.classList.add('visible'));return} if(!observer)observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08}); $$('.reveal:not(.visible)').forEach(x=>observer.observe(x));}

renderHero();renderSectors();renderFeatured();renderTimelineFilters();renderTimeline();renderPulse();populateFilters();renderDirectory();searchResults();updateYear();observe();
$('#timelineEraFilter').addEventListener('click',e=>{const b=e.target.closest('[data-era]');if(!b)return;timelineFilter=b.dataset.era;$$('.era-filter').forEach(x=>x.classList.toggle('active',x===b));renderTimeline();});
$('#timelineTrack').addEventListener('click',e=>{const b=e.target.closest('[data-timeline-index]');if(b)showTimeline(Number(b.dataset.timelineIndex));});
$('#yearSlider').addEventListener('input',updateYear);$('.pulse-year-row').addEventListener('click',e=>{const b=e.target.closest('[data-pulse-year]');if(b)renderPulse(Number(b.dataset.pulseYear));});
['directorySearch','sectorFilter','regionFilter','typeFilter'].forEach(id=>$('#'+id).addEventListener(id==='directorySearch'?'input':'change',renderDirectory));$('#clearFilters').addEventListener('click',clearFilters);
const dialog=$('#searchDialog');$('#searchButton').addEventListener('click',()=>{dialog.showModal();$('#globalSearch').focus()});$('#searchClose').addEventListener('click',()=>dialog.close());$('#globalSearch').addEventListener('input',e=>searchResults(e.target.value));
$('#randomExhibit').addEventListener('click',openRandom);$('#randomExhibitBottom').addEventListener('click',openRandom);
const menu=$('#mobileMenu'),mb=$('#menuButton');mb.addEventListener('click',()=>{const open=menu.classList.toggle('open');mb.setAttribute('aria-expanded',open);menu.setAttribute('aria-hidden',!open)});menu.addEventListener('click',()=>{menu.classList.remove('open');mb.setAttribute('aria-expanded','false')});
window.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();dialog.showModal();$('#globalSearch').focus()}if(e.key==='Escape'&&dialog.open)dialog.close()});
window.addEventListener('scroll',()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;$('#scrollProgress').style.width=`${h?y/h*100:0}%`;$('#topbar').classList.toggle('scrolled',y>30)},{passive:true});