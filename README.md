# Is het al tijd voor tok?

De officiële onofficiële aftelklok voor vrijdag 16:30. Een lichte, statische site in het Nederlands, zonder runtime dependencies.

- Maandag t/m donderdag en in het weekend: aftellen, met wisselende teksten.
- Vrijdag vóór 16:30: “Nog even wachten.” Bij de bestelling staat “Arthur is aan het bestellen.” Op andere dagen: “Vraag Arthur om de kip te bestellen.”
- Vrijdag vanaf 16:30 tot middernacht: “JAAA. Tijd voor tok!”, met confetti.
- Vanaf zaterdag telt de klok af naar de volgende vrijdag.
- Altijd Europe/Amsterdam, ook als een bezoeker in een andere tijdzone zit. Zomer- en wintertijd worden automatisch meegenomen.
- “En nu dan?” geeft steeds een andere ongeduldige collega een antwoord. De Arthur-melding is een grap op basis van de weekdag, geen echte bestelstatus.
- Onderaan staat de ludieke poll “Zullen we kip bestellen?”. Beide knoppen tonen 100% voor en 0% tegen. Er worden geen stemmen opgeslagen of verstuurd; na vernieuwen is de poll weer leeg.
- Op telefoons staan de stemknoppen onder elkaar, met ruime aanraakvlakken. De kop en de kip hebben ieder hun eigen ruimte.
- Op telefoons staat de volledige aftelklok direct in het eerste scherm, boven de kip. Ook gecontroleerd op 320 × 568 pixels. Arthur wordt alleen genoemd rondom het bestellen.
- De nee-knop ontsnapt maximaal drie keer aan de muis, binnen zijn eigen vak. Tikken of toetsenbordbediening weigert het bezwaar met een smoes; na drie pogingen wordt de knop “Oké dan. Bestellen!”. De uitslag blijft altijd 100% voor. Bij verminderde beweging blijft de knop staan.
- Tik op de kip voor ongevraagd advies. Vaak op “En nu dan?” drukken levert extra kantoorhumor op.

## Ontwikkelen

Node.js 22 of nieuwer. Geen installatie nodig.

```sh
npm run dev
npm test
npm run build
```

De lokale site draait op http://localhost:4173. De build staat in `dist/`.

## Vercel

Framework: Other. Build command: `npm run build`. Output directory: `dist`.
Verbind de GitHub-repo met Vercel om wijzigingen op `main` automatisch te publiceren.

De lettertypes Barlow Condensed en DM Sans worden via Google Fonts geladen; er zijn lokale fallback-lettertypes. De kip is een eigen SVG-illustratie. Geen analytics, cookies of backend.
