const router = require('express').Router()

const User = require('../controller/user')

const cekUser = require('../middlewares/cekUser')

const nodemailer = require('nodemailer');

router.get('/register', (req,res)=>{res.render("register")})
router.post('/register', User.register)

router.get('/login', (req,res)=>{res.render("login")})
router.post('/login', User.login)

router.get('/logout', User.logout)

router.get('/:UserId', cekUser, (req,res)=>{res.render("loggedInHome", {data: {id: req.params.UserId}})})

router.get('/:UserId/product', cekUser, User.productLoggedIn)

router.get('/:UserId/skin-type', cekUser, (req,res)=>{res.render("skinTypeSelect", {data: {id: req.params.UserId}})})
router.post('/:UserId/skin-type', cekUser, User.addSkinType)

router.get('/:UserId/recommendation', cekUser, User.getRecommendation)
router.post('/:UserId/recommendation', cekUser, User.addToCart)

router.get('/:UserId/checkout', cekUser, User.checkOutView)

router.get('/:UserId/checkout/remove/:ProductId', cekUser, User.removeFromCart)

router.get('/:UserId/finalize', cekUser, User.finalizePurchase)

module.exports = router