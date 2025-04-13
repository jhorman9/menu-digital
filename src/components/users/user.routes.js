// importar el router de express
const { Router } = require("express");
const { getAllUsers, createUser } = require("./user.controllers");

// crear la instacia del Router
const router = Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);


module.exports = router;