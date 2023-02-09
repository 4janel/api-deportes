import Jwt from "jsonwebtoken";
import { incomes } from "../../../db/incomes.js";
import { products } from "../../../db/products.js";

export const getIncomes = (req, res, next) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        status: 200,
        message: "Historial de ingresos obtenido",
        Ingresos: incomes,
      });
    }
  });
};

export const updateStock = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      let id = req.body.idProducto;
      let entry = req.body.cantidadIngreso;
      let tmpProduct;
      try {
        for (let [index, item] of products.entries()) {
          if (id == item.id) {
            tmpProduct = {
              ...item,
              stock: products.find((el) => el.id == id).stock + entry,
            };
            products[index] = tmpProduct;
            const newStock = {
              id: entries.length == 0 ? 1 : entries[entries.length - 1].id + 1,
              idProducto: tmpProduct.id,
              cantidad: tmpProduct.stock,
            };

            entries.push(newStock);
          }
        }

        if (tmpProduct) {
          console.log();
          res.status(200).json(tmpProduct);
        } else {
          res.status(404).json({ response: "ID no encontrado" });
        }
      } catch (error) {
        res.status(500).json({ response: error.message });
      }
    }
  });
};
