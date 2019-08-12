var controller = require('../controllers/controller.js');
var proposalUtil = require('../models/.utils/proposal.js');

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

    app.post('/sendProposal', isLoggedIn, function (req, res) {
        var category = req.body.proposalCategory;
        var name = req.body.proposalName;
        var description = req.body.proposalDesc;
        var argumentation = req.body.proposalArgumentation;

        proposalUtil.addProposal(name, description, argumentation, category, req.user.IdPracownik, req.user.IdZespol).then(function () {
            res.redirect("/settings");
        });
    });

    app.post('/acceptProposal', isLoggedIn, isHR, function (req, res) {
        var idProposal = req.body.proposalIdReceived;
        proposalUtil.acceptProposal(idProposal).then(function () {
            res.redirect("/settings");
        });
    });

    app.post('/declineProposal', isLoggedIn, isHR, function (req, res) {
        var idProposal = req.body.proposalIdReceivedDec;

        proposalUtil.declineProposal(idProposal).then(function () {
            res.redirect("/settings");
        });
    });
};