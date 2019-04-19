var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var fixedAssetsUtil = require('../models/.utils/fixedAssets.js');

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

exports.fixedAssets = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        fixedAssetsUtil.getAssets(account.IdPracownik).then(function (assets) {
            res.render('fixedAssets', {
                name: account.Imie,
                site: "Środki trwałe",
                assets: assets
            });
        });
    });
}

exports.alreadyExists = function(req, res){
    res.render('alreadyExists');
}
