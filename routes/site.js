var controller = require('../controllers/controller.js');
var companyController = require('../controllers/companyController.js');
var humanResourcesController = require('../controllers/humanResourcesController.js');
var productionController = require('../controllers/productionController.js');
var fixedAssetsController = require('../controllers/fixedAssetsController.js');


module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    function isAdmin(req, res, next){
        if(req.user.IdUprawnienia == 1){
            return next();
        }
        res.redirect('/noPermission');
    }

    function isHR(req, res, next){
        if(req.user.IdUprawnienia == 1 || req.user.IdUprawnienia == 2){
            return next();
        }
        res.redirect('/noPermission');
    }

    app.get('/profile', isLoggedIn, controller.profile);
    app.get('/fixedAssets', isLoggedIn, fixedAssetsController.fixedAssets);
    app.get('/editCompany', isLoggedIn, companyController.editCompany);
    app.get('/');
    app.get('/settings', isLoggedIn, controller.settings);
    app.get('/humanResources', isLoggedIn, humanResourcesController.humanResources);
    app.get('/production', isLoggedIn, productionController.production);
    app.get('/kalendarz', isLoggedIn, controller.calendar);
    app.get('/noPermission', controller.noPermission);

};
