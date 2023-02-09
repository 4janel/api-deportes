import Jwt from "jsonwebtoken";
import { lines } from "../../../db/lines.js";

export const createLine = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const newLine = {
        idLinea: lines.length == 0 ? 1 : lines[lines.length - 1].idLinea + 1,
        nombreLinea: req.body.nombreLinea,
        eliminado: false,
      };

      lines.push(newLine);
      res.status(201).send({ "Linea Registrada:": newLine });
    }
  });
};

export const editLine = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      let { idLinea } = req.params;
      let { nombreLinea } = req.body;
      let tmpLine;

      try {
        for (let [index, item] of lines.entries()) {
          if (idLinea == item.idLinea) {
            tmpLine = {
              ...item,
              nombreLinea,
            };
            lines[index] = tmpLine;
          }
        }

        if (tmpLine) {
          console.log();
          res.status(200).json(tmpLine);
        } else {
          res.status(404).json({ response: "ID de linea no encontrado." });
        }
      } catch (error) {
        res.status(500).json({ response: error.message });
      }
    }
  });
};

export const deleteLine = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const line = lines.find(
        (c) => c.idLinea === parseInt(req.params.idLinea)
      );
      if (!line) {
        return res.status(404).send("Linea no encontrada.");
      } else {
        const index = lines.indexOf(line);
        lines[index] = {
          ...lines[index],
          eliminado: true,
        };
        res.status(200).send("Linea eliminada.");
      }
    }
  });
};

export const getLineById = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const line = lines.find(
        (c) => c.idLinea === parseInt(req.params.idLinea)
      );
      if (!line) {
        return res.status(404).send("Marca no encontrada.");
      } else {
        res.status(200).send(line);
      }
    }
  });
};

export const getAllLines = (req, res, next) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        status: 200,
        message: "Todas las lineas registradas obtenidas.",
        Ventas: lines,
      });
    }
  });
};

export const getActiveLines = (req, res) => {
  Jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const activeLines = [];
      lines.forEach((element) => {
        if (element.eliminado == false) {
          activeLines.push(element);
        }
      });
      if (activeLines.length > 0) {
        res.status(200).send(activeLines);
      } else {
        return res.status(200).send("No hay marcas disponibles para mostrar.");
      }
    }
  });
};
