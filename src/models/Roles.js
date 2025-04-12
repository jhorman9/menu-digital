const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Roles = db.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("superadmin", "admin", "user"),
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = Roles;