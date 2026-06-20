
const fetch=require("node-fetch");


const API="https://api.cyberhost.online";

const KEY="cyber_f857ee31300990f3451d1a6826f9913b74d52f0a";


module.exports=async(req,res)=>{


try{


let q=req.query.q;



if(!q){

return res.json([]);

}



// se for link

if(
q.includes("youtu.be") ||
q.includes("youtube.com")
){


return res.json([{

nome:"YouTube",

artista:"Link",

url:q

}]);


}




let r=await fetch(

API+"/youtube/search",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

api_key:KEY,

query:q,

limit:10

})

});


let data=await r.json();



let lista=data.results || data.data || [];



res.json(

lista.map(x=>({


nome:x.title || x.name,

artista:x.channel || "YouTube",

url:
x.url ||
x.link ||
x.videoUrl


}))

);



}catch(e){


res.status(500).json({

erro:e.message

});


}


}
