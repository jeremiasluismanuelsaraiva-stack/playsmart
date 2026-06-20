

const fetch = require("node-fetch");

const API_CYBERHOST = "https://api.cyberhost.online";
const API_KEY_CYBERHOST = "cyber_f857ee31300990f3451d1a6826f9913b74d52f0a";


module.exports = async (req,res)=>{

try{

const q = req.query.q;

if(!q){

return res.json([]);

}


const r = await fetch(
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


const data = await r.json();


const lista =
data.results ||
data.data ||
[];



const musicas = lista.map(x=>({


nome:
x.title ||
x.name ||
"Sem título",


artista:
x.channel ||
x.artist ||
"Desconhecido",


url:
x.url ||
x.videoUrl ||
x.link


}));



res.json(musicas);



}catch(e){


res.status(500).json({

erro:e.message

});


}

};
