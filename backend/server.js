const express = require("express");
const fetch = require("node-fetch");
const open = require("open").default;

const app = express();
const PORT = 3000;

const API_CYBERHOST = "https://api.cyberhost.online";
const API_KEY_CYBERHOST = "SUA_API_KEY_AQUI";

app.use(express.static("frontend"));

async function cyberPost(endpoint, body = {}) {
    const res = await fetch(`${API_CYBERHOST}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            api_key: API_KEY_CYBERHOST,
            ...body
        })
    });

    const data = await res.json();

    if (!res.ok || data.error || data.detail || data.status === false) {
        throw new Error(
            data.error ||
            data.detail ||
            data.message ||
            "Erro na API CyberHost"
        );
    }

    return data;
}

function montarArquivo(api, filePath) {
    if (!filePath) return null;

    if (filePath.startsWith("http")) {
        return filePath;
    }

    return `${API_CYBERHOST}/${api}${filePath}`;
}

app.get("/baixar", async (req, res) => {
    try {
        const { url, tipo } = req.query;

        if (!url) {
            return res.status(400).json({
                erro: "Informe o link do YouTube"
            });
        }

        let data;

        if (tipo === "video") {
            data = await cyberPost("/youtube/download", {
                url,
                type: "video",
                quality: "720"
            });
        } else {
            data = await cyberPost("/youtube/download", {
                url,
                type: "audio",
                format: "mp3"
            });
        }

        if (!data.file) {
            return res.status(400).json({
                erro: "A CyberHost não retornou arquivo"
            });
        }

        const download = montarArquivo("youtube", data.file);

        res.json({
            sucesso: true,
            tipo: tipo || "audio",
            download
        });

    } catch (e) {
        res.status(500).json({
            sucesso: false,
            erro: e.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado: http://localhost:${PORT}`);

    open(`http://localhost:${PORT}`);
});
