/* ตั้งค่าช่องทางติดต่อของร้านที่นี่ */
var LINE_ID='@techhub';              /* LINE Official Account ID (ขึ้นต้นด้วย @) */
var EMAIL='hello@techhub.example';   /* อีเมลร้าน */
var $=function(i){return document.getElementById(i)};
function toast(t){var e=$('c-toast');if(!e)return;e.textContent=t;e.style.display='block';setTimeout(function(){e.style.display='none'},2200)}
function msg(){
return 'สวัสดี TechHub\nเรื่อง: '+$('f-topic').value+'\nชื่อ: '+$('f-name').value.trim()+'\nเบอร์ติดต่อ: '+($('f-tel').value.trim()||'-')+'\n'+$('f-msg').value.trim()}
function ok(){
if(!$('f-name').value.trim()||!$('f-msg').value.trim()){toast('กรอกชื่อและข้อความก่อนนะ');return false}
return true}
document.addEventListener('click',function(e){
var t=e.target.closest('button');if(!t)return;
if(t.id==='send-line'&&ok()){window.open('https://line.me/R/oaMessage/'+LINE_ID+'/?'+encodeURIComponent(msg()),'_blank')}
if(t.id==='send-mail'&&ok()){location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('สอบถาม: '+$('f-topic').value)+'&body='+encodeURIComponent(msg())}
});