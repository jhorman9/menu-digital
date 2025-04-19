
require('dotenv').config();
const jwt = require('jsonwebtoken');


const adminMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    const token = authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: 'HS512',
    });

    if (!user || user.role.rol !== 'superadmin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    next();
}

module.exports = adminMiddleware;