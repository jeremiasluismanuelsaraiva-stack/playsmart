console.log("SCRIPT CARREGADO");


let musicas = [];
let atual = 0;

const lista = document.getElementById("lista");
const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");


function render(){

lista.innerHTML = "";

musicas.forEach((m,i)=>{

lista.innerHTML += `

<div class="card">

<h3>🎵 ${m.nome}</h3>

<p>🎤 ${m.artista}</p>

<button onclick="tocar(${i})">
▶️ Escutar
</button>

<button onclick="verVideo(${i})">
🎬 Ver
</button>

</div>

`;

});

}



function tocar(i){

atual = i;

audio.src = musicas[i].audio;

titulo.innerHTML =
"🎵 " + musicas[i].nome;

audio.play();

}



function proxima(){

if(atual < musicas.length-1){

atual++;

tocar(atual);

}

}



function anterior(){

if(atual > 0){

atual--;

tocar(atual);

}

}



async function pesquisar(){


const q =
document.getElementById("busca").value.trim();



if(!q){

alert("Digite uma música");

return;

}



lista.innerHTML =
"⏳ A carregar...";



try{


// usa link do youtube na pesquisa
const url = q;



const res = await fetch(
"/api/baixar?url=" +
encodeURIComponent(url) +
"&tipo=audio"
);



const data = await res.json();



if(!data.sucesso){

throw new Error(data.erro);

}



musicas.push({

nome:q,

artista:"YouTube",

audio:data.download

});



render();



tocar(musicas.length-1);



}catch(e){


lista.innerHTML =
"❌ "+e.message;


}


}



function verVideo(i){


window.open(
musicas[i].audio,
"_blank"
);


}


render();
