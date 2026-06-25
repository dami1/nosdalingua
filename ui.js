function drawUI(){
 noFill();strokeWeight(3);
 for(const e of electrodes){
   stroke(e.pressed?'#00cc66':'#666');
   if(e.pressed) fill(0,255,100,60); else noFill();
   circle(e.x,e.y,e.r*2);
 }
}