# Knowledge DB Mapping

## Google Sheet

Spreadsheet: `LEAFerservice Knowledge DB`

Wichtige Tabs:

| Tab | Zweck | Eingepflegte Inhalte |
| --- | --- | --- |
| `Quellen` | Nachweis der Datenherkunft | ZIP und einzelne Code-Dateien |
| `Entitaeten` | Kanonische Objekte | Homepage, Sections, Finder, Ratgeber, Code-Dateien |
| `Inhaltsobjekte` | Texte und strukturierte Werte | Meta, Hero, Features, Cards, Scores, Ratgeber |
| `Relationen` | Verknuepfungen | Page -> Sections, Finder -> Substratbestandteile |
| `Ausgabe-Mapping` | Zielsysteme | GitHub-Dateien und JSON-Exports |

## Repo-Dateien

| Datei | Rolle | Quelle |
| --- | --- | --- |
| `index.html` | Frontend-Einstieg | `leafer-homepage(2).zip` |
| `styles.css` | Frontend-Design | `leafer-homepage(2).zip` |
| `script.js` | Interaktion | `leafer-homepage(2).zip` |
| `data/knowledge-content.json` | strukturierter Knowledge-Content | Knowledge DB + ZIP |
| `data/products.seed.json` | neutraler Produktcontent-Seed | Produktdatenbank |

## Sync-Idee

Die DB bleibt fachliche Quelle. Das Repo enthaelt lauffaehigen Code plus statische JSON-Exports. Ein spaeterer Sync kann:

1. `Entitaeten`, `Inhaltsobjekte` und `Relationen` lesen.
2. daraus `data/knowledge-content.json` generieren.
3. Produktdaten aus der Produktdatenbank in `data/products.seed.json` schreiben.
4. daraus WordPress-Blöcke, Shopify Sections oder statische Seiten erzeugen.
