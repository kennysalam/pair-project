const ProductModel = require('../models').Product

class Product {
    static getAllProduct(req,res) {
        ProductModel.findAll()
        .then(allProduct => {
            res.render('product', {allProduct: allProduct})
        })
        .catch(err => {
            res.send(err)
        }) 
    }
}

module.exports = Product