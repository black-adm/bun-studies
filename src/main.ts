import { query } from "./db/client";

async function main() {
  const products = await query`SELECT * FROM products LIMIT 10`;
  console.log(products);
}

main().catch(console.error);
