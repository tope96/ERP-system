var controller = require('../controllers/controller.js');
var bodyParser = require('body-parser');

var models = require("../models");

module.exports = function (app, passport) {
    app.get('/profile', isLoggedIn, controller.profile);
   

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }


}