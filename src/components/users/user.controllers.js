const Roles = require("../../models/Roles");
const User = require("../../models/Users");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['rol_id', 'password']
      },
      include: {
        model: Roles,
        attributes: ['rol']
      }
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;

    // Validación de campos requeridos
    if (!newUser.email || !newUser.password) {
      return res.status(400).json({ message: 'Faltan campos requeridos: email o password' });
    }

    // Buscar el rol 'user' por defecto
    const defaultRole = await Roles.findOne({ where: { rol: 'user' } });

    if (!defaultRole) {
      return res.status(404).json({ message: "Rol por defecto 'user' no encontrado." });
    }

    // Asignar el rol_id del rol 'user'
    newUser.rol_id = defaultRole.id;

    // Crear el usuario con rol asignado
    const userCreated = await User.create(newUser);

    // Buscar el usuario recién creado e incluir el nombre del rol
    const userWithRole = await User.findByPk(userCreated.id, {
      attributes: { exclude: ['rol_id', 'password'] },
      include: {
        model: Roles,
        attributes: ['rol']
      }
    });

    res.status(201).json(userWithRole);
  } catch (error) {
    // Manejo de errores de Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Error de validación en los datos.',
        errors: error.errors,
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        message: 'El correo ya está registrado',
        error: error.message,
      });
    }

    // Enviar el error genérico si no es un error de validación o de clave única
    next(error);
  }
};

module.exports = {
    getAllUsers,
    createUser
}