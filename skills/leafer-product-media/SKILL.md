---
name: leafer-product-media
description: Automatisiert die Aufbereitung und Veröffentlichung von LEAFERSERVICE-Produktbildern. Verwenden, wenn Produktfotos hochgeladen, freigestellt, auf Studio-Weiß vereinheitlicht, mit natürlichem Kontaktschatten versehen, automatisch mit deutschem Alt-Text beschrieben und direkt einem vorhandenen Shopify-Produkt hinzugefügt werden sollen. Vor jedem Shopify-Schreibvorgang Live-Produktdaten lesen; vorhandene Medien niemals ohne ausdrücklichen Auftrag löschen oder ersetzen.
---

# LEAFER Product Media

## Ziel

Produktbilder mit möglichst wenig Bedienaufwand vom Rohfoto zum Shopify-Medium bringen.

## Ablauf

1. Eingabebild und gewünschtes Produkt bestimmen.
2. Das Zielprodukt immer live aus Shopify lesen. Bei Titel/Handle-Suche zuerst suchen, danach das gefundene Produkt abrufen.
3. Wenn mehrere Produkte plausibel sind, nicht raten; genau eine kurze Zuordnungsfrage stellen.
4. Das Bild als Produktfoto aufbereiten:
   - Produkt vollständig erhalten; Form, Farbe, Verpackung, Logo und Material nicht erfinden oder verändern.
   - Hintergrund sauber freistellen.
   - Finale Fläche reinweiß `#FFFFFF`.
   - Weichen, fotorealistischen Kontaktschatten unter dem Produkt erzeugen; keine dramatische Schlagschatten-Optik.
   - Quadratisches 1:1-Format bevorzugen.
   - Produkt mittig und konsistent skalieren; ungefähr 10–14 % visuellen Rand zur Leinwand halten, soweit das Motiv es erlaubt.
   - Keine dekorativen Requisiten hinzufügen.
5. Das Ergebnis visuell prüfen, bevor es hochgeladen wird. Auf abgeschnittene Kanten, Halos, verlorene transparente Teile, verfälschte Farben und unnatürliche Schatten achten.
6. Alt-Text automatisch auf Deutsch erstellen. Keine Freigabefrage für den Alt-Text stellen, außer das Bild ist inhaltlich unklar.
7. Das fertige Bild über den Shopify-Bildupload hosten und anschließend dem live geprüften Produkt hinzufügen.
8. Bestehende Medien standardmäßig behalten. Nur löschen/ersetzen, wenn der Nutzer das ausdrücklich verlangt.
9. Nach erfolgreichem Upload kurz melden, welchem Produkt das Bild hinzugefügt wurde und welchen Alt-Text es erhalten hat. Keine Behauptung über Erfolg, wenn das Tool den Upload nicht bestätigt.

## Alt-Text-Regeln

- 70–150 Zeichen anstreben; hartes Maximum 160 Zeichen.
- Zuerst Produkt oder Produkttyp nennen, danach das tatsächlich sichtbare Merkmal.
- Relevante Menge/Größe nennen, wenn sie auf dem Bild sichtbar oder eindeutig für diese Medienvariante bestimmt ist.
- Sachlich und natürlich formulieren.
- Nicht mit „Bild von“, „Foto von“ oder „Produktbild von“ beginnen.
- Keine Keyword-Listen, Superlative oder verstecktes SEO-Stuffing.
- Keine Informationen behaupten, die weder im Bild noch in den live gelesenen Produktdaten belegt sind.

Beispiele:

- `Bims als mineralischer Substratzusatz im transparenten Produktbeutel auf weißem Hintergrund`
- `Tropical Mix Pflanzsubstrat, 5 Liter Produktbeutel freigestellt auf weißem Studiohintergrund`
- `Schwarzer Stofftopf mit Griffen, 11 Liter, freigestellt mit weichem Bodenschatten`

## Varianten und Mengen

Wenn der Nutzer Mengenangaben als Batch-/Variantenbild wünscht:

1. Varianten live aus Shopify lesen.
2. Nur tatsächlich vorhandene Variantentitel verwenden.
3. Für jede gewünschte Menge dieselbe Bildsprache beibehalten.
4. Mengenbadge knapp und gut lesbar halten, z. B. `2 L`, `5 L`, `10 L`, `250 g`.
5. Badge nicht über Produktetikett, Logo oder wichtige Produkteigenschaften legen.
6. Wenn die verfügbare Shopify-Aktion keine Variant-Medienzuordnung unterstützt, das Bild zunächst nur dem Produkt hinzufügen und transparent nennen, dass die Variantenzuordnung noch nicht erfolgt ist; keine Zuordnung behaupten.

## Fehler- und Sicherheitsregeln

- Shopify-Produkt niemals anhand einer vermuteten ID verändern.
- Keine Preise, Varianten, Bestände, Titel oder Beschreibungen verändern, wenn der Auftrag nur Medien betrifft.
- Keine vorhandenen Bilder entfernen, nur um die Galerie aufzuräumen.
- Bei Bildbearbeitungsfehlern das Original nicht als verarbeitetes Ergebnis hochladen.
- Bei Shopify-Uploadfehlern nicht automatisch mehrfach schreiben, wenn unklar ist, ob der erste Schreibvorgang teilweise erfolgreich war; zuerst Produkt erneut lesen.
