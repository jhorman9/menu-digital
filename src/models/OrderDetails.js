const db = require('../utils/database.js');
const { DataTypes } = require('sequelize');

const OrderDetails = db.define('order_details', {
    order_detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = OrderDetails;