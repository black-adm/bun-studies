import { fakerPT_BR as faker } from "@faker-js/faker";
import { query } from "./client";

await query`DROP TABLE IF EXISTS products`;

await query`
  CREATE TABLE IF NOT EXISTS products (
    product_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    price_in_cents INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

await query`TRUNCATE TABLE products`;

for (const _i of Array.from({ length: 20 })) {
  const data = Array.from({ length: 10_000 }).map(() => {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price_in_cents: faker.number.int({ min: 100, max: 100_000 }),
      created_at: faker.date.past(),
    };
  });

  await query`INSERT INTO products ${query(data)} RETURNING *`;
}

await query.end();
