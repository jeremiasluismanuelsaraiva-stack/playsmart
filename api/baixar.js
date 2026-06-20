const https = require("https");

const API_CYBERHOST = "https://api.cyberhost.online";
const API_KEY_CYBERHOST = "COLOCA_KEY_AQUI";


function postCyber(body){

return new Promise((resolve,reject)=>{


const data = JSON.stringify(body);


const req = https.request(
API_CYBERHOST + "/youtube/download",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Content-Length":Buffer.byteLength(data)
}
},
(res)=>{

let result="";


res.on("data",chunk=>{
result += chunk;
});


res.on("end",()=>{

try{

resolve(JSON.parse(result));

}catch(e){

reject(new Error(result));

}

});

});


req.on("error",reject);


req.write(data);

req.end();


});

}



module.exports = async (req,res)=>{


res.setHeader(
"Content-Type",
"application/json"
);



try{


const url = req.query.url;

const tipo = req.query.tipo || "audio";


if(!url){

return res.json({
sucesso:false,
erro:"Sem URL"
});

}



const data = await postCyber({

api_key:API_KEY_CYBERHOST,

url:url,

type:
tipo==="video"
?
"video"
:
"audio",

format:
tipo==="video"
?
"mp4"
:
"mp3",

quality:"720"

});



if(!data.file){

return res.json({

sucesso:false,

erro:"CyberHost sem ficheiro",

resposta:data

});

}



let link=data.file;


if(!link.startsWith("http")){

link =
API_CYBERHOST +
"/youtube" +
link;

}



return res.json({

sucesso:true,

download:link

});



}catch(e){


return res.status(500).json({

sucesso:false,

erro:e.message

});

}


};
