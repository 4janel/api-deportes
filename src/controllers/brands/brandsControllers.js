import Jwt from "jsonwebtoken";
import { brands } from "../../../db/brands.js";

export const createBrand = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const newBrand = {
        idMarca: brands.length == 0 ? 1 : brands[brands.length - 1].idMarca + 1,
        nombreMarca: req.body.nombreMarca,
        eliminado: false,
      };

      brands.push(newBrand);
      res.status(201).send({ "Marca Registrada:": newBrand });
    }
  });
};

export const editBrand = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      let { idMarca } = req.params;
      let { nombreMarca } = req.body;
      let tmpBrand;

      try {
        for (let [index, item] of brands.entries()) {
          if (idMarca == item.idMarca) {
            tmpBrand = {
              ...item,
              nombreMarca,
            };
            brands[index] = tmpBrand;
          }
        }

        if (tmpBrand) {
          console.log();
          res.status(200).json(tmpBrand);
        } else {
          res.status(404).json({ response: "ID de marca no encontrado." });
        }
      } catch (error) {
        res.status(500).json({ response: error.message });
      }
    }
  });
};

export const deleteBrand = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const brand = brands.find(
        (c) => c.idMarca === parseInt(req.params.idMarca)
      );
      if (!brand) {
        return res.status(404).send("Marca no encontrada.");
      } else {
        const index = brands.indexOf(brand);
        brands[index] = {
          ...brands[index],
          eliminado: true,
        };
        res.status(200).send("Marca eliminada.");
      }
    }
  });
};

export const getAllBrands = (req, res, next) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        status: 200,
        message: "Todas las marcas registradas obtenidas.",
        Ventas: brands,
      });
    }
  });
};

export const getBrandById = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const brand = brands.find(
        (c) => c.idMarca === parseInt(req.params.idMarca)
      );
      if (!brand) {
        return res.status(404).send("Marca no encontrada.");
      } else {
        res.status(200).send(brand);
      }
    }
  });
};

export const getActiveBrands = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const activeBrands = [];
      brands.forEach((element) => {
        if (element.eliminado == false) {
          activeBrands.push(element);
        }
      });
      if (activeBrands.length > 0) {
        res.status(200).send(activeBrands);
      } else {
        return res.status(200).send("No hay marcas disponibles para mostrar.");
      }
    }
  });
};
