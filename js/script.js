// Pomocná funkcia na odstránenie diakritiky
const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles-container');
    const searchInput = document.getElementById('search-input');

    // 1. Načítanie dát
    fetch('data/articles.json')
        .then(response => response.json())
        .then(data => {
            // Zoradenie podľa dátumu (zostupne)
            const sortedArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            renderArticles(sortedArticles);

            // Nastavenie vyhľadávania
            searchInput.addEventListener('input', (e) => {
                const query = normalizeString(e.target.value);
                const filtered = sortedArticles.filter(art => 
                    normalizeString(art.title).includes(query) || 
                    normalizeString(art.category).includes(query)
                );
                renderArticles(filtered);
            });
        })
        .catch(err => console.error("Error loading articles:", err));

    // 2. Funkcia na vykreslenie článkov
    function renderArticles(articles) {
        articlesContainer.innerHTML = '';

        if (articles.length === 0) {
            articlesContainer.innerHTML = '<p>No articles found.</p>';
            return;
        }

        articles.forEach((article, index) => {
            const card = document.createElement('div');
            // Ak je to prvý článok v zozname, pridáme mu špeciálnu triedu "featured-card"
            card.className = index === 0 ? 'article-card featured-card' : 'article-card';
            
            // Spracovanie kategórií (rozdelenie čiarkou na jednotlivé štítky)
            const tagsHtml = article.category.split(',')
                .map(cat => `<span class="tag">${cat.trim()}</span>`)
                .join('');

            card.innerHTML = `
                <a href="/articles/${article.slug}/" class="card-link">
                    <div class="card-image">
                        <img src="${article.thumbnail}" alt="${article.title}" onerror="this.src='https://via.placeholder.com/600x400?text=Golf+Mag'">
                    </div>
                    <div class="card-content">
                        <div class="tags-wrapper">${tagsHtml}</div>
                        <p class="date">${article.date}</p>
                        <h2>${article.title}</h2>
                        <p class="excerpt">${article.excerpt}</p>
                    </div>
                </a>
            `;
            articlesContainer.appendChild(card);
        });
    }
});