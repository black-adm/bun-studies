import { sql } from "./db";

async function main() {
  await sql`DROP TABLE IF EXISTS products`;

  await sql`CREATE TABLE IF NOT EXISTS products (
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

  await sql`INSERT INTO products ${sql(data)} RETURNING *`;

  const products = await sql`SELECT * FROM products ORDER BY price`;
  console.log(products);
}

main().catch(console.error);
