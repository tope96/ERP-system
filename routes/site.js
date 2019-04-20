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

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    app.post('/editUser', isLoggedIn, function(req, res){
        var name = req.body.newName;
        var lastName = req.body.newLastName;
        var email = req.body.newEmail;
        var login = req.body.newLogin;

        workersUtil.editUser(req, res, name, lastName, email, login);
    });

    app.post('/addAsset', isLoggedIn, function(req, res){
        var name = req.body.name;
        var description = req.body.description;
        var type = req.body.type;
        var price = req.body.price;
        var date = req.body.date;
        var owner = req.body.owner;
        fixedAssets.addAsset(name, description, type, price, date, owner);
        setTimeout(function(){
            res.redirect('/fixedAssets');
        }, 500);
    });

}