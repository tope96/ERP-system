var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var permissionUtil = require('../models/.utils/permission.js');
var proposalUtil = require('../models/.utils/proposal.js');

exports.writeProposal = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                proposalUtil.getProposalCategory().then(function (proposalCategories) {
                    res.render('proposal', {
                        name: profile.Imie,
                        site: "Zasoby ludzkie",
                        permission: permission,
                        proposalCategories: proposalCategories
                    });
                });
            });
        });
    });
}