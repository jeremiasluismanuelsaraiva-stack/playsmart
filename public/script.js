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
🎬 Assistir
</button>


</div>

`;

});


}





async function pesquisar(){


const q = 
document.getElementById("busca").value.trim();



if(!q){

alert("Digite música ou link");

return;

}



lista.innerHTML =
"⏳ A pesquisar...";



try{


const res = await fetch(

"/api/musica?q="+
encodeURIComponent(q)

);



const data = await res.json();



if(!data.length){

throw new Error("Nenhum resultado");

}



musicas = data;


render();



}catch(e){


lista.innerHTML =
"❌ "+e.message;


}


}






async function tocar(i){


atual = i;



titulo.innerHTML =
"⏳ Preparando "+musicas[i].nome;



try{


const res = await fetch(

"/api/baixar?url="+
encodeURIComponent(musicas[i].url)+
"&tipo=audio"

);



const data = await res.json();



if(!data.sucesso){

throw new Error(data.erro);

}



audio.src = data.download;



titulo.innerHTML =

"🎵 "+musicas[i].nome+
"<br>🎤 "+musicas[i].artista;



audio.play();



}catch(e){


alert(
"❌ "+e.message
);


}


}






function verVideo(i){


window.open(

musicas[i].url,

"_blank"

);


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
