const fetch=require("node-fetch");


const API =
"https://api.cyberhost.online";


const KEY =
"cyber_f857ee31300990f3451d1a6826f9913b74d52f0a";



module.exports=async(req,res)=>{


try{


let url=req.query.url;

let tipo=req.query.tipo;



let r =
await fetch(

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




let data =
await r.json();





if(!data.file){

return res.json({

erro:"CyberHost sem ficheiro"

});

}




let link =
data.file.startsWith("http")
?
data.file
:
API+"/youtube"+data.file;





res.json({

download:link

});




}catch(e){


res.json({

erro:e.message

});


}


}
