# Freaky Fashion

En webbshop för kläder med en Angular-frontend och en egen backend i Express och TypeScript med en SQLite-databas.

Individuellt skolprojekt i kursen JavaScript 3 på EC Utbildningen.

## Funktioner

- **Startsida** med hero, spots och produkter som hämtas från API:t
- **Sökning** i headern med en egen sida för sökresultat
- **Produktsida** med produktinformation och relaterade produkter
- **Admin:** lista över alla produkter och ett formulär för att lägga till nya
- **Responsiv design** med globala designtokens i CSS
- Ikoner från Material Symbols

## Tekniker

| Del      | Teknik                                                          |
| -------- | --------------------------------------------------------------- |
| Frontend | Angular (standalone-komponenter, routing, services, HttpClient) |
| Backend  | Node.js, Express 5, TypeScript                                  |
| Databas  | SQLite via Nodes inbyggda `node:sqlite`                         |

## Struktur

```
backend/    Express-API och databas
frontend/   Angular-applikationen
  src/app/
    components/  header, footer, hero, spot, product-card
    pages/       home, search-results, product-detail, admin-product-list, admin-product-new
    services/    ProductService som pratar med API:t
    models/      TypeScript-interface för produkter och spots
```

## API

| Metod | Endpoint                      | Beskrivning                                |
| ----- | ----------------------------- | ------------------------------------------ |
| GET   | `/api/products`               | Alla produkter, sök med `?q=`              |
| GET   | `/api/products/:slug`         | En produkt                                 |
| GET   | `/api/products/:slug/related` | Relaterade produkter                       |
| POST  | `/api/products`               | Skapa en produkt (slug skapas automatiskt) |

## Kom igång

Kräver **Node.js 24** eller senare, eftersom backenden använder den inbyggda modulen `node:sqlite`.

Starta backenden (körs på http://localhost:3000):

```bash
cd backend
npm install
npm run dev
```

Starta frontenden i en ny terminal (körs på http://localhost:4200):

```bash
cd frontend
npm install
npm start
```

Databasen skapas automatiskt vid första starten och fylls med några exempelprodukter.
