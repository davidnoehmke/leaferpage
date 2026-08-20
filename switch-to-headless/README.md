# LEAFerservice Knowledge Homepage

Statische Knowledge-Homepage fuer LEAFerservice mit Substrat-Finder, Komponentenvergleich und Ratgeber-Einstieg.

## Inhalt

- `index.html` - statische Homepage aus dem gelieferten ZIP
- `styles.css` - responsive LEAFer-Oberflaeche
- `script.js` - mobile Navigation, Filter und Reveal-Animation
- `data/knowledge-content.json` - strukturierter Content aus der Knowledge DB
- `data/products.seed.json` - neutraler Produktcontent-Seed aus der Produktdatenbank
- `docs/knowledge-db-mapping.md` - Mapping zwischen Google Sheet, Code und Datenexport

## Datenquellen

- Knowledge DB: `LEAFerservice Knowledge DB`
- Produktquelle: `LEAFerservice Produktdatenbank - HTML CSS FAQ`
- Upload: `leafer-homepage(2).zip`

## Lokal starten

Die Seite braucht keinen Build-Step.

```bash
python3 -m http.server 8080
```

Danach im Browser `http://localhost:8080` oeffnen.

## Naechste sinnvolle Schritte

1. Knowledge DB als Single Source of Truth weiter befuellen.
2. `data/knowledge-content.json` automatisch aus der DB generieren.
3. Produktcontent aus `data/products.seed.json` in Shopify-/WordPress-Ausgaben mappen.
4. Optional: statische HTML-Sektion in WordPress oder Shopify Section-Format ueberfuehren.
