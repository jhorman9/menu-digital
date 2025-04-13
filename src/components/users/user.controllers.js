const Roles = require("../../models/Roles");
const User = require("../../models/Users");

const getAllUsers = async (req, res) => {
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
    res.status(400).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    // Buscar el rol 'user' por defecto
    const defaultRole = await Roles.findOne({ where: { rol: 'user' } });

    if (!defaultRole) {
      return res.status(400).json({ message: "Rol por defecto 'user' no encontrado." });
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
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = {
    getAllUsers,
    createUser
}