import { Router } from "express";
import { verifyToken } from "../controllers/auth/authControllers.js";
import {
  createProduct,
  editProduct,
  softDelete,
  deleteProduct,
  getProducts,
  getProductById,
  getActives,
  getProductByBrands,
  getProductByLine,
} from "../controllers/products/productsControllers.js";

const router = Router();

/**
 * @swagger
 * /productos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todos los productos del inventario
 *    tags: [Producto]
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
 *    tags: [Producto]
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
 *    tags: [Producto]
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
 *    tags: [Producto]
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
 *    tags: [Producto]
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
 * /productos/eliminar/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina un producto (eliminado suave)
 *    tags: [Producto]
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
 *    tags: [Producto]
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

/**
 * @swagger
 * /productos:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Agrega productos al inventario
 *    tags: [Producto]
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
 *    tags: [Producto]
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

export default router;
