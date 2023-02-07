import { Router } from "express";
import { verifyToken } from "../controllers/authControllers.js";
import {
  getProducts,
  getProductById,
  getActives,
  getProductByBrands,
  getProductByLine,
  getEntries,
  getSales,
} from "../controllers/searchControllers.js";

const router = Router();

/**
 * @swagger
 * /productos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todos los productos del inventario
 *    tags: [Productos]
 *    responses:
 *      200:
 *        description: se han obtenido todos los productos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Producto'
 *
 */
router.get("/productos", verifyToken, getProducts);

/**
 * @swagger
 * /productos/activos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todos los productos activos
 *    tags: [Productos]
 *    responses:
 *      200:
 *        description: se han obtenido todos los productos activos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Producto'
 *
 */
router.get("/productos/activos", verifyToken, getActives);

/**
 * @swagger
 * /productos/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna un producto según su ID
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
 *        description: Se ha obtenido el producto
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      404:
 *        description: Producto no encontrado.
 */
router.get("/productos/:id", verifyToken, getProductById);

/**
 * @swagger
 * /productos/marca/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna los productos según el ID de marca
 *    tags: [Productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Marca
 *    responses:
 *      200:
 *        description: Se ha obtenido el producto
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Producto'
 *      404:
 *        description: Producto no encontrado.
 */
router.get("/productos/marca/:id", verifyToken, getProductByBrands);

/**
 * @swagger
 * /productos/linea/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna los productos según el ID de linea
 *    tags: [Productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID linea
 *    responses:
 *      200:
 *        description: Se ha obtenido el producto
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Producto'
 *      404:
 *        description: Producto no encontrado.
 */
router.get("/productos/linea/:id", verifyToken, getProductByLine);

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
router.get("/ingresos", verifyToken, getEntries);

export default router;
