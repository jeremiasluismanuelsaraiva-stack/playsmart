console.log("SCRIPT CARREGADO");


const resultado = document.getElementById("resultado");



async function baixar(tipo){


const url = document.getElementById("url").value.trim();



if(!url){

alert("Cole o link do YouTube");

return;

}



resultado.innerHTML = `

<div class="card">

⏳ A processar música...

</div>

`;



try{


const resposta = await fetch(

"/api/baixar?url=" +
encodeURIComponent(url) +
"&tipo=" +
tipo

);



const texto = await resposta.text();



console.log("RESPOSTA API:", texto);



let data;


try{

data = JSON.parse(texto);

}catch(e){

throw new Error(texto);

}




if(!data.sucesso){

throw new Error(data.erro);

}



const titulo =
data.title ||
data.titulo ||
"YouTube";



const cantor =
data.artist ||
data.artista ||
"Artista desconhecido";





if(tipo === "audio"){


resultado.innerHTML = `

<div class="card">


<h2>🎵 ${titulo}</h2>


<p>🎤 ${cantor}</p>



<audio controls autoplay style="width:100%;">

<source 
src="${data.download}"
type="audio/mpeg">

Seu navegador não suporta áudio.

</audio>



<br><br>



<a 
href="${data.download}"
target="_blank">

⬇️ Baixar MP3

</a>


</div>

`;



}else{


resultado.innerHTML = `


<div class="card">


<h2>🎬 ${titulo}</h2>


<p>🎤 ${cantor}</p>



<video controls autoplay width="100%">

<source
src="${data.download}"
type="video/mp4">

Seu navegador não suporta vídeo.

</video>



<br><br>



<a 
href="${data.download}"
target="_blank">

⬇️ Baixar MP4

</a>


</div>


`;

}



}catch(e){


resultado.innerHTML = `

<div class="card">

❌ Erro:

${e.message}

</div>

`;

}



}




function baixarAudio(){

baixar("audio");

}




function baixarVideo(){

baixar("video");

}
