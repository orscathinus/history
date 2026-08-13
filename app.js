const sectors = [
  {id:'prehistory',name:'Prehistory',date:'c. 300,000–3300 BCE',tag:'Origins',a:'#3a261d',b:'#171210',desc:'Human origins, migration, art, ritual, and the shift from foraging to settled life.'},
  {id:'bronze',name:'Bronze Age',date:'c. 3300–1200 BCE',tag:'Cities & bronze',a:'#6b3f21',b:'#1d1814',desc:'The first cities, writing systems, palaces, long-distance trade, and early states.'},
  {id:'iron',name:'Iron Age',date:'c. 1200–500 BCE',tag:'Empires & iron',a:'#3c4142',b:'#151718',desc:'New military technologies, expanding states, trade networks, and resilient cultures.'},
  {id:'classical',name:'Classical',date:'c. 500 BCE–500 CE',tag:'Mediterranean & Asia',a:'#46536a',b:'#171a21',desc:'Greek poleis, Rome, Han China, South Asian empires, philosophy, law, and exchange.'},
  {id:'medieval',name:'Medieval',date:'c. 500–1500 CE',tag:'Connected worlds',a:'#4f1e28',b:'#171114',desc:'Byzantium, Islamic civilizations, African kingdoms, steppe empires, and global trade.'},
  {id:'early-modern',name:'Early Modern',date:'c. 1500–1800 CE',tag:'Oceanic worlds',a:'#315a58',b:'#101817',desc:'Printing, gunpowder empires, oceanic expansion, scientific change, and revolution.'},
  {id:'industrial',name:'Industrial',date:'c. 1760–1914 CE',tag:'Steam & industry',a:'#4d4238',b:'#151412',desc:'Factories, railways, electricity, imperialism, mass politics, and accelerating change.'},
  {id:'world-wars',name:'World Wars',date:'1914–1945 CE',tag:'Total war',a:'#55453d',b:'#171412',desc:'Two world wars, revolution, genocide, mass mobilization, and a shattered global order.'},
  {id:'modern',name:'Modern Age',date:'1945–present',tag:'Global systems',a:'#384b65',b:'#11161d',desc:'Cold War, decolonization, globalization, digital networks, and a changing planet.'},
  {id:'science',name:'Science & Technology',date:'Across all eras',tag:'Special sector',a:'#4a3063',b:'#16101d',desc:'A cross-era gallery of inventions, discoveries, machines, theories, and computation.'},
  {id:'space',name:'Space Exploration',date:'20th century–present',tag:'Special sector',a:'#243257',b:'#070a12',desc:'Rockets, satellites, astronauts, planetary science, and humanity beyond Earth.'}
];

const commons = name => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name).replace(/%2F/g,'/')}`;
const commonsPage = name => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name.replace(/ /g,'_')).replace(/%2F/g,'/')}`;

const exhibits = [
  {id:'human-migration',sector:'prehistory',title:'Humanity on the Move',date:'c. 70,000–15,000 years ago',place:'Africa → the world',image:'Göbeklitepe 2015-27.jpg',credit:'Hamdi Gümüş · Wikimedia Commons · CC0',intro:'The story of Homo sapiens is also a story of movement: repeated dispersals, adaptation, interbreeding, coastlines crossed, and landscapes transformed.',body:'Modern humans evolved in Africa. Over many thousands of years, groups expanded within Africa and into Southwest Asia, then across Eurasia, Sahul, and eventually the Americas. The routes were not one clean march across a map; they were overlapping movements shaped by climate, geography, technology, and chance.',facts:[['Focus','Migration & adaptation'],['Scale','Tens of thousands of years'],['Key idea','No single migration route'],['V1 feature','Interactive migration map']]},
  {id:'ancient-egypt',sector:'bronze',title:'Ancient Egypt',date:'c. 3100–30 BCE',place:'Nile Valley',image:'Great Pyramid (Pyramid of Cheops Khufu), Giza, GG, EGY (47902782131).jpg',credit:'W. leMay · Wikimedia Commons · CC0',intro:'Along the Nile, a durable state connected agriculture, royal power, writing, religion, craft, and monumental architecture for more than three millennia.',body:'The annual Nile flood supported dense settlement and agricultural surplus. Egyptian rulers developed institutions able to mobilize labor, collect resources, wage war, build temples and tombs, and preserve written administration. Egyptian history was never static: periods of centralized rule alternated with fragmentation, foreign conquest, and cultural exchange.',facts:[['Unification','c. 3100 BCE'],['Great Pyramid','c. 26th century BCE'],['Writing','Hieroglyphic & hieratic'],['River','Nile']]},
  {id:'roman-empire',sector:'classical',title:'The Roman Empire',date:'27 BCE–476 CE in the West',place:'Mediterranean world',image:'Colosseum-Rom.jpg',credit:'Gunnar Bach Pedersen · Wikimedia Commons · Public domain',intro:'Rome turned a Mediterranean republic into an empire of roads, cities, law, taxation, armies, and astonishing cultural exchange.',body:'Under Augustus and his successors, imperial government linked provinces from Britain to Syria and North Africa. Roman citizenship, law, military service, commerce, and urban infrastructure tied together an enormous and diverse population. The western imperial government collapsed in the fifth century, while the eastern Roman Empire continued for nearly another millennium.',facts:[['First emperor','Augustus'],['Capital','Rome; later multiple imperial centers'],['Language','Latin and Greek, among many others'],['Western end','476 CE (traditional date)']]},
  {id:'mongol-empire',sector:'medieval',title:'The Mongol Empire',date:'1206–14th century',place:'Eurasia',image:'Mongol Empire at its extent.png',credit:'Tiashing595 · Wikimedia Commons · CC0',intro:'In the thirteenth century, Mongol armies forged the largest contiguous land empire in history and redrew the political geography of Eurasia.',body:'Temüjin, proclaimed Chinggis Khan in 1206, united Mongol groups and built a highly mobile military system. His successors conquered across China, Central Asia, Persia, Russia, and into Eastern Europe. The empire later divided into khanates, but long-distance movement of people, goods, technologies, and ideas intensified across much of Eurasia.',facts:[['Founder','Chinggis Khan'],['Proclamation','1206 CE'],['Core strength','Highly mobile cavalry armies'],['Legacy','Eurasian political & commercial integration']]},
  {id:'industrial-revolution',sector:'industrial',title:'The Industrial Revolution',date:'c. 1760–19th century',place:'Britain → world',image:'Spinning jenny.jpg',credit:'Markus Schweiß · Wikimedia Commons · CC BY-SA 3.0',intro:'Machines, fossil energy, factories, finance, transport, and rapidly growing cities changed how humans made things—and how they lived.',body:'Industrialization began in Britain through changes in textiles, coal, iron, steam power, agriculture, and finance, then spread unevenly. Productivity rose dramatically, but so did dangerous labor, crowded cities, environmental damage, and social conflict. Railways and steamships compressed distance while industrial states gained new military and economic power.',facts:[['Early center','Great Britain'],['Key energy','Coal & steam'],['Transformation','Hand production → mechanization'],['Global effect','Industry, cities & empire']]},
  {id:'world-war-ii',sector:'world-wars',title:'World War II',date:'1939–1945',place:'Global',image:'Into the Jaws of Death (6414569).jpg',credit:'Robert F. Sargent / U.S. Coast Guard · Public domain',intro:'The deadliest conflict in human history combined industrialized warfare, genocide, occupation, resistance, strategic bombing, and worldwide mobilization.',body:'The war grew from unresolved tensions after World War I, aggressive expansion by Nazi Germany, Fascist Italy and Imperial Japan, and the breakdown of collective security. Fighting engulfed Europe, Africa, Asia, and the oceans. Nazi Germany and its collaborators murdered six million Jews in the Holocaust and persecuted and killed millions of other victims. The war ended in 1945 after Germany’s surrender and Japan’s surrender following Soviet entry into the war against Japan and the U.S. atomic bombings of Hiroshima and Nagasaki.',facts:[['Europe begins','1 September 1939'],['D-Day','6 June 1944'],['Germany surrenders','May 1945'],['Japan surrenders','September 1945']]},
  {id:'cold-war',sector:'modern',title:'The Cold War',date:'c. 1947–1991',place:'Global',image:'Berlin Wall 1961-11-20.jpg',credit:'U.S. National Archives · Public domain',intro:'A global rivalry between U.S.- and Soviet-led blocs shaped alliances, nuclear strategy, proxy wars, development, espionage, culture, and spaceflight.',body:'The United States and Soviet Union emerged from World War II as rival superpowers. Their competition rarely produced direct war between them, but it drove nuclear arms races, military alliances, proxy conflicts, covert action, propaganda, and technological competition. Decolonization unfolded at the same time, and newly independent states pursued many paths rather than simply choosing one bloc.',facts:[['Berlin Wall built','1961'],['Cuban Missile Crisis','1962'],['Apollo 11','1969'],['Soviet Union dissolves','1991']]},
  {id:'computing',sector:'science',title:'The Age of Computing',date:'1940s–present',place:'Global',image:'Eniac (cropped).jpg',credit:'U.S. Army · Wikimedia Commons · Public domain',intro:'From room-sized electronic calculators to networked billions of devices, computing became a new infrastructure for knowledge, communication, and power.',body:'Electronic digital computers emerged from earlier work in mathematics, logic, mechanical calculation, telecommunications, and wartime engineering. ENIAC, completed in the 1940s, was an important early general-purpose electronic computer. Transistors, integrated circuits, software, personal computers, networking, the web, smartphones, cloud systems, and modern artificial intelligence successively widened computing’s reach.',facts:[['ENIAC','Completed 1945; unveiled 1946'],['Transistor','1947'],['ARPANET','1969'],['World Wide Web','Proposed 1989']]},
  {id:'apollo-11',sector:'space',title:'Apollo 11',date:'16–24 July 1969',place:'Earth ↔ Moon',image:'AS11-40-5903 - Buzz Aldrin by Neil Armstrong (full frame).jpg',credit:'Neil Armstrong / NASA · Public domain',intro:'Apollo 11 carried Neil Armstrong, Edwin “Buzz” Aldrin, and Michael Collins to the Moon and returned them safely to Earth.',body:'Saturn V launched Apollo 11 from Kennedy Space Center on 16 July 1969. Four days later, Armstrong and Aldrin descended in the lunar module Eagle while Collins remained in lunar orbit aboard Columbia. Armstrong became the first person to step onto another world, followed by Aldrin. The mission returned to Earth on 24 July, becoming both a technological milestone and a defining episode of the Cold War space race.',facts:[['Launch','16 July 1969'],['Lunar landing','20 July 1969'],['Crew','Armstrong · Aldrin · Collins'],['Return','24 July 1969']]}
].map(e=>({...e,imageUrl:commons(e.image),sourceUrl:commonsPage(e.image)}));

const eraTimeline = [
  ['c. 300k BCE','Prehistory','Origins & migration','prehistory'],['c. 3300 BCE','Bronze Age','Cities & writing','bronze'],['c. 1200 BCE','Iron Age','New powers','iron'],['c. 500 BCE','Classical','Empires & philosophy','classical'],['c. 500 CE','Medieval','Connected worlds','medieval'],['c. 1500','Early Modern','Oceans & print','early-modern'],['c. 1760','Industrial','Steam & machines','industrial'],['1914','World Wars','Global conflict','world-wars'],['1945','Modern Age','Cold War onward','modern'],['All eras','Science & Tech','Ideas become systems','science'],['1957','Space','Beyond Earth','space']
];

const timeMoments = [
  {year:-10000,text:'Across several regions, communities are experimenting with cultivation, animal management, and increasingly settled ways of life.'},
  {year:-3000,text:'Early states and cities flourish in Mesopotamia and Egypt as writing and bronze technologies spread.'},
  {year:-500,text:'Large states and philosophical traditions are developing across the Mediterranean, South Asia, and East Asia.'},
  {year:1,text:'The Roman Empire dominates the Mediterranean while Han China anchors a vast East Asian imperial system.'},
  {year:800,text:'Abbasid Baghdad is a major center of scholarship and trade; Tang China has recently ended, and new powers are forming across Eurasia.'},
  {year:1250,text:'The Mongol conquests have linked enormous stretches of Eurasia while cities and trade networks thrive across Africa and Asia.'},
  {year:1500,text:'Oceanic voyages are connecting hemispheres with profound consequences, while powerful states span the Americas, Africa, Europe, and Asia.'},
  {year:1800,text:'Industrialization is accelerating in Britain as revolutionary politics and imperial competition reshape the Atlantic world and beyond.'},
  {year:1914,text:'World War I begins in Europe and rapidly becomes a global conflict involving empires and societies far beyond the continent.'},
  {year:1945,text:'World War II ends, the United Nations is founded, colonial empires face mounting challenges, and the nuclear age begins.'},
  {year:1969,text:'Humans first walk on the Moon while the Cold War reshapes science, politics, and culture.'},
  {year:1991,text:'The Soviet Union dissolves as a new phase of globalization and digital connectivity accelerates.'},
  {year:2026,text:'Humanity lives in an intensely connected world shaped by digital systems, biotechnology, climate change, renewed geopolitical rivalry, and expanding space activity.'}
];

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const sectorById = id => sectors.find(s=>s.id===id);
const exhibitById = id => exhibits.find(e=>e.id===id);

function renderTimeline(){
  $('#timelineTrack').innerHTML = eraTimeline.map(([date,name,sub,id])=>`<button class="timeline-node" role="listitem" data-sector="${id}"><span class="date">${date}</span><span class="dot"></span><strong>${name}</strong><small>${sub}</small></button>`).join('');
}
function renderSectors(){
  $('#sectorGrid').innerHTML = sectors.map((s,i)=>`<article class="sector-card reveal" tabindex="0" role="button" data-sector="${s.id}" style="--sector-a:${s.a};--sector-b:${s.b}"><div class="sector-top"><span>${String(i+1).padStart(2,'0')}</span><span>${s.tag}</span></div><div><h3>${s.name}</h3><p>${s.desc}</p></div><span class="sector-arrow">↗</span></article>`).join('');
}
function renderExhibits(filter='all'){
  const list = filter==='all'?exhibits:exhibits.filter(e=>e.sector===filter);
  $('#exhibitGrid').innerHTML = list.map(e=>`<article class="exhibit-card reveal" tabindex="0" role="button" data-exhibit="${e.id}"><figure><img src="${e.imageUrl}" alt="${e.title}" loading="lazy" /></figure><div class="exhibit-copy"><div class="exhibit-meta"><span>${sectorById(e.sector).name}</span><span>${e.date}</span></div><h3>${e.title}</h3><p>${e.intro}</p></div></article>`).join('') || `<p>No exhibits in this filter yet.</p>`;
  observeReveals();
}
function renderFilters(){
  const available = ['all',...new Set(exhibits.map(e=>e.sector))];
  $('#exhibitFilters').innerHTML = available.map(id=>`<button class="filter-chip ${id==='all'?'active':''}" data-filter="${id}">${id==='all'?'All':sectorById(id).name}</button>`).join('');
}
function renderDirectory(query=''){
  const q=query.trim().toLowerCase();
  const items=[...sectors.map(s=>({type:'Sector',title:s.name,date:s.date,sector:s.name,id:s.id,target:'sector'})),...exhibits.map(e=>({type:'Exhibit',title:e.title,date:e.date,sector:sectorById(e.sector).name,id:e.id,target:'exhibit'}))]
    .filter(x=>!q||[x.type,x.title,x.date,x.sector].join(' ').toLowerCase().includes(q));
  $('#directoryList').innerHTML = items.map((x,i)=>`<div class="directory-row" tabindex="0" role="button" data-${x.target}="${x.id}"><span class="num">${String(i+1).padStart(2,'0')}</span><strong>${x.title}</strong><span class="sector-col">${x.type} · ${x.sector}</span><span class="date-col">${x.date}</span><span class="go">↗</span></div>`).join('') || `<div class="empty-gallery">No museum entries match “${query.replace(/[<>]/g,'')}”.</div>`;
}
function openExhibit(id,pushHash=true){
  const e=exhibitById(id);if(!e)return;
  const d=$('#exhibitDialog');
  $('#exhibitDialogContent').innerHTML=`<article><div class="exhibit-hero"><img src="${e.imageUrl}" alt="${e.title}"/><div class="exhibit-hero-copy"><p class="eyebrow">${sectorById(e.sector).name} · ${e.place}</p><h2 id="exhibitDialogTitle">${e.title}</h2><p>${e.date}</p></div></div><div class="exhibit-body"><div><p class="lead">${e.intro}</p><p>${e.body}</p><a class="source-link" href="${e.sourceUrl}" target="_blank" rel="noopener">Image source & license ↗</a><p class="image-credit-inline">Image: ${e.credit}</p></div><aside class="fact-stack">${e.facts.map(([k,v])=>`<div class="fact"><span>${k}</span><strong>${v}</strong></div>`).join('')}</aside></div></article>`;
  if(!d.open)d.showModal();document.body.classList.add('modal-open');if(pushHash)history.replaceState(null,'',`#exhibit=${id}`);
}
function openSector(id,pushHash=true){
  const s=sectorById(id);if(!s)return;const related=exhibits.filter(e=>e.sector===id);const d=$('#sectorDialog');
  $('#sectorDialogContent').innerHTML=`<div class="sector-dialog-content"><div class="sector-hero" style="--sector-a:${s.a};--sector-b:${s.b}"><div><p class="eyebrow">${s.date} · ${s.tag}</p><h2 id="sectorDialogTitle">${s.name}</h2></div></div><div class="sector-inner"><p>${s.desc} This wing is deliberately selective in Version 1.0.0: it establishes the visual identity and navigation structure that later releases can fill with deeper galleries.</p>${related.length?`<div class="sector-exhibits">${related.map(e=>`<div class="mini-exhibit" tabindex="0" role="button" data-exhibit="${e.id}"><span>Open exhibit</span><strong>${e.title}</strong><small>${e.date}</small></div>`).join('')}</div>`:`<div class="empty-gallery">The doors are open, but the first major exhibit for this wing is still being prepared for a future release.</div>`}</div></div>`;
  if(!d.open)d.showModal();document.body.classList.add('modal-open');if(pushHash)history.replaceState(null,'',`#sector=${id}`);
}
function closeDialog(d){if(d.open)d.close();document.body.classList.remove('modal-open');if(location.hash.startsWith('#exhibit=')||location.hash.startsWith('#sector='))history.replaceState(null,'','#exhibits')}
function globalSearch(q){
  const term=q.trim().toLowerCase();let results=[];
  if(term){results=[...sectors.map(s=>({kind:'Sector',title:s.name,sub:s.date,id:s.id,target:'sector'})),...exhibits.map(e=>({kind:'Exhibit',title:e.title,sub:`${sectorById(e.sector).name} · ${e.date}`,id:e.id,target:'exhibit'}))].filter(x=>(x.title+' '+x.sub).toLowerCase().includes(term)).slice(0,12)}
  $('#searchResults').innerHTML=term?(results.map(r=>`<div class="search-result" tabindex="0" role="button" data-${r.target}="${r.id}"><small>${r.kind}</small><strong>${r.title}<small>${r.sub}</small></strong><span>↗</span></div>`).join('')||`<div class="empty-gallery">Nothing found yet. Version 1.0.0 is intentionally selective.</div>`):`<div class="empty-gallery">Search sectors and the opening collection of exhibits.</div>`;
}
function updateYear(val){
  const year=Number(val);$('#yearDisplay').textContent=year<0?`${Math.abs(year).toLocaleString()} BCE`:`${year} CE`;
  let best=timeMoments[0];for(const m of timeMoments){if(Math.abs(m.year-year)<Math.abs(best.year-year))best=m}$('#yearContext').textContent=best.text;
}
function setMigration(route){$$('.route').forEach(p=>p.classList.toggle('active',p.dataset.route===route));$$('.migration-option').forEach(b=>b.classList.toggle('active',b.dataset.route===route))}
function observeReveals(){const els=$$('.reveal:not(.visible)');if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('visible'));return}const ob=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');ob.unobserve(en.target)}}),{threshold:.1});els.forEach(e=>ob.observe(e))}
function openSearch(){const d=$('#searchDialog');if(!d.open)d.showModal();document.body.classList.add('modal-open');setTimeout(()=>$('#globalSearch').focus(),40)}
function handleHash(){if(location.hash.startsWith('#exhibit='))openExhibit(location.hash.split('=')[1],false);else if(location.hash.startsWith('#sector='))openSector(location.hash.split('=')[1],false)}

renderTimeline();renderSectors();renderFilters();renderExhibits();renderDirectory();observeReveals();updateYear(1969);globalSearch('');handleHash();

document.addEventListener('click',e=>{
  const sector=e.target.closest('[data-sector]');const exhibit=e.target.closest('[data-exhibit]');
  if(exhibit){const inSectorDialog=exhibit.closest('#sectorDialog');if(inSectorDialog)closeDialog($('#sectorDialog'));openExhibit(exhibit.dataset.exhibit);return}
  if(sector){openSector(sector.dataset.sector);return}
  const filter=e.target.closest('[data-filter]');if(filter){$$('.filter-chip').forEach(x=>x.classList.toggle('active',x===filter));renderExhibits(filter.dataset.filter);return}
  const migration=e.target.closest('[data-route]');if(migration&&!migration.classList.contains('route'))setMigration(migration.dataset.route);
});
document.addEventListener('keydown',e=>{
  if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openSearch()}
  if(e.key==='Escape'){$$('#searchDialog,#exhibitDialog,#sectorDialog').forEach(d=>{if(d.open)closeDialog(d)})}
  if((e.key==='Enter'||e.key===' ')&&document.activeElement.matches('[role="button"]')){e.preventDefault();document.activeElement.click()}
});
$('#searchButton').addEventListener('click',openSearch);$('#searchClose').addEventListener('click',()=>closeDialog($('#searchDialog')));$('#exhibitClose').addEventListener('click',()=>closeDialog($('#exhibitDialog')));$('#sectorClose').addEventListener('click',()=>closeDialog($('#sectorDialog')));
$('#globalSearch').addEventListener('input',e=>globalSearch(e.target.value));$('#directorySearch').addEventListener('input',e=>renderDirectory(e.target.value));$('#yearSlider').addEventListener('input',e=>updateYear(e.target.value));
$('#randomExhibit').addEventListener('click',()=>openExhibit(exhibits[Math.floor(Math.random()*exhibits.length)].id));
$('#menuButton').addEventListener('click',()=>{const m=$('#mobileMenu');const open=m.classList.toggle('open');m.setAttribute('aria-hidden',String(!open));$('#menuButton').setAttribute('aria-expanded',String(open))});
$$('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>{$('#mobileMenu').classList.remove('open');$('#mobileMenu').setAttribute('aria-hidden','true');$('#menuButton').setAttribute('aria-expanded','false')}));
window.addEventListener('hashchange',handleHash);
window.addEventListener('scroll',()=>{const y=window.scrollY;$('#topbar').classList.toggle('scrolled',y>30);const max=document.documentElement.scrollHeight-innerHeight;$('#scrollProgress').style.width=`${max?Math.min(100,y/max*100):0}%`},{passive:true});
