const Roles = require("../../models/Roles");
const User = require("../../models/Users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

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
      attributes: { exclude: ['rol_id', 'password', 'id'] },
      include: {
        model: Roles,
        attributes: ['rol']
      }
    });

    res.status(201).json(userWithRole);
  } catch (error) {
    // Enviar el error genérico si no es un error de validación o de clave única
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {email}
    });

    if(!user){
        throw{
            status: 400,
            error: 'El usuario no existe', 
            message: 'Necesitas registrarte antes de hacer un login'
        }
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if(!isValidPassword){
        return res.status(400).json({
            error: 'Contraseña incorrecta', 
            message: 'La contraseña no hizo match con la del usuario',
        });
    }

    // if(!user.validEmail){
    //     return res.status(401).json({
    //         error: 'Necesitas verificarte',
    //         message: 'Se necesita la verificacion del correo electronico',
    //     });
    // }

    //incluir el rol en el includes del token

    const userWithRole = await User.findByPk(user.id, {
        attributes: { exclude: ['password'] },
        include: {
            model: Roles,
            attributes: ['rol']
        }
    });

    console.log(userWithRole)

    const copyUser = { ...userWithRole.dataValues }; //copio 
    delete copyUser.password; //elimino la password

    const token = jwt.sign(copyUser, process.env.JWT_SECRET, { 
        algorithm: "HS512",
        expiresIn: "7d",
     });

     copyUser.token = token; 
     delete copyUser.role;
     res.status(200).json(copyUser);
  } catch (error) {
    next(error);
  }
};

const validateUserEmail = async (req, res, next) =>{
  try {  
      const { token } = req.body;

      if(!token){
          return res.status(400).json({message: 'El token es requerido'})
      }

      const { email } = jwt.verify(token, process.env.EMAIL_SECRET, {
          algorithms: 'HS512',
      });

      const user = await User.findOne({where: {email: email}});

      if(user.is_valid){ 
          return res.status(400).json({message: 'El link ya se ha usado'}) 
      }
      user.is_valid = true; 
      user.save();
      res.json({
          message: 'El email se ha verificado sastifactoriamente'
      });
  } catch (error) {
      next(error);
  }
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    validateUserEmail
}