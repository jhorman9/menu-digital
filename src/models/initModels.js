const Users = require("./Users");
const Restaurants = require("./Restaurants");
const Roles = require("./Roles");

const initModels = () => {

  // Un rol puede tener muchos usuarios
  // Un usuario pertenece a un rol
  Users.belongsTo(Roles, {foreignKey: "rol_id"});
  Roles.hasMany(Users, {foreignKey: "rol_id"});

  // Un usuario puede tener muchos restaurantes
  // Un restaurante pertenece a un usuario
  Restaurants.belongsTo(Users, {foreignKey: "admin_id"});
  Users.hasMany(Restaurants, {foreignKey: "admin_id"});

  

}

module.exports = initModels;