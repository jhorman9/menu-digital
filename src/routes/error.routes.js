const { errorLogger, errorHandler, notFoundErrorHandler, ormErrorHandler, jwtErrorHandler } = require('../middlewares/errors.middleware');

const errorRoutes = (app) => {
    app.use(errorLogger);
    app.use(ormErrorHandler);
    app.use(jwtErrorHandler);
    app.use(errorHandler);
    app.use(notFoundErrorHandler);
};

module.exports = errorRoutes;