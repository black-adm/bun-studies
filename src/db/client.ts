import { SQL } from "bun";

const db = new SQL(`${process.env.DATABASE_URL}`);

if (!db) {
  throw new Error("Connection to database failed!");
}

export const query = db;
