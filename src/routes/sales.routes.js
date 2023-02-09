import { Router } from "express";
import { verifyToken } from "../controllers/auth/authControllers.js";
import {
  getSales,
  newProductSale,
} from "../controllers/sales/salesControllers.js";

const router = Router();

/**
 * @swagger
 * /ventas:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna el historial de las ventas
 *    tags: [Ventas]
 *    responses:
 *      200:
 *        description: se han obtenido todos las ventas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Venta'
 *
 */
router.get("/ventas", verifyToken, getSales);

/**
 * @swagger
 * /ventas:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Realiza una venta nueva
 *    tags: [Ventas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/NuevaVenta'
 *    responses:
 *      200:
 *        description: Venta realizada.
 */
router.post("/ventas", verifyToken, newProductSale);

export default router;
