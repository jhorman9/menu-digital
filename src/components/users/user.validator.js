const { check } = require('express-validator');
const validateResult = require('../../middlewares/validator.middleware');

const registerUserValidator = [
    check('name', 'Error con name')
    .exists().withMessage('No se incluye la propiedad name')
    .notEmpty().withMessage('El name debe tener un valor')
    .isString().withMessage('El valor del name debe ser string')
    .isLength({ min: 2, max: 50 }).withMessage('La longitud del nombre debe ser entre 2 y 50 caracteres')
    .matches(/^[a-zA-Z\s]/).withMessage('El name solo acepta letras'),
    check('email', 'Error con email')
    .exists().withMessage('No se incluye la propiedad email')
    .notEmpty().withMessage('El email debe tener un valor')
    .isString().withMessage('El valor del email debe ser string')
    .isEmail().withMessage('El email no es valido')
    .isLength({ min: 7, max: 50 }).withMessage('La longitud del nombre debe ser entre 7 y 50 caracteres'),
    check('password', 'Error con password')
    .exists().withMessage('No se incluye la propiedad password')
    .notEmpty().withMessage('El password debe tener un valor')
    .isString().withMessage('El valor del password debe ser string')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/).withMessage('El password debe ser minimo 8 caracteres, una mayuscula, una minuscula y un caracter especial ! @ # $ % ^ & *'),
    check('name', 'Error con name')
    .exists().withMessage('No se incluye la propiedad name')
    .notEmpty().withMessage('El name debe tener un valor')
    .isString().withMessage('El valor del name debe ser string')
    .isLength({ min: 2, max: 50 }).withMessage('La longitud del nombre debe ser entre 2 y 50 caracteres')
    .matches(/^[a-zA-Z\s]/).withMessage('El name solo acepta letras'),
    check('address', 'error con address')
    .isLength({ min:2, max: 250 }).withMessage('La longitud de address debe ser minimo 2, maximo 250'),
    check('phone', 'Error con phone')
    .notEmpty().withMessage('Phone es requerido')
    .isLength({ min: 5, max: 20 }).withMessage('La longitud de phone debe ser minimo 5, maximo 20'),
    validateResult,
];

const createUserValidator = [
    check('email', 'Error con la propiedad email')
    .exists().withMessage('No se incluye con la propiedad email')
    .notEmpty().withMessage('La propiedad email no debe ir vacio')
    .isString().withMessage('El email debe ser un string')
    .isEmail().withMessage('El email debe llevar el formato email'),
    check('password', 'Error con la propiedad password')
    .exists().withMessage('No se incluye la propiedad password')
    .notEmpty().withMessage('El password debe tener un valor')
    .isString().withMessage('El valor del password debe ser string'),
    validateResult,
]

module.exports = {
    registerUserValidator,
    createUserValidator,
};