/* ตะกร้าสินค้ากลาง ใช้ร่วมกันทุกหน้า (เก็บใน localStorage ของเบราว์เซอร์)
   ใช้งาน: Cart.add({id,n,p,e}) เพิ่มสินค้า | Cart.open() เปิดตะกร้า | Cart.pay(ยอดเงิน, ฟังก์ชันหลังจ่าย) เปิด QR */
(function(){
var PP='0812345678'; /* เบอร์ PromptPay หรือเลขบัตร 13 หลักของร้าน (ตอนนี้เป็นเบอร์ตัวอย่าง) */
var KEY='techhub_cart',cart={},onPaid=null;
var $=function(i){return document.getElementById(i)};
var fmt=function(n){return '฿'+n.toLocaleString('th-TH')};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
function load(){try{cart=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){cart={}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}}
document.head.insertAdjacentHTML('beforeend','<style>#c-items{flex:1;overflow:auto}</style>');
document.body.insertAdjacentHTML('beforeend',
'<div class="ov" id="c-ov"></div>'+
'<aside id="c-cart"><h2>ตะกร้าสินค้า <button class="x" id="c-close" aria-label="ปิด">×</button></h2><div id="c-items"></div><div class="total"><span>ยอดรวม</span><span id="c-sum">฿0</span></div><button class="buy" id="c-buy">สั่งซื้อ / ชำระเงิน</button></aside>'+
'<div class="modal" id="c-pay"><div class="box"><h3>สแกนจ่ายผ่าน PromptPay</h3><div class="qrw" id="c-qr"></div><div class="amt" id="c-amt"></div><small style="color:var(--muted)">เปิดแอปธนาคารแล้วสแกน QR นี้ ยอดเงินจะถูกใส่ให้อัตโนมัติ</small><button class="buy" id="c-paid">โอนแล้ว</button><button class="ghost" id="c-cancel">ยกเลิก</button></div></div>'+
'<div class="toast" id="c-toast"></div>');
function toast(t){var e=$('c-toast');e.textContent=t;e.style.display='block';setTimeout(function(){e.style.display='none'},2000)}
function total(){var s=0,n=0;for(var k in cart){s+=cart[k].p*cart[k].q;n+=cart[k].q}return {s:s,n:n}}
function render(){
var ids=Object.keys(cart),t=total();
$('c-items').innerHTML=ids.length?ids.map(function(i){var x=cart[i];return '<div class="it"><div class="e">'+x.e+'</div><div><div>'+esc(x.n)+'</div><div class="qty"><button data-cm="'+esc(i)+'">−</button>'+x.q+'<button data-ca="'+esc(i)+'">+</button></div></div><b>'+fmt(x.p*x.q)+'</b></div>'}).join(''):'<p style="color:var(--muted)">ยังไม่มีสินค้าในตะกร้า</p>';
$('c-sum').textContent=fmt(t.s);
var c=$('cnt');if(c)c.textContent=t.n;
}
function open(o){$('c-cart').classList.toggle('open',o);$('c-ov').classList.toggle('open',o)}
function crc(s){var c=0xFFFF;for(var i=0;i<s.length;i++){c^=s.charCodeAt(i)<<8;for(var j=0;j<8;j++)c=c&0x8000?((c<<1)^0x1021)&0xFFFF:(c<<1)&0xFFFF}return ('0000'+c.toString(16).toUpperCase()).slice(-4)}
function tlv(i,v){return i+('0'+v.length).slice(-2)+v}
function payload(id,amt){var d=id.replace(/\D/g,''),t,v;if(d.length>=13){t='02';v=d}else{t='01';v='0066'+d.replace(/^0/,'')}
var m=tlv('00','A000000677010111')+tlv(t,v);
var s=tlv('00','01')+tlv('01','12')+tlv('29',m)+tlv('53','764')+tlv('54',amt.toFixed(2))+tlv('58','TH')+'6304';
return s+crc(s)}
function pay(amount,cb){
if(!amount){toast('ตะกร้ายังว่างอยู่');return}
onPaid=cb||null;
try{var qr=qrcode(0,'M');qr.addData(payload(PP,amount));qr.make();$('c-qr').innerHTML=qr.createSvgTag(6,0)}catch(e){$('c-qr').textContent='สร้าง QR ไม่สำเร็จ'}
$('c-amt').textContent=fmt(amount);open(false);$('c-pay').classList.add('open')}
function add(it){
load();
if(cart[it.id])cart[it.id].q++;else cart[it.id]={n:it.n,p:it.p,e:it.e||'📦',q:1};
save();render();toast('เพิ่มลงตะกร้าแล้ว')}
document.addEventListener('click',function(e){
var b=e.target.closest('button'),btn=e.target.closest('#openCart');
if(btn){load();render();open(true);return}
if(e.target.id==='c-ov'){open(false);return}
if(!b)return;
if(b.dataset.ca){cart[b.dataset.ca].q++;save();render()}
if(b.dataset.cm){if(--cart[b.dataset.cm].q<1)delete cart[b.dataset.cm];save();render()}
if(b.id==='c-close')open(false);
if(b.id==='c-buy')pay(total().s,function(){cart={};save();render()});
if(b.id==='c-cancel')$('c-pay').classList.remove('open');
if(b.id==='c-paid'){$('c-pay').classList.remove('open');if(onPaid)onPaid();toast('ขอบคุณที่สั่งซื้อ! ร้านจะตรวจสอบยอดและแจ้งกลับ')}
});
window.addEventListener('pageshow',function(){load();render()});
window.addEventListener('storage',function(){load();render()});
window.Cart={add:add,open:function(){load();render();open(true)},pay:pay};
load();render();
})();