let img;
function preload(){
 img=loadImage('assets/peca.png');
 preloadAudio();
}
function setup(){createCanvas(1280,800);}
function draw(){
 background(240);
 if(img) image(img,0,0,width,height);
 drawUI();
}
function mousePressed(){
 for(const e of electrodes){
   if(dist(mouseX,mouseY,e.x,e.y)<e.r){
     e.pressed=!e.pressed;
     checkLogic();
   }
 }
}