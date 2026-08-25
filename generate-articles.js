#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Načítaj articles.json
const articlesData = JSON.parse(fs.readFileSync('./data/articles.json', 'utf8'));

// Template pre jednotlivý článok
function generateArticleHTML(article) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(article.title)} | Indoor Golf Mag</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/article-page.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Open Graph Meta Tags pre sociálne siete -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(article.title)}">
    <meta property="og:description" content="${escapeHtml(article.excerpt)}">
    <meta property="og:image" content="${escapeHtml(article.thumbnail)}">
    <meta property="og:url" content="https://indoorgolfmag.com/${article.slug}/">
    <meta property="og:site_name" content="Indoor Golf Mag">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(article.title)}">
    <meta name="twitter:description" content="${escapeHtml(article.excerpt)}">
    <meta name="twitter:image" content="${escapeHtml(article.thumbnail)}">
    
    <!-- Standard Meta Tags -->
    <meta name="description" content="${escapeHtml(article.excerpt)}">
    <meta name="keywords" content="${escapeHtml(article.category)}">
    <meta name="author" content="Indoor Golf Mag">
</head>
<body>

    <header class="main-header">
        <div class="container header-flex">
            <a href="/" class="logo-area">
                <h1>INDOOR GOLF <span>MAG</span></h1>
                <p>Everything you need to know about indoor golf</p>
            </a>

            <nav class="nav-buttons">
                <a href="/launch-monitors/" class="btn-nav">Launch Monitors</a>
                <a href="/software/" class="btn-nav">Software</a>
            </nav>

            <div class="search-box">
                <input type="text" id="search-input" placeholder="Search articles...">
            </div>
        </div>
    </header>

    <main class="container">
        <article class="article-full">
            <div class="article-hero">
                <img src="${escapeHtml(article.thumbnail)}" alt="${escapeHtml(article.title)}" class="hero-image">
            </div>

            <div class="article-content">
                <div class="article-meta">
                    <span class="tag">${escapeHtml(article.category.split(',')[0])}</span>
                    <span class="date">${article.date}</span>
                </div>

                <h1>${escapeHtml(article.title)}</h1>
                <p class="excerpt">${escapeHtml(article.excerpt)}</p>

                <div class="article-body">
                    <p>Tento článok sa bude postupne aktualizovať. Zatiaľ tu máte základné informácie o ${escapeHtml(article.title)}.</p>
                    <p>Viac obsahu sa pripravuje...</p>
                </div>

                <div class="article-footer">
                    <a href="/" class="btn-back">← Spať na úvodnú stránku</a>
                </div>
            </div>
        </article>

        <!-- Odporúčané články -->
        <section class="related-articles">
            <h2>Odporúčané články</h2>
            <div id="related-container"></div>
        </section>
    </main>

    <footer class="main-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h2>INDOOR GOLF <span>MAG</span></h2>
                    <p>Expert reviews and guides for your indoor game.</p>
                </div>
                <div class="footer-nav">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="/about/">About Us</a></li>
                        <li><a href="/privacy-policy/">Privacy Policy</a></li>
                        <li><a href="/contact/">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-nav">
                    <h3>Categories</h3>
                    <ul>
                        <li><a href="/launch-monitors/">Launch Monitors</a></li>
                        <li><a href="/software/">Software</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; <span id="year"></span> IndoorGolfMag.com | All Rights Reserved.
            </div>
        </div>
    </footer>

    <script>
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Generuj odporúčané články
        const allArticles = ${JSON.stringify(articlesData)};
        const currentArticle = ${JSON.stringify(article)};
        const related = allArticles.filter(a => a.id !== currentArticle.id).slice(0, 3);
        
        const relatedContainer = document.getElementById('related-container');
        related.forEach(article => {
            const card = document.createElement('a');
            card.href = '/' + article.slug + '/';
            card.className = 'article-card';
            card.innerHTML = '<img src="' + article.thumbnail + '" class="card-img" alt="' + article.title + '"><div class="card-content"><span class="tag">' + article.category.split(',')[0] + '</span><h3>' + article.title + '</h3></div>';
            relatedContainer.appendChild(card);
        });
    </script>
</body>
</html>
`;
}

// Escape HTML znaky
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Vytvor priečinok pre články ak neexistuje
if (!fs.existsSync('./articles')) {
  fs.mkdirSync('./articles', { recursive: true });
}

// Generuj HTML stránky pre každý článok
articlesData.forEach(article => {
  const articleDir = path.join('./articles', article.slug);
  
  // Vytvor priečinok
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }
  
  // Vytvor index.html
  const htmlContent = generateArticleHTML(article);
  fs.writeFileSync(path.join(articleDir, 'index.html'), htmlContent, 'utf8');
  
  console.log('✅ Vygenerované: /articles/' + article.slug + '/index.html');
});

console.log('\n🎉 Všetky články sú vygenerované!');
