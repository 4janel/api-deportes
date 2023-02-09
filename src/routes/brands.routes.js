import { Router } from "express";
import { verifyToken } from "../controllers/auth/authControllers.js";
import {
  createBrand,
  editBrand,
  getAllBrands,
  getBrandById,
  getActiveBrands,
  deleteBrand,
} from "../controllers/brands/brandsControllers.js";

const router = Router();

/**
 * @swagger
 * /marcas:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las marcas registradas
 *    tags: [Marca]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de marcas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Marca'
 *
 */
router.get("/marcas", verifyToken, getAllBrands);

/**
 * @swagger
 * /marcas:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Registra una marca nueva
 *    tags: [Marca]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/NuevaMarca'
 *    responses:
 *      201:
 *        description: Marca registrada correctamente.
 */
router.post("/marcas", verifyToken, createBrand);

/**
 * @swagger
 * /marcas/{idMarca}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza una marca
 *    tags: [Marca]
 *    parameters:
 *      - in: path
 *        name: idMarca
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la marca
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/NuevaMarca'
 *    responses:
 *      200:
 *        description: Marca actualizada
 *      404:
 *        description: Marca no encontrada
 */
router.put("/marcas/:idMarca", verifyToken, editBrand);

/**
 * @swagger
 * /marcas/activas:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las marcas activas
 *    tags: [Marca]
 *    responses:
 *      200:
 *        description: Se han obtenido todas las marcas activas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Marca'
 */
router.get("/marcas/activas", verifyToken, getActiveBrands);

/**
 * @swagger
 * /marcas/{idMarca}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna una marca según el ID ingresado
 *    tags: [Marca]
 *    parameters:
 *      - in: path
 *        name: idMarca
 *        schema:
 *          type: string
 *        required: true
 *        description: ID de la marca
 *    responses:
 *      200:
 *        description: Se ha obtenido la marca
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Marca'
 *      404:
 *        description: Marca no encontrada.
 */
router.get("/marcas/:idMarca", verifyToken, getBrandById);

/**
 * @swagger
 * /marcas/eliminar/{idMarca}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina una marca (eliminado suave)
 *    tags: [Marca]
 *    parameters:
 *      - in: path
 *        name: idMarca
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Marca
 *    responses:
 *      200:
 *        description: Se ha eliminado la marca de manera temporal
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Marca'
 *      404:
 *        description: Marca no encontrada.
 */
router.delete("/marcas/eliminar/:idMarca", verifyToken, deleteBrand);

export default router;
