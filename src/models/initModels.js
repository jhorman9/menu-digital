const Users = require("./Users");
const Restaurants = require("./Restaurants");

const initModels = () => {
  // Un usuario puede tener muchos restaurantes
  Users.hasMany(Restaurants, {foreignKey: "admin_id",sourceKey: "id",});
  Restaurants.belongsTo(Users, {foreignKey: "admin_id", targetKey: "id",});
}

module.exports = initModels;