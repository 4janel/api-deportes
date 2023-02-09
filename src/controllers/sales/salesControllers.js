import Jwt from "jsonwebtoken";
import { sales } from "../../../db/sales.js";
import { products } from "../../../db/products.js";

export const getSales = (req, res, next) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        status: 200,
        message: "Ventas obtenidas",
        Ventas: sales,
      });
    }
  });
};

export const newProductSale = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      let id = req.body.idProducto;
      let cantidad = req.body.cantidadVendida;

      if (cantidad) {
        if (id) {
          let index = products.findIndex((el) => el.id == id);
          let price = products.find((el) => el.id == id);

          if (products.find((el) => el.id == id).stock >= cantidad) {
            const soldProduct = {
              idVenta: sales.length == 0 ? 1 : sales[sales.length - 1].id + 1,
              ...products[index],
              total: price.precio * cantidad,
            };
            const newSale = {
              id: soldProduct.idVenta,
              itemVendido: soldProduct.descripcion,
              marca: soldProduct.marca,
              linea: soldProduct.linea,
              cantidadVendida: cantidad,
              subtotal: soldProduct.precio,
              total: soldProduct.total,
            };

            sales.push(newSale);

            products[index] = {
              ...products[index],
              stock: products.find((el) => el.id == id).stock - cantidad,
            };
            res.send({
              message: "Venta realizada.",
              detalles: newSale,
            });
          } else {
            res.send({
              message: "No hay suficientes productos.",
            });
          }
        } else {
          return res.status(500).send("Datos incorrectos.");
        }
      } else {
        return res.status(500).send("Datos incorrectos.");
      }
    }
  });
};
