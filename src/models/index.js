const User = require("./user");
const Role = require("./role");

const defineAssociations = () => {
  User.belongsToMany(Role, { through: "UserRoles" });
  Role.belongsToMany(User, { through: "UserRoles" });
};

module.exports = defineAssociations;
