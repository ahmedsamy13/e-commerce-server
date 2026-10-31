import app from "./app.js";
import { db, checkDatabase } from "./src/prisma/db.js";

let server;
let stopping = false;

async function shutdown(exitCode = 0) {
  if (stopping) return;
  stopping = true;

  const timeout = setTimeout(() => process.exit(1), 10000);
  timeout.unref();

  try {
    if (server?.listening) {
      await new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    }
    await db.close();
    process.exitCode = exitCode;
  } catch (error) {
    console.error("Shutdown failed:", error.code || error.name);
    process.exitCode = 1;
  } finally {
    clearTimeout(timeout);
  }
}

async function start() {
  try {
    await checkDatabase();
    if (stopping) return;
    const port = process.env.PORT || 3000;
    server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    server.on("error", async (error) => {
      console.error("Server failed:", error.code || error.name);
      await shutdown(1);
    });
  } catch (error) {
    console.error("Startup failed:", error.code || error.name);
    await shutdown(1);
  }
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());

start();
