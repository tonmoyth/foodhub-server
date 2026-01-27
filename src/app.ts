import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import { categoriesRouter } from "./modules/categories/categories.route";

const app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.get("/auth/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.use("/categories", categoriesRouter);

app.get("/", (req, res) => {
  res.send("Hello FoodHub");
});

export default app;
