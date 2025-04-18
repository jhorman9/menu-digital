const db = require('../utils/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const transporter = require("../helpers/mailer.js");
const jwt = require('jsonwebtoken');
const sendWelcomeEmail = require('../helpers/sendMail.js');
require('dotenv').config();

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user, options) => {
            const hashed = await bcrypt.hash(user.password, 10);
            user.password = hashed;
        },
        afterCreate: async (user, options) => {
            const { email, name } = user;
            sendWelcomeEmail(email, {name});
         }
    }
});

module.exports = Users;