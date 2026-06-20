const resultado = document.getElementById("resultado");


async function baixar(tipo){


const url =
document.getElementById("url").value.trim();



if(!url){

alert("Cole um link do YouTube");

return;

}



resultado.innerHTML = `

<div class="card">

⏳ A processar...

</div>

`;



try{


const res = await fetch(

`/api/baixar?url=${encodeURIComponent(url)}&tipo=${tipo}`

);



const data = await res.json();



if(!data.sucesso){

throw new Error(data.erro);

}




if(tipo==="audio"){


resultado.innerHTML = `

<div class="card">

<h3>✅ MP3 pronto</h3>

<br>

<audio controls autoplay width="100%">

<source src="${data.download}"
type="audio/mpeg">

</audio>


<br><br>


<a href="${data.download}" target="_blank">

⬇️ Baixar MP3

</a>


</div>

`;



}else{


resultado.innerHTML = `

<div class="card">

<h3>✅ Vídeo pronto</h3>


<br>


<video controls autoplay width="100%">

<source src="${data.download}"
type="video/mp4">

</video>


<br><br>


<a href="${data.download}" target="_blank">

⬇️ Baixar MP4

</a>


</div>

`;

}


}catch(e){


resultado.innerHTML = `

<div class="card">

❌ ${e.message}

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
