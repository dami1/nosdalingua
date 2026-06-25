let sounds=[];
function preloadAudio(){
 soundFormats('mp3');
 for(let i=1;i<=29;i++){
   sounds[i]=loadSound('assets/audio/'+nf(i,4)+'.mp3');
 }
}
function playFile(n){
 if(sounds[n]){
   for(let i=1;i<=29;i++) if(sounds[i]&&sounds[i].isPlaying()) sounds[i].stop();
   sounds[n].play();
   console.log('Tocando',nf(n,4)+'.mp3');
 }
}