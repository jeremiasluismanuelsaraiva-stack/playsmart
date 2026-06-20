const API = "https://api.cyberhost.online";

const KEY = "cyber_f857ee31300990f3451d1a6826f9913b74d52f0a";


export default async function handler(req,res){

try{


const {url,tipo} = req.query;


if(!url){

return res.status(400).json({
erro:"Sem link"
});

}



const resposta = await fetch(

API + "/youtube/download",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

api_key:KEY,

url:url,

type:
tipo==="video"
?"video"
:"audio",

format:
tipo==="video"
?"mp4"
:"mp3",

quality:"720"

})

}

);



const data = await resposta.json();



if(!data.file){

return res.json({

erro:"CyberHost sem ficheiro",

retorno:data

});

}



let link = data.file;



if(!link.startsWith("http")){

link =
API+"/youtube"+link;

}



return res.json({

sucesso:true,

download:link

});



}catch(e){


return res.status(500).json({

erro:e.message

});


}


}
