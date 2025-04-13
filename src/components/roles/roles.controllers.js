const Roles = require("../../models/Roles");

const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.json(roles);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
    getAllRoles,
}