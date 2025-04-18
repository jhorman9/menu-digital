const fs = require('fs/promises');
const path = require('path');
//Importamos las clases de errores de sequelize

const {
    ConnectionError,
    ValidationError,
    DatabaseError,
} = require('sequelize');


//Necesitamos un middleware para mostrar errores en la consola (log errors)

const errorLogger = (err, req, res, next) => {
      const date = new Date().toLocaleString();
          const filePath = path.join(__dirname, "../logs/logs.txt");
            fs.appendFile(filePath,
                `====================ERROR ${date}=========================\n`);
            fs.appendFile(filePath, JSON.stringify(err) + "\n\n");
            next(err);
};

const ormErrorHandler = (err, req, res, next) => {

    //Aqui llega un error lanzado en un controlador
    //Verificamos si este error fue creadoocn la clase Connection error

    if(err instanceof ConnectionError) {
        return res.status(409).json({
            error: 'Error de conexion a la base de datos',
            message: err.name
        })
    }

    //Verificamos si el error fue creado con la clase ValidationError
    //Ejemplo si el texto era maximo 30 etc...
    if(err instanceof ValidationError) {
        return res.status(400).json({
            error: err.name,
            message: err?.original?.detail,
            errors: err.errors,
        });
    }
    
    if(err instanceof DatabaseError) {
        return res.status(409).json({
            error: err.name,
            message: err.message,
            errors: err.errors,
        });
    }
    
    next(err);
}

const errorHandler = (err, req, res, next) => {
    const {status, ...error} = err;
    res.status(err.status || 500).json(error);
};

const notFoundErrorHandler = (req, res) =>{
    res.status(404).json({
        error: 'No encontrado',
        message: `El recurso solicitado no está en el servidor, ${req.originalUrl}`,
    });
}

const jwtErrorHandler = (err, req, res, next) => {

    if(err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Token no valido',
            message: err.message,
        });
    }

    if(err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Token expirado',
            message: err.message,
        });
    }

    next(err);
}

module.exports = { 
    errorLogger,
    errorHandler,
    ormErrorHandler,
    notFoundErrorHandler,
    jwtErrorHandler,
}