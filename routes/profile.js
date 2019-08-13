//Controllers
var controller = require('../controllers/controller.js');

//Dependencies
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');

module.exports = function (app, passport) {

   function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
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
    app.get('/profileEdited', isLoggedIn, controller.profile);
    app.get('/alreadyExists', isLoggedIn, controller.alreadyExists);
    app.get('/changePassword', isLoggedIn, controller.changePassword);
    app.get('/passwordChanged', isLoggedIn, controller.passwordChanged);
    app.get('/changePasswordError', isLoggedIn, controller.changePasswordError);
    app.get('/changeFailed', isLoggedIn, controller.changeFailed);

    app.post('/editUser', isLoggedIn, function(req, res){
        var name = req.body.newName;
        var lastName = req.body.newLastName;
        var email = req.body.newEmail;
        var login = req.body.newLogin;
        var idWorker = req.user.IdPracownik;

        if(login == ''){
            workersUtil.editUser(name, lastName, email, idWorker, req, res);
        }else{
        domaneAccount.newLogin(idWorker, login).then(function(ok){
            if(ok){
                res.redirect('/changeFailed');
            }else{
                workersUtil.editUser(name, lastName, email, idWorker, req, res);
            }
        });            
        }

        
    });

    app.post('/changePassword', isLoggedIn, function (req, res) {
        var currPassword = req.body.currPassword;
        var newPassword = req.body.newPassword;

        domaneAccount.ifCurrPasswordValid(req.user.IdKontoDomenowe, currPassword).then(function (ifValid) {
            if (ifValid) {
                domaneAccount.changePassword(req.user.IdKontoDomenowe, newPassword).then(function () {
                    res.redirect('/passwordChanged');
                });
            } else {
                res.redirect('/changePasswordError');
            }
        });
    });
};