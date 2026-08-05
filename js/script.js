const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles-container');
    const sidebarContainer = document.getElementById('featured-sidebar');
    const searchInput = document.getElementById('search-input');

    fetch('data/articles.json')
        .then(res => res.json())
        .then(data => {
            renderAll(data);

            searchInput.addEventListener('input', (e) => {
                const query = normalizeString(e.target.value);
                const filtered = data.filter(a => 
                    normalizeString(a.title).includes(query) || 
                    normalizeString(a.category).includes(query)
                );
                renderArticles(filtered);
            });
        });

    function renderAll(articles) {
        renderArticles(articles);
        renderSidebar(articles.slice(0, 3)); // Top 3 do sidebaru
    }

    function renderArticles(articles) {
        articlesContainer.innerHTML = '';
        articles.forEach((art, index) => {
            const isFeatured = index === 0;
            const card = `
                <a href="/articles/${art.slug}/" class="article-card ${isFeatured ? 'featured-article' : ''}">
                    <img src="${art.thumbnail}" class="card-img" alt="${art.title}">
                    <div class="card-content">
                        <span class="tag">${art.category}</span>
                        <h2>${art.title}</h2>
                        <p class="excerpt">${art.excerpt}</p>
                    </div>
                </a>
            `;
            articlesContainer.innerHTML += card;
        });
    }

    function renderSidebar(articles) {
        sidebarContainer.innerHTML = '';
        articles.forEach(art => {
            const item = `
                <a href="/articles/${art.slug}/" class="trending-item">
                    <img src="${art.thumbnail}" class="trending-img">
                    <div class="trending-info">
                        <h4>${art.title}</h4>
                        <span>${art.date}</span>
                    </div>
                </a>
            `;
            sidebarContainer.innerHTML += item;
        });
    }
});