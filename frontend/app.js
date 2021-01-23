$(function(){
$("#slider").slider({
min:3,
max:30,
slide: function(events,ui){
$("#circle").width(ui.value);
$("#circle").height(ui.value);
}
});

// means we are not painting or erasing ,if painting or erasing set this o true
var paint = false;
// painting or erasing
var paint_erase = "paint";
// get the canvas and context
var canvas = document.getElementById("paint");
// get the canvas container
var ctx = canvas.getContext("2d");
// get the canvas container
var container = $("#container");
// mouse position
var mouse = {x:0,y:0};
//onload saved work from localstorage
if(localStorage.getItem("imgCanvas") != null){
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0);
  }
  img.src = localStorage.getItem("imgCanvas");
};
// set drawing parameters(linewidth,linejoin,linecap)
ctx.lineWidth = 3;
ctx.lineJoin = "round";
ctx.lineCap = "round";
// click inside container
container.mousedown(function(e){
paint = true;
ctx.beginPath();
mouse.x = e.pageX - this.offsetLeft;
mouse.y = e.pageY - this.offsetTop;
ctx.moveTo(mouse.x, mouse.y);
});
// move the mouse while holding mouse key..
container.mousemove(function(e){
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
  if(paint == true){
    if(paint_erase == "paint"){
      // get color input
      ctx.strokeStyle = $("#paintColor").val();
    }else{
      // white color
      ctx.strokeStyle = "white";
    }
    ctx.lineTo(mouse.x,mouse.y);
    ctx.stroke();
  }
});
// mouse up we are not painting erasing anymore
container.mouseup(function(){
  paint = false;
});
// if we leave the container ,we are not painting or erasing anymore
container.mouseleave(function(){
  paint = false;
});

// click on the reset button
$("#reset").click(function(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
paint_erase = "paint";
$("#erase").removeClass("#eraseMode");
});

// click on the save button
$("#save").click(function(){
if(typeof(localStorage) != null){
  localStorage.setItem("imgCanvas",canvas.toDataURL());
}else{
  window.alert("your browser does not support local storage");
}
});

// click on the erase button
$("#erase").click(function(){
if(paint_erase == "paint"){
  paint_erase = "erase";
}else{
  paint_erase = "paint";
}
$(this).toggleClass("#eraseMode");
});


// change color input2
$("#paintColor").change(function(){
$("#circle").css("background-color",$(this).val());
});


// change linwidth using slider
$("#slider").slider({
min:3,
max:30,
slide: function(events,ui){
$("#circle").width(ui.value);
$("#circle").height(ui.value);
ctx.lineWidth = ui.value;
}
});


//





document.querySelector('button').addEventListener('click', function() {
  html2canvas(document.querySelector('.specific'), {
    onrendered: function(canvas) {
      // document.body.appendChild(canvas);
      return Canvas2Image.saveAsPNG(canvas);
    }
  });
});








});
