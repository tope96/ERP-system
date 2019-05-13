var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var fixedAssetsUtil = require('../models/.utils/fixedAssets.js');
var companyUtil = require('../models/.utils/company.js');
var townUtil = require('../models/.utils/townUtil.js');


exports.humanResources = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                companyUtil.getAllCopmany(req.user.IdPracownik).then(function(company){
                res.render('humanResources', {
                    name: profile.Imie,
                    site: "Zasoby ludzkie",
                    workers: workers,
                    company: company
                });
            });
            });
        });
    });
}