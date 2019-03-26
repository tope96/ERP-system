var authController = require('../controllers/authController.js');
var bodyParser = require('body-parser');
var user = require("../config/passport/passport.js");
var models = require("../models");
var passport = require('passport')
var userUtil = require('../models/.Utilities/UserUtilise.js');

module.exports = function (app, passport) {
    var Photo = models.fotograf;
    var Client = models.klient;

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
    
    app.post('/moreInfo', isLoggedIn, function(req, res) {
        var id = req.user.IdUzytkownik;
        var comp = req.body.company;
        var www = req.body.www;
        var nr = req.body.nr;
        var bio = req.body.bio;

        photoUtil.newPhoto(id, comp, www, nr, bio).then(function (){
            res.redirect("/home");
        });    
        
    });

    app.post('/client', isLoggedIn, function(req, res){
        var idUser = req.user.IdUzytkownik;
        Client.create({
            IdUzytkownik : req.user.IdUzytkownik
        }).then(function(){
            res.redirect('/home');
        });
        
    });


}