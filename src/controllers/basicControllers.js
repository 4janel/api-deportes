import Jwt from "jsonwebtoken";
import { products } from "../db/products.js";
import { sales } from "../db/sales.js";
import { entries } from "../db/entries.js";

export const createProduct = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const product = {
        id: products.length == 0 ? 1 : products[products.length - 1].id + 1,
        descripcion: req.body.descripcion,
        precio: parseInt(req.body.precio),
        eliminado: false,
        stock: req.body.stock,
        marca: req.body.marca,
        linea: req.body.linea,
      };

      products.push(product);
      res.status(201).send({ Producto_Agregado: product });
    }
  });
};

export const editProduct = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      let { id } = req.params;
      let { descripcion, precio, eliminado, stock, marca, linea } = req.body;
      let tmpProduct;

      try {
        for (let [index, item] of products.entries()) {
          if (id == item.id) {
            tmpProduct = {
              ...item,
              descripcion,
              precio,
              eliminado,
              stock,
              marca,
              linea,
            };
            products[index] = tmpProduct;
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
