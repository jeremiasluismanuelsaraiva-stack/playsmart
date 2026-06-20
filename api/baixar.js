const fetch = require("node-fetch");


const API = "https://api.cyberhost.online";

const KEY = "cyber_f857ee31300990f3451d1a6826f9913b74d52f0a";


module.exports = async(req,res)=>{


try{


const url = req.query.url;
const tipo = req.query.tipo || "audio";


if(!url){

return res.json({
erro:"Sem link"
});

}



const r = await fetch(

API+"/youtube/download",

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

});


const texto = await r.text();


console.log(texto);



let data;


try{

data = JSON.parse(texto);

}catch(e){

return res.json({

erro:"CyberHost respondeu inválido",
resposta:texto

});

}



if(!data.file){

return res.json({

erro:"CyberHost sem ficheiro",

dados:data

});

}



const link =
data.file.startsWith("http")
?
data.file
:
API+"/youtube"+data.file;



return res.json({

sucesso:true,

download:link

});



}catch(e){


return res.json({

erro:e.message

});


}


}
