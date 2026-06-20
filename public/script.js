console.log("SCRIPT CARREGADO");


const resultado = document.getElementById("resultado");


async function baixar(tipo){

console.log("BOTAO CLICADO", tipo);


const url = document.getElementById("url").value.trim();


if(!url){

alert("Cole o link do YouTube");
return;

}



resultado.innerHTML = `
<div class="card">
⏳ Processando...
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


console.log("RESPOSTA:", texto);



let data;


try{

data = JSON.parse(texto);

}catch(e){

throw new Error(texto);

}



if(!data.sucesso){

throw new Error(data.erro);

}



resultado.innerHTML = `

<div class="card">

✅ Pronto

<br><br>

<a href="${data.download}" target="_blank">

⬇️ Abrir download

</a>

</div>

`;


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
