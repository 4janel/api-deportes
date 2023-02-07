import { Router } from "express";
import { verifyToken } from "../controllers/authControllers.js";
import { softDelete, deleteProduct } from "../controllers/deleteControllers.js";
const router = Router();

/**
 * @swagger
 * /productos/eliminar/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina un producto (eliminado suave)
 *    tags: [Productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Producto
 *    responses:
 *      200:
 *        description: Se ha eliminado de manera temporal
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      404:
 *        description: Producto no encontrado.
 */
router.delete("/productos/eliminar/:id", verifyToken, softDelete);

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina un producto
 *    tags: [Productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Producto
 *    responses:
 *      200:
 *        description: Se ha eliminado el producto
 *      404:
 *        description: Producto no encontrado.
 */
router.delete("/productos/:id", verifyToken, deleteProduct);

export default router;
