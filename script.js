// variaveis da aba pokemon
const pokemonLink = document.getElementById("pokemon-link");
const pokemonContainer = document.getElementById("pokemon-container");
const pokemonList = document.getElementById("pokemon-list");
const modal = document.getElementById("pokemon-modal");
const modalClose = document.getElementById("modal-close");
const fetchPokemonButton = document.getElementById("fetch-pokemon");
const modalResult = document.getElementById("modal-result");
const pokemonInput = document.getElementById("pokemon-input");
// variaveis da aba mapa
const mapLink = document.querySelector('.header a[href="#map-link"]');
const mapContainer = document.getElementById("map-container");
const mapList = document.getElementById("map-list");
const mapModal = document.getElementById("map-modal");
const mapModalClose = document.getElementById("map-modal-close");
const fetchLocationButton = document.getElementById("fetch-location");
const locationModalResult = document.getElementById("location-modal-result");
const locationInput = document.getElementById("location-input");

async function fetchPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=18");
        const data = await response.json();

        pokemonList.innerHTML = data.results.map(pokemon => `
            <div class="pokemon-card" data-url="${pokemon.url}">
                <strong>${pokemon.name}</strong>
            </div>
        `).join('');

        const otherPokemonButton = `
            <button id="search-button" style="margin: 20px; padding: 10px; background-color: orange; color: black; border: none; 
            cursor: pointer; font-family: Bebas Neue; font-size: 15px;">Outro Pokémon</button>`;
        pokemonList.innerHTML += otherPokemonButton;

        document.querySelectorAll(".pokemon-card").forEach(card => {
            card.addEventListener("click", async () => {
                const url = card.getAttribute("data-url");
                await fetchPokemonDetails(url);
            });
        });

        document.getElementById("search-button").addEventListener("click", () => {
            modal.style.display = "flex";
            modalResult.innerHTML = "Nenhum resultado ainda.";
            pokemonInput.value = "";
        });
    } catch (error) {
        pokemonList.innerHTML = "<p>Erro ao carregar os Pokémon.</p>";
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const pokemon = await response.json();

        pokemonList.innerHTML = `
            <div style="margin: 20px;">
                <h2>${pokemon.name.toUpperCase()}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="width: 250px; height: 250px;">
                <h3>Habilidades:</h3>
                <ul>
                    ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                </ul>
                <button id="back-button">Voltar</button>
            </div>
        `;

        document.getElementById("back-button").addEventListener("click", fetchPokemons);
    } catch (error) {
        pokemonList.innerHTML = "<p>Erro ao carregar os detalhes do Pokémon.</p>";
    }
}

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

fetchPokemonButton.addEventListener("click", async () => {
    const pokemonName = pokemonInput.value.trim().toLowerCase();

    if (!pokemonName) {
        modalResult.innerHTML = "<p>Por favor, digite o nome de um Pokémon.</p>";
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemon = await response.json();

        modalResult.innerHTML = `
            <div>
                <h2>${pokemon.name.toUpperCase()}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="width: 250px; height: 250px">
                <h3>Habilidades:</h3>
                <ul>
                    ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                </ul>
            </div>
        `;
    } catch (error) {
        modalResult.innerHTML = "<p>Pokémon não encontrado. Tente novamente.</p>";
    }
});

pokemonLink.addEventListener("click", (e) => {
    e.preventDefault();
    pokemonContainer.style.display = "block";
    fetchPokemons();
});

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
