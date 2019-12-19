const UserModel = require('../models').User
const ProductModel = require('../models').Product
const CartModel = require('../models').Cart

const priceEdit = require('../helpers/priceEdit')
const mailer = require('../helpers/mailer')
const checkPassword = require('../helpers/checkPassword')

class User {
    static register(req,res) {
        req.body.skin_type = null
        UserModel.create(req.body)
        .then(() => {
            res.redirect('/')
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static login(req,res) {
        let userId
        UserModel.findOne({where: {email: req.body.email}})
        .then(user => {
            if(user === null) {
                throw new Error ('Email not registered')
            }
            else {
                userId = user.id
                return checkPassword(req.body.password, user.password)
            }
        })
        .then(isValid =>{
            if(!isValid) {
                throw new Error (`Password for ${user.email} is wrong`)
            }
            else {
                req.session.UserId = userId
                res.redirect(`/user/${userId}`)
            }    
        })
        .catch(err => {
            res.send(err.message)
        })
    }

    static logout(req,res) {
        CartModel.destroy({where: {UserId: req.session.UserId}})
        .then(()=>{
            req.session.destroy()
            res.redirect('/')
        })
    }

    static addSkinType(req,res) {
        let userData
        let type = req.body.skin_type
        UserModel.findOne({where: {id: req.params.UserId}})
        .then(user =>{
            userData = user
            return UserModel.update(
                {skin_type: type},
                {where: {id: user.id}}
            )
        })
        .then(()=> {
            res.redirect(`/user/${userData.id}/recommendation`)
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static getRecommendation(req,res) {
        let userData
        UserModel.findOne({where: {id: req.params.UserId}})
        .then(user =>{
            userData = user
            return ProductModel.findAll({where: {skin_type: user.skin_type}})
        })
        .then(products =>{
            res.render("recommendation", {data: userData, products: products})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addToCart(req,res) {
        let userID = req.params.UserId
        let arrPromise = []
        if(req.body.ProductId === undefined) {
            res.redirect(`/user/${userID}/checkout`)
        }
        else {
            for (let productID of req.body.ProductId) {
                arrPromise.push(CartModel.create(
                    {UserId: userID, ProductId: productID}
                ))
            }
            Promise.all(arrPromise)
            .then(()=>{
                res.redirect(`/user/${userID}/checkout`)
            })
            .catch(err => {
                res.send(err)
            })
        }
    }

    static removeFromCart(req,res) {
        CartModel.destroy({where: {UserId: req.params.UserId, ProductId: req.params.ProductId}})
        .then(()=>{
            res.redirect(`/user/${req.params.UserId}/checkout`)
        })
    }

    static checkOutView(req,res) {
        let totalPrice = 0
        UserModel.findOne({include: ProductModel, where: {id: req.params.UserId}})
        .then(user =>{
            for (let objProduct of user.getDataValue("Products")) {
                totalPrice += objProduct.price
            }
            res.render("checkout", {data: user, totalPrice: priceEdit(totalPrice)})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static finalizePurchase(req,res) {
        let userData
        let productsData
        let totalPrice = 0
        UserModel.findOne({include: ProductModel, where: {id: req.params.UserId}})
        .then(user =>{
            productsData = user.getDataValue('Products')
            for (let objProduct of user.getDataValue("Products")) {
                totalPrice += objProduct.price
            }
            userData = user
            mailer(userData.email, productsData, totalPrice)
            return CartModel.destroy({where: {UserId: userData.id}})
        })
        .then(()=>{
            res.render("final", {data: userData})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static productLoggedIn(req,res) {
        ProductModel.findAll()
        .then(allProduct =>{
            res.render("productLoggedin", {data: {id: req.params.UserId}, allProduct: allProduct})
        })
    }
}

module.exports = User