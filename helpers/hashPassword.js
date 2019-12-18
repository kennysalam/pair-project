const crypto = require('crypto')

function hashPassword(newSecret, plainPassword) {
    const secret = newSecret
    const hash = crypto.createHmac('sha256', secret)
    .update(plainPassword)
    .digest('hex')

    return hash
}

module.exports = hashPassword