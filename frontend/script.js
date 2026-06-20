const resultado = document.getElementById("resultados");


async function baixar(url, tipo) {

    resultado.innerHTML = `
    <li>
    ⏳ A preparar ${tipo}...
    </li>
    `;


    try {

        const res = await fetch(
            `/baixar?url=${encodeURIComponent(url)}&tipo=${tipo}`
        );

        const data = await res.json();


        if (!data.sucesso) {
            throw new Error(data.erro);
        }


        if (tipo === "audio") {

            resultado.innerHTML = `
            <li>

            ✅ MP3 pronto

            <br><br>

            <audio controls autoplay>
            <source src="${data.download}" type="audio/mpeg">
            </audio>

            <br>

            <a href="${data.download}" target="_blank">
            ⬇️ Baixar MP3
            </a>

            </li>
            `;


        } else {


            resultado.innerHTML = `
            <li>

            ✅ Vídeo pronto

            <br><br>

            <video controls autoplay width="100%">
            <source src="${data.download}" type="video/mp4">
            </video>

            <br>

            <a href="${data.download}" target="_blank">
            ⬇️ Baixar MP4
            </a>

            </li>
            `;

        }


    } catch(e){

        resultado.innerHTML = `
        <li>
        ❌ ${e.message}
        </li>
        `;

    }

}



function baixarAudio(){

    const url = document.getElementById("url").value;

    baixar(url,"audio");

}



function baixarVideo(){

    const url = document.getElementById("url").value;

    baixar(url,"video");

}
