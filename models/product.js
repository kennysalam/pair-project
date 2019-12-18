'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {

  }
  Model.init({
    name: DataTypes.STRING,
    skin_type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img_link: DataTypes.STRING
  }, {sequelize});
  
  Product.associate = function(models) {
    Product.belongsToMany(models.User, {through: models.Cart})
  };
  return Product;
};