const db = require('../utils/database.js');
const { DataTypes } = require('sequelize');

const OrderHistories = db.define('order_histories', {
    history_id: {
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

module.exports = OrderHistories;