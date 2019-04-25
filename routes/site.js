var controller = require('../controllers/controller.js');
var bodyParser = require('body-parser');
var user = require("../config/passport/passport.js");
var models = require("../models");
var passport = require('passport');
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var fixedAssets = require('../models/.utils/fixedAssets.js');

module.exports = function (app, passport) {
    app.get('/profile', isLoggedIn, controller.profile);
    app.get('/profileEdited', isLoggedIn, controller.profile);
    app.get('/alreadyExists', isLoggedIn, controller.alreadyExists);
    app.get('/fixedAssets', isLoggedIn, controller.fixedAssets);
    app.get('/editCompany', isLoggedIn, controller.editCompany);
    app.get('/editCompanyAddProfile', isLoggedIn, controller.editCompanyAddProfile);
    app.get('/editCompanyAddProfileError', isLoggedIn, controller.editCompanyAddProfileError);
    app.get('/editCompanyAddProfileSuccess', isLoggedIn, controller.editCompanyAddProfileSuccess);
    app.get('/changePassword', isLoggedIn, controller.changePassword);
    app.get('/passwordChanged', isLoggedIn, controller.passwordChanged);
    app.get('/changePasswordError', isLoggedIn, controller.changePasswordError);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    //PROFILE
    app.post('/editUser', isLoggedIn, function(req, res){
        var name = req.body.newName;
        var lastName = req.body.newLastName;
        var email = req.body.newEmail;
        var login = req.body.newLogin;

        workersUtil.editUser(req, res, name, lastName, email, login);
    });

    app.post('/changePassword', isLoggedIn, function(req, res){
        var currPassword = req.body.currPassword;
        var newPassword = req.body.newPassword;

        domaneAccount.ifCurrPasswordValid(req.user.IdKontoDomenowe, currPassword).then(function(ifValid){
            if(ifValid){
                domaneAccount.changePassword(req.user.IdKontoDomenowe, newPassword).then(function(){
                    res.redirect('/passwordChanged');
                });
            }else{
                    res.redirect('/changePasswordError');
            }
        });
    });

    //FIXED ASSETS
    app.post('/addAsset', isLoggedIn, function(req, res){
        var name = req.body.name;
        var description = req.body.description;
        var type = req.body.type;
        var price = req.body.price;
        var date = req.body.date;
        var owner = req.body.owner;
        var amount = req.body.amount;
        
        fixedAssets.addAsset(name, description, type, price, date, owner, amount);
        setTimeout(function(){
            res.redirect('/fixedAssets');
        }, 500);
    });

    app.post('/deleteAsset', isLoggedIn, function(req, resp){
        var idAsset = req.body.asset;
        fixedAssets.deleteAsset(idAsset).then(function(){
            setTimeout(function(){
                resp.redirect('/fixedAssets');
            }, 500); 
        });
    });

    app.post('/deleteOneAsset', isLoggedIn, function(req, resp){
        var idAsset = req.body.asset;
        fixedAssets.deleteOneasset(idAsset).then(function(){
            setTimeout(function(){
                resp.redirect('/fixedAssets');
            }, 500);
        })
    });

    app.post('/addOneAsset', isLoggedIn, function(req, resp){
        var idAsset = req.body.asset;
        fixedAssets.addOneAsset(idAsset).then(function(){
            setTimeout(function(){
                resp.redirect('/fixedAssets');
            }, 500);
        })
    })

    app.post('/editAsset', isLoggedIn, function(req, resp){
        var name = req.body.nameEdit;
        var description = req.body.descriptionEdit;
        var type = req.body.typeEdit;
        var price = req.body.priceEdit;
        var date = req.body.dateEdit;
        var id = req.body.idEdit;

        fixedAssets.editAsset(name, description, type, price, date, id).then(function(){
            setTimeout(function(){
                resp.redirect('/fixedAssets');
            }, 500); 
        })
    });

    //COMPANY EDIT

    app.post('/addProfile', isLoggedIn, function(req, res){
        var name = req.body.name;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var tel = req.body.telephone;
        var login = req.body.login;
        var password = req.body.password;
        var superior = req.body.superior;

        workersUtil.addProfile(name, lastName, email, tel, superior).then(function(user){
            if(user == false){
                res.redirect('/editCompanyAddProfileError');
            }else{
                domaneAccount.newAccount(login, user.IdPracownik, password).then(function(){
                    res.redirect('/editCompanyAddProfileSuccess');
                })
            }
        });
    });

}