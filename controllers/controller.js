var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var jobUtil = require('../models/.utils/job.js');
var permissionUtil = require('../models/.utils/permission.js');
var proposalUtil = require('../models/.utils/proposal.js');

exports.noPermission = function(req, res){
    res.render("noPermission.ejs");
}

exports.profile = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                res.render('profile', {
                    name: profile.Imie,
                    lastName: profile.Nazwisko,
                    login: account.Login,
                    email: profile.Email,
                    company: profile.Firma,
                    site: "Profil",
                    ifOk: false,
                    changePassword: false,
                    passwordChanged: false,
                    wrongCurrentPassword: false,
                    permission: permission,
                    failed: 0
                });
            });
        })
    })
}

exports.profileEdited = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                res.render('profile', {
                    name: profile.Imie,
                    lastName: profile.Nazwisko,
                    login: account.Login,
                    email: profile.Email,
                    company: profile.Firma,
                    site: "Profil",
                    ifOk: true,
                    changePassword: false,
                    passwordChanged: false,
                    wrongCurrentPassword: false,
                    permission: permission,
                    failed: 0
                });
            });
        })
    })
}

exports.changePassword = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                res.render('profile', {
                    name: profile.Imie,
                    lastName: profile.Nazwisko,
                    login: account.Login,
                    email: profile.Email,
                    company: profile.Firma,
                    site: "Profil",
                    ifOk: true,
                    changePassword: true,
                    passwordChanged: false,
                    wrongCurrentPassword: false,
                    permission: permission,
                    failed: 0
                });
            });
        })
    })
}

exports.passwordChanged = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                res.render('profile', {
                    name: profile.Imie,
                    lastName: profile.Nazwisko,
                    login: account.Login,
                    email: profile.Email,
                    company: profile.Firma,
                    site: "Profil",
                    ifOk: true,
                    changePassword: false,
                    passwordChanged: true,
                    wrongCurrentPassword: false,
                    permission: permission,
                    failed: 0
                });
            });
        });
    });
};

exports.changeFailed = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                res.render('profile', {
                    name: profile.Imie,
                    lastName: profile.Nazwisko,
                    login: account.Login,
                    email: profile.Email,
                    company: profile.Firma,
                    site: "Profil",
                    ifOk: true,
                    changePassword: false,
                    passwordChanged: true,
                    wrongCurrentPassword: false,
                    permission: permission,
                    failed: "Zmiana danych nie powiodła się, ponieważ w bazie istnieje już użytkownik o takich danych. Podaj inne dane."
                });
            });
        });
    });
};

exports.changePasswordError = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                res.render('profile', {
                    name: profile.Imie,
                    lastName: profile.Nazwisko,
                    login: account.Login,
                    email: profile.Email,
                    company: profile.Firma,
                    site: "Profil",
                    ifOk: true,
                    changePassword: false,
                    passwordChanged: false,
                    wrongCurrentPassword: true,
                    permission: permission,
                    failed: 0
                });
            });
        })
    })
}


//SETTINGS
exports.settings = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                    domaneAccount.getDomaneAccounts(req.user.IdZespol).then(function (domanes) {
                        proposalUtil.getSentProposal(req.user.IdPracownik).then(function (sentProposal) {
                            proposalUtil.getProposalCategory().then(function (categories) {
                                proposalUtil.getReceivedProposal(req.user.IdZespol).then(function (received) {
                                    res.render('settings', {
                                        name: profile.Imie,
                                        site: "Ustawienia",
                                        permission: permission,
                                        workers: workers,
                                        domanes: domanes,
                                        sentProposal: sentProposal,
                                        categories: categories,
                                        received: received,
                                        permissionFailed: 0
                                    })
                                })
                            });
                        });
                    });
                });
            });
        })
    })
}


//CALENDAR
exports.calendar = function (req, res) {
    workersUtil.getWorkerInfo(req.user.IdPracownik).then(function (user) {
        jobUtil.getCalendarJob(req.user.IdZespol).then(function (jobs) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                res.render('calendar', {
                    name: user.Imie,
                    site: "Kalendarz",
                    calendarJobs: jobs,
                    permission: permission
                });
            });
        });
    });
}