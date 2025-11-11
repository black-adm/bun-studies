import { db } from "./db";

async function main() {
  await db`DROP TABLE IF EXISTS products`;

  await db`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL
  )`;

  const data = [
    { name: "Caneca Javascript", price: 175.99 },
    { name: "Adesivo Impermeável Kotlin", price: 1.67 },
    { name: "Camiseta Python", price: 199.99 },
    { name: "Boné Rust", price: 249.99 },
  ];

  await db`INSERT INTO products ${db(data)} RETURNING *`;

  const products = await db`SELECT * FROM products ORDER BY price`;
  console.log(products);
}

main().catch(console.error);
