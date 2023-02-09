import { Router } from "express";
import { newAuth } from "../controllers/auth/authControllers.js";

const router = Router();

//routes

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  security:
 *  - bearerAuth: []
 *  schemas:
 *    Producto:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Autoincremental por defecto
 *        descripcion:
 *          type: string
 *          description: Nombre del producto
 *        precio:
 *          type: Number
 *          description: Precio del producto
 *        eliminado:
 *          type: boolean
 *          description: No eliminado por defecto.
 *        stock:
 *          type: integer
 *          description: Cantidad de productos para agregar al inventario
 *        marca:
 *          type: integer
 *          description: ID de la marca
 *        linea:
 *          type: integer
 *          description: ID linea del producto
 *      required:
 *        - descripcion
 *        - precio
 *        - stock
 *        - marca
 *        - linea
 *      example:
 *        descripcion: Playera
 *        precio: 75
 *        stock: 15
 *        marca: 1
 *        linea: 1
 *    Venta:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Autoincremental por defecto
 *        itemVendido:
 *          type: string
 *          description: Nombre del producto
 *        marca:
 *          type: Number
 *          description: ID Marca del producto
 *        linea:
 *          type: integer
 *          description: ID linea del producto
 *        cantidadVendida:
 *          type: integer
 *          description: Cantidad de productos vendidos
 *        subtotal:
 *          type: integer
 *          description: Precio unidad
 *        total:
 *          type: integer
 *          description: Total a pagar
 *      example:
 *        id: 1
 *        itemVendido: playera
 *        marca: 1
 *        linea: 3
 *        cantidadVendida: 5
 *        subtotal: 100
 *        total: 500
 *    NuevaVenta:
 *      type: object
 *      properties:
 *        idProducto:
 *          type: integer
 *          description: ID del producto
 *        cantidadVendida:
 *          type: integer
 *          description: Cantidad de productos vendidos
 *      required:
 *        - idProducto
 *        - cantidadVendida
 *      example:
 *        idProducto: 1
 *        cantidadVendida: 15
 *    NuevoIngreso:
 *      type: object
 *      properties:
 *        idProducto:
 *          type: integer
 *          description: ID del producto
 *        cantidadIngreso:
 *          type: integer
 *          description: Cantidad de productos para agregar
 *      required:
 *        - idProducto
 *        - cantidadIngreso
 *      example:
 *        idProducto: 1
 *        cantidadIngreso: 40
 *    Ingreso:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: ID del ingreso
 *        idProducto:
 *          type: integer
 *          description: ID del producto
 *        cantidadIngreso:
 *          type: integer
 *          description: Cantidad de productos agregados
 *      example:
 *        id: 1
 *        idProducto: 3
 *        cantidadIngreso: 35
 *    Marca:
 *      type: object
 *      properties:
 *        idMarca:
 *          type: integer
 *          description: ID de marca
 *        nombreMarca:
 *          type: string
 *          description: nombre de la marca
 *        eliminado:
 *          type: boolean
 *          description: No eliminada por defecto.
 *      required:
 *          - nombreMarca
 *      example:
 *        idMarca: 1
 *        nombreMarca: adidas
 *        eliminado: false
 *    NuevaMarca:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: Nombre de la marca
 *      required:
 *        - nombreMarca
 *      example:
 *        nombreMarca: adidas
 *    Linea:
 *      type: object
 *      properties:
 *        idLinea:
 *          type: integer
 *          description: ID de la linea
 *        nombreLinea:
 *          type: string
 *          description: nombre de la linea
 *        eliminado:
 *          type: boolean
 *          description: No eliminada por defecto.
 *      required:
 *          - nombreLinea
 *      example:
 *        idLinea: 1
 *        nombreLinea: playera
 *        eliminado: false
 *    NuevaLinea:
 *      type: object
 *      properties:
 *        nombreLinea:
 *          type: string
 *          description: Nombre de la linea
 *      required:
 *        - nombreLinea
 *      example:
 *        nombreLinea: playera
 */

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Inicio de sesión
 *    tags: [Inicio de sesión]
 *    responses:
 *      200:
 *        description: Sesión iniciada.
 */
router.post("/login", newAuth);

export default router;
