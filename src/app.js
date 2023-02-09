import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./routes/swaggerOptions.js";
import brandsRoutes from "./routes/brands.routes.js";
import incomesRoutes from "./routes/incomes.routes.js";
import linesRoutes from "./routes/lines.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";
import salesRoutes from "./routes/sales.routes.js";

const app = express();
const specs = swaggerJSDoc(options);

app.use(express.json());
app.use(authRoutes);
app.use(brandsRoutes);
app.use(incomesRoutes);
app.use(linesRoutes);
app.use(productsRoutes);
app.use(salesRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  res.status(404.3).json({
    message: "Endpoint no encontrado.",
  });
});

export default app;
