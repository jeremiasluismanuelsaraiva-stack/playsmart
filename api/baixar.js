const fetch = require("node-fetch");


const API_CYBERHOST = "https://api.cyberhost.online";

const API_KEY_CYBERHOST = "cyber_f857ee31300990f3451d1a6826f9913b74d52f0a";


async function cyberPost(endpoint, body = {}) {

    const res = await fetch(
        `${API_CYBERHOST}${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                api_key: API_KEY_CYBERHOST,
                ...body
            })
        }
    );


    const data = await res.json();

    return data;
}



module.exports = async (req, res) => {

    try {


        const { url, tipo } = req.query;


        if (!url) {

            return res.json({
                sucesso: false,
                erro: "Sem link do YouTube"
            });

        }



        const data = await cyberPost(
            "/youtube/download",
            {

                url: url,

                type:
                    tipo === "video"
                    ? "video"
                    : "audio",


                format:
                    tipo === "video"
                    ? "mp4"
                    : "mp3",


                quality: "720"

            }
        );



        if (!data.file) {

            return res.json({
                sucesso:false,
                erro:"CyberHost não retornou arquivo",
                resposta:data
            });

        }



        let link = data.file;



        if (!link.startsWith("http")) {

            link =
            `${API_CYBERHOST}/youtube${link}`;

        }



        res.json({

            sucesso:true,

            download:link

        });



    } catch (e) {


        res.json({

            sucesso:false,

            erro:e.message

        });


    }

};
