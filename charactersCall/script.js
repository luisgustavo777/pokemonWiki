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
