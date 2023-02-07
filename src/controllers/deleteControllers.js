import Jwt from "jsonwebtoken";
import { products } from "../db/products.js";
import { getActives } from "../controllers/searchControllers.js"

export const deleteProduct = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const product = products.find((c) => c.id === parseInt(req.params.id));
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      } else {
        const index = products.indexOf(product);
        products.splice(index, 1);
        res.status(200).send(product);
      }
    }
  });
};

export const softDelete = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const product = products.find((c) => c.id === parseInt(req.params.id));
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      } else {
        const index = products.indexOf(product);
        products[index] = {
          ...products[index],
          eliminado: true,
        };
        res.status(200).send(getActives(req, res));
      }
    }
  });
};
