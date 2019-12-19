const bcrypt = require('bcrypt');
const saltRounds = 10;

function checkPassword(plainPassword, hash) {
    return new Promise((resolve, reject)=>{
        bcrypt.compare(plainPassword, hash, function(err, res) {
            if(err) {
                reject(err)
            } else {
                resolve(res)
            }
        }); 
    })
}

module.exports = checkPassword