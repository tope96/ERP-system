//Controllers
var companyController = require('../controllers/companyController.js');
var productionController = require('../controllers/productionController.js');


var permissionUtil = require('../models/.utils/permission.js');
var companyUtil = require('../models/.utils/company.js');
var clientsUtil = require('../models/.utils/clients.js');
var projectsUtil = require('../models/.utils/projects.js');
var townUtil = require('../models/.utils/townUtil.js');
var clientUtil = require('../models/.utils/clients.js');

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

    app.get('/editCompany', isLoggedIn, companyController.editCompany);
    app.get('/editCompanyAddProfile', isLoggedIn, companyController.editCompanyAddProfile);
    app.get('/editCompanyAddProfileError', isLoggedIn, companyController.editCompanyAddProfileError);
    app.get('/editCompanyAddProfileSuccess', isLoggedIn, companyController.editCompanyAddProfileSuccess);
    app.get('/editCompanyEdition', isLoggedIn, companyController.editCompanyEdition);
    app.get('/editCompanySuccess', isLoggedIn, companyController.editCompanySuccess);
    app.get('/production', isLoggedIn, productionController.production);
    app.get('/productionAddCompanyFailed', isLoggedIn, productionController.productionAddCompanyFailed);
    app.get('/productionAddCategoryFailed', isLoggedIn, productionController.productionAddCategoryFailed);
    app.get('/addProjectFailed', isLoggedIn, productionController.addProjectFailed);
    app.get('/failedDeleteClient', isLoggedIn, companyController.failedDeleteClient);

    app.post('/addClient', isLoggedIn, isAdmin, function (req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var tel = req.body.tel;
        var company = req.body.company;

        clientsUtil.addClient(company, firstName, lastName, tel, email, req.user.IdZespol).then(function (ok) {
            if (!ok) {
                res.redirect('/addClientFailed');
            } else {
                res.redirect('/production');
            }
        });
    });

    app.post('/editClients', isLoggedIn, isAdmin, function (req, res) {
        var clientId = req.body.clientId;
        clientUtil.getClientInfo(clientId).then(function (clientInfo) {
            companyUtil.getCompanyInfo(clientInfo.Firma).then(function (companyInfo) {
                townUtil.getTown(companyInfo.IdMiasto).then(function (townInfo) {
                    permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                        res.render('editClients', {
                            name: "Tomek",
                            site: "Zasoby ludzkie",
                            clientInfo: clientInfo,
                            companyInfo: companyInfo,
                            townInfo: townInfo,
                            permission: permission
                        });
                    });
                });
            });
        });
    });

    app.post("/deleteClient", isLoggedIn, isAdmin, function (req, res) {
        var clientId = req.body.clientId;

        projectsUtil.ifClientHasProject(clientId).then(function (ok) {
            if (ok) {
                clientUtil.deleteClient(clientId).then(function () {
                    res.redirect('/editCompany');
                });
            } else {
                res.redirect('/failedDeleteClient');
            }
        });
    });

    app.post("/editClient", isLoggedIn, isAdmin, function (req, res) {
        var nameCompany = req.body.nameEdit;
        var firstName = req.body.firstNameEdit;
        var lastName = req.body.lastNameEdit;
        var tel = req.body.telEdit;
        var email = req.body.emailEdit;
        var address = req.body.addressEdit;
        var town = req.body.townEdit;
        var nip = req.body.nipEdit;
        var clientId = req.body.clientId;

        clientUtil.editClient(clientId, firstName, lastName, tel, email).then(function (idCompany) {
            companyUtil.editCompany(nameCompany, nip, address, town, idCompany, req.user.IdZespol).then(function () {
                res.redirect('/editCompany');
            });
        });
    });
};