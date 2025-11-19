// Inicializa o mapa
const map = L.map('map').setView([-14.2350, -51.9253], 5);

// Camada base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// Lista de casas com coordenadas (formato correto!)
const casas = [
  { nome: "Casa 1", endereco: "R. Adoniran Barbosa, 151 - Bela Vista, São Paulo - SP", coords: [-23.555739, -46.646964] },

  { nome: "Casa Florescer", endereco: "Rua Prates, 1101 - Bom Retiro, São Paulo - SP", coords: [-23.518109, -46.633606] },

  { nome: "Centro de Cidadania LGBTI Luana Barbosa dos Reis", endereco: "R. Francisco Coelho, 23 - Jardim Santo Elias, São Paulo - SP", coords: [-23.510550, -46.750780] },

  { nome: "Centro de Acolhida Especial Casarão Brasil", endereco: "R. Igará-Paraná, 94 - Vila Emir, São Paulo - SP", coords: [-23.689170, -46.645030] },

  { nome: "Centro de Cidadania LGBTI Cláudia Wonder", endereco: "R. Alvarenga, 756 - Butantã, São Paulo - SP", coords: [-23.560680, -46.729790] },

  { nome: "Centro de Cidadania LGBT Laura Vermont", endereco: "Av. Nordestina, 496 - Vila Americana, São Paulo - SP", coords: [-23.501290, -46.415750] },

  { nome: "Centro de Referência LGBTI Edson Néris Zona Sul", endereco: "Estr. do Campo Limpo, 2690 - Campo Limpo, São Paulo - SP", coords: [-23.620250, -46.761820] },

  { nome: "EternamenteSOU", endereco: "R. Br. de Itapetininga, 255 - República, São Paulo - SP", coords: [-23.548340, -46.641350] },

  { nome: "Centro de Referência da Diversidade - Brunna Valin", endereco: "R. Maj. Sertório, 292 - República, São Paulo - SP", coords: [-23.540640, -46.648310] },

  { nome: "Casa Neon Cunha", endereco: "R. Luiz Ferreira da Silva, 183 - São Bernardo do Campo - SP", coords: [-23.690900, -46.558160] },

  { nome: "Casa Florescer 2", endereco: "R. Capricho, 872 - Vila Nivi, São Paulo - SP", coords: [-23.479540, -46.593750] },

  { nome: "Casa Chama", endereco: "R. Jandaia, 128 - Bela Vista, São Paulo - SP", coords: [-23.561998, -46.644880] },

  { nome: "Centro De Acolhida Especial Para Mulheres Transexuais", endereco: "Rua Prates, 1101 - Bom Retiro, São Paulo - SP", coords: [-23.518109, -46.633606] },

  // MINAS GERAIS
  { nome: "Centro de Referência e Acolhimento LGBT+", endereco: "Ouro Preto - MG", coords: [-20.385000, -43.503330] },

  { nome: "Centro de Referência LGBT BH - CRLGBT", endereco: "R. Curitiba, 481 - Belo Horizonte - MG", coords: [-19.923450, -43.938720] },

  { nome: "Kasulo - Centro LGBTQIA+", endereco: "R. Agnelo Macedo, 234 - Barreiro - BH", coords: [-19.977230, -44.019890] },

  { nome: "CELLOS MG", endereco: "Rua dos Tupinambás, 330 - Centro, BH", coords: [-19.918240, -43.940030] },

  { nome: "CRESP LGBTQIAP+", endereco: "R. Minas Gerais, 746 - Uberaba - MG", coords: [-19.749170, -47.931590] },

  { nome: "Brejo das Sapas", endereco: "R. Alagoas, 1468 - Funcionários - BH", coords: [-19.934490, -43.930710] },

  // ALAGOAS
  { nome: "CAERR", endereco: "R. Gen. Hermes, 278 - Centro - Maceió - AL", coords: [-9.665410, -35.735680] },

  // AMAZONAS
  { nome: "Casa Miga", endereco: "R. Silva Ramos, 839 - Centro - Manaus - AM", coords: [-3.125750, -60.021230] },

  // ARARAQUARA
  { nome: "Casa Ricardo Corrêa da Silva", endereco: "R. Voluntários da Pátria, 3328 - Araraquara - SP", coords: [-21.793510, -48.182200] },

  { nome: "Centro Nivaldo (Xuxa)", endereco: "Av. Espanha, 536 - Araraquara - SP", coords: [-21.785560, -48.177710] },

  // FORTALEZA
  { nome: "Outra Casa Coletiva", endereco: "R. Instituto do Ceará, 164 - Fortaleza - CE", coords: [-3.745330, -38.522720] },

  // BAHIA
  { nome: "Casarão da Diversidade", endereco: "R. do Tijolo, 8 - Salvador - BA", coords: [-12.971810, -38.508130] },

  { nome: "Centro LGBT Vida Bruno", endereco: "Av. Oceânica, 3731 - Salvador - BA", coords: [-13.004420, -38.505300] },

  { nome: "Casa Marielle Franco", endereco: "Ladeira da Fonte, 16 - Salvador - BA", coords: [-12.979700, -38.507000] },

  // RIO DE JANEIRO
  { nome: "CasaNem", endereco: "Rua Dois de Dezembro, 9 - Flamengo - RJ", coords: [-22.930840, -43.177960] },

  { nome: "Casinha Tijuca", endereco: "R. da Cascata, 64 – Tijuca - RJ", coords: [-22.931700, -43.238900] },

  { nome: "Conexão G", endereco: "R. Sgt. Silva Nunes, 1012 – Maré - RJ", coords: [-22.852280, -43.252180] },

  { nome: "LGBT+ Movimento", endereco: "R. Hermenegildo de Barros, 44 – Santa Teresa - RJ", coords: [-22.916950, -43.185620] },

  { nome: "Centro de Combate à LGBTIfobia RJ", endereco: "Av. Rio Branco, 135 - Centro - RJ", coords: [-22.909710, -43.176620] },
];

// Coloca as casas no mapa ao carregar
casas.forEach(casa => {
    L.marker(casa.coords)
        .addTo(map)
        .bindPopup(`<h6 style="color:#e94b94;">${casa.nome}</h6><p>${casa.endereco}</p>`);
});

//------------------------------------------------------
// BUSCAR CIDADE (OSM)
//------------------------------------------------------
async function buscarCidade(nomeCidade) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(nomeCidade)}&limit=1`;

    const resposta = await fetch(url);
    const dados = await resposta.json();
    if (dados.length === 0) {
        alert("Cidade não encontrada.");
        return null;
    }

    return { lat: parseFloat(dados[0].lat), lon: parseFloat(dados[0].lon) };
}

//------------------------------------------------------
// DISTÂNCIA
//------------------------------------------------------
function distancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
              Math.cos(lat1*Math.PI/180) *
              Math.cos(lat2*Math.PI/180) *
              Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

//------------------------------------------------------
// BOTÃO: buscar cidade + achar casas próximas
//------------------------------------------------------
document.getElementById("btnLocalizar").addEventListener("click", async () => {
    const campo = document.querySelector(".search-input");
    const cidade = campo.value.trim();

    if (cidade === "") {
        alert("Digite uma cidade.");
        return;
    }

    const pos = await buscarCidade(cidade);
    if (!pos) return;

    const userLat = pos.lat;
    const userLon = pos.lon;

    // Remove marcadores antigos (mantém o mapa)
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && !layer._icon.src) map.removeLayer(layer);
    });

    // Recarrega as casas
    casas.forEach(casa => {
        L.marker(casa.coords)
            .addTo(map)
            .bindPopup(`<h6 style="color:#e94b94;">${casa.nome}</h6><p>${casa.endereco}</p>`);
    });

    // Marca a cidade buscada
    L.marker([userLat, userLon])
        .addTo(map)
        .bindPopup(`📍 ${cidade}`)
        .openPopup();

    map.setView([userLat, userLon], 12);

    // Ordenar casas por proximidade
    const casasOrdenadas = casas
        .map(c => ({
            ...c,
            distancia: distancia(userLat, userLon, c.coords[0], c.coords[1])
        }))
        .sort((a, b) => a.distancia - b.distancia);

    // Mostrar só as 5 mais próximas
    casasOrdenadas.slice(0, 5).forEach(c => {
        L.marker(c.coords)
            .addTo(map)
            .bindPopup(`<h6 style="color:#e94b94;">${c.nome}</h6>${c.endereco}`);
    });

    alert("Casas mais próximas encontradas!");
});
