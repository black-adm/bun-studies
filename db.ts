import { SQL } from "bun";

const db = new SQL(`${process.env.DATABASE_URL}`);

if (!db) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = db;
