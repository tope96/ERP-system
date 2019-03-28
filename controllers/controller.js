
var models = require("../models");
var foto = models.fotograf;
var exports = module.exports = {}

exports.events = function (req, res) {
    res.render('events');
}

exports.profile = function(req, res){
    
    userUtil.who(req, res).then(function(czyKlient){
        res.render("profile", {
            name: req.user.Imie,
            lastName: req.user.Nazwisko,
            login: req.user.Login,
            email: req.user.Email,
            czyKlient : czyKlient
        })
    })

}


exports.alreadyExists = function(req, res){
    res.render('alreadyExists');
}
