const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(plainPassword) {
    return new Promise ((resolve,reject)=>{
        bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
            if(!err) {
                resolve(hash)
            }
            else {
                reject(err)
            }
        });
    })
}

module.exports = hashPassword