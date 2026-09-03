import express from "express";
import cors from "cors";
import db from "./db";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Freaky Fashion API is running!");
});

app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
