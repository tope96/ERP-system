var authController = require('../controllers/authController.js');
var bodyParser = require('body-parser');
var user = require("../config/passport/passport.js");
var models = require("../models");
var passport = require('passport')


module.exports = function (app, passport) {


    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/home', isLoggedIn, authController.home);
    app.get('/logout', authController.logout);
    app.get('/notConfirmedUSer', authController.notConfirmedUser);
    app.get('/notCompleteSingUp', authController.notCompleteSingUp);


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
    


}