import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import { categoriesRouter } from "./modules/categories/categories.route";
import { mealsRouter } from "./modules/meals/meals.routes";
import { providerProfileRouter } from "./modules/providerProfile/providerProfile.routes";
import { orderRoutes } from "./modules/orders/orders.routes";
import { adminRouter } from "./modules/admin/admin.routes";

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

app.use("/api/categories", categoriesRouter);

app.use("/api/provider/meals", mealsRouter);

app.use("/api/provider/orders", mealsRouter);

app.use("/api/providerProfile", providerProfileRouter);

app.use("/api/orders", orderRoutes);

app.use("/api/admin/users", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello FoodHub");
});

export default app;
