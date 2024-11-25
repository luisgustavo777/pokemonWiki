document.getElementById('lore-button').addEventListener('click', function() {
    closeAllModals();
    document.getElementById('lore-modal').style.display = 'flex';
});

document.getElementById('lore-link').addEventListener('click', function(event) {
    event.preventDefault(); 
    closeAllModals();
    document.getElementById('lore-modal').style.display = 'flex';
});

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

document.getElementById('lore-modal-close').addEventListener('click', function() {
    document.getElementById('lore-modal').style.display = 'none';
});
