function cekUser(req,res,next){
    if(req.session.UserId == req.params.UserId) {
        next()
    }
    else {
        res.send(`ERROR: user no authorized`)
    }
}

module.exports = cekUser