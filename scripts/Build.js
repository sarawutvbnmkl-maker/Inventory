/* ข้อมูลชิ้นส่วน: เพิ่ม/แก้ได้ที่นี่ (s=ซ็อกเก็ต, m=ชนิด RAM, w=กำลังไฟที่ใช้, pw=วัตต์ของพาวเวอร์ซัพพลาย) */
var S=[
{k:'cpu',n:'ซีพียู',e:'🧠',o:[
 {n:'Intel Core i3 (LGA1700)',p:4500,s:'LGA1700',w:60},
 {n:'Intel Core i5 (LGA1700)',p:8900,s:'LGA1700',w:65},
 {n:'AMD Ryzen 5 (AM5)',p:7500,s:'AM5',w:65},
 {n:'AMD Ryzen 7 (AM5)',p:11900,s:'AM5',w:105}]},
{k:'mb',n:'เมนบอร์ด',e:'🔌',o:[
 {n:'H610 (LGA1700 / DDR4)',p:2500,s:'LGA1700',m:'DDR4'},
 {n:'B760 (LGA1700 / DDR5)',p:4500,s:'LGA1700',m:'DDR5'},
 {n:'A620 (AM5 / DDR5)',p:3600,s:'AM5',m:'DDR5'},
 {n:'B650 (AM5 / DDR5)',p:5200,s:'AM5',m:'DDR5'}]},
{k:'ram',n:'แรม',e:'📟',o:[
 {n:'DDR4 16GB (8x2)',p:1300,m:'DDR4'},
 {n:'DDR5 16GB (8x2)',p:1900,m:'DDR5'},
 {n:'DDR5 32GB (16x2)',p:3400,m:'DDR5'}]},
{k:'gpu',n:'การ์ดจอ',e:'🎮',o:[
 {n:'ไม่ใช้การ์ดจอแยก (ใช้ออนบอร์ด)',p:0,w:0},
 {n:'การ์ดจอรุ่นเริ่มต้น 4GB',p:6500,w:75},
 {n:'RTX 4060 8GB',p:11500,w:115},
 {n:'RTX 4070 SUPER 12GB',p:21500,w:220}]},
{k:'ssd',n:'SSD',e:'💾',o:[
 {n:'SSD NVMe 500GB',p:1200},{n:'SSD NVMe 1TB Gen4',p:2290},{n:'SSD NVMe 2TB',p:4500}]},
{k:'psu',n:'พาวเวอร์ซัพพลาย',e:'⚡',o:[
 {n:'550W 80+ Bronze',p:1500,pw:550},{n:'650W 80+ Bronze',p:1900,pw:650},
 {n:'750W 80+ Gold',p:2600,pw:750},{n:'850W 80+ Gold',p:3400,pw:850}]},
{k:'case',n:'เคส',e:'🗄️',o:[
 {n:'เคสมาตรฐาน',p:1200},{n:'เคสมิดทาวเวอร์ กระจกใส',p:2200},{n:'เคสพรีเมียม ไฟ RGB',p:3500}]}
];
/* ชุดสำเร็จรูป: ตัวเลขคือลำดับตัวเลือกของแต่ละชิ้นส่วน (เริ่มที่ 0) */
var PR=[
{n:'ออฟฟิศประหยัด',u:'office',v:{cpu:0,mb:0,ram:0,gpu:0,ssd:0,psu:0,case:0}},
{n:'เกมเริ่มต้น',u:'game',v:{cpu:1,mb:0,ram:0,gpu:1,ssd:0,psu:0,case:0}},
{n:'เกมงบกลาง',u:'game',v:{cpu:2,mb:2,ram:1,gpu:2,ssd:1,psu:1,case:1}},
{n:'เกมสายแรง',u:'game',v:{cpu:3,mb:3,ram:2,gpu:3,ssd:2,psu:3,case:2}},
{n:'ตัดต่อ / กราฟิก',u:'edit',v:{cpu:1,mb:1,ram:2,gpu:2,ssd:2,psu:2,case:1}}
];
var sel={};
var $=function(i){return document.getElementById(i)};
var fmt=function(n){return '฿'+n.toLocaleString('th-TH')};
function item(k){var s=S.filter(function(x){return x.k===k})[0];return sel[k]===undefined?null:s.o[sel[k]]}
function sumP(v){var t=0;S.forEach(function(s){t+=s.o[v[s.k]].p});return t}
function check(){
var m=[],c=item('cpu'),b=item('mb'),r=item('ram'),g=item('gpu'),p=item('psu'),bad={};
if(c&&b&&c.s!==b.s){m.push('ซีพียูใช้ซ็อกเก็ต '+c.s+' แต่เมนบอร์ดเป็น '+b.s);bad.cpu=bad.mb=1}
if(r&&b&&r.m!==b.m){m.push('แรม '+r.m+' ใช้กับเมนบอร์ด '+b.m+' ไม่ได้');bad.ram=bad.mb=1}
if(c&&p){var need=Math.ceil(((c.w||0)+((g&&g.w)||0)+100)*1.5/50)*50;if(p.pw<need){m.push('พาวเวอร์ซัพพลายอาจไม่พอ ควรมีอย่างน้อยประมาณ '+need+'W');bad.psu=1}}
return {m:m,bad:bad}}
function render(){
var res=check();
$('slots').innerHTML=S.map(function(s){return '<div class="slot'+(res.bad[s.k]?' bad':'')+'"><div class="e">'+s.e+'</div><div><label>'+s.n+'</label><select data-k="'+s.k+'"><option value="">— เลือก'+s.n+' —</option>'+s.o.map(function(o,i){return '<option value="'+i+'"'+(sel[s.k]===i?' selected':'')+'>'+o.n+(o.p?' — '+fmt(o.p):'')+'</option>'}).join('')+'</select></div></div>'}).join('');
var t=0,n=0;
var rows=S.map(function(s){var o=item(s.k);if(o){t+=o.p;n++}return '<div class="line"><span>'+s.n+'</span><span>'+(o?(o.p?fmt(o.p):'ไม่มี'):'-')+'</span></div>'}).join('');
var done=n===S.length,st=res.m.length?res.m.map(function(x){return '<div class="warn">⚠️ '+x+'</div>'}).join(''):(done?'<div class="ok">✅ ผ่านการตรวจสอบเบื้องต้น</div>':'');
$('sum').innerHTML='<h3>สรุปสเปคของคุณ</h3>'+rows+'<div class="tot"><span>ราคารวม</span><b>'+fmt(t)+'</b></div>'+st+'<div class="acts"><button class="btn" id="addcart"'+(done&&!res.m.length?'':' disabled style="opacity:.45;cursor:not-allowed"')+'>ใส่ตะกร้า</button><button class="ghost" id="order"'+(done&&!res.m.length?'':' disabled style="opacity:.45;cursor:not-allowed"')+'>สั่งซื้อทันที</button><button class="ghost" id="copy">คัดลอกสเปค</button><button class="ghost" id="reset">ล้างทั้งหมด</button></div>'+(done?'':'<small style="color:var(--muted);display:block;margin-top:8px">เลือกให้ครบทุกชิ้นเพื่อสั่งซื้อ</small>');
}
function toast(t){var e=$('toast');e.textContent=t;e.style.display='block';setTimeout(function(){e.style.display='none'},2000)}
function apply(v){sel={};for(var k in v)sel[k]=v[k];render()}
function presets(){$('presets').innerHTML='<span style="color:var(--muted);font-size:.88rem;align-self:center">หรือเริ่มจากชุดสำเร็จรูป:</span>'+PR.map(function(p,i){return '<button class="pchip" data-p="'+i+'">'+p.n+' <b>'+fmt(sumP(p.v))+'</b></button>'}).join('')}
function total(){var t=0;S.forEach(function(s){var o=item(s.k);if(o)t+=o.p});return t}
function cartItem(){var c=item('cpu'),g=item('gpu'),key=S.map(function(s){return sel[s.k]}).join('');return {id:'build-'+key,n:'คอมจัดสเปคเอง ('+c.n+' / '+g.n+')',p:total(),e:'🖥️'}}
function specText(){return 'สเปคคอมจาก TechHub\n'+S.map(function(s){var o=item(s.k);return s.n+': '+(o?o.n:'-')}).join('\n')+'\nราคารวม '+fmt(total())}
document.addEventListener('change',function(e){var k=e.target.dataset.k;if(!k)return;if(e.target.value==='')delete sel[k];else sel[k]=+e.target.value;render()});
document.addEventListener('click',function(e){
var t=e.target.closest('button');if(!t)return;
if(t.dataset.p){apply(PR[+t.dataset.p].v);window.scrollTo({top:document.querySelector('.layout').offsetTop-80,behavior:'smooth'})}
if(t.id==='suggest'){var u=$('use').value,b=+$('budget').value||0;var l=PR.filter(function(p){return p.u===u}).sort(function(a,b2){return sumP(a.v)-sumP(b2.v)});
var fit=l.filter(function(p){return sumP(p.v)<=b});var pick=fit.length?fit[fit.length-1]:l[0];apply(pick.v);toast(fit.length?'แนะนำ: '+pick.n:'งบน้อยกว่าชุดเริ่มต้น แสดงชุดราคาต่ำสุดให้แทน')}
if(t.id==='reset'){sel={};render()}
if(t.id==='copy'){var tx=specText();if(navigator.clipboard){navigator.clipboard.writeText(tx).then(function(){toast('คัดลอกสเปคแล้ว')},function(){toast('คัดลอกไม่สำเร็จ')})}else toast('เบราว์เซอร์นี้ไม่รองรับการคัดลอก')}
if(t.id==='addcart'&&!t.disabled){Cart.add(cartItem())}
if(t.id==='order'&&!t.disabled){Cart.pay(total(),function(){sel={};render()})}
});
var hm=location.hash.match(/^#p(\d)$/);if(hm&&PR[+hm[1]]){sel={};for(var kk in PR[+hm[1]].v)sel[kk]=PR[+hm[1]].v[kk]}
presets();render();