// variaveis da aba pokemon
const pokemonLink = document.getElementById("pokemon-link");
const pokemonContainer = document.getElementById("pokemon-container");
const pokemonList = document.getElementById("pokemon-list");
const modal = document.getElementById("pokemon-modal");
const modalClose = document.getElementById("modal-close");
const fetchPokemonButton = document.getElementById("fetch-pokemon");
const modalResult = document.getElementById("modal-result");
const pokemonInput = document.getElementById("pokemon-input");

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

function hideAllTabs() {
    pokemonContainer.style.display = "none";
    mapContainer.style.display = "none";
}
