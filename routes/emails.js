//Controllers
var emailsController = require('../controllers/emailController.js');

//Dependencies
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var permissionUtil = require('../models/.utils/permission.js');
var emailsUtil = require('../models/.utils/emails.js');

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

    app.get('/emails', isLoggedIn, isAdmin, emailsController.newEmail);
    app.get('/createEmail', isLoggedIn, emailsController.createEmail);
    app.get('/createEmailFailed', isLoggedIn, emailsController.createEmailFailed);
    app.get('/createEmailGroup', isLoggedIn, emailsController.createEmailGroup);
    app.get('/createEmailsGroupFaled', isLoggedIn, emailsController.createEmailsGroupFailed);
    app.get('/emailsDeleteFailed', isLoggedIn, emailsController.emailsDeleteFailed);

    app.post('/createEmail', isLoggedIn, isAdmin, function (req, res) {
        var address = req.body.address + "@comboBox.com";
        var alias = req.body.alias + "@comboBox.com";
        var idWorker = req.body.worker;

        emailsUtil.createEmail(idWorker, address, alias, req.user.IdZespol).then(function (created) {
            if (created == false) {
                res.redirect('/createEmailFailed');
            } else {
                res.redirect('/emails');
            }
        });
    });

    app.post('/deleteEmail', isLoggedIn, isAdmin, function (req, res) {
        var idEmail = req.body.idEmail;

        emailsUtil.ifGroupHasMail(idEmail).then(function (ok) {
            if (ok) {
                emailsUtil.deleteEmail(idEmail).then(function () {
                    res.redirect('/emails');
                });
            } else {
                return res.redirect('/emailsDeleteFailed');
            }
        });
    });

    app.post('/createEmailsGroup', isLoggedIn, isAdmin, function (req, res) {
        var address = req.body.address + "@comboBox.com";
        var members = req.body.groupMember;
        var desc = req.body.groupDesc;

        emailsUtil.createEmailGroup(address, req.user.IdZespol, desc).then(function (idGroup) {
            if (idGroup == false) {
                res.redirect('/createEmailsGroupFaled');
            } else {
                emailsUtil.addNewMember(members, idGroup).then(function () {
                    res.redirect('/emails');
                });
            }
        });
    });

    app.post('/deleteEmailGroup', isLoggedIn, isAdmin, function (req, res) {
        var idEmailGroup = req.body.idEmailGroup;

        emailsUtil.deleteEmailGroup(idEmailGroup).then(function () {
            res.redirect('/emails');
        });
    });

    app.post('/editGroup', isLoggedIn, isAdmin, function (req, res) {
        var address = req.body.address + "@comboBox.com";
        var desc = req.body.groupDesc;
        var idGroup = req.body.idGroup;

        emailsUtil.editEmailGroup(idGroup, address, desc).then(function () {
            res.redirect('/emails');
        });
    });

    app.post('/editEmailGroup', isLoggedIn, isAdmin, function (req, res) {
        var idEmailGroup = req.body.idEmailGroup;

        domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
            workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                emailsUtil.getOneGroup(idEmailGroup).then(function (emailGroup) {
                    permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                        emailsUtil.getAllEmailsInGroup(idEmailGroup).then(function (members) {
                            emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
                                res.render('editEmailGroup', {
                                    name: profile.Imie,
                                    site: "Email",
                                    permission: permission,
                                    emailGroup: emailGroup,
                                    nameOfGroup: (emailGroup.AdresPocztowy).substring(0, (emailGroup.AdresPocztowy).lastIndexOf("@")),
                                    members: members,
                                    emails: emails,
                                    failed: 0
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    app.post('/deleteFromEmailGroup', isLoggedIn, isAdmin, function (req, res) {
        var members = req.body.toDelete;
        var idGroup = req.body.idGroup;

        emailsUtil.deleteFromGroup(members, idGroup).then(function () {
            domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
                workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                    emailsUtil.getOneGroup(idGroup).then(function (emailGroup) {
                        permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                            emailsUtil.getAllEmailsInGroup(idGroup).then(function (members) {
                                emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
                                    res.render('editEmailGroup', {
                                        name: profile.Imie,
                                        site: "Email",
                                        permission: permission,
                                        emailGroup: emailGroup,
                                        nameOfGroup: (emailGroup.AdresPocztowy).substring(0, (emailGroup.AdresPocztowy).lastIndexOf("@")),
                                        members: members,
                                        emails: emails,
                                        failed: 0
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    app.post('/addNewMembersEmailGroup', isLoggedIn, isAdmin, function (req, res) {
        var members = req.body.toAdd;
        var idGroup = req.body.idGroup;

        emailsUtil.addNewMember(members, idGroup).then(function () {
            domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
                workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                    emailsUtil.getOneGroup(idGroup).then(function (emailGroup) {
                        permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                            emailsUtil.getAllEmailsInGroup(idGroup).then(function (members) {
                                emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
                                    res.render('editEmailGroup', {
                                        name: profile.Imie,
                                        site: "Email",
                                        permission: permission,
                                        emailGroup: emailGroup,
                                        nameOfGroup: (emailGroup.AdresPocztowy).substring(0, (emailGroup.AdresPocztowy).lastIndexOf("@")),
                                        members: members,
                                        emails: emails,
                                        failed: 0
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};