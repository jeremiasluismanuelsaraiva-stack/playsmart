console.log("SCRIPT CARREGADO");


const resultado = document.getElementById("resultado");



async function baixar(tipo){


const url = document.getElementById("url").value.trim();



if(!url){

alert("Cole link YouTube, TikTok ou Facebook");

return;

}



resultado.innerHTML = `

<div class="card">

⏳ A processar...

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

throw new Error(
data.erro || "Erro desconhecido"
);

}





const titulo =
data.title ||
data.titulo ||
"Vídeo";


const cantor =
data.artist ||
data.artista ||
"Desconhecido";







if(tipo === "audio"){


resultado.innerHTML = `

<div class="card">


<h2>🎵 ${titulo}</h2>


<p>🎤 ${cantor}</p>



<audio 
controls 
autoplay
style="width:100%;">

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



}

else{



resultado.innerHTML = `


<div class="card">


<h2>🎬 ${titulo}</h2>


<p>🎤 ${cantor}</p>




<video

controls

autoplay

playsinline

style="width:100%;"

src="${data.download}">


Seu navegador não suporta vídeo.


</video>




<br><br>



<a 

href="${data.download}"

target="_blank">


⬇️ Abrir Vídeo


</a>



</div>


`;



}





}catch(e){



resultado.innerHTML = `

<div class="card">

❌ Erro:

<br>

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
