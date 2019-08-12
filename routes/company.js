//Controllers
var companyController = require('../controllers/companyController.js');

//Dependencies
var domaneAccount = require('../models/.utils/domaneAccount.js');
var companyUtil = require('../models/.utils/company.js');



module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
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

    app.get('/editCompany', isLoggedIn, companyController.editCompany);
    app.get('/editCompanyAddProfile', isLoggedIn, companyController.editCompanyAddProfile);
    app.get('/editCompanyAddProfileError', isLoggedIn, companyController.editCompanyAddProfileError);
    app.get('/editCompanyAddProfileSuccess', isLoggedIn, companyController.editCompanyAddProfileSuccess);
    app.get('/editCompanyEdition', isLoggedIn, companyController.editCompanyEdition);
    app.get('/editCompanySuccess', isLoggedIn, companyController.editCompanySuccess);
    app.get('/failedDeleteClient', isLoggedIn, companyController.failedDeleteClient);

    app.post('/addProfile', isLoggedIn, isAdmin, function (req, res) {
        var login = req.body.login;
        var password = req.body.password;
        var worker = req.body.worker;

        domaneAccount.newAccount(login, password, worker, req.user.IdZespol).then(function (ifOk) {
            if (ifOk) {
                res.redirect('/editCompany');
            } else {
            }
        });
    });

    app.post('/companyEdition', isLoggedIn, isAdmin, function (req, res) {
        var name = req.body.companyName;
        var nip = req.body.companyNip;
        var town = req.body.companyTown;
        var address = req.body.companyAddress;
        var id = req.body.companyId;

        companyUtil.editCompany(name, nip, address, town, id, req.user.IdZespol).then(function () {
            res.redirect('/editCompany');
        });
    });

    app.post('/addCompany', isLoggedIn, function (req, res) {
        var hr = req.body.ifHr;
        var production = req.body.ifProduction;
        var name = req.body.nameCompany;
        var nip = req.body.nipCompany;
        var address = req.body.addressCompany;
        var town = req.body.townCompany;

        companyUtil.addCompany(name, nip, address, town, req.user.IdZespol).then(function (ifOk) {
            if (ifOk) {
                if (hr == 1) {
                    res.redirect('/humanResources');
                } else if (production == 1) {
                    res.redirect('/production');
                }
            } else {
                if (hr == 1) {
                    res.redirect('/humanResourcesAddCompanyFailed');
                } else if (production == 1) {
                    res.redirect('/productionAddCompanyFailed');
                }
            }
        });
    });
};