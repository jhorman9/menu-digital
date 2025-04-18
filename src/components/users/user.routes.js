// importar el router de express
const { Router } = require("express");
const { getAllUsers, createUser, loginUser, validateUserEmail } = require("./user.controllers");
const { registerUserValidator } = require('./user.validator');
const authenticate = require("../../middlewares/auth.middleware");

// crear la instacia del Router
const router = Router();

router.get("/users", authenticate, getAllUsers);
router.post("/users", registerUserValidator, createUser);
router.post("/login", loginUser);
router.post('/validate-user', validateUserEmail);

module.exports = router;