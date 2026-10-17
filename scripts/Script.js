var P=[
{id:1,n:'คอมเซ็ตเล่นเกม Ryzen 5 + RTX 4060',c:'คอมเซ็ต',p:28900,o:32900,e:'🖥️'},
{id:2,n:'โน้ตบุ๊ก AI 14" Core Ultra 7 / 16GB',c:'โน้ตบุ๊ก',p:29900,o:33900,e:'💻'},
{id:3,n:'การ์ดจอ RTX 4070 SUPER 12GB',c:'การ์ดจอ',p:21500,o:23900,e:'🎮'},
{id:4,n:'CPU Core i5 รุ่นใหม่ 14 คอร์',c:'ซีพียู',p:8900,o:9900,e:'🧠'},
{id:5,n:'SSD NVMe 1TB Gen4',c:'อุปกรณ์เสริม',p:2290,o:2790,e:'💾'},
{id:6,n:'คีย์บอร์ดเมคานิคอล RGB',c:'อุปกรณ์เสริม',p:1590,o:1990,e:'⌨️'},
{id:7,n:'จอเกมมิ่ง 27" 165Hz IPS',c:'จอมอนิเตอร์',p:5990,o:6990,e:'🖥'},
{id:8,n:'หูฟังเกมมิ่ง 7.1 มีไมค์',c:'อุปกรณ์เสริม',p:1290,o:1690,e:'🎧'},
{id:9,n:'จอโค้ง 32" QHD 144Hz',c:'จอมอนิเตอร์',p:8490,o:9490,e:'📺'},
{id:10,n:'คอมเซ็ตทำงานออฟฟิศ i3 / 16GB',c:'คอมเซ็ต',p:12900,o:14500,e:'🖥️'}];
/* ตะกร้าอยู่ใน cart.js (ใช้ร่วมกันทุกหน้า) */
var CI={'ทั้งหมด':'🛒','คอมเซ็ต':'🖥️','โน้ตบุ๊ก':'💻','การ์ดจอ':'🎮','ซีพียู':'🧠','จอมอนิเตอร์':'📺','อุปกรณ์เสริม':'🖱️'};
var cat='ทั้งหมด',q='';
var $=function(i){return document.getElementById(i)};
var fmt=function(n){return '฿'+n.toLocaleString('th-TH')};
function cats(){$('cats').innerHTML=Object.keys(CI).map(function(c){return '<button class="cat'+(c===cat?' on':'')+'" data-c="'+c+'"><i>'+CI[c]+'</i>'+c+'</button>'}).join('')}
function grid(){
var l=P.filter(function(x){return (cat==='ทั้งหมด'||x.c===cat)&&x.n.toLowerCase().indexOf(q.toLowerCase())>-1});
$('grid').innerHTML=l.length?l.map(function(x){return '<div class="card"><div class="pic"><span class="off">-'+Math.round((1-x.p/x.o)*100)+'%</span>'+x.e+'</div><div class="info"><small>'+x.c+'</small><h3>'+x.n+'</h3><div class="pr"><span class="price">'+fmt(x.p)+'</span><span class="old">'+fmt(x.o)+'</span></div><button class="add" data-id="'+x.id+'">+ ใส่ตะกร้า</button></div></div>'}).join(''):'<div class="empty">ไม่พบสินค้าที่ค้นหา</div>';
}
document.addEventListener('click',function(e){
var t=e.target.closest('button');if(!t)return;
if(t.dataset.c){cat=t.dataset.c;cats();grid()}
if(t.dataset.id){var x=P.filter(function(y){return y.id==t.dataset.id})[0];Cart.add({id:'p'+x.id,n:x.n,p:x.p,e:x.e})}
});
$('q').oninput=function(e){q=e.target.value;grid()};
$('allcat').onclick=function(){cat='ทั้งหมด';cats();grid();location.hash='list'};
cats();grid();

/* ปุ่ม/ลิงก์ที่พาไปหมวดสินค้า */
document.addEventListener('click',function(e){
var g=e.target.closest('[data-gocat]');if(!g)return;
e.preventDefault();cat=g.dataset.gocat;cats();grid();$('list').scrollIntoView({behavior:'smooth'})});
/* แบนเนอร์สไลด์: เลื่อนอัตโนมัติทุก 5 วินาที, ลูกศร, จุด, ปัดนิ้วบนมือถือ */
(function(){
var sl=$('slides'),n=sl.children.length,i=0,timer,dots=$('dots'),x0=null;
dots.innerHTML=Array.apply(null,Array(n)).map(function(_,k){return '<button class="dot" data-s="'+k+'" aria-label="ภาพที่ '+(k+1)+'"></button>'}).join('');
function go(k){i=(k+n)%n;sl.style.transform='translateX(-'+(i*100)+'%)';Array.prototype.forEach.call(dots.children,function(d,j){d.classList.toggle('on',j===i)})}
function auto(){clearInterval(timer);if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;timer=setInterval(function(){go(i+1)},5000)}
$('sprev').onclick=function(){go(i-1);auto()};
$('snext').onclick=function(){go(i+1);auto()};
dots.onclick=function(e){var d=e.target.closest('.dot');if(d){go(+d.dataset.s);auto()}};
var sv=$('slider');
sv.onmouseenter=function(){clearInterval(timer)};sv.onmouseleave=auto;
sv.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
sv.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40){go(i+(d<0?1:-1));auto()}x0=null});
go(0);auto();
})();