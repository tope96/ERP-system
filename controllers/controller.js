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
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
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
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
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
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
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
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
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
        fixedAssetsUtil.getAssets(account.IdPracownik).then(function (assets) {
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

exports.editCompany = function(req, res){
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
        res.render('editCompany', {
            name: profile.Imie,
            site: "Edytowanie firmy",
            add: false,
            userAlreadyExists: false,
            addSuccess: false
        });
    })
}

exports.editCompanyAddProfile = function(req, res){
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
        workersUtil.getWorkers().then(function(workers){
            res.render('editCompany', {
                name: profile.Imie,
                site: "Edytowanie firmy",
                add: true,
                workers: workers,
                userAlreadyExists: false,
                addSuccess: false
            });
        });
    });
}

exports.editCompanyAddProfileError = function(req, res){
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
        workersUtil.getWorkers().then(function(workers){
            res.render('editCompany', {
                name: profile.Imie,
                site: "Edytowanie firmy",
                add: false,
                workers: workers,
                userAlreadyExists: true,
                addSuccess: false
            });
        });
    });
}

exports.editCompanyAddProfileSuccess = function(req, res){
    workersUtil.getWorkerInfo(req.user.IdKontoDomenowe).then(function(profile){
            res.render('editCompany', {
                name: profile.Imie,
                site: "Edytowanie firmy",
                add: false,
                userAlreadyExists: false,
                addSuccess: true
            });
        });
}
