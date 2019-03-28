var authController = require('../controllers/authController.js');
var bodyParser = require('body-parser');
var user = require("../config/passport/passport.js");
var models = require("../models");
var passport = require('passport')
var companyUtils = require('../models/.utils/company');

module.exports = function (app, passport) {


    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/home', isLoggedIn, authController.home);
    app.get('/logout', authController.logout);
    app.get('/notConfirmedUSer', authController.notConfirmedUser);
    app.get('/notCompleteSingUp', authController.notCompleteSingUp);
    app.get('/companyExists', authController.companyExists);
    app.get('/companyNew', authController.companyNew);
    app.get('/companyRegistered', authController.companyWait);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/notConfirmedUSer'
    }
    ));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/home',
        failureRedirect: '/notConfirmedUSer'
        }
    ));
    
    app.post('/createCompany', function(req, res){
        var companyName = req.body.companyName;
        var companyId = req.body.companyId;
        var town = req.body.town;
        var address = req.body.address;

        companyUtils.createCompany(companyName, companyId, town, address).then(function(){
            res.redirect('/companyRegistered');
        });
    })

}