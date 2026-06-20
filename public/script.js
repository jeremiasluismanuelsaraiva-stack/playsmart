console.log("SCRIPT CARREGADO");


let musicas = [];
let atual = 0;


const lista = document.getElementById("lista");
const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");



// 🎯 EXEMPLO INICIAL (podes remover depois)
musicas = [
{
nome: "Matuê - Conexões",
artista: "Matuê",
audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
video: "https://www.w3schools.com/html/mov_bbb.mp4"
},
{
nome: "Teto - Sample",
artista: "Teto",
audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
video: "https://www.w3schools.com/html/movie.mp4"
},
{
nome: "WIU - Sample",
artista: "WIU",
audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
video: "https://www.w3schools.com/html/mov_bbb.mp4"
}
];



// 🔥 render lista
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


<button onclick="assistir(${i})">

🎬 Ver vídeo

</button>

</div>

`;

});

}



// ▶️ tocar música
function tocar(i){

atual = i;

audio.src = musicas[i].audio;

titulo.innerHTML = "🎵 " + musicas[i].nome;

audio.play();

}



// 🎬 assistir vídeo
function assistir(i){

atual = i;


lista.innerHTML = `

<div class="card">

<h2>${musicas[i].nome}</h2>

<video controls autoplay>

<source src="${musicas[i].video}" type="video/mp4">

</video>


<br><br>

<button onclick="render()">

⬅️ Voltar lista

</button>

</div>

`;

}



// ⏭️ próxima
function proxima(){

if(atual < musicas.length - 1){

atual++;

tocar(atual);

}

}



// ⏮️ anterior
function anterior(){

if(atual > 0){

atual--;

tocar(atual);

}

}



// 🔎 pesquisa (futuro API)
async function pesquisar(){

const q = document.getElementById("busca").value.trim();


if(!q) return;



lista.innerHTML = `<div class="card">🔎 A pesquisar...</div>`;



try{


const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);

const data = await res.json();


// se API existir
if(Array.isArray(data)){

musicas = data;

render();

return;

}



// fallback
lista.innerHTML = `<div class="card">❌ Sem resultados</div>`;


}catch(e){


// fallback offline
lista.innerHTML = `<div class="card">⚠️ API de pesquisa não ativa</div>`;


}

}



// iniciar
render();
