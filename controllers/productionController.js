var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var projectsUtil = require('../models/.utils/projects.js');
var companyUtil = require('../models/.utils/company.js');
var clientUtil = require('../models/.utils/clients.js');
var teamUtil = require('../models/.utils/teamsUtil.js');

exports.production = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
                clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                    projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                        teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                            projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                    res.render('production', {
                                        name: profile.Imie,
                                        site: "Zasoby ludzkie",
                                        company: company,
                                        clients: clients,
                                        category: category,
                                        teams: teams,
                                        projects: projects,
                                        teamProjects: teamProjects
                                    });
                                })
                            });
                        });
                    });
                });
            });
        });
    });
};
