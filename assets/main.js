const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,full=s=>s.replace('/img/','/img/full/');
$('#mb').onclick=()=>$('#nv').classList.toggle('open');
/* header + progress */
const hd=$('header'),pb=$('#pgb');
function sc(){const h=document.documentElement;pb.style.width=(scrollY/Math.max(1,h.scrollHeight-innerHeight)*100)+'%';hd.classList.toggle('sc',scrollY>40)}
addEventListener('scroll',sc,{passive:true});sc();
/* scroll reveal + counters */
if(!rm&&'IntersectionObserver' in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(()=>t.style.transitionDelay='',1000)}}),{threshold:.1});
 $$('.card,.svc,.it,.feat .i,.hd,.g2>*,.stats .w>div,.fw a,.cta .w').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
 setTimeout(()=>$$('.rv').forEach(e=>e.classList.add('in')),4000);
 const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const b=e.target,m=b.dataset.t.match(/^(\d+)(.*)$/),n=+m[1],t0=performance.now();
  (function f(t){const p=Math.min(1,(t-t0)/1100);b.textContent=Math.round(n*(1-Math.pow(1-p,3)))+m[2];if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
 $$('.stats b').forEach(b=>{const t=b.textContent;if(/^\d+/.test(t)&&!t.includes('\u2013')){b.dataset.t=t;co.observe(b)}});
}
/* product detail popup */
const md=$('#md'),mv=$('#mview'),mimg=$('#mimg');let list=[],ix=0;
function show(i){ix=(i+list.length)%list.length;const c=list[ix],d=c.dataset;mv.classList.remove('z');mv.scrollTo(0,0);
 mimg.src=d.full;mimg.alt=d.title;$('#mser').textContent=d.series;$('#mtit').textContent=d.title;$('#mdesc').textContent=d.desc;
 $('#mspec').innerHTML='';JSON.parse(d.spec).forEach(s=>{const li=document.createElement('li');li.textContent=s;$('#mspec').appendChild(li)});
 $('#minq').href='contact.html?ref='+encodeURIComponent(d.title)+'&topic='+encodeURIComponent(d.topic||'');
 $('#mcnt').textContent=(ix+1)+' / '+list.length;}
function openM(c){list=$$('.it').filter(x=>x.style.display!=='none');show(list.indexOf(c));md.classList.add('on');document.body.classList.add('lock');md.setAttribute('aria-hidden','false');$('#mclose').focus()}
function closeM(){md.classList.remove('on');document.body.classList.remove('lock');md.setAttribute('aria-hidden','true')}
$$('img[alt*="manifesto"],img[alt*="Certificate"]').forEach(i=>{i.dataset.z='';i.style.cursor='zoom-in'});
document.addEventListener('click',e=>{
 const c=e.target.closest('.it');if(c&&!md.classList.contains('on')){openM(c);return}
 if(e.target===md||e.target.closest('#mclose'))return closeM();
 if(e.target.closest('#mview'))return mv.classList.toggle('z');
 if(e.target.closest('#mprev'))return show(ix-1);if(e.target.closest('#mnext'))return show(ix+1);
 const z=e.target.closest('[data-z],.hero .pic');
 if(z){$('#lb img').src=full(z.getAttribute('src'));$('#lb').classList.add('on')}else if(e.target.closest('#lb'))$('#lb').classList.remove('on')});
addEventListener('keydown',e=>{
 if(e.key==='Escape'){closeM();$('#lb').classList.remove('on')}
 if(md.classList.contains('on')){if(e.key==='ArrowLeft')show(ix-1);if(e.key==='ArrowRight')show(ix+1)}
 else if(e.key==='Enter'&&document.activeElement.classList.contains('it'))openM(document.activeElement)});
/* category filter */
const tb=$('#tabs');if(tb)tb.onclick=e=>{const k=e.target.dataset.k;if(!k)return;$$('#tabs button').forEach(b=>b.classList.toggle('on',b===e.target));
 $$('#gal .it').forEach(c=>{const s=k==='a'||c.dataset.c===k;c.style.display=s?'':'none';if(s){c.classList.remove('in');void c.offsetWidth;c.classList.add('in')}})};
/* contact form + prefill from product popup */
const P=new URLSearchParams(location.search),ref=P.get('ref');
if(ref&&$('.cform')){const f=$('.cform');f.message.value='I would like to inquire about: '+ref+'\n\n';const t=P.get('topic');if(t&&[...f.topic.options].some(o=>o.text===t))f.topic.value=t}
$$('.cform').forEach(f=>f.onsubmit=async e=>{e.preventDefault();const m=f.querySelector('.msg'),d=new FormData(f);m.style.display='block';
 try{const r=await fetch(f.action,{method:'POST',body:d});if(!r.ok)throw 0;m.textContent='Thank you. Your inquiry has been sent to our administration team.';f.reset()}
 catch(_){m.textContent='Opening your email app to send the inquiry...';location.href='mailto:admin@kavalskicompanyusa.group?subject='+encodeURIComponent('Website inquiry: '+d.get('topic'))+'&body='+encodeURIComponent(d.get('message')+'\n\n'+d.get('name')+' <'+d.get('email')+'> '+(d.get('phone')||''))}});
