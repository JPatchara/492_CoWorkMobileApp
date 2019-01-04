var canvas;
var ctx;
var imgcanvas;
var lastPt = new Object();
var clientX; 
var clientY;  
var target;
var textBox;

function prepareCanvas() {
  var canvas = document.getElementById("canvasDiv");
  parentSize = canvas.parentNode.getBoundingClientRect();
  canvas.addEventListener("touchmove", draw, false);
  canvas.addEventListener("touchend", end, false);
  canvas.addEventListener("clear", clearCanvas, false);
  //canvas.addEventListener("addtextbox", addTextBox, false);
  canvas = document.createElement('canvas');
  canvas.setAttribute('width', 400);
  canvas.setAttribute('height', 500);
  canvas.setAttribute('cursor', 'pointer');
  canvas.setAttribute('id', 'canvas');
  canvasDiv.appendChild(canvas);
  ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 4;
}

// function addTextBox(e) {
//   var textBox = document.createElement("textarea");
//   document.getElementById("canvasgg").appendChild(textBox);
// }

// function prepareImgCanvas(){
//   var imageLoader = document.getElementById("selectimg");
//   imageLoader.addEventListener("change", handleImage, false);
//   var imgcanvas = document.getElementById("imageCanvas");
//   parentSize = imgcanvas.parentNode.getBoundingClientRect();
//   imgcanvas = document.createElement('canvas');
//   imgcanvas.setAttribute('z-index', 10);
//   imgcanvas.setAttribute('cursor', 'pointer');
//   imgcanvas.setAttribute('id', 'canvas');
//   imgctx = imgcanvas.getContext("2d");
// }

// function handleImage(e){
//   var reader = new FileReader();
//   reader.onload = function(event){
//     var img = new Image();
//     img.onload = function(){
//         // imgcanvas.width = 50;
//         // imgcanvas.height = 50;
//         imgcanvas.setAttribute('width', 150);
//         imgcanvas.setAttribute('height', 150);
//         imgctx.drawImage(img,0,0);
//     }
//     img.src = event.target.result;
//   }
//   reader.readAsDataURL(e.target.files[0]);     
// }

function clearCanvas(e) {
  ctx.clearRect(0, 0, 400, 500);
}

function draw(e, ui) {
  e.preventDefault();
  clientX = e.touches[0].clientX +14;
  clientY = e.touches[0].clientY -90;
  if(lastPt!=null) {
    ctx.beginPath();
    ctx.moveTo(lastPt.x, lastPt.y );
    ctx.lineTo(clientX, clientY);
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  lastPt = {x:clientX, y:clientY};
  console.log('pen Down');
}

function end(e, ui) {
  e.preventDefault();
  // Terminate touch path
  lastPt=null;
  console.log('pen Up');
}

function changeColorGreen() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "green";
  return false;
} 
function changeColorPurple() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "purple";
  return false;
} 
function changeColorBlue() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "blue";
  return false;
} 
function changeColorYellow() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "yellow";
  return false;
} 
function changeColorOrange() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "orange";
  return false;
} 
function changeColorRed() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  return false;
} 
function changeColorBlack() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  return false;
} 
function changeSizeNormal() {
  ctx.lineWidth = 4;
  return false;
} 
function changeSizeBig() {
  ctx.lineWidth = 8;
  return false;
} 
function Earser() {
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.globalCompositeOperation = "destination-out";  
  ctx.strokeStyle = ("rgba(255,255,255,255)");
  ctx.fillStyle = 'rgba(255,0,0,0)';
  ctx.lineWidth = 14;
  return false;
} 

function setNoteName() {
  var modal = document.getElementById('namingModal');
  modal.style.display = "block";
}

function saveNoteToImg() {
  var canvas = document.querySelector( 'canvas' );
  var saveBTN = document.getElementById('confirmBTN');
  var noteImg = canvas.toDataURL('image/png');
  var Gname = localStorage.getItem('groupEntry');
  var NoteName = document.getElementById('nName').value;
  var modal = document.getElementById('namingModal');
  modal.style.display = "none";

  var NoteRef = firebase.database().ref('Note');
  NoteRef.push({
    noteName: NoteName,
    noteUrl: noteImg,
    GroupName: Gname
  });

  location.href = '/note_page';
}
// function text() {
//   var textArea = document.getElementsByTagName("textarea")[0];
//   ctx.fillText(textArea.value, 40, 60);
// }