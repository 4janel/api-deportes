import { Router } from "express";
import { verifyToken } from "../controllers/auth/authControllers.js";
import { getIncomes, updateStock } from "../controllers/incomes/incomesControllers.js";

const router = Router();

/**
 * @swagger
 * /ingresos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna el historial de ingresos
 *    tags: [Ingresos]
 *    responses:
 *      200:
 *        description: Se ha obtenido el historial de ingresos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Ingreso'
 *
 */
router.get("/ingresos", verifyToken, getIncomes);

/**
 * @swagger
 * /ingresos:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza el stock de los productos
 *    tags: [Ingresos]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/NuevoIngreso'
 *    responses:
 *      200:
 *        description: Stock actualizado
 *      404:
 *        description: Producto no encontrado
 */
router.put("/ingresos", verifyToken, updateStock);

export default router;
