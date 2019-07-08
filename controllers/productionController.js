var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var fixedAssetsUtil = require('../models/.utils/fixedAssets.js');
var companyUtil = require('../models/.utils/company.js');
var townUtil = require('../models/.utils/townUtil.js');

exports.production = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
            res.render('production',{
                name: profile.Imie,
                site: "Zasoby ludzkie",
                company: company
            });
        });
        });
    });
};
