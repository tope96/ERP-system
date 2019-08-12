var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var companyUtil = require('../models/.utils/company.js');
var agreementUtil = require('../models/.utils/agreementsUtil.js');
var spec = require('../models/.utils/specialization');
var teamsUtil = require('../models/.utils/teamsUtil.js');
var permissionUtil = require('../models/.utils/permission.js');
var emailsUtil = require('../models/.utils/emails.js');

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
                                                            emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
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
                                                                    praca: praca,
                                                                    edycja: 0,
                                                                    edycjaPracownika: 0,
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
                            });
                        });
                    });
                });
            });
        });
    });
};

exports.humanResourcesAddFailed = function (req, res) {
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
                                                            emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
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
                                                                    praca: praca,
                                                                    edycja: 0,
                                                                    edycjaPracownika: 0,
                                                                    emails: emails,
                                                                    failed: "Dodawanie pracownika się nie powiodło. Pracownik z takim adresem email lub numerem telefonu juz istnieje."
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
    });
};

exports.humanResourcesAddCompanyFailed = function (req, res) {

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
                                                            emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
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
                                                                    praca: praca,
                                                                    edycja: 0,
                                                                    edycjaPracownika: 0,
                                                                    emails: emails,
                                                                    failed: "Dodawanie firmy się nie powiodło. Taka firma już istnieje w bazie."
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
    });
};

exports.deleteHumanFailed = function (req, res) {

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
                                                            emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
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
                                                                    praca: praca,
                                                                    edycja: 0,
                                                                    edycjaPracownika: 0,
                                                                    emails: emails,
                                                                    failed: "Usuwanie pracownika nie powiodło się, ponieważ pracownik ma przypisane zadanie. Usuań zadanie lub zmień w nim pracownika."
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
    });
};

exports.deleteHumanFailedSuperior = function (req, res) {

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
                                                            emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
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
                                                                    praca: praca,
                                                                    edycja: 0,
                                                                    edycjaPracownika: 0,
                                                                    emails: emails,
                                                                    failed: "Usuwanie pracownika nie powiodło się, ponieważ pracownik ma nadal funkcję przełozonego. Usuń go z tej roli i spróuj ponownie"
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
    });
};

exports.deleteHumanFailedAsset = function (req, res) {
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
                                                            emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
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
                                                                    praca: praca,
                                                                    edycja: 0,
                                                                    edycjaPracownika: 0,
                                                                    emails: emails,
                                                                    failed: "Usuwanie pracownika nie powiodło się, ponieważ pracownik jest osobą odpowiedzialną za środek trwały. Zmień osobę odpowiedzialną i spróbuj ponownie."
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
    });
};