// importar el router de express
const { Router } = require("express");
const { getAllUsers, createUser } = require("./user.controllers");
const { registerUserValidator } = require('./user.validator');

// crear la instacia del Router
const router = Router();

router.get("/users", getAllUsers);
router.post("/users", registerUserValidator, createUser);


module.exports = router;