import { query } from "./db/client";

async function main() {
  const products = await query`
      SELECT * FROM products ORDER BY price_in_cents LIMIT 10`;

  console.log(products);
}

main().catch(console.error);
