var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var fixedAssetsUtil = require('../models/.utils/fixedAssets.js');
var companyUtil = require('../models/.utils/company.js');
var townUtil = require('../models/.utils/townUtil.js');
var agreementUtil = require('../models/.utils/agreementsUtil.js');
var spec = require('../models/.utils/specialization');
var teamsUtil = require('../models/.utils/teamsUtil.js');
var permissionUtil = require('../models/.utils/permission.js');

exports.humanResources = function (req, res) {

    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                companyUtil.getAllCopmany(req.user.IdZespol).then(function (company) {
                    workersUtil.getAllProgrammers().then(function (programmers) {
                        workersUtil.getAllAnalit().then(function (analit) {
                            spec.getAllSpec().then(function (specs) {
                                teamsUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                                    teamsUtil.getAllTeamsMembers().then(function (teamsMember) {
                                        permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                                            agreementUtil.getAllAgree().then(function (agrees) {
                                                agreementUtil.getB2b().then(function (b2b) {
                                                    agreementUtil.getOPrace().then(function (praca) {
                                                        agreementUtil.getZlecenie().then(function (zlecenie) {
                                                            res.render('humanResources', {
                                                                name: profile.Imie,
                                                                site: "Zasoby ludzkie",
                                                                workers: workers,
                                                                company: company,
                                                                programmers: programmers,
                                                                analit: analit,
                                                                spec: specs,
                                                                teams: teams,
                                                                teamsMember: teamsMember,
                                                                permission: permission,
                                                                agrees: agrees,
                                                                b2b: b2b,
                                                                zlecenie: zlecenie,
                                                                praca: praca
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    agreementUtil.getAgreeInfo(0);
}
