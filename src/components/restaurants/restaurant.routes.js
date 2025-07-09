// importar el router de express
const { Router } = require("express");
const adminMiddleware = require("../../middlewares/superadmin.middleware");
const { getAllRestaurants, createRestaurant } = require("./restaurant.controllers");
const userAuthMiddleware = require("../../middlewares/userAuth.middleware");

// crear la instacia del Router
const router = Router();

router.get("/restaurants", adminMiddleware, getAllRestaurants);

router.post("/restaurants", userAuthMiddleware, createRestaurant);

module.exports = router;