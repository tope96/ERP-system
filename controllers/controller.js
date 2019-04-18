var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');

exports.profile = function(req, res){
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function(account){
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
    res.render('profile',{
        name: profile.Imie,
        lastName: profile.Nazwisko,
        login: account.Login,
        email: profile.Email,
        company: profile.Firma,
        site: "Profil",
        ifOk: false
    });
})
})
}

exports.profileEdited = function(req, res){
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function(account){
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
    res.render('profile',{
        name: profile.Imie,
        lastName: profile.Nazwisko,
        login: account.Login,
        email: profile.Email,
        company: profile.Firma,
        site: "Profil",
        ifOk: true
    });
})
})
}

exports.alreadyExists = function(req, res){
    res.render('alreadyExists');
}
