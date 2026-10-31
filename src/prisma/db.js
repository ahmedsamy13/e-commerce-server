import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import contractJson from "./contract.json" with { type: "json" };

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required. Set it in your .env file.");
}

/** @type {import("./contract.d.ts").Contract} */
const typedContract = contractFromJson(contractJson);
export const contract = typedContract;

export const db = postgres({
  contract,
  url: process.env.DATABASE_URL,
  poolOptions: { connectionTimeoutMillis: 5000 },
});

export async function checkDatabase() {
  const plan = db.raw.sql`SELECT 1 AS ok`
    .returnsRow({ ok: "pg/int4@1" })
    .build();
  const rows = await db.query(plan);
  if (rows.length !== 1 || rows[0].ok !== 1) {
    throw new Error("Unexpected response from the database connection check.");
  }
}
