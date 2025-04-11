const db = require('../utils/database.js');
const { DataTypes } = require('sequelize');

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    is_valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    address: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    rol_id: {
        type: DataTypes,
        defaultValue: 1,
    },
}, {
    timestamps: true,
});

module.exports = Users;