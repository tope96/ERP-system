//Controllers
var controller = require('../controllers/controller.js');
var permissionUtil = require('../models/.utils/permission.js');

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

    app.get('/settings', isLoggedIn, controller.settings);

    app.post('/permissionChange', isLoggedIn, isAdmin, function (req, res) {
        var permission = req.body.perm;
        var idWorker = req.body.idWorker;

        permissionUtil.changePermission(idWorker, permission).then(function (changed) {
            if (!changed) {
                res.redirect('/settingsPermFailed');
            } else {
                res.redirect('/settings');
            }
        });
    });
};