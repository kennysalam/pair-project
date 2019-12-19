"use strict";
const nodemailer = require("nodemailer");
const priceEdit = require("./priceEdit")

function mailer(email, productsData, totalPrice) {
  let products = ''
  if(!productsData) {
    products += priceEdit(totalPrice)
  }
  else {
    for(let i = 0; i < productsData.length; i++){
      let newPrice = priceEdit(productsData[i].price)
      products += `Name Product: ${productsData[i].name} | Price: ${newPrice}<br><br>`
    }
    products += `Total price: ${priceEdit(totalPrice)}`
  }
  
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'skincare.pairproject@gmail.com', // generated ethereal user
      pass: 'skincare12345' // generated ethereal password
    }
  });

    // send mail with defined transport object
  let mailOptions = {
    from: 'skincare.pairproject@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Your purchase from Skin Type receipt", // Subject line
    text: "Hello world?", // plain text body
    html: products
  }

  transporter.sendMail(mailOptions, function(err, data) {
    if(err){
      console.log(err);
    }
    else {
      console.log('email sent');
    }
  })
}

module.exports = mailer