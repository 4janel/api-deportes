import Jwt from "jsonwebtoken";

export const newAuth = (req, res) => {
  const user = {
    id: 1,
    nombre: "Manuel",
  };
  Jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
};

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
