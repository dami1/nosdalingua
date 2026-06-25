const arquivosPorEletrodo=[1,2,3,4,5,6,7,8,9];
const arquivosPorCombinacao=[
[10,11,12,13,14],
[15,16,17,18,19],
[20,21,22,23,24],
[25,26,27,28,29]
];
function checkLogic(){
 for(let c=0;c<4;c++){
   for(let p=4;p<9;p++){
     if(electrodes[c].pressed&&electrodes[p].pressed){
       playFile(arquivosPorCombinacao[c][p-4]);return;
     }
   }
 }
 for(let p=4;p<9;p++) if(electrodes[p].pressed){playFile(arquivosPorEletrodo[p]);return;}
 for(let c=0;c<4;c++) if(electrodes[c].pressed){playFile(arquivosPorEletrodo[c]);return;}
}