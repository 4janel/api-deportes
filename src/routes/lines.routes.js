import { Router } from "express";
import { verifyToken } from "../controllers/auth/authControllers.js";
import {
  createLine,
  editLine,
  getAllLines,
  getLineById,
  getActiveLines,
  deleteLine,
} from "../controllers/lines/linesControllers.js";

const router = Router();

/**
 * @swagger
 * /lineas:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las lineas registradas
 *    tags: [Linea]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de lineas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Linea'
 *
 */
router.get("/lineas", verifyToken, getAllLines);

/**
 * @swagger
 * /lineas:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Registra una linea nueva
 *    tags: [Linea]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/NuevaLinea'
 *    responses:
 *      201:
 *        description: Linea registrada correctamente.
 */
router.post("/lineas", verifyToken, createLine);

/**
 * @swagger
 * /lineas/{idLinea}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza una linea
 *    tags: [Linea]
 *    parameters:
 *      - in: path
 *        name: idLinea
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la linea
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/NuevaLinea'
 *    responses:
 *      200:
 *        description: Linea actualizada
 *      404:
 *        description: Linea no encontrada
 */
router.put("/lineas/:idLinea", verifyToken, editLine);

/**
 * @swagger
 * /lineas/activas:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las lineas activas
 *    tags: [Linea]
 *    responses:
 *      200:
 *        description: Se han obtenido todas las lineas activas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Linea'
 *
 */
router.get("/lineas/activas", verifyToken, getActiveLines);

/**
 * @swagger
 * /lineas/{idLinea}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna una linea según el ID ingresado
 *    tags: [Linea]
 *    parameters:
 *      - in: path
 *        name: idLinea
 *        schema:
 *          type: string
 *        required: true
 *        description: ID de la linea
 *    responses:
 *      200:
 *        description: Se ha obtenido la linea
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Linea'
 *      404:
 *        description: Linea no encontrada.
 */
router.get("/lineas/:idLinea", verifyToken, getLineById);

/**
 * @swagger
 * /lineas/eliminar/{idLinea}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina una Linea (eliminado suave)
 *    tags: [Linea]
 *    parameters:
 *      - in: path
 *        name: idLinea
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Linea
 *    responses:
 *      200:
 *        description: Se ha eliminado la linea de manera temporal
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Linea'
 *      404:
 *        description: Linea no encontrada.
 */
router.delete("/lineas/eliminar/:idLinea", verifyToken, deleteLine);

export default router;
