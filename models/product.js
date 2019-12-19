'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {
    priceEdit() {
      let newPrice = []
      let priceSplit = String(this.price).split('')
      let count = 0
      for(let i = priceSplit.length - 1; i >= 0; i--) { 
          if(count === 3) {
              count = 0
              count++
              newPrice.unshift(',')
              newPrice.unshift(priceSplit[i])
          }
          else {
              count++
              newPrice.unshift(priceSplit[i])
          }
      }
      let joinPrice = newPrice.join('')
      let finalPrice = `Rp. ${joinPrice}`
      return finalPrice
    }
  }
  Product.init({
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