const router = require('express').Router()

const User = require('../controller/user')
const Cart = require('../controller/cart')


router.get('/register', (req,res)=>{res.render("register")})
router.post('/register', User.register)

router.get('/login', (req,res)=>{res.render("login")})
router.post('/login', User.login)

router.get('/logout', User.logout)

router.get('/:UserId', (req,res)=>{res.render("loggedInHome", {UserId: req.params.UserId})})

router.get('/:UserId/skin-type', (req,res)=>{res.render("skinTypeSelect", {UserId: req.params.UserId})})
router.post('/:UserId/skin-type', User.addSkinType)

router.get('/:UserId/recommendation', User.getRecommendation)
router.post('/:UserId/recommendation', User.addToCart)

router.get('/:UserId/checkout', User.checkOutView)

module.exports = router