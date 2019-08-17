
var fixedAssetsController = require('../controllers/fixedAssetsController.js');
var fixedAssets = require('../models/.utils/fixedAssets.js');


module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/signin');
    }

    function isAdmin(req, res, next) {
        if (req.user.IdUprawnienia == 1) {
            return next();
        }
        res.redirect('/noPermission');
    }

    function isHR(req, res, next) {
        if (req.user.IdUprawnienia == 1 || req.user.IdUprawnienia == 2) {
            return next();
        }
        res.redirect('/noPermission');
    }

    app.get('/fixedAssets', isLoggedIn, fixedAssetsController.fixedAssets);

    app.post('/addAsset', isLoggedIn, isHR, function (req, res) {
        var name = req.body.name;
        var description = req.body.description;
        var type = req.body.type;
        var price = req.body.price;
        var date = req.body.date;
        var owner = req.body.owner;
        var amount = req.body.amount;

        fixedAssets.addAsset(name, description, type, price, date, owner, amount, req.user.IdZespol);
        setTimeout(function () {
            res.redirect('/fixedAssets');
        }, 500);
    });

    app.post('/deleteAsset', isLoggedIn, isHR, function (req, resp) {
        var idAsset = req.body.asset;
        fixedAssets.deleteAsset(idAsset, req.user.IdZespol).then(function () {
            setTimeout(function () {
                resp.redirect('/fixedAssets');
            }, 500);
        });
    });

    app.post('/deleteOneAsset', isHR, isLoggedIn, function (req, resp) {
        var idAsset = req.body.asset;
        fixedAssets.deleteOneasset(idAsset, req.user.IdZespol).then(function () {
            setTimeout(function () {
                resp.redirect('/fixedAssets');
            }, 500);
        });
    });

    app.post('/addOneAsset', isLoggedIn, isHR, function (req, resp) {
        var idAsset = req.body.asset;
        fixedAssets.addOneAsset(idAsset, req.user.IdZespol).then(function () {
            setTimeout(function () {
                resp.redirect('/fixedAssets');
            }, 500);
        });
    });

    app.post('/editAsset', isLoggedIn, isHR, function (req, resp) {
        var name = req.body.nameEdit;
        var description = req.body.descriptionEdit;
        var type = req.body.typeEdit;
        var price = req.body.priceEdit;
        var date = req.body.dateEdit;
        var id = req.body.idEdit;
        var owner = req.body.ownerEdit;

        fixedAssets.editAsset(name, description, type, price, date, id, owner, req.user.IdZespol).then(function () {
            setTimeout(function () {
                resp.redirect('/fixedAssets');
            }, 500);
        });
    });

};