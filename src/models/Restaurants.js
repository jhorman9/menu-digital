const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Restaurants = db.define("restaurants", {
  restaurant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  contact_info: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = Restaurants;