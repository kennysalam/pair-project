const UserModel = require('../models').User
const ProductModel = require('../models').Product
const CartModel = require('../models').Cart

const hashPassword = require('../helpers/hashPassword')

class User {
    static register(req,res) {
        req.body.skin_type = null
        req.body.isLogin = 0
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
                let password = hashPassword(user.secret, req.body.password)
                if(password !== user.password) {
                    throw new Error (`Password for ${user.email} is wrong`)
                }
                else {
                    userId = user.id
                    return UserModel.update(
                        {isLogin: 1},
                        {where: {id: user.id}}
                    )
                }
            }
        })
        .then(()=>{
            res.redirect(`/user/${userId}`)
        })
        .catch(err => {
            res.send(err.message)
        })
    }

    static logout(req,res) {
        UserModel.findOne({where: {isLogin: 1}})
        .then(user =>{
            return UserModel.update(
                {isLogin: 0},
                {where: {id: user.id}}
            )
        })
        .then(()=>{
            res.redirect('/')
        })
        .catch(err=>{
            res.send(err)
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
            res.render("recommendation", {userData: userData, products: products})
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

    static checkOutView(req,res) {
        let totalPrice = 0
        UserModel.findOne({include: ProductModel, where: {id: req.params.UserId}})
        .then(user =>{
            for (let objProduct of user.getDataValue("Products")) {
                totalPrice += objProduct.price
            }
            res.render("checkout", {data: user, totalPrice: totalPrice})
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports = User