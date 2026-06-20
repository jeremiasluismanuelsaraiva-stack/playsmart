console.log("SCRIPT CARREGADO");


let musicas = [];
let atual = 0;


const lista = document.getElementById("lista");
const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");



function mostrar(){


lista.innerHTML = "";


musicas.forEach((m,i)=>{


lista.innerHTML += `

<div class="card">


<h3>🎵 ${m.nome}</h3>

<p>🎤 ${m.artista}</p>


<button onclick="tocar(${i})">
▶️ Escutar
</button>


<button onclick="video(${i})">
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

alert("Digite cantor ou link");

return;

}



lista.innerHTML =
"⏳ A pesquisar...";



try{


const res = await fetch(

"/api/musica?q="+
encodeURIComponent(q)

);



const texto = await res.text();


console.log(
"RESPOSTA API:",
texto
);



let data;



try{

data = JSON.parse(texto);

}catch(e){

throw new Error(
"API respondeu: "+texto
);

}



if(data.erro){

throw new Error(data.erro);

}



musicas = data;



mostrar();



}catch(e){


lista.innerHTML =
"❌ "+e.message;


}


}







async function tocar(i){


atual = i;


titulo.innerHTML =
"⏳ A baixar áudio...";



try{


const res = await fetch(

"/api/baixar?url="+
encodeURIComponent(musicas[i].url)+
"&tipo=audio"

);



const texto =
await res.text();



let data;


try{

data = JSON.parse(texto);

}catch(e){

throw new Error(texto);

}



if(!data.download){

throw new Error(
data.erro || "Sem ficheiro"
);

}



audio.src = data.download;


titulo.innerHTML =

"🎵 "+musicas[i].nome+
"<br>🎤 "+musicas[i].artista;



audio.play();



}catch(e){


titulo.innerHTML =
"❌ "+e.message;


}


}






function video(i){


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
