var canvas;
var ctx;
var lastPt = new Object();
var clientX, clientY;   

function prepareCanvas() {
  var canvas = document.getElementById("canvasDiv");
  parentSize = canvas.parentNode.getBoundingClientRect();
  canvas.addEventListener("touchmove", draw, false);
  canvas.addEventListener("touchend", end, false);
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

function draw(e, ui) {
  e.preventDefault();
  clientX = e.touches[0].clientX +14;
  clientY = e.touches[0].clientY -90;
  if(lastPt!=null) {
    ctx.beginPath();
    ctx.moveTo(lastPt.x, lastPt.y );
    ctx.lineTo(clientX, clientY);
    ctx.stroke();
  }
  lastPt = {x:clientX, y:clientY};
  console.log('pen Down');
}

function end(e) {
  e.preventDefault();
  // Terminate touch path
  lastPt=null;
  console.log('pen Up');
}

function changeColorGreen() {
  ctx.strokeStyle = "green";
  return false;
} 
function changeColorBlue() {
  ctx.strokeStyle = "blue";
  return false;
} 
function changeColorYellow() {
  ctx.strokeStyle = "yellow";
  return false;
} 
function changeColorOrange() {
  ctx.strokeStyle = "orange";
  return false;
} 
function changeColorRed() {
  ctx.strokeStyle = "red";
  return false;
} 
function changeColorBlack() {
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