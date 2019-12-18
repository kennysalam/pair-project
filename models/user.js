'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {

  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    skin_type: DataTypes.STRING
  }, {sequelize});
  
  User.associate = function(models) {
    User.belongsToMany(models.Product, {through: models.Cart})
  };
  return User;
};