const fetch = require("node-fetch");


const API_CYBERHOST = "https://api.cyberhost.online";
const API_KEY_CYBERHOST = "SUA_API_KEY_AQUI";


async function cyberPost(endpoint, body={}){

const res = await fetch(
`${API_CYBERHOST}${endpoint}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

api_key:API_KEY_CYBERHOST,
...body

})
});


return await res.json();

}



module.exports = async (req,res)=>{


try{


const {url,tipo}=req.query;


if(!url){

return res.json({
sucesso:false,
erro:"Sem link"
});

}



const data = await cyberPost(
"/youtube/download",
{

url,

type:
tipo==="video"
?"video"
:"audio",

format:
tipo==="video"
?"mp4"
:"mp3",

quality:"720"

}
);



if(!data.file){

return res.json({
sucesso:false,
erro:"CyberHost não retornou arquivo"
});

}



const link =
data.file.startsWith("http")
?
data.file
:
`${API_CYBERHOST}/youtube${data.file}`;



res.json({

sucesso:true,

download:link

});



}catch(e){


res.json({

sucesso:false,

erro:e.message

});


}


}
