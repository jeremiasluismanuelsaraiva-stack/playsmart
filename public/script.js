const res = await fetch(
`/api/baixar?url=${encodeURIComponent(url)}&tipo=${tipo}`
);


const texto = await res.text();


let data;

try{

data = JSON.parse(texto);

}catch(e){

throw new Error(
"Servidor respondeu: " + texto
);

}
