const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: "Dato invalido",
            message: errors.array().map(err => err.msg), // El mensaje de error claro
        });
    } else {
        next();
    }
};

module.exports = validateResult;
