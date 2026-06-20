console.log("SCRIPT CARREGADO");


let musicas=[];
let atual=0;


const lista =
document.getElementById("lista");


const audio =
document.getElementById("audio");


const titulo =
document.getElementById("titulo");




function mostrar(){


lista.innerHTML="";


musicas.forEach((m,i)=>{


lista.innerHTML += `


<div class="card">


<h3>🎵 ${m.nome}</h3>


<p>🎤 ${m.artista}</p>


<button onclick="tocar(${i})">

▶️ Escutar

</button>


<button onclick="video(${i})">

🎬 Vídeo

</button>


</div>


`;

});


}







async function pesquisar(){



let q =
document.getElementById("busca").value.trim();



if(!q){

alert("Digite música ou link");

return;

}



lista.innerHTML="⏳ Pesquisando...";



try{


let res = await fetch(

"/api/musica?q="+
encodeURIComponent(q)

);



let texto =
await res.text();



let data =
JSON.parse(texto);



musicas=data;



mostrar();



}catch(e){


lista.innerHTML =
"❌ "+e.message;


}



}






async function tocar(i){


atual=i;



titulo.innerHTML =
"⏳ A preparar...";



let res =
await fetch(

"/api/baixar?url="+
encodeURIComponent(musicas[i].url)+
"&tipo=audio"

);



let data =
await res.json();



if(!data.download){

alert(data.erro);

return;

}



audio.src=data.download;


titulo.innerHTML =

"🎵 "+musicas[i].nome+
"<br>🎤 "+musicas[i].artista;



audio.play();



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


if(atual>0){

atual--;

tocar(atual);

}

}
