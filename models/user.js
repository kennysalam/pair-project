'use strict';

const hashPassword = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {

  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    skin_type: DataTypes.STRING,
    isLogin: DataTypes.INTEGER,
    secret: DataTypes.STRING
  }, {hooks: {
    beforeCreate: (instance, options) => {
      instance.secret = String(Math.round(Math.random()*10000))
      let newPassword = hashPassword(instance.secret, instance.password)
      instance.password = newPassword
    }
  },sequelize});
  
  User.associate = function(models) {
    User.belongsToMany(models.Product, {through: models.Cart})
  };
  return User;
};