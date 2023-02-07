import Jwt from "jsonwebtoken";
import { products } from "../db/products.js";
import { sales } from "../db/sales.js";
import { entries } from "../db/entries.js";

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

export const getEntries = (req, res, next) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        status: 200,
        message: "Historial de ingresos obtenido",
        Ventas: entries,
      });
    }
  });
};

export const getProductByLine = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const productsByLine = [];
      products.forEach((element) => {
        if (element.linea == req.params.id) {
          productsByLine.push(element);
        }
      });
      if (productsByLine.length > 0) {
        res.status(200).send(productsByLine);
      } else {
        return res.status(200).send("No hay productos para esta linea.");
      }
    }
  });
};

export const getProductByBrands = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const productsByBrand = [];
      products.forEach((element) => {
        if (element.marca == req.params.id) {
          productsByBrand.push(element);
        }
      });
      if (productsByBrand.length > 0) {
        res.status(200).send(productsByBrand);
      } else {
        return res.status(200).send("No hay productos para esta marca.");
      }
    }
  });
};

export const getProductById = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const product = products.find((c) => c.id === parseInt(req.params.id));
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      } else {
        res.status(200).send(product);
      }
    }
  });
};

export const getActives = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const activeProducts = [];
      products.forEach((element) => {
        if (element.eliminado == false) {
          activeProducts.push(element);
        }
      });
      if (activeProducts.length > 0) {
        res.status(200).send(activeProducts);
      } else {
        return res.status(200).send("No hay productos activos");
      }
    }
  });
};

export const getProducts = (req, res, next) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        status: 200,
        message: "Productos obtenidos",
        productos: products,
        Usuario: authData,
      });
    }
  });
};
