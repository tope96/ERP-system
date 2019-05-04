var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var fixedAssetsUtil = require('../models/.utils/fixedAssets.js');
var companyUtil = require('../models/.utils/company.js');
var townUtil = require('../models/.utils/townUtil.js');

exports.profile = function(req, res){
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function(account){
    workersUtil.getWorkerInfo(account.IdPracownik).then(function(profile){
    res.render('profile',{
        name: profile.Imie,
        lastName: profile.Nazwisko,
        login: account.Login,
        email: profile.Email,
        company: profile.Firma,
        site: "Profil",
        ifOk: false,
        changePassword: false,
        passwordChanged: false,
        wrongCurrentPassword: false
    });
})
})
}

exports.profileEdited = function(req, res){
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function(account){
    workersUtil.getWorkerInfo(account.IdPracownik).then(function(profile){
    res.render('profile',{
        name: profile.Imie,
        lastName: profile.Nazwisko,
        login: account.Login,
        email: profile.Email,
        company: profile.Firma,
        site: "Profil",
        ifOk: true,
        changePassword: false,
        passwordChanged: false,
        wrongCurrentPassword: false
    });
})
})
}

exports.changePassword = function(req, res){
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function(account){
    workersUtil.getWorkerInfo(account.IdPracownik).then(function(profile){
    res.render('profile',{
        name: profile.Imie,
        lastName: profile.Nazwisko,
        login: account.Login,
        email: profile.Email,
        company: profile.Firma,
        site: "Profil",
        ifOk: true,
        changePassword: true,
        passwordChanged: false,
        wrongCurrentPassword: false
    });
})
})
}

exports.passwordChanged = function(req, res){
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function(account){
    workersUtil.getWorkerInfo(account.IdPracownik).then(function(profile){
    res.render('profile',{
        name: profile.Imie,
        lastName: profile.Nazwisko,
        login: account.Login,
        email: profile.Email,
        company: profile.Firma,
        site: "Profil",
        ifOk: true,
        changePassword: false,
        passwordChanged: true,
        wrongCurrentPassword: false
    });
})
})
}

exports.changePasswordError= function(req, res){
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function(account){
    workersUtil.getWorkerInfo(account.IdPracownik).then(function(profile){
    res.render('profile',{
        name: profile.Imie,
        lastName: profile.Nazwisko,
        login: account.Login,
        email: profile.Email,
        company: profile.Firma,
        site: "Profil",
        ifOk: true,
        changePassword: false,
        passwordChanged: false,
        wrongCurrentPassword: true
    });
})
})
}

exports.fixedAssets = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        fixedAssetsUtil.getAssets(account.IdPracownik, req.user.IdZespol).then(function (assets) {
            workersUtil.getWorkers().then(function(users){
            res.render('fixedAssets', {
                name: account.Imie,
                site: "Środki trwałe",
                assets: assets,
                users: users
            });
        });
    });
    });
}

exports.alreadyExists = function(req, res){
    res.render('alreadyExists');
}


//SETTINGS
exports.settings = function(req, res){
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function(account){
    workersUtil.getWorkerInfo(account.IdPracownik).then(function(profile){
    res.render('settings',{
        name: profile.Imie,
        site: "Ustawienia"
    });
})
})
}

