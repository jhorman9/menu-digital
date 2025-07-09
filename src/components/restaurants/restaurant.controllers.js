const Restaurants = require("../../models/Restaurants");
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
require('dotenv').config();

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurants.findAll();
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

const createRestaurant = async (req, res, next) => {
  try {
    const newRestaurant = req.body;


    // Verifica si ya existe un restaurante con ese nombre
    const exists = await Restaurants.findOne({ where: { name: newRestaurant.name } });
    if (exists) {
      return res.status(400).json({ message: "El nombre del restaurante ya existe" });
    }

    // Si no existe, lo crea
    const restaurantCreated = await Restaurants.create({
      ...newRestaurant,
      admin_id: req.user.id
    });

    console.log(path.join(__dirname, '../../../public/qrs'));

    // Genera el QR con la URL o el dato que desees (aquí ejemplo con el id del restaurante)
    const qrData = `https://localhost:3000/restaurants/${restaurantCreated.dataValues.restaurant_id}`;
    const qrFolder = path.join(__dirname, '../../../public/qrs');
    if (!fs.existsSync(qrFolder)) {
      fs.mkdirSync(qrFolder, { recursive: true });
    }
    const qrPath = path.join(qrFolder, `restaurant_${restaurantCreated.dataValues.restaurant_id}.png`);
    await QRCode.toFile(qrPath, qrData);

    // Puedes guardar la ruta del QR en la base de datos si lo deseas
    // await restaurantCreated.update({ qr_path: `/public/qrs/restaurant_${restaurantCreated.id}.png` });

    res.status(201).json({
      ...restaurantCreated.toJSON(),
      qr_path: `/public/qrs/restaurant_${restaurantCreated.dataValues.restaurant_id}.png`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAllRestaurants,
    createRestaurant
}