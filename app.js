'use strict'
const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const Product = require('./controller/product')

const user = require('./routers/user')

app.use(express.urlencoded({ extended: true }))
app.use(express.static("./"))
app.use(session({
    secret: 'keyboard cat'
}))
app.set('view engine', 'ejs')


app.get('/', (req,res) => res.render('home'))
app.get('/product', Product.getAllProduct)

app.use('/user', user)

app.listen(port, ()=>console.log(`Listening on port ${port}!`))