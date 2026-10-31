import { db, checkDatabase } from "../src/prisma/db.js";

try {
  await checkDatabase();
  console.log("Prisma 8 PostgreSQL connection successful.");
} catch (error) {
  console.error("PostgreSQL connection failed:", error.code || error.name);
  process.exitCode = 1;
} finally {
  await db.close();
}
