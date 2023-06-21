const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/deudores", async function (req, res) {
  // consulta de articulos con filtros y paginacion

  let where = {};
  if (req.query.DeudorDescripcion != undefined && req.query.DeudorDescripcion !== "") {
    where.DeudorDescripcion = {
      [Op.like]: "%" + req.query.DeudorDescripcion + "%",
    };
  };


  if (req.query.MontoAdeudado != undefined && req.query.MontoAdeudado !== "") {
    where.MontoAdeudado = req.query.MontoAdeudado
  };
  

  
  let items = await db.deudores.findAndCountAll({
    attributes: [
      "IdDeudor",
      "DeudorDescripcion",
      "MontoAdeudado",
    ],
    where,
  });

  res.json(items.rows);
});

module.exports = router;