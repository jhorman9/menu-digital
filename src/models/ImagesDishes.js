const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const ImagesDishes = db.define("images_dishes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  dish_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  size_kb: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  alt_text: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  is_main: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  timestamps: true,
});

module.exports = ImagesDishes;