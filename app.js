import express from "express";
import categoryRouter from "./src/routes/category.js";

const app = express();
app.use(express.json());

app.use("/api/v1/category", categoryRouter);
export default app;
