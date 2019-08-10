var fixedAssetsUtil = require('../models/.utils/fixedAssets.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var workersUtil = require('../models/.utils/workerUtil.js');
var permissionUtil = require('../models/.utils/permission.js');

exports.fixedAssets = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
        fixedAssetsUtil.getAssets(account.IdPracownik, req.user.IdZespol).then(function (assets) {
            workersUtil.getWorkers(req.user.IdZespol).then(function (users) {
                permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                    res.render('fixedAssets', {
                        name: profile.Imie,
                        site: "Środki trwałe",
                        assets: assets,
                        users: users,
                        permission: permission
                    });
                    });
                });
            });
        });
    });
}