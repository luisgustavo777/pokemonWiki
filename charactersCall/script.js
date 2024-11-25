const characterHistories = {
    "Ash Ketchum": "Ash Ketchum é o protagonista da série Pokémon, conhecido por sua busca para se tornar um mestre Pokémon.",
    "James Rocket": "James é um membro da equipe Rocket, sempre tentando capturar Pikachu para o chefe Giovanni.",
    "Misty": "Misty é a líder do ginásio de Cerulean e uma das primeiras amigas de Ash em sua jornada.",
    "Brock": "Brock é o líder de ginásio de Pewter, especializado em Pokémon do tipo Pedra, e acompanha Ash em várias de suas aventuras.",
    "Jessie Rocket": "Jessie é a outra integrante da equipe Rocket, sempre tentando atrapalhar as aventuras de Ash e seus amigos."
};

function hideAllTabs() {
    const pokemonContainer = document.getElementById("pokemon-container");
    const mapContainer = document.getElementById("map-container");
    const charactersContainer = document.getElementById("characters-container");
    
    pokemonContainer.style.display = "none";
    mapContainer.style.display = "none";
    charactersContainer.style.display = "none";
}

document.getElementById("characters-link").addEventListener("click", function(event) {
    event.preventDefault();
    
    hideAllTabs();

    const charactersContainer = document.getElementById("characters-container");
    charactersContainer.style.display = charactersContainer.style.display === "none" ? "block" : "none";
});

document.querySelectorAll(".character-card").forEach(function(card) {
    card.addEventListener("click", function() {
        const characterName = card.dataset.character;
        const embedId = card.dataset.embedId;
        document.getElementById("character-name").textContent = characterName;

        const iframeSrc = `https://sketchfab.com/models/${embedId}/embed`;
        const sketchfabEmbed = `<iframe title="${characterName}" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="${iframeSrc}"></iframe>`;
        
        document.getElementById("sketchfab-embed-container").innerHTML = sketchfabEmbed;

        document.getElementById("character-modal").style.display = "flex";
    });
});

document.getElementById("character-modal-close").addEventListener("click", function() {
    document.getElementById("character-modal").style.display = "none";
    document.getElementById("sketchfab-embed-container").innerHTML = ""; 
});

document.querySelectorAll(".history-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const characterName = button.dataset.character;
        
        document.getElementById("history-modal").style.display = "flex";
        document.getElementById("history-modal-name").textContent = 'Sobre';
        document.getElementById("history-modal-history").textContent = characterHistories[characterName] || "História não encontrada.";
    });
});

document.getElementById("history-modal-close").addEventListener("click", function() {
    document.getElementById("history-modal").style.display = "none";
});
