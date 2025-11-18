
// --- MAPA BASE (ÚNICO!) ---
const map = L.map('map').setView([-14.2350, -51.9253], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contribuidores'
}).addTo(map);

// --- CASAS DE ACOLHIMENTO (FIXAS) ---
const casas = [
    // Elementos Originais (corrigidos para o formato [lat, lon] se necessário)
    { 
        "nome": "Casa Arco-Íris (SP)", 
        "endereco": "Rua Liberdade, 123 - São Paulo, SP", 
        "coords": [-23.561684, -46.655981] 
    },
    { 
        "nome": "Refúgio Diversidade (RJ)", 
        "endereco": "Av. Atlântica, 900 - Copacabana, RJ", 
        "coords": [-22.971177, -43.182543] 
    },
    { 
        "nome": "Casa da Coragem (PE)", 
        "endereco": "Rua Aurora, 56 - Recife, PE", 
        "coords": [-8.062762, -34.880016] 
    },
    
    // Novos Elementos (propriedades removidas e coords convertidas para [lat, lon])
    {
        "nome": "Casa 1",
        "endereco": "Rua Frederico Abranches, 136 - Santa Cecília",
        "coords": [-23.5465, -46.6471] 
    },
    {
        "nome": "GAPA-BA (Grupo de Apoio à Prevenção à AIDS da Bahia)",
        "endereco": "Endereço a verificar",
        "coords": [-12.9718, -38.5016] 
    },
    {
        "nome": "SOMOS - Comunicação, Saúde e Sexualidade",
        "endereco": "Endereço a verificar",
        "coords": [-30.0331, -51.2300] 
    },
    {
        "nome": "Instituto LGBT",
        "endereco": "Endereço a verificar",
        "coords": [-23.5500, -46.6333] 
    },
    {
        "nome": "Casa Nem",
        "endereco": "Endereço a verificar",
        "coords": [-8.0476, -34.8770] 
    },
    {
        "nome": "EternamenteSou (Centro de Referência idosos LGBT)",
        "endereco": "Endereço a verificar",
        "coords": [-23.5596, -46.6582] 
    },
    {
        "nome": "ABGLT - Associação Brasileira de Gays, Lésbicas e Transsexuais (afiliadas regionais)",
        "endereco": "Lista de afiliadas (várias cidades)",
        "coords": [-14.2350, -51.9253] 
    },
    {
        "nome": "Casa Florescer",
        "endereco": "Rua Prates, 1101 - Bom Retiro (verificar)",
        "coords": [-23.5412, -46.6468] 
    },
    {
        "nome": "Grupo Gay da Bahia (GGB)",
        "endereco": "Endereço a verificar",
        "coords": [-12.9750, -38.5020] 
    },
    {
        "nome": "Casa de Acolhimento Refúgio Diversidade (exemplo local)",
        "endereco": "Endereço a verificar",
        "coords": [-22.9712, -43.1825] 
    },
    {
        "nome": "Coletivo LGBT Local (exemplo)",
        "endereco": "Endereço a verificar",
        "coords": [-19.9208, -43.9378] 
    },
    {
        "nome": "Instituto Reviver LGBT (exemplo)",
        "endereco": "Endereço a verificar",
        "coords": [-8.0620, -34.8710] 
    },
    {
        "nome": "Projeto Acolher LGBT (exemplo)",
        "endereco": "Endereço a verificar",
        "coords": [-22.9099, -47.0626] 
    },
    {
        "nome": "Casa da Coragem (Casa de Acolhimento)",
        "endereco": "Rua Aurora, 56 (exemplo)",
        "coords": [-8.0627, -34.8800] 
    },
    {
        "nome": "Centro de Cidadania LGBT (exemplo)",
        "endereco": "Endereço a verificar",
        "coords": [-23.5580, -46.6540] 
    },
    {
        "nome": "ONG Diversidade e Direitos (exemplo)",
        "endereco": "Endereço a verificar",
        "coords": [-30.0340, -51.2250] 
    },
    {
        "nome": "Casa Miga (exemplo)",
        "endereco": "Endereço a verificar",
        "coords": [-23.5555, -46.6400] 
    },
    {
        "nome": "Centro de Apoio LGBT (exemplo)",
        "endereco": "Endereço a verificar",
        "coords": [-25.4290, -49.2719] 
    },
    {
        "nome": "Projeto Vida LGBT (exemplo)",
        "endereco": "Endereço a verificar",
        "coords": [-21.1699, -47.8103] 
    },
    {
        "nome": "Rede Nacional de Acolhimento LGBT (placeholder)",
        "endereco": "Lista consolidada (diversas cidades)",
        "coords": [-14.2350, -51.9253] 
    }
];

// --- MARCADORES DAS CASAS FIXAS ---
casas.forEach(casa => {
    L.marker(casa.coords)
        .addTo(map)
        .bindPopup(`<h6 style="color:#e94b94;">${casa.nome}</h6><p>${casa.endereco}</p>`);
});

// --- FUNÇÃO HAVERSINE (distância em km) ---
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// =======================================================
// === LOCALIZA USUÁRIO + OSM + GOOGLE (HÍBRIDO!) ===
// =======================================================
async function localizarUsuarioECasas() {
    if (!navigator.geolocation) {
        alert("Seu navegador não suporta geolocalização.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;

        // marcador do usuário
        L.marker([userLat, userLon], {
            icon: L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                iconSize: [40, 40]
            })
        }).addTo(map).bindPopup("Você está aqui!").openPopup();

        map.setView([userLat, userLon], 13);

        // === BUSCA OSM ===
        const casasAPI = await buscarCasasLGBT(userLat, userLon);

        casasAPI.forEach(c => {
            L.marker(c.coords, {
                icon: L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/2920/2920238.png",
                    iconSize: [35, 35]
                })
            })
                .addTo(map)
                .bindPopup(`<h6 style="color:#e94b94;">${c.nome}</h6><p>${c.endereco}</p>`);
        });

        // === BUSCA GOOGLE (NOVO!) ===
        const casasGoogle = await searchGooglePlaces(userLat, userLon);

        addGooglePlacesToMap(casasGoogle);

        // junta casas fixas + OSM + Google
        const todasCasas = [...casas, ...casasAPI, ...casasGoogle];

        // ordena por proximidade
        const casasOrdenadas = todasCasas
            .map(c => ({
                ...c,
                distancia: calcularDistancia(userLat, userLon, c.coords[0], c.coords[1])
            }))
            .sort((a, b) => a.distancia - b.distancia);

        atualizarListaCasas(casasOrdenadas);

        // marca a mais próxima
        L.circle(casasOrdenadas[0].coords, {
            radius: 300,
            color: "#e94b94"
        }).addTo(map);

    }, err => {
        console.log("Erro:", err);
        alert("Não foi possível obter sua localização.");
    });
}

// --- ATUALIZA LISTA NO HTML ---
function atualizarListaCasas(lista) {
    const div = document.getElementById("lista");
    if (!div) return;

    div.innerHTML = "<h3>Casas mais próximas:</h3>";

    lista.forEach(c => {
        div.innerHTML += `
            <div style="margin-bottom:10px; padding:10px; border-left:4px solid #e94b94;">
                <strong>${c.nome}</strong><br>
                ${c.endereco}<br>
                <small>Distância: ${c.distancia.toFixed(2)} km</small>
            </div>
        `;
    });
}

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
    localizarUsuarioECasas();
});
