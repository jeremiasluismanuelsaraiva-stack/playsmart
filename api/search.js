const fetch = require("node-fetch");


const API_CYBERHOST = "https://api.cyberhost.online";
const API_KEY_CYBERHOST = "cyber_f857ee31300990f3451d1a6826f9913b74d52f0a";


module.exports = async (req,res)=>{


try{


const q = req.query.q;


if(!q){

return res.json([]);

}



const resposta = await fetch(
`${API_CYBERHOST}/youtube/search`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

api_key:API_KEY_CYBERHOST,

query:q,

limit:10

})

});



const data = await resposta.json();



let resultados =
data.results ||
data.data ||
data;



let musicas = resultados.map(x=>({


nome:
x.title ||
x.titulo ||
"Sem título",


artista:
x.artist ||
x.channel ||
"Desconhecido",


audio:
x.url ||
x.link ||
x.video,


video:
x.url ||
x.link ||
x.video



}));



res.json(musicas);



}catch(e){


res.status(500).json({

erro:e.message

});


}


};
