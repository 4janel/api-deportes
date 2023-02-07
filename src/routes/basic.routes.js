import { Router } from "express";
import { verifyToken } from "../controllers/authControllers.js";
import {
  createProduct,
  editProduct,
  newProductSale,
  updateStock,
} from "../controllers/basicControllers.js";
const router = Router();

/**
 * @swagger
 * /productos:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Agrega productos al inventario
 *    tags: [Productos]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Producto'
 *    responses:
 *      201:
 *        description: Producto agregado.
 */
router.post("/productos", verifyToken, createProduct);

/**
 * @swagger
 * /productos/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza un producto
 *    tags: [Productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID del producto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Producto'
 *    responses:
 *      200:
 *        description: Producto actualizado
 *      404:
 *        description: Producto no encontrado
 */
router.put("/productos/:id", verifyToken, editProduct);

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
