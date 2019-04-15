var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');

exports.profile = function(req, res){
    workersUtil.getName(req.user.IdKontoDomenowe).then(function(name){
    res.render('profile',{
        name: name,
        site: "Profil"
    });
})
}


exports.alreadyExists = function(req, res){
    res.render('alreadyExists');
}
