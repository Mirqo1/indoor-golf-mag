# Indoor Golf Mag - Automatic Article Generator

Dynamické generovanie stránok jednotlivých článkov z `articles.json`.

## Ako to funguje

1. Pridáš nový článok do `data/articles.json`
2. Pushneš zmeny na GitHub
3. GitHub Actions automaticky:
   - Spustí `generate-articles.js`
   - Vytvorí nový HTML súbor v `/articles/nazov-clanka/index.html`
   - Pushne zmeny do repo

## Štruktúra články v JSON

```json
{
    "id": 1,
    "title": "Názov článku",
    "slug": "nazov-clanka",
    "date": "August 4, 2024",
    "category": "Launch Monitors, Recenzia",
    "excerpt": "Stručný popis článku...",
    "thumbnail": "https://example.com/image.jpg",
    "featured": true
}
```

## Open Graph Meta Tags

Každá vygenerovaná stránka obsahuje:
- `og:title` - Názov článku
- `og:description` - Popis
- `og:image` - Thumbnail obrázok
- `og:url` - Odkaz na článok

**Výsledok:** Keď zdieľaš na Facebooku, zobrazí sa pekný náhľad s obrázkom! 📱

## Spustenie generátora lokálne

```bash
node generate-articles.js
```

Vytvorí sa priečinok `articles/` s HTML súbormi.
