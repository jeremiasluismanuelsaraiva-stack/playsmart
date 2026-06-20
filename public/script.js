console.log("SCRIPT CARREGADO");


const resultado = document.getElementById("resultado");

let historico = [];
let atual = -1;



async function baixar(tipo){


const url = document.getElementById("url").value.trim();


if(!url){

alert("Cole um link");

return;

}



resultado.innerHTML = `

<div class="card">

⏳ A processar...

</div>

`;



try{


const resposta = await fetch(

"/api/baixar?url="+
encodeURIComponent(url)+
"&tipo="+tipo

);



const texto = await resposta.text();


const data = JSON.parse(texto);



if(!data.sucesso){

throw new Error(data.erro);

}




// guardar no histórico

historico.push({

url:url,

download:data.download,

tipo:tipo,

nome:
data.title ||
data.titulo ||
"Vídeo"

});



atual = historico.length - 1;



mostrarPlayer(historico[atual]);



}catch(e){


resultado.innerHTML = `

<div class="card">

❌ ${e.message}

</div>

`;

}


}





function mostrarPlayer(item){


if(item.tipo==="audio"){


resultado.innerHTML = `

<div class="card">


<h2>🎵 ${item.nome}</h2>


<audio controls autoplay>

<source src="${item.download}"
type="audio/mpeg">

</audio>



<br>


<button onclick="anterior()">
⏮️ Anterior
</button>


<button onclick="proximo()">
⏭️ Próximo
</button>


</div>

`;



}else{


resultado.innerHTML = `

<div class="card">


<h2>🎬 ${item.nome}</h2>



<video

controls

autoplay

playsinline

src="${item.download}">

</video>



<br>


<button onclick="anterior()">
⏮️ Anterior
</button>


<button onclick="proximo()">
⏭️ Próximo
</button>



</div>

`;

}



}




function proximo(){


if(atual < historico.length - 1){

atual++;

mostrarPlayer(
historico[atual]
);


}else{

alert("Não existe próximo vídeo");

}


}





function anterior(){


if(atual > 0){

atual--;

mostrarPlayer(
historico[atual]
);


}else{

alert("É o primeiro vídeo");

}


}




function baixarAudio(){

baixar("audio");

}



function baixarVideo(){

baixar("video");

}
