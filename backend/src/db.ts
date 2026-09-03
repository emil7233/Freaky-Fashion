import { DatabaseSync } from "node:sqlite";
import path from "path";

const dbPath = path.join(__dirname, "..", "database.sqlite");
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price REAL NOT NULL,
    sku TEXT,
    brand TEXT,
    image TEXT
  )
`);

const count = db.prepare("SELECT COUNT(*) as count FROM products").get() as {
  count: number;
};

if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, slug, description, price, sku, brand, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    "Svart T-Shirt",
    "svart-tshirt",
    "En klassisk svart t-shirt i 100% bomull.",
    199,
    "SVA123",
    "Levis",
    "https://via.placeholder.com/300",
  );

  insert.run(
    "Vit T-Shirt",
    "vit-tshirt",
    "En klassisk vit t-shirt i 100% bomull.",
    199,
    "VIT123",
    "Levis",
    "https://via.placeholder.com/300",
  );
}

export default db;

/*
slug = URL vänlig verisionen av namnet, exempelvis Svart Tshirt
sku = Stock Keeping Unit
*/
