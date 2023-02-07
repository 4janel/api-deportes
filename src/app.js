import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./routes/swaggerOptions.js";
import mainRoutes from "./routes/main.routes.js";
import deleteRoutes from "./routes/delete.routes.js";
import basicRoutes from "./routes/basic.routes.js";
import searchRoutes from "./routes/search.routes.js";

const app = express();
const specs = swaggerJSDoc(options);

app.use(express.json());
app.use(mainRoutes);
app.use(deleteRoutes);
app.use(basicRoutes);
app.use(searchRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  res.status(404.3).json({
    message: "Endpoint no encontrado.",
  });
});

export default app;
