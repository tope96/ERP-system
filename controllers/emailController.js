var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var permissionUtil = require('../models/.utils/permission.js');
var emails = require('../models/.utils/emails.js');

exports.newEmail = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                emails.getEmails(req.user.IdZespol).then(function(emails){
                    workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                    res.render('emails', {
                        name: profile.Imie,
                        site: "Email",
                        permission: permission,
                        emails: emails,
                        workers: workers
                    });
                    });
                    });
                });
            });
        });
}

exports.createEmail = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                    res.render('createEmail', {
                        name: profile.Imie,
                        site: "Email",
                        permission: permission,
                        workers: workers,
                        failed: 0
                    });
                    });
                });
            });
        });
}

exports.createEmailFailed = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                    res.render('createEmail', {
                        name: profile.Imie,
                        site: "Email",
                        permission: permission,
                        workers: workers,
                        failed: 1
                    });
                    });
                });
            });
        });
}