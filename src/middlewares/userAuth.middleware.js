require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const Roles = require('../models/Roles');


const userAuthMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: 'HS512',
        });

        const user = await Users.findByPk(decoded.sub, {
            include: {
                model: Roles,
                attributes: ['rol']
            }
        });

        // Accede correctamente al rol
        const rol = user.role.dataValues.rol;

        console.log(rol);

        if (!['superadmin', 'user', 'admin'].includes(rol)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        req.user = user; // Opcional: guardar el usuario en la request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = userAuthMiddleware;