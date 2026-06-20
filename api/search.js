


const fetch = require("node-fetch");

const API_CYBERHOST="https://api.cyberhost.online";
const API_KEY_CYBERHOST = "cyber_f857ee31300990f3451d1a6826f9913b74d52f0a";


module.exports = async(req,res)=>{

try{


const q=req.query.q;


const r=await fetch(
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


const data=await r.json();


const lista=data.results || data.data || [];


const resposta=lista.map(x=>({

nome:
x.title || x.name,


artista:
x.channel || "YouTube",


// AQUI é importante
url:
x.url ||
x.videoUrl ||
x.link ||
x.webpage_url

}));


res.json(resposta);



}catch(e){

res.status(500).json({
erro:e.message
});

}


};
