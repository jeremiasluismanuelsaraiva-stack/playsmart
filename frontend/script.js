async function buscarMusica(nome = null) {
    const termo = nome || document.getElementById("busca").value;
    const res = await fetch(`/buscar?q=${encodeURIComponent(termo)}`);
    const lista = await res.json();
  
    const ul = document.getElementById("resultados");
  
    lista.forEach(m => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${m.titulo}</strong><br>
        Canal: ${m.canal}<br>
        <a href="${m.url}" target="_blank">▶ Assistir no YouTube</a>
        <div class="controls">
          <button onclick="baixar('${m.url}','audio')">🎧 Escutar</button>
          <button onclick="baixar('${m.url}','video')">📹 Baixar Vídeo</button>
        </div>
        <div id="player-${m.url}"></div>
      `;
      ul.appendChild(li);
    });
  }
  
  async function baixar(url, tipo) {
    const res = await fetch(`/baixar?url=${encodeURIComponent(url)}&tipo=${tipo}`);
    const data = await res.json();
  
    const playerDiv = document.getElementById(`player-${url}`);
    playerDiv.innerHTML = "";
  
    if (tipo === "audio") {
      playerDiv.innerHTML = `
        <audio controls autoplay>
          <source src="${data.download}" type="audio/mpeg">
          Seu navegador não suporta áudio.
        </audio>
      `;
    } else {
      playerDiv.innerHTML = `
        <video controls autoplay>
          <source src="${data.download}" type="video/mp4">
          Seu navegador não suporta vídeo.
        </video>
      `;
    }
  }
  
  // 🔥 Busca inicial automática com vários artistas
  window.onload = async () => {
    const artistas = ["Matuê", "Teto", "Kayblack", "WIU"];
    const ul = document.getElementById("resultados");
    ul.innerHTML = "";
  
    for (const artista of artistas) {
      await buscarMusica(artista);
    }
  };
  