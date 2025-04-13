// importar el router de express
const { Router } = require("express");
const { getAllRoles } = require("./roles.controllers");

// crear la instacia del Router
const router = Router();

router.get("/roles", getAllRoles);

module.exports = router;