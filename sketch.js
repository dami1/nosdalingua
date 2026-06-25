// =====================================================
// BLOCO 01 - VARIÁVEIS GLOBAIS
// =====================================================

// ---------- Arquivos ----------

let pieceImage;
let sounds = [];

let calibration = false;
let selectedElectrode = -1;

// ---------- Escala da imagem ----------

let imgX = 0;
let imgY = 0;

let imgW = 0;
let imgH = 0;

// ---------- Estados ----------

let currentFile = 0;
let currentRule = "";

let activeCategory = "";
let activeCountry = "";

// ---------- Categorias ----------

const categorias = [

"Poesia",
"Música",
"Letra",
"Língua"

];

// ---------- Países ----------
// ORDEM CORRIGIDA

const paises = [

"São Tomé e Príncipe",
"Moçambique",
"Cabo Verde",
"Angola",
"Guiné-Bissau"

];

// ---------- Arquivos ----------

const arquivosPorEletrodo = [

1,2,3,4,
5,6,7,8,9

];

const arquivosPorCombinacao = [

[10,11,12,13,14],

[15,16,17,18,19],

[20,21,22,23,24],

[25,26,27,28,29]

];

// ---------- Hotspots ----------

// coordenadas NORMALIZADAS
// serão multiplicadas pela largura
// e altura da imagem

let electrodes = [

{
id:0,
tipo:"categoria",
nome:"Poesia",

x:.50,
y:.34,

r:.032,

pressed:false
},

{
id:1,
tipo:"categoria",
nome:"Música",

x:.44,
y:.43,

r:.045,

pressed:false
},

{
id:2,
tipo:"categoria",
nome:"Letra",

x:.50,
y:.52,

r:.040,

pressed:false
},

{
id:3,
tipo:"categoria",
nome:"Língua",

x:.56,
y:.43,

r:.040,

pressed:false
},

// ---------- Países ----------

{
id:4,
tipo:"pais",
nome:"São Tomé e Príncipe",

x:.30,
y:.18,

r:.050,

pressed:false
},

{
id:5,
tipo:"pais",
nome:"Moçambique",

x:.70,
y:.18,

r:.050,

pressed:false
},

{
id:6,
tipo:"pais",
nome:"Cabo Verde",

x:.18,
y:.43,

r:.050,

pressed:false
},

{
id:7,
tipo:"pais",
nome:"Angola",

x:.82,
y:.43,

r:.050,

pressed:false
},

{
id:8,
tipo:"pais",
nome:"Guiné-Bissau",

x:.50,
y:.76,

r:.050,

pressed:false
}

];

// =====================================================
// BLOCO 02 - PRELOAD
// =====================================================

function preload(){

    pieceImage = loadImage("assets/peca.png");

    soundFormats("mp3");

    for(let i=1;i<=29;i++){

        let nome = nf(i,4)+".mp3";

        sounds[i]=loadSound("assets/audio/"+nome);

    }

}


// =====================================================
// BLOCO 03 - SETUP
// =====================================================

function setup(){

    createCanvas(windowWidth,windowHeight);

    imageMode(CORNER);

    textFont("Arial");

    noStroke();

}

// =====================================================
// BLOCO 04 - RESIZE
// =====================================================

function windowResized(){

    resizeCanvas(windowWidth,windowHeight);

}


// =====================================================
// BLOCO 05 - DRAW
// =====================================================

// =====================================================
// BLOCO 20 - DRAW FINAL
// =====================================================

function draw(){

    background(230);

    calculateImage();

    drawPiece();

    //drawHalos();

    //drawLabels();

    drawPanel();
    
    //drawCalibration();

}

// =====================================================
// BLOCO 06 - POSICIONAMENTO DA IMAGEM
// =====================================================

function calculateImage(){

    let margem=40;

    let maxW=width*0.70;

    let maxH=height-margem*2;

    let escala=min(

        maxW/pieceImage.width,

        maxH/pieceImage.height

    );

    imgW=pieceImage.width*escala;

    imgH=pieceImage.height*escala;

    imgX=margem;

    imgY=(height-imgH)/2;

}

// =====================================================
// BLOCO 07 - DESENHAR PEÇA
// =====================================================

function drawPiece(){
fill(255,0,0);
circle(mouseX,mouseY,8);
    image(

        pieceImage,

        imgX,

        imgY,

        imgW,

        imgH

    );

}


// =====================================================
// BLOCO 08 - COORDENADAS
// =====================================================

function hotspotX(e){

    return imgX+e.x*imgW;

}

function hotspotY(e){

    return imgY+e.y*imgH;

}

function hotspotRadius(e){

    return e.r*imgW;

}


// =====================================================
// BLOCO 09 - HOTSPOTS
// =====================================================

function drawHotspots(){

    strokeWeight(3);

    for(let e of electrodes){

        let x=hotspotX(e);

        let y=hotspotY(e);

        let r=hotspotRadius(e);

        if(e.pressed){

            stroke(0,255,120);

            fill(0,255,120,40);

        }

        else{

            stroke(180);

            noFill();

        }

        circle(x,y,r*2);

    }

}

// =====================================================
// BLOCO 10 - DETECÇÃO DOS HOTSPOTS
// =====================================================

function electrodeAt(px,py){

    for(let e of electrodes){

        let x=hotspotX(e);
        let y=hotspotY(e);
        let r=hotspotRadius(e);

        if(dist(px,py,x,y)<r){

            return e;

        }

    }

    return null;

}

// =====================================================
// BLOCO 11 - MOUSE
// =====================================================

function mousePressed(){

    let e=electrodeAt(mouseX,mouseY);

    if(e){

        e.pressed=!e.pressed;

        updateLogic();

    }

}

// =====================================================
// BLOCO 12 - TOUCH
// =====================================================

function touchStarted(){

    updateTouches();

    return false;

}

function touchMoved(){

    updateTouches();

    return false;

}

function touchEnded(){

    for(let e of electrodes){

        e.pressed=false;

    }

    updateLogic();

    return false;

}

function updateTouches(){

    for(let e of electrodes){

        e.pressed=false;

    }

    for(let t of touches){

        let e=electrodeAt(t.x,t.y);

        if(e){

            e.pressed=true;

        }

    }

    updateLogic();

}

// =====================================================
// BLOCO 13 - PARAR ÁUDIOS
// =====================================================

function stopAllSounds(){

    for(let i=1;i<=29;i++){

        if(sounds[i]){

            sounds[i].stop();

        }

    }

}

// =====================================================
// BLOCO 14 - PLAY
// =====================================================

function playFile(numero){

    if(currentFile==numero){

        return;

    }

    stopAllSounds();

    currentFile=numero;

    if(sounds[numero]){

        sounds[numero].play();

    }

}

// =====================================================
// BLOCO 15 - LÓGICA DO ARDUINO
// =====================================================

function updateLogic(){

    currentRule="";

    activeCategory="";

    activeCountry="";

    //-----------------------------------------
    // COMBINAÇÕES
    //-----------------------------------------

    for(let c=0;c<4;c++){

        for(let p=4;p<9;p++){

            if(

                electrodes[c].pressed &&

                electrodes[p].pressed

            ){

                let arquivo=

                arquivosPorCombinacao[c][p-4];

                playFile(arquivo);

                activeCategory=categorias[c];

                activeCountry=paises[p-4];

                currentRule=

                activeCategory+

                " + "+

                activeCountry;

                return;

            }

        }

    }

    //-----------------------------------------
    // PAÍSES
    //-----------------------------------------

    for(let p=4;p<9;p++){

        if(electrodes[p].pressed){

            playFile(

                arquivosPorEletrodo[p]

            );

            activeCountry=paises[p-4];

            currentRule=activeCountry;

            return;

        }

    }

    //-----------------------------------------
    // CATEGORIAS
    //-----------------------------------------

    for(let c=0;c<4;c++){

        if(electrodes[c].pressed){

            playFile(

                arquivosPorEletrodo[c]

            );

            activeCategory=categorias[c];

            currentRule=activeCategory;

            return;

        }

    }

    //-----------------------------------------

    currentFile=0;

    stopAllSounds();

}

// =====================================================
// BLOCO 16 - HALOS
// =====================================================

function drawHalos(){

    noStroke();

    let t = millis()*0.003;

    for(let e of electrodes){

        if(!e.pressed) continue;

        let x = hotspotX(e);
        let y = hotspotY(e);
        let r = hotspotRadius(e);

        let alpha = 70 + sin(t*2)*30;

        for(let i=5;i>0;i--){

            fill(0,255,180,alpha/i);

            circle(x,y,r*2.2+i*12);

        }

    }

}


// =====================================================
// BLOCO 17 - INDICADOR DOS SÍMBOLOS
// =====================================================

function drawLabels(){

    textAlign(CENTER,CENTER);

    textSize(14);

    fill(255);

    stroke(0);

    strokeWeight(2);

    for(let e of electrodes){

        if(!e.pressed) continue;

        text(

            e.nome,

            hotspotX(e),

            hotspotY(e)-45

        );

    }

    noStroke();

}

// =====================================================
// BLOCO 18 - PAINEL
// =====================================================

function drawPanel(){

    let px = imgX + imgW + 40;

    let py = 40;

    fill(35);

    rect(

        px,

        py,

        width-px-30,

        height-80,

        20

    );

    fill(255);

    textAlign(LEFT,TOP);

    textSize(26);

    text("NÓS DA LÍNGUA",px+20,py+20);

    textSize(16);

    fill(180);

    text("Categoria",px+20,py+80);

    fill(255);

    text(

        activeCategory==""?"-":activeCategory,

        px+20,

        py+105

    );

    fill(180);

    text("País",px+20,py+155);

    fill(255);

    text(

        activeCountry==""?"-":activeCountry,

        px+20,

        py+180

    );

    fill(180);

    text("Arquivo",px+20,py+230);

    fill(255);

    if(currentFile==0)

        text("-",px+20,py+255);

    else

        text(

            nf(currentFile,4)+".mp3",

            px+20,

            py+255

        );

    fill(180);

    text("Regra",px+20,py+305);

    fill(255);

    text(

        currentRule==""?"-":currentRule,

        px+20,

        py+330

    );

    drawBinary(px,py+410);

}


// =====================================================
// BLOCO 19 - BITS DO MPR121
// =====================================================

function drawBinary(px,py){

    fill(180);

    text("Eletrodos",px+20,py);

    let bits="";

    for(let e of electrodes){

        bits += e.pressed ? "1":"0";

    }

    textSize(28);

    fill(0,255,120);

    text(

        bits,

        px+20,

        py+40

    );

}

function drawCalibration(){

    if(!calibration) return;

    stroke(255,0,0);

    strokeWeight(2);

    noFill();

    for(let i=0;i<electrodes.length;i++){

        let e=electrodes[i];

        circle(

            hotspotX(e),

            hotspotY(e),

            hotspotRadius(e)*2

        );

        fill(255);

        noStroke();

        text(

            i,

            hotspotX(e),

            hotspotY(e)

        );

    }

}
