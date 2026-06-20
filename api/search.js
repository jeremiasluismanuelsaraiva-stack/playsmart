const fetch = require("node-fetch");


module.exports = async (req,res)=>{


res.setHeader("Content-Type","application/json");


try{


return res.json({

ok:true,

mensagem:"search funcionando"

});


}catch(e){


return res.status(500).json({

erro:e.message

});


}


};
