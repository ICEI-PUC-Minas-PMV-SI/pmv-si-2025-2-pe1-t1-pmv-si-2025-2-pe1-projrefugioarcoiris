const map = L.map('map').setView([-14.2350, -51.9253], 4);

// Adiciona o mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contribuidores'
}).addTo(map);

// Casas de acolhimento
const casas = [
    { nome: "Casa Arco-Íris (SP)", endereco: "Rua Liberdade, 123 - São Paulo, SP", coords: [-23.561684, -46.655981] },
    { nome: "Refúgio Diversidade (RJ)", endereco: "Av. Atlântica, 900 - Copacabana, RJ", coords: [-22.971177, -43.182543] },
    { nome: "Casa da Coragem (PE)", endereco: "Rua Aurora, 56 - Recife, PE", coords: [-8.062762, -34.880016] }
];

// Marcadores fixos
casas.forEach(casa => {
    L.marker(casa.coords)
        .addTo(map)
        .bindPopup(`<h6 style="color:#e94b94;">${casa.nome}</h6><p>${casa.endereco}</p>`);
});

let rotaAtual;