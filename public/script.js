console.log("SCRIPT CARREGADO");


let musicas=[];
let atual=0;


const lista=document.getElementById("lista");
const audio=document.getElementById("audio");
const titulo=document.getElementById("titulo");



function render(){


lista.innerHTML="";


musicas.forEach((m,i)=>{


lista.innerHTML+=`

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


let q=document.getElementById("busca").value.trim();



if(!q){

alert("Escreva algo");

return;

}



lista.innerHTML="⏳ A carregar...";



try{


let r=await fetch(

"/api/musica?q="+
encodeURIComponent(q)

);



let txt=await r.text();


let data=JSON.parse(txt);



musicas=data;


render();



}catch(e){


lista.innerHTML=

"❌ "+e.message;


}


}




async function tocar(i){


atual=i;


titulo.innerHTML="⏳ Baixando...";



let r=await fetch(

"/api/baixar?url="+
encodeURIComponent(musicas[i].url)+
"&tipo=audio"

);



let data=await r.json();



if(!data.download){

alert(data.erro);

return;

}



audio.src=data.download;


titulo.innerHTML=

"🎵 "+musicas[i].nome+
" | 🎤 "+musicas[i].artista;



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




function limpar(){

musicas=[];

lista.innerHTML="";

audio.src="";

titulo.innerHTML="Nenhuma música";

}
