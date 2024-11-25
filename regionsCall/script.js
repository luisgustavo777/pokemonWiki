// variaveis da aba mapa
const mapLink = document.querySelector('.header a[href="#map-link"]');
const mapContainer = document.getElementById("map-container");
const mapList = document.getElementById("map-list");
const mapModal = document.getElementById("map-modal");
const mapModalClose = document.getElementById("map-modal-close");
const fetchLocationButton = document.getElementById("fetch-location");
const locationModalResult = document.getElementById("location-modal-result");
const locationInput = document.getElementById("location-input");

async function fetchLocations() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/location?limit=18");
        const data = await response.json();

        mapList.innerHTML = data.results.map(location => `
            <div class="map-card" data-url="${location.url}">
                <strong>${location.name}</strong>
            </div>
        `).join('');

        const otherLocationButton = `
            <button id="search-location-button" style="margin: 20px; padding: 10px; background-color: orange; color: black; border: none; 
            cursor: pointer; font-family: Bebas Neue; font-size: 15px;">Outra Localização</button>`;
        mapList.innerHTML += otherLocationButton;

        document.querySelectorAll(".map-card").forEach(card => {
            card.addEventListener("click", async () => {
                const url = card.getAttribute("data-url");
                await fetchLocationDetails(url);
            });
        });

        document.getElementById("search-location-button").addEventListener("click", () => {
            mapModal.style.display = "flex";
            locationModalResult.innerHTML = "Nenhum resultado ainda.";
            locationInput.value = "";
        });
    } catch (error) {
        mapList.innerHTML = "<p>Erro ao carregar as localizações.</p>";
    }
}

async function fetchLocationDetails(url) {
    try {
        const response = await fetch(url);
        const location = await response.json();

        mapList.innerHTML = `
            <div style="margin: 20px;">
                <h2>${location.name.toUpperCase()}</h2>
                <h3>Região: ${location.region.name}</h3>
                <h3>Áreas:</h3>
                <ul>
                    ${location.areas.map(area => `<li>${area.name}</li>`).join('')}
                </ul>
                <button id="back-to-locations">Voltar</button>
            </div>
        `;

        document.getElementById("back-to-locations").addEventListener("click", fetchLocations);
    } catch (error) {
        mapList.innerHTML = "<p>Erro ao carregar os detalhes da localização.</p>";
    }
}

mapModalClose.addEventListener("click", () => {
    mapModal.style.display = "none";
});

fetchLocationButton.addEventListener("click", async () => {
    const locationName = locationInput.value.trim().toLowerCase();

    if (!locationName) {
        locationModalResult.innerHTML = "<p>Por favor, digite o nome de uma localização.</p>";
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/location/${locationName}`);
        const location = await response.json();

        locationModalResult.innerHTML = `
            <div>
                <h2>${location.name.toUpperCase()}</h2>
                <h3>Região: ${location.region.name}</h3>
                <h3>Áreas:</h3>
                <ul>
                    ${location.areas.map(area => `<li>${area.name}</li>`).join('')}
                </ul>
            </div>
        `;
    } catch (error) {
        locationModalResult.innerHTML = "<p>Localização não encontrada. Tente novamente.</p>";
    }
});

mapLink.addEventListener("click", (e) => {
    e.preventDefault();
    mapContainer.style.display = "block";
    fetchLocations();
});

function hideAllTabs() {
    pokemonContainer.style.display = "none";
    mapContainer.style.display = "none";
}

pokemonLink.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllTabs();
    pokemonContainer.style.display = "block";
    fetchPokemons();
});

mapLink.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllTabs();
    mapContainer.style.display = "block";
    fetchLocations(); 
});