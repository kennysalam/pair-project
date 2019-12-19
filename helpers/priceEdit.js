function priceEdit(price) {
    let newPrice = []
    let priceSplit = String(price).split('')
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


module.exports = priceEdit

const main = require('./mailer')

main()