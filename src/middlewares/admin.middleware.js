
const adminMiddleware = (req, res, next) => {
    const { user } = req;
    if (!user) {
        return res.status(401).json({
            error: 'No autorizado',
            message: 'No se ha proporcionado un token de autenticación válido.',
        });
    }

    if (user.role !== 'admin') {
        return res.status(403).json({
            error: 'Acceso denegado',
            message: 'No tienes permisos para acceder a este recurso.',
        });
    }

    next();
}

module.exports = adminMiddleware;