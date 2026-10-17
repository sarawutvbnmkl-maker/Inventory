/* ข้อมูลคอมเซ็ต: เพิ่ม/แก้ได้ในรายการ D (p=ราคาขาย, o=ราคาเดิม, pr=เลขชุดสำเร็จรูปในหน้าจัดสเปค, rank=ลำดับขายดี) */
var D=[
{id:'s1',n:'Office Lite',u:'office',pr:0,p:11900,o:12200,e:'🖥️',rank:2,
 sp:[['ซีพียู','Intel Core i3 (LGA1700)'],['เมนบอร์ด','H610 (LGA1700 / DDR4)'],['แรม','DDR4 16GB (8x2)'],['การ์ดจอ','ออนบอร์ด'],['SSD','NVMe 500GB'],['พาวเวอร์ซัพพลาย','550W 80+ Bronze'],['เคส','เคสมาตรฐาน']]},
{id:'s2',n:'Gamer Starter',u:'game',pr:1,p:22500,o:23100,e:'🎮',rank:3,
 sp:[['ซีพียู','Intel Core i5 (LGA1700)'],['เมนบอร์ด','H610 (LGA1700 / DDR4)'],['แรม','DDR4 16GB (8x2)'],['การ์ดจอ','การ์ดจอรุ่นเริ่มต้น 4GB'],['SSD','NVMe 500GB'],['พาวเวอร์ซัพพลาย','550W 80+ Bronze'],['เคส','เคสมาตรฐาน']]},
{id:'s3',n:'Gamer Plus RTX 4060',u:'game',pr:2,p:29900,o:30890,e:'🕹️',rank:1,
 sp:[['ซีพียู','AMD Ryzen 5 (AM5)'],['เมนบอร์ด','A620 (AM5 / DDR5)'],['แรม','DDR5 16GB (8x2)'],['การ์ดจอ','RTX 4060 8GB'],['SSD','NVMe 1TB Gen4'],['พาวเวอร์ซัพพลาย','650W 80+ Bronze'],['เคส','เคสมิดทาวเวอร์ กระจกใส']]},
{id:'s4',n:'Creator Pro',u:'edit',pr:4,p:36500,o:37600,e:'🎬',rank:4,
 sp:[['ซีพียู','Intel Core i5 (LGA1700)'],['เมนบอร์ด','B760 (LGA1700 / DDR5)'],['แรม','DDR5 32GB (16x2)'],['การ์ดจอ','RTX 4060 8GB'],['SSD','NVMe 2TB'],['พาวเวอร์ซัพพลาย','750W 80+ Gold'],['เคส','เคสมิดทาวเวอร์ กระจกใส']]},
{id:'s5',n:'Extreme RTX 4070 SUPER',u:'game',pr:3,p:51900,o:53400,e:'🚀',rank:5,
 sp:[['ซีพียู','AMD Ryzen 7 (AM5)'],['เมนบอร์ด','B650 (AM5 / DDR5)'],['แรม','DDR5 32GB (16x2)'],['การ์ดจอ','RTX 4070 SUPER 12GB'],['SSD','NVMe 2TB'],['พาวเวอร์ซัพพลาย','850W 80+ Gold'],['เคส','เคสพรีเมียม ไฟ RGB']]}
];
var UL={game:'เล่นเกม',edit:'ตัดต่อ/กราฟิก',office:'ออฟฟิศ/เรียน'};
var INST=10; /* ตัวอย่าง: ผ่อน 0% กี่เดือน (ต้องใช้เงื่อนไขจริงของธนาคาร/ผู้ให้บริการ) */
var use='all',price='all',sort='rank';
var $=function(i){return document.getElementById(i)};
var fmt=function(n){return '฿'+n.toLocaleString('th-TH')};
function find(id){return D.filter(function(d){return d.id===id})[0]}
function spec(d,k){return d.sp.filter(function(s){return s[0]===k})[0][1]}
function tools(){
var u=[['all','ทั้งหมด'],['game','เล่นเกม'],['edit','ตัดต่อ/กราฟิก'],['office','ออฟฟิศ/เรียน']];
$('ftools').innerHTML=u.map(function(x){return '<button class="fchip'+(use===x[0]?' on':'')+'" data-u="'+x[0]+'">'+x[1]+'</button>'}).join('')+
'<select id="fprice" aria-label="ช่วงราคา"><option value="all">ทุกช่วงราคา</option><option value="low"'+(price==='low'?' selected':'')+'>ต่ำกว่า 20,000</option><option value="mid"'+(price==='mid'?' selected':'')+'>20,000 – 35,000</option><option value="high"'+(price==='high'?' selected':'')+'>มากกว่า 35,000</option></select>'+
'<select id="fsort" aria-label="เรียงลำดับ"><option value="rank">เรียง: แนะนำ</option><option value="asc"'+(sort==='asc'?' selected':'')+'>ราคาต่ำ → สูง</option><option value="desc"'+(sort==='desc'?' selected':'')+'>ราคาสูง → ต่ำ</option></select>';
}
function list(){
var l=D.filter(function(d){
 if(use!=='all'&&d.u!==use)return false;
 if(price==='low'&&d.p>=20000)return false;
 if(price==='mid'&&(d.p<20000||d.p>35000))return false;
 if(price==='high'&&d.p<=35000)return false;
 return true});
l.sort(function(a,b){return sort==='asc'?a.p-b.p:sort==='desc'?b.p-a.p:a.rank-b.rank});
$('count').textContent='พบ '+l.length+' ชุด';
$('sgrid').innerHTML=l.length?l.map(function(d){
 return '<div class="scard"><div class="spic"><span class="stag">'+UL[d.u]+'</span>'+d.e+'</div><div class="sb"><h3>'+d.n+'</h3><ul class="specs"><li>🧠 '+spec(d,'ซีพียู')+'</li><li>🎮 '+spec(d,'การ์ดจอ')+'</li><li>📟 '+spec(d,'แรม')+'</li><li>💾 '+spec(d,'SSD')+'</li></ul><div class="pr"><span class="price">'+fmt(d.p)+'</span><span class="old">'+fmt(d.o)+'</span></div><div class="inst">ผ่อนประมาณ '+fmt(Math.round(d.p/INST))+'/เดือน (ตัวอย่าง 0% '+INST+' เดือน)</div><div class="srow"><button class="btnp" data-add="'+d.id+'">+ ใส่ตะกร้า</button><button class="btng" data-view="'+d.id+'">รายละเอียด</button></div></div></div>'}).join(''):'<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:40px">ไม่พบชุดที่ตรงเงื่อนไข</p>';
}
function addSet(d){Cart.add({id:d.id,n:'คอมเซ็ต '+d.n,p:d.p,e:d.e})}
function detail(d){
$('dbox').innerHTML='<h3>'+d.e+' '+d.n+'</h3><div class="pr"><span class="price">'+fmt(d.p)+'</span><span class="old">'+fmt(d.o)+'</span></div><div class="inst">ผ่อนประมาณ '+fmt(Math.round(d.p/INST))+'/เดือน (ตัวอย่าง 0% '+INST+' เดือน)</div>'+
'<table>'+d.sp.map(function(s){return '<tr><th>'+s[0]+'</th><td>'+s[1]+'</td></tr>'}).join('')+'</table>'+
'<b>สิ่งที่ได้ในกล่อง</b><ul><li>ตัวเครื่องประกอบพร้อมใช้งาน</li><li>สายไฟ AC</li><li>คู่มือและใบรับประกัน</li></ul>'+
'<div class="dnote">ประกัน 1 ปี (ข้อความตัวอย่าง ใช้จริงต้องแก้ตามเงื่อนไขของร้าน)</div>'+
'<button class="buy" data-add="'+d.id+'" data-close="1">ใส่ตะกร้า</button><a class="dlink" href="build.html#p'+d.pr+'">ปรับแต่งสเปคชุดนี้</a><button class="ghost" data-close="1">ปิด</button>';
$('detail').classList.add('open')}
document.addEventListener('click',function(e){
var t=e.target.closest('button');
if(e.target.id==='detail'){$('detail').classList.remove('open');return}
if(!t)return;
if(t.dataset.u){use=t.dataset.u;tools();list()}
if(t.dataset.add)addSet(find(t.dataset.add));
if(t.dataset.view)detail(find(t.dataset.view));
if(t.dataset.close)$('detail').classList.remove('open');
});
document.addEventListener('change',function(e){
if(e.target.id==='fprice'){price=e.target.value;list()}
if(e.target.id==='fsort'){sort=e.target.value;list()}
});
tools();list();