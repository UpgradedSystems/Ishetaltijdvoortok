# Is het al tijd voor tok?

De officiële onofficiële aftelklok voor vrijdag 16:30. Een lichte, statische site in het Nederlands, zonder runtime dependencies.

- Maandag t/m donderdag en in het weekend: aftellen, met wisselende teksten.
- Vrijdag vóór 16:30: “Nog even wachten. Arthur is nu aan het bestellen.”
- Vrijdag vanaf 16:30 tot middernacht: “JAAA. Tijd voor tok!”, met confetti.
- Vanaf zaterdag telt de klok af naar de volgende vrijdag.
- Altijd Europe/Amsterdam, ook als een bezoeker in een andere tijdzone zit. Zomer- en wintertijd worden automatisch meegenomen.
- “En nu dan?” geeft steeds een andere ongeduldige collega een antwoord. De Arthur-melding is een grap op basis van de weekdag, geen echte bestelstatus.
- Onderaan staat de ludieke poll “Moet Arthur kip bestellen?”. Beide knoppen tonen 100% voor en 0% tegen. Er worden geen stemmen opgeslagen of verstuurd; na vernieuwen is de poll weer leeg.
- Op telefoons staan de stemknoppen onder elkaar, met ruime aanraakvlakken. De kop en de kip hebben ieder hun eigen ruimte.

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
