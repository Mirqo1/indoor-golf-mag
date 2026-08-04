// Funkcia na odstránenie diakritiky (Gólf -> Golf)
const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

// Simulácia načítania článkov (neskôr z articles.json)
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');

    // Event listener pre vyhľadávanie
    searchInput.addEventListener('input', (e) => {
        const query = normalizeString(e.target.value);
        console.log("Searching for:", query);
        
        // Tu neskôr prepojíme vyhľadávanie s articles.json
        if (query.length > 2) {
            // Logika pre hľadanie v JSON objekte
        }
    });
});

console.log("Indoor Golf Mag - Script loaded and ready.");