var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var fixedAssetsUtil = require('../models/.utils/fixedAssets.js');
var companyUtil = require('../models/.utils/company.js');
var townUtil = require('../models/.utils/townUtil.js');
var clientUtil = require('../models/.utils/clients.js');
var permissionUtil = require('../models/.utils/permission.js');


exports.editCompany = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getCompanyInfo(profile.Firma).then(function (company) {
                townUtil.getTown(company.IdMiasto).then(function (town) {
                    clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                        permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                        res.render('editCompany', {
                            name: profile.Imie,
                            site: "Edytowanie firmy",
                            add: false,
                            userAlreadyExists: false,
                            addSuccess: false,
                            company: company,
                            town: town,
                            normal: true,
                            companyAlreadyExists: false,
                            editSuccess: false,
                            clients: clients,
                            permission: permission,
                        });
                        });
                    });
                });
            });
        });
    });
}

exports.editCompanyEdition = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getCompanyInfo(profile.Firma).then(function (company) {
                townUtil.getTown(company.IdMiasto).then(function (town) {
                    clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                        permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                        res.render('editCompany', {
                            name: profile.Imie,
                            site: "Edytowanie firmy",
                            add: false,
                            userAlreadyExists: false,
                            addSuccess: false,
                            company: company,
                            town: town,
                            normal: false,
                            companyAlreadyExists: false,
                            editSuccess: false,
                            clients: clients,
                            permission: permission
                        });
                        });
                    });
                });
            });
        });
    });
}

exports.editCompanyAddProfile = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            domaneAccount.workersWithoutDomaneAccount(req.user.IdZespol).then(function (workers) {
                companyUtil.getCompanyInfo(profile.Firma).then(function (company) {
                    townUtil.getTown(company.IdMiasto).then(function (town) {
                        clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                            permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                            res.render('editCompany', {
                                name: profile.Imie,
                                site: "Edytowanie firmy",
                                add: true,
                                workers: workers,
                                userAlreadyExists: false,
                                addSuccess: false,
                                company: company,
                                town: town,
                                normal: true,
                                companyAlreadyExists: false,
                                editSuccess: false,
                                clients: clients,
                                permission: permission
                            });
                            });
                        });
                    });
                });
            });
        });
    });
}

exports.editCompanyAddProfileError = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                companyUtil.getCompanyInfo(profile.Firma).then(function (company) {
                    townUtil.getTown(company.IdMiasto).then(function (town) {
                        clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                            permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                            res.render('editCompany', {
                                name: profile.Imie,
                                site: "Edytowanie firmy",
                                add: false,
                                workers: workers,
                                userAlreadyExists: true,
                                addSuccess: false,
                                company: company,
                                town: town,
                                normal: true,
                                companyAlreadyExists: false,
                                editSuccess: false,
                                clients: clients,
                                permission: permission
                            });
                            });
                        });
                    });
                });
            });
        });
    });
}

exports.editCompanyAddProfileSuccess = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getCompanyInfo(profile.Firma).then(function (company) {
                townUtil.getTown(company.IdMiasto).then(function (town) {
                    clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                        permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                        res.render('editCompany', {
                            name: profile.Imie,
                            site: "Edytowanie firmy",
                            add: false,
                            userAlreadyExists: false,
                            addSuccess: true,
                            company: company,
                            town: town,
                            normal: true,
                            companyAlreadyExists: false,
                            editSuccess: false,
                            clients: clients,
                            permission: permission
                        });
                        });
                    });
                });
            });
        });
    });
}

exports.editCompanyAddProfileSuccess = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getCompanyInfo(profile.Firma).then(function (company) {
                townUtil.getTown(company.IdMiasto).then(function (town) {
                    clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                        permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                        res.render('editCompany', {
                            name: profile.Imie,
                            site: "Edytowanie firmy",
                            add: false,
                            userAlreadyExists: false,
                            addSuccess: true,
                            company: company,
                            town: town,
                            normal: true,
                            companyAlreadyExists: false,
                            editSuccess: false,
                            clients: clients,
                            permission: permission
                        });
                        });
                    });
                });
            });
        });
    });
}

exports.editCompanySuccess = function (req, res) {
    domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
        workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
            companyUtil.getCompanyInfo(profile.Firma).then(function (company) {
                townUtil.getTown(company.IdMiasto).then(function (town) {
                    clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                        permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                        res.render('editCompany', {
                            name: profile.Imie,
                            site: "Edytowanie firmy",
                            add: false,
                            userAlreadyExists: false,
                            addSuccess: false,
                            company: company,
                            town: town,
                            normal: true,
                            companyAlreadyExists: false,
                            editSuccess: false,
                            companyAlreadyExists: false,
                            editSuccess: true,
                            clients: clients,
                            permission: permission
                        });
                        });
                    });
                });
            });
        });
    });
}

exports.editCompanySuccess = function (req, res) {
    console.log(res.locals.cos);
}