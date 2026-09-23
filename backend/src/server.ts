import express from "express";
import cors from "cors";
import db from "./db";
import { slugify } from "./utils";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Freaky Fashion API is running");
});

//Hämta alla produkter med valfri sökning
app.get("/api/products", (req, res) => {
  const q = req.query.q as string | undefined;

  if (q) {
    const products = db
      .prepare("SELECT * FROM products WHERE name LIKE ?")
      .all(`%${q}%`); //Alla produkter med liknande namn, %q% = där name innehåller'q' någonstans
    res.json(products);
  } else {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  }
});

//Hämta en produkt via slug
app.get("/api/products/:slug", (req, res) => {
  const product = db
    .prepare("SELECT * FROM products WHERE slug = ?")
    .get(req.params.slug); //slug är en del av URL:ens sökväg (/api/products/:slug), därav params och inte query

  if (!product) {
    res.status(404).json({ error: "Produkten kunde inte hittas" });
    return;
  }

  res.json(product);
});

//Hämta relaterade produkter
app.get("/api/products/:slug/related", (req, res) => {
  const related = db
    .prepare("SELECT * FROM products WHERE slug != ? LIMIT 5") //Hämta alla produtker WHERE slug INTE är lika med den vi skickar in
    .all(req.params.slug); //.all eftersom vi slipper felhantering, om inga produkter finns returneras en tom array, o inte "undefined"

  res.json(related);
});

//Skapa en produkt
app.post("/api/products", (req, res) => {
  const { name, description, sku, brand, image, price } = req.body;

  if (!name || !price) {
    res.status(400).json({ error: "Namn och pris krävs" });
    return;
  }

  const slug = slugify(name); //Generar en URL vänlig slug från produktnamnet, function från utils.ts.

  try {
    //?? null säkerställer att valfria fält som saknas (undefined) sparas
    //som explicit NULL i databasen, istället för att riskera ett fel

    const insert = db.prepare(`
      INSERT INTO products (name, slug, description, price, sku, brand, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = insert.run(
      name,
      slug,
      description ?? null,
      price,
      sku ?? null,
      brand ?? null,
      image ?? null,
    );

    const newProduct = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(result.lastInsertRowid);
    //Hämtar den senaste skapade produkten

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({
      error: "Kunde inte skapa produkten. Kanske finns namnet redan?",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
