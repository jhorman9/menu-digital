// importar el router de express
const { Router } = require("express");
const { getAllRoles } = require("./roles.controllers");
const adminMiddleware = require("../../middlewares/superadmin.middleware");

// crear la instacia del Router
const router = Router();

router.get("/roles", adminMiddleware, getAllRoles);

module.exports = router;