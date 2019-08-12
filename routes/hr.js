//Controllers
var humanResourcesController = require('../controllers/humanResourcesController.js');

//Dependencies
var multer = require('multer');
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var companyUtil = require('../models/.utils/company.js');
var agreementUtil = require('../models/.utils/agreementsUtil.js');
var positionUtil = require('../models/.utils/position.js');
var jobUtil = require('../models/.utils/job.js');
var fixedAssetsUtil = require('../models/.utils/fixedAssets.js');
var spec = require('../models/.utils/specialization');
var teamsUtil = require('../models/.utils/teamsUtil.js');
var permissionUtil = require('../models/.utils/permission.js');
var emailsUtil = require('../models/.utils/emails.js');

module.exports = function (app, passport) {
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'contracts/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.pdf');
        }
    });

    var upload = multer({storage: storage});

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/signin');
    }

    function isAdmin(req, res, next) {
        if (req.user.IdUprawnienia == 1) {
            return next();
        }
        res.redirect('/noPermission');
    }

    function isHR(req, res, next) {
        if (req.user.IdUprawnienia == 1 || req.user.IdUprawnienia == 2) {
            return next();
        }
        res.redirect('/noPermission');
    }

    app.get('/humanResources', isLoggedIn, humanResourcesController.humanResources);
    app.get('/humanResourcesAddFailed', humanResourcesController.humanResourcesAddFailed);
    app.get('/humanResourcesAddCompanyFailed', isLoggedIn, humanResourcesController.humanResourcesAddCompanyFailed);
    app.get('/deleteHumanFailed', isLoggedIn, humanResourcesController.deleteHumanFailed);
    app.get('/deleteHumanFailedSuperior', isLoggedIn, humanResourcesController.deleteHumanFailedSuperior);
    app.get('/deleteHumanFailedAsset', isLoggedIn, humanResourcesController.deleteHumanFailedAsset);

    


    app.post('/addHuman', upload.single('file-to-upload'), isLoggedIn, isAdmin, function (req, res) {
        var name = req.body.name;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var tel = req.body.telephone;
        var superior = req.body.superior;
        var typeOfAgreement = req.body.agreement; // 1 - umowa o prace, 2 - umowa zlecenie, 3 - umowa B2B
        var timeOfContract = req.body.timeOfContract;
        var ifStudent = req.body.ifStudent;
        var ifZus = req.body.ifZus;
        var ifCompetition = req.body.ifCompetition;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        var lumpSum = req.body.lumpSum;
        var hourlyRate = req.body.hourlyRate;
        var companyId = req.body.companyB2b;
        var contractFileLink = null;
        var position = req.body.position; // 0 - analityk, 1 - programista
        var spec = req.body.spec;

        if (req.file === 'undefined') {
            contractFileLink = null;
        } else {
            contractFileLink = req.file.filename;
        }

        workersUtil.addProfile(name, lastName, email, tel, superior, req.user.IdZespol, contractFileLink).then(function (user) {
            if (position == 1) {
                positionUtil.addProgram(user.IdPracownik, spec);
            } else {
                positionUtil.addAnalit(user.IdPracownik, spec);
            }
            if (user == false) {
                res.redirect('/humanResourcesAddFailed');
            } else {
                agreementUtil.addAgreement(startDate, endDate, lumpSum, hourlyRate).then(function (agreeId) {
                    if (agreeId == false) {
                    } else {
                        if (typeOfAgreement == 1) {
                            agreementUtil.addOPrace(timeOfContract).then(function (oPrace) {
                                agreementUtil.addOPraceToAgree(agreeId, oPrace).then(function () {
                                    workersUtil.addAgreeToHuman(user, agreeId);
                                    res.redirect('/humanResources');
                                });
                            });
                        }
                        if (typeOfAgreement == 2) {
                            agreementUtil.addZlecenie(ifStudent, ifZus).then(function (zlecenie) {
                                agreementUtil.addZlecenieToAgree(agreeId, zlecenie).then(function (IdAgree) {
                                    workersUtil.addAgreeToHuman(user, agreeId);
                                    res.redirect('/humanResources');
                                });
                            });
                        }
                        if (typeOfAgreement == 3) {
                            agreementUtil.addB2b(companyId, ifCompetition).then(function (b2bId) {
                                agreementUtil.addB2bToAgree(agreeId, b2bId).then(function () {
                                    workersUtil.addAgreeToHuman(user, agreeId);
                                    res.redirect('/humanResources');
                                });
                            });
                        }
                    }
                });
            }
        });
    });

    app.post('/editHr', upload.single('file-to-upload'), isLoggedIn, function (req, res) {
        var name = req.body.firstNameEdit;
        var lastName = req.body.lastNameEdit;
        var email = req.body.emailEdit;
        var tel = req.body.telephoneEdit;
        var id = req.body.idEdit;
        var position = req.body.positionEdit;
        var spec = req.body.specEdit;
        var superior = req.body.superiorEdit;

        var idAgree = req.body.idAgree;
        var startDate = req.body.startDateEdit;
        var endDate = req.body.endDateEdit;
        var lumpSum = req.body.lumpSumEdit;
        var hourlyRate = req.body.hourlyRateEdit;
        var agreement = req.body.agreement;
        var agree = parseInt(agreement);//1 = o prace, 2 = zlecenie, 3 = b2b

        var ifStudent = req.body.ifStudentEdit;
        var ifZus = req.body.ifZusEdit;
        var timeOfContract = req.body.timeOfContractEdit;
        var companyId = req.body.companyB2bEdit;
        var ifCompetition = req.body.ifCompetitionEdit;

        var contractFileLink = null;

        if (req.file === 'undefined') {
            contractFileLink = req.file.filename;
        }
        var oldFileName = req.body.fileName;

        if (contractFileLink == null) {
            contractFileLink = oldFileName;
        }

        if (spec == -1) {
            spec = null;
        }

        workersUtil.editUserfromHr(req, res, name, lastName, email, tel, id, position, spec, contractFileLink, superior);
        agreementUtil.editAgreement(idAgree, startDate, endDate, lumpSum, hourlyRate).then(function () {
            agreementUtil.deleteOld(idAgree).then(function () {
                workersUtil.editSpec(id, spec).then(function () {
                    if (agree == 1) {
                        agreementUtil.addOPrace(timeOfContract).then(function (oPrace) {
                            agreementUtil.addOPraceToAgree(idAgree, oPrace).then(function () {
                                workersUtil.addAgreeToHuman(id, idAgree);
                                res.redirect('/humanResources');
                            });
                        });
                    }
                    if (agree == 2) {
                        agreementUtil.addZlecenie(ifStudent, ifZus).then(function (zlecenie) {
                            agreementUtil.addZlecenieToAgree(idAgree, zlecenie).then(function (IdAgree) {
                                workersUtil.addAgreeToHuman(id, idAgree);
                                res.redirect('/humanResources');
                            });
                        });
                    }
                    if (agree == 3) {
                        agreementUtil.addB2b(companyId, ifCompetition).then(function (b2bId) {
                            agreementUtil.addB2bToAgree(idAgree, b2bId).then(function () {
                                workersUtil.addAgreeToHuman(id, idAgree);
                                res.redirect('/humanResources');
                            });
                        });
                    }
                });
            });
        });
    });

    app.post('/deleteHuman', isLoggedIn, function (req, res) {
        var workerId = req.body.workerId;

        jobUtil.ifWorkerHasJob(workerId).then(function (ok) {
            if (!ok) {
                workersUtil.ifIsSuperior(workerId).then(function (superior) {
                    if (superior) {
                        res.redirect('/deleteHumanFailedSuperior');
                    } else {
                        fixedAssetsUtil.ifWorkerHasAsset(workerId).then(function (hasAsset) {
                            if (hasAsset) {
                                res.redirect('/deleteHumanFailedAsset');
                            } else {
                                workersUtil.layOff(workerId).then(function () {
                                    res.redirect('/humanResources');
                                });
                            }
                        });
                    }
                });
            } else {
                res.redirect('/deleteHumanFailed');
            }
        });
    });

app.post('/editWorker', isLoggedIn, isHR, function (req, res) {
        var IdWorker = req.body.IdWorker;

        domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
            workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                workersUtil.getWorkerInfo(IdWorker).then(function (workerInfo) {
                    workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                        companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
                            agreementUtil.getAgreeInfo(workerInfo.IdUmowy).then(function (agreeMore) {
                                agreementUtil.getAllAgreInfo(workerInfo.IdUmowy).then(function (agreeInfo) {
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
                                                                            workersUtil.analitOrProgrammer(IdWorker).then(function (analitOrProgram) {
                                                                                workersUtil.getSpec(IdWorker).then(function (currSpec) {
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
                                                                                            edycjaPracownika: 1,
                                                                                            workerInfo: workerInfo,
                                                                                            agreeInfo: agreeInfo,
                                                                                            agreeMore: agreeMore,
                                                                                            analitOrProgram: analitOrProgram,
                                                                                            currSpec: currSpec,
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
                        });
                    });
                });
            });
        });
    });


    app.post('/downloadContract', function (req, res) {
        var fileName1 = req.body.fileName;

        var file = __dirname + '../../contracts/' + fileName1;
        res.download(file);
    });

    app.post('/addTeam', function(req, res){
        var teamName = req.body.teamName;
        var teamsMember = req.body.teamsMember;

        teamsUtil.createTeam(teamName, req.user.IdZespol).then(function(teamId){
            teamsUtil.createTeamWithWorkers(teamId, teamsMember);
            res.redirect('/humanResources');
        });
    });

    app.post('/editTeams', function(req, res){
        var newName = req.body.newName;
        var idTeam = req.body.idTeam;

        teamsUtil.changeTeamName(idTeam, newName, req.user.IdZespol).then(function(){
            res.redirect('/humanResources');
        })
    });

    app.post('/deleteFromTeam', function(req, res){
        var toDelete = req.body.toDelete;
        var idTeam = req.body.idTeam;
        var idTeamEdited = req.body.idTeamEdited;
        teamsUtil.deleteFromTeam(toDelete, idTeam).then(function(){
            var teamiii = idTeamEdited.replace("\'", "");
            var teamiiii = teamiii.replace("\'", "");
            domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
                workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                    workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                        companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
                            agreementUtil.getAgreeInfo(profile.IdUmowy).then(function (agree) {
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
                                                                        emailsUtil.getEmails(req.user.IdZespol).then(function(emails){
                                                                        res.render('humanResources', {
                                                                            name: profile.Imie,
                                                                            site: "Zasoby ludzkie",
                                                                            workers: workers,
                                                                            company: company,
                                                                            agree: agree,
                                                                            programmers: programmers,
                                                                            analit: analit,
                                                                            spec: specs,
                                                                            teams: teams,
                                                                            teamsMember: teamsMember,
                                                                            Team: teamiiii,
                                                                            permission: permission,
                                                                            agrees: agrees,
                                                                            b2b: b2b,
                                                                            zlecenie: zlecenie,
                                                                            praca: praca,
                                                                            edycja: 1,
                                                                            edycjaPracownika: 0,
                                                                            failed: 0,
                                                                            emails: emails
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
            });
        })
    });

    app.post('/addNewMembers', function(req, res){
        var members = req.body.newMembers;
        var idTeam = req.body.idTeam;
        var idTeamEdited = req.body.idTeamEdited;

        teamsUtil.addNewMembers(idTeam, members).then(function(){
            var teamiii = idTeamEdited.replace("\'", "");
            var teamiiii = teamiii.replace("\'", "");
            domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
                workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                    workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                        companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
                            agreementUtil.getAgreeInfo(profile.IdUmowy).then(function (agree) {
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
                                                                        emailsUtil.getEmails(req.user.IdZespol).then(function(emails){
                                                                        res.render('humanResources', {
                                                                            name: profile.Imie,
                                                                            site: "Zasoby ludzkie",
                                                                            workers: workers,
                                                                            company: company,
                                                                            agree: agree,
                                                                            programmers: programmers,
                                                                            analit: analit,
                                                                            spec: specs,
                                                                            teams: teams,
                                                                            teamsMember: teamsMember,
                                                                            Team: teamiiii,
                                                                            permission: permission,
                                                                            agrees: agrees,
                                                                            b2b: b2b,
                                                                            zlecenie: zlecenie,
                                                                            praca: praca,
                                                                            edycja: 1,
                                                                            edycjaPracownika: 0,
                                                                            failed: 0,
                                                                            emails: emails
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
            });
        });
    });

};