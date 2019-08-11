//Controllers
var controller = require('../controllers/controller.js');
var companyController = require('../controllers/companyController.js');
var humanResourcesController = require('../controllers/humanResourcesController.js');
var productionController = require('../controllers/productionController.js');
var proposalController = require('../controllers/proposalController.js');
var emailsController = require('../controllers/emailController.js');
var fixedAssetsController = require('../controllers/fixedAssetsController.js');

var permissionUtil = require('../models/.utils/permission.js');
var proposalUtil = require('../models/.utils/proposal.js');
var emailsUtil = require('../models/.utils/emails.js');

//Dependencies
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var user = require("../config/passport/passport.js");
var models = require("../models");
var passport = require('passport');
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var fixedAssets = require('../models/.utils/fixedAssets.js');
var companyUtil = require('../models/.utils/company.js');
var agreementUtil = require('../models/.utils/agreementsUtil.js');
var positionUtil = require('../models/.utils/position.js');
var teamUtil = require('../models/.utils/teamsUtil.js');
var clientsUtil = require('../models/.utils/clients.js');
var projectsUtil = require('../models/.utils/projects.js');
var jobUtil = require('../models/.utils/job.js');


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

var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccount = require('../models/.utils/domaneAccount.js');
var projectsUtil = require('../models/.utils/projects.js');
var companyUtil = require('../models/.utils/company.js');
var clientUtil = require('../models/.utils/clients.js');
var teamUtil = require('../models/.utils/teamsUtil.js');
var statusUtil = require('../models/.utils/status.js');
var priorityUtil = require('../models/.utils/priority.js');
var jobUtil = require('../models/.utils/job.js');

var uploadsPath = path.join(__dirname, '../contracts');

module.exports = function (app, passport) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'contracts/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.pdf');
        }
    });

    var upload = multer({ storage: storage });

    app.get('/profile', isLoggedIn, controller.profile);
    app.get('/profileEdited', isLoggedIn, controller.profile);
    app.get('/alreadyExists', isLoggedIn, controller.alreadyExists);
    app.get('/fixedAssets', isLoggedIn, fixedAssetsController.fixedAssets);
    app.get('/editCompany', isLoggedIn, companyController.editCompany);
    app.get('/editCompanyAddProfile', isLoggedIn, companyController.editCompanyAddProfile);
    app.get('/editCompanyAddProfileError', isLoggedIn, companyController.editCompanyAddProfileError);
    app.get('/')
    app.get('/editCompanyAddProfileSuccess', isLoggedIn, companyController.editCompanyAddProfileSuccess);
    app.get('/changePassword', isLoggedIn, controller.changePassword);
    app.get('/passwordChanged', isLoggedIn, controller.passwordChanged);
    app.get('/changePasswordError', isLoggedIn, controller.changePasswordError);
    app.get('/editCompanyEdition', isLoggedIn, companyController.editCompanyEdition);
    app.get('/editCompanySuccess', isLoggedIn, companyController.editCompanySuccess);
    app.get('/settings', isLoggedIn, controller.settings);
    app.get('/humanResources', isLoggedIn, humanResourcesController.humanResources);
    app.get('/production', isLoggedIn, productionController.production);
    app.get('/kalendarz', isLoggedIn, controller.calendar);
    app.get('/writeProposal', isLoggedIn, proposalController.writeProposal);
    app.get('/emails', isLoggedIn, isAdmin, emailsController.newEmail);
    app.get('/createEmail', isLoggedIn, emailsController.createEmail);
    app.get('/createEmailFailed', isLoggedIn, emailsController.createEmailFailed);
    app.get('/createEmailGroup', isLoggedIn, emailsController.createEmailGroup);
    app.get('/createEmailsGroupFaled', isLoggedIn, emailsController.createEmailsGroupFailed);
    app.get('/noPermission', controller.noPermission);
    app.get('/humanResourcesAddFailed', humanResourcesController.humanResourcesAddFailed);
    app.get('/humanResourcesAddCompanyFailed', isLoggedIn, humanResourcesController.humanResourcesAddCompanyFailed);
    app.get('/productionAddCompanyFailed', isLoggedIn, productionController.productionAddCompanyFailed);
    app.get('/productionAddCategoryFailed', isLoggedIn, productionController.productionAddCategoryFailed);
    app.get('/addProjectFailed', isLoggedIn, productionController.addProjectFailed);
    app.get('/failedDeleteClient', isLoggedIn, companyController.failedDeleteClient);
    app.get('/deleteHumanFailed', isLoggedIn, humanResourcesController.deleteHumanFailed);
    app.get('/emailsDeleteFailed', isLoggedIn, emailsController.emailsDeleteFailed);
    app.get('/deleteHumanFailedSuperior', isLoggedIn, humanResourcesController.deleteHumanFailedSuperior);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    function isAdmin(req, res, next){
        if(req.user.IdUprawnienia == 1){
            return next();
        }
        res.redirect('/noPermission');
    }

    function isHR(req, res, next){
        if(req.user.IdUprawnienia == 1 || req.user.IdUprawnienia == 2){
            return next();
        }
        res.redirect('/noPermission');
    }

    //PROFILE
    app.post('/editUser', isLoggedIn, function(req, res){
        var name = req.body.newName;
        var lastName = req.body.newLastName;
        var email = req.body.newEmail;
        var login = req.body.newLogin;

        workersUtil.editUser(req, res, name, lastName, email, login);
    });

    app.post('/changePassword', isLoggedIn, function(req, res){
        var currPassword = req.body.currPassword;
        var newPassword = req.body.newPassword;

        domaneAccount.ifCurrPasswordValid(req.user.IdKontoDomenowe, currPassword).then(function(ifValid){
            if(ifValid){
                domaneAccount.changePassword(req.user.IdKontoDomenowe, newPassword).then(function(){
                    res.redirect('/passwordChanged');
                });
            }else{
                    res.redirect('/changePasswordError');
            }
        });
    });

    //FIXED ASSETS
    app.post('/addAsset', isLoggedIn, isAdmin, function(req, res){
        var name = req.body.name;
        var description = req.body.description;
        var type = req.body.type;
        var price = req.body.price;
        var date = req.body.date;
        var owner = req.body.owner;
        var amount = req.body.amount;
        
        fixedAssets.addAsset(name, description, type, price, date, owner, amount, req.user.IdZespol);
        setTimeout(function(){
            res.redirect('/fixedAssets');
        }, 500);
    });

    app.post('/deleteAsset', isLoggedIn, isAdmin, function(req, resp){
        var idAsset = req.body.asset;
        fixedAssets.deleteAsset(idAsset, req.user.IdZespol).then(function(){
            setTimeout(function(){
                resp.redirect('/fixedAssets');
            }, 500); 
        });
    });

    app.post('/deleteOneAsset', isAdmin, isLoggedIn, function(req, resp){
        var idAsset = req.body.asset;
        fixedAssets.deleteOneasset(idAsset, req.user.IdZespol).then(function(){
            setTimeout(function(){
                resp.redirect('/fixedAssets');
            }, 500);
        })
    });

    app.post('/addOneAsset', isLoggedIn, isAdmin, function(req, resp){
        var idAsset = req.body.asset;
        fixedAssets.addOneAsset(idAsset, req.user.IdZespol).then(function(){
            setTimeout(function(){
                resp.redirect('/fixedAssets');
            }, 500);
        })
    })

    app.post('/editAsset', isLoggedIn, isAdmin, function(req, resp){
        var name = req.body.nameEdit;
        var description = req.body.descriptionEdit;
        var type = req.body.typeEdit;
        var price = req.body.priceEdit;
        var date = req.body.dateEdit;
        var id = req.body.idEdit;
        var owner = req.body.ownerEdit

        fixedAssets.editAsset(name, description, type, price, date, id, owner, req.user.IdZespol).then(function(){
            setTimeout(function(){
                resp.redirect('/fixedAssets');
            }, 500); 
        })
    });

    //COMPANY EDIT

    app.post('/addProfile', isLoggedIn, isAdmin, function(req, res){
       
        var login = req.body.login;
        var password = req.body.password;
        var worker = req.body.worker;

        domaneAccount.newAccount(login, password, worker, req.user.IdZespol).then(function(ifOk){
            if(ifOk){
                res.redirect('/editCompany');
            }else{

            }
        })
    });

    app.post('/companyEdition', isLoggedIn, isAdmin, function(req, res){
        var name = req.body.companyName;
        var nip = req.body.companyNip;
        var town = req.body.companyTown;
        var address = req.body.companyAddress;
        var id = req.body.companyId;

        companyUtil.editCompany(name, nip, address,town, id, req.user.IdZespol).then(function(success){
            if(success){
                res.redirect('/editCompanySuccess');
            }
        });
    });

    app.post('/addHuman', upload.single('file-to-upload'), isLoggedIn, isAdmin, function(req, res){
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

        if(req.file === 'undefined'){
            contractFileLink = null;
        }else{
            contractFileLink = req.file.filename;
        }
        
        workersUtil.addProfile(name, lastName, email, tel, superior, req.user.IdZespol, contractFileLink).then(function(user){
            if(position == 1){
                positionUtil.addProgram(user.IdPracownik, spec);
            }else{
                positionUtil.addAnalit(user.IdPracownik, spec);
            }
            if(user == false){
                res.redirect('/humanResourcesAddFailed');
            }else{
                agreementUtil.addAgreement(startDate, endDate, lumpSum, hourlyRate).then(function(agreeId){
                    if(agreeId == false){
                       
                    }else{
                        if(typeOfAgreement == 1){
                            agreementUtil.addOPrace(timeOfContract).then(function(oPrace){
                                agreementUtil.addOPraceToAgree(agreeId, oPrace).then(function(){
                                    workersUtil.addAgreeToHuman(user, agreeId);
                                    res.redirect('/humanResources');
                                })
                            });
                        }
                        if(typeOfAgreement == 2){
                            agreementUtil.addZlecenie(ifStudent, ifZus).then(function(zlecenie){
                                agreementUtil.addZlecenieToAgree(agreeId, zlecenie).then(function(IdAgree){
                                    workersUtil.addAgreeToHuman(user, agreeId);
                                    res.redirect('/humanResources');
                                })
                            });
                        }
                        if(typeOfAgreement == 3){
                            agreementUtil.addB2b(companyId, ifCompetition).then(function(b2bId){
                                agreementUtil.addB2bToAgree(agreeId, b2bId).then(function(){
                                    workersUtil.addAgreeToHuman(user, agreeId);
                                    res.redirect('/humanResources');
                                })
                            });
                        }

                       
                    }
                })
                
            }
        });
    });

    app.post('/editHr', upload.single('file-to-upload'), isLoggedIn, function(req, res){
        
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

        if(req.file=== 'undefined'){
            contractFileLink = req.file.filename;
        }
        var oldFileName = req.body.fileName;



        if(contractFileLink == null){
            contractFileLink = oldFileName;
        }

        if(spec == -1){
            spec = null
        }

        workersUtil.editUserfromHr(req, res, name, lastName, email, tel, id, position, spec, contractFileLink, superior);
        agreementUtil.editAgreement(idAgree, startDate, endDate, lumpSum, hourlyRate).then(function(){
            agreementUtil.deleteOld(idAgree).then(function(){
                workersUtil.editSpec(id, spec).then(function(){


                if(agree == 1){
                    agreementUtil.addOPrace(timeOfContract).then(function(oPrace){
                        agreementUtil.addOPraceToAgree(idAgree, oPrace).then(function(){
                            workersUtil.addAgreeToHuman(id, idAgree);
                            res.redirect('/humanResources');
                        })
                    });
                }
                if(agree == 2){
                    agreementUtil.addZlecenie(ifStudent, ifZus).then(function(zlecenie){
                        agreementUtil.addZlecenieToAgree(idAgree, zlecenie).then(function(IdAgree){
                            workersUtil.addAgreeToHuman(id, idAgree);
                            res.redirect('/humanResources');
                        })
                    });
                }
                if(agree == 3){
                    agreementUtil.addB2b(companyId, ifCompetition).then(function(b2bId){
                        agreementUtil.addB2bToAgree(idAgree, b2bId).then(function(){
                            workersUtil.addAgreeToHuman(id, idAgree);
                            res.redirect('/humanResources');
                        })
                    });
                }
            })
        })
    })
    });

    app.post('/deleteHuman', isLoggedIn, function (req, res) {
        var workerId = req.body.workerId;

        jobUtil.ifWorkerHasJob(workerId).then(function (ok) {
            if (ok) {
                workersUtil.ifIsSuperior(workerId).then(function (superior) {
                    if (superior) {
                        res.redirect('/deleteHumanFailedSuperior')
                    } else {
                        workersUtil.layOff(workerId).then(function () {
                            res.redirect('/humanResources');
                        });
                    }
                });
            } else {
                res.redirect('/deleteHumanFailed');
            }
        });
    });

    app.post('/addCompany', isLoggedIn, function(req, res){
        var hr = req.body.ifHr;
        var production = req.body.ifProduction;
        var name = req.body.nameCompany;
        var nip = req.body.nipCompany;
        var address = req.body.addressCompany;
        var town = req.body.townCompany;

        if(hr == 1){
            
        }

        companyUtil.addCompany(name, nip, address, town, req.user.IdZespol).then(function(ifOk){
            if(ifOk){
                if(hr == 1){
                    res.redirect('/humanResources');
                }else if(production == 1){
                    res.redirect('/production')
                }
            }else{
                if(hr == 1){
                    res.redirect('/humanResourcesAddCompanyFailed');
                }else if(production == 1){
                    res.redirect('/productionAddCompanyFailed')
                }
            }
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

        teamUtil.createTeam(teamName, req.user.IdZespol).then(function(teamId){
            teamUtil.createTeamWithWorkers(teamId, teamsMember);
            res.redirect('/humanResources');
        });
    });

    app.post('/editTeams', function(req, res){
        var newName = req.body.newName;
        var idTeam = req.body.idTeam;

        teamUtil.changeTeamName(idTeam, newName, req.user.IdZespol).then(function(){
            res.redirect('/humanResources');
        })
    });

    app.post('/deleteFromTeam', function(req, res){
        var toDelete = req.body.toDelete;
        var idTeam = req.body.idTeam;
        var idTeamEdited = req.body.idTeamEdited;
        teamUtil.deleteFromTeam(toDelete, idTeam).then(function(){
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
        })
    });

    app.post('/addNewMembers', function(req, res){
        var members = req.body.newMembers;
        var idTeam = req.body.idTeam;
        var idTeamEdited = req.body.idTeamEdited;

        teamUtil.addNewMembers(idTeam, members).then(function(){
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
        })
    });

    app.post('/addClient', isLoggedIn, isAdmin, function(req, res){
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var tel = req.body.tel;
        var company = req.body.company;

        clientsUtil.addClient(company,firstName,lastName,tel,email,req.user.IdZespol).then(function(ok){
            if(!ok){
                res.redirect('/addClientFailed');
            }else{
                res.redirect('/production');
            }

        });
    });

    app.post('/addCategory', isLoggedIn, isAdmin, function(req, res){
        var categoryName = req.body.nameCategory;

        projectsUtil.addCategory(categoryName, req.user.IdZespol).then(function(ok){
            if(!ok){
                res.redirect('/productionAddCategoryFailed');
            }else{
                res.redirect('/production');                
            }

        });
    });

    app.post('/addProject', isLoggedIn, isAdmin, function(req, res){
        var projectName = req.body.projectName;
        var client = req.body.client;
        var category = req.body.category;
        var dateFrom = req.body.dateFrom;
        var dateTo = req.body.dateTo;
        var team = req.body.team;
        var description = req.body.description;

        projectsUtil.addProject(projectName, client, category, dateFrom, dateTo, description, req.user.IdZespol).then(function(idProject){
            if(!idProject){
                res.redirect('/addProjectFailed');
            }else{
                teamUtil.teamToProject(idProject, team).then(function(){
                    res.redirect('/production');            
                })                
            }
        });
    });

    app.post('/deleteProject', isLoggedIn, isAdmin, function(req, res){
        var project = req.body.project;

        teamUtil.deleteProjectsTeam(project).then(function(){
            projectsUtil.deleteProject(project).then(function(){
                res.redirect('/production');
            })
        })
    });

    app.post('/editProject', isLoggedIn, isAdmin, function(req, res){
        var project = req.body.projectIdEdit;
        var projectName = req.body.nameEdit;
        var client = req.body.clientEdit;
        var category = req.body.categoryEdit;
        var dateFrom = req.body.dateFromEdit;
        var dateTo = req.body.dateToEdit;
        var team = req.body.teamEdit;
        var description = req.body.descriptionEdit;
        var oldTeamId = req.body.oldTeamId;
    

        projectsUtil.updateProject(project, projectName, client, category, dateFrom, dateTo, description, team, oldTeamId).then(function(){
                            res.redirect('/production');

        })
    });

    app.post('/addingJob', isLoggedIn, function(req, res){
        var project = req.body.projectIdJob;
        var name = req.body.nameJob;
        var description = req.body.descriptionJob;
        var status = req.body.status;
        var priority = req.body.priority;
        var worker =req.body.workerJob;
        var realizationDate = req.body.realizationDate;

        jobUtil.addJob(project, name, description, status, priority, worker, realizationDate, req.user.IdZespol).then(function(){
            res.redirect('/production');
        });

    });

    app.post('/deleteTeam', isLoggedIn, isHR, function(req, res){
        var idTeam = req.body.idTeam;
        teamsUtil.deleteTeam(idTeam);
            res.redirect('/humanResources');

    });

    app.post('/editTeam', isLoggedIn, isHR, function (req, res) {
        var idTeam = req.body.idTeamEdit;
        var teamiii = idTeam.replace("\'", "");
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


    app.post('/viewJob', isLoggedIn, function(req, res){

        var idJob = req.body.jobId;
        var job1 = idJob.replace("\'", "");
        var job2 = job1.replace("\'", "");
        domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
            workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
                    clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                        projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                            teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                                projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                    teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                        statusUtil.getAllStatus().then(function (statuses) {
                                            priorityUtil.getAllPriority().then(function (priority) {
                                                workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                    jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
                                                        jobUtil.getOneJob(job2).then(function(job){
                                                            permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                                                        res.render('production', {
                                                            name: profile.Imie,
                                                            site: "Zasoby ludzkie",
                                                            company: company,
                                                            clients: clients,
                                                            category: category,
                                                            teams: teams,
                                                            projects: projects,
                                                            teamProjects: teamProjects,
                                                            statuses: statuses,
                                                            priority: priority,
                                                            workers: workers,
                                                            jobs: jobs,
                                                            job: job,
                                                            permission: permission,
                                                            jobView: 1,
                                                            addCompanyFailed: 0,
                                                            addCategoryFailed: 0,
                                                            addProjectFailed: 0,
                                                            addClientFailed: 0
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

    app.post('/deleteJob', isLoggedIn, function(req, res){
        var jobId = req.body.jobIdShow;

        jobUtil.deleteJobJob(jobId).then(function(){
            res.redirect("/production");
        })
    });

    app.post('/editJob', isLoggedIn, function(req, res){
        var name = req.body.jobEditName;
        var priority = req.body.jobEditPriority;
        var status = req.body.jobEditStatus;
        var description = req.body.jobEditDescription;
        var realizationDate = req.body.jobEditDate;
        var worker = req.body.jobEditWorker;
        var jobId = req.body.jobEditId;

        jobUtil.editJob(jobId, name, priority, status, description, realizationDate, worker).then(function(){
            domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
                workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                    companyUtil.getAllCopmany(req.user.IdPracownik).then(function (company) {
                        clientUtil.getAllClients(req.user.IdZespol).then(function (clients) {
                            projectsUtil.getAllProjectCategory(req.user.IdZespol).then(function (category) {
                                teamUtil.getAllTeams(req.user.IdZespol).then(function (teams) {
                                    projectsUtil.getAllProjects(req.user.IdZespol).then(function (projects) {
                                        teamUtil.getAllProjectsTeams().then(function (teamProjects) {
                                            statusUtil.getAllStatus().then(function (statuses) {
                                                priorityUtil.getAllPriority().then(function (priority) {
                                                    workersUtil.getWorkers(req.user.IdZespol).then(function (workers) {
                                                        jobUtil.getAllJob(req.user.IdZespol).then(function (jobs) {
                                                            jobUtil.getOneJob(jobId).then(function(job){
                                                                permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                                                            res.render('production', {
                                                                name: profile.Imie,
                                                                site: "Zasoby ludzkie",
                                                                company: company,
                                                                clients: clients,
                                                                category: category,
                                                                teams: teams,
                                                                projects: projects,
                                                                teamProjects: teamProjects,
                                                                statuses: statuses,
                                                                priority: priority,
                                                                workers: workers,
                                                                jobs: jobs,
                                                                job: job,
                                                                permission: permission,
                                                                jobView: 1,
                                                                addCompanyFailed: 0,
                                                                addCategoryFailed: 0,
                                                                addProjectFailed: 0,
                                                                addClientFailed: 0
                                                            });
                                                            });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        })
                                    });
                                });
                            });
                        });
                    });
                });
            });
        })
    });


    app.post('/editClients', isLoggedIn, isAdmin, function (req, res) {
        var clientId = req.body.clientId;
        clientUtil.getClientInfo(clientId).then(function (clientInfo) {
            companyUtil.getCompanyInfo(clientInfo.Firma).then(function (companyInfo) {
                townUtil.getTown(companyInfo.IdMiasto).then(function (townInfo) {
                    permissionUtil.getPermission(req.user.IdPracownik).then(function(permission){
                    res.render('editClients', {
                        name: "Tomek",
                        site: "Zasoby ludzkie",
                        clientInfo: clientInfo,
                        companyInfo: companyInfo,
                        townInfo: townInfo,
                        permission: permission
                    });
                    });
                });
            });
        });
    });

    app.post("/deleteClient", isLoggedIn, isAdmin, function(req, res){
        var clientId = req.body.clientId;

        projectsUtil.ifClientHasProject(clientId).then(function(ok){
            if(ok){
                clientUtil.deleteClient(clientId).then(function(){
                    res.redirect('/editCompany')
                });                
            }else{
                res.redirect('/failedDeleteClient');
            }
        })

    });

    app.post("/editClient", isLoggedIn, isAdmin, function(req, res){
        var nameCompany = req.body.nameEdit;
        var firstName = req.body.firstNameEdit;
        var lastName = req.body.lastNameEdit;
        var tel = req.body.telEdit;
        var email = req.body.emailEdit;
        var address = req.body.addressEdit;
        var town = req.body.townEdit;
        var nip = req.body.nipEdit;
        var clientId = req.body.clientId;

        
        clientUtil.editClient(clientId, firstName, lastName, tel, email).then(function(idCompany){
            companyUtil.editCompany(nameCompany, nip, address, town, idCompany, req.user.IdZespol).then(function(){
                res.redirect('/editCompany');
            });
        });
    });

    app.post('/jobDone', isLoggedIn, function(req, res){
        var jobId = req.body.jobIdShow;


        jobUtil.jobDone(jobId).then(function(){
            setTimeout(function(){
                res.redirect('/production');
            }, 2000);
        });
    });

    app.post('/permissionChange', isLoggedIn, isAdmin, function(req, res){
        var permission = req.body.perm;
        var idWorker = req.body.idWorker;

        permissionUtil.changePermission(idWorker, permission).then(function(changed){
            if(!changed){
                res.redirect('/settingsPermFailed')
            }else{
                res.redirect('/settings')               
            }

        })
    });

    app.post('/editWorker', isLoggedIn, isHR, function(req, res){
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
                                                                    workersUtil.analitOrProgrammer(IdWorker).then(function(analitOrProgram){
                                                                        workersUtil.getSpec(IdWorker).then(function(currSpec){
                                                                            emailsUtil.getEmails(req.user.IdZespol).then(function(emails){
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

app.post('/sendProposal', isLoggedIn, function(req, res){
    var category = req.body.proposalCategory;
    var name = req.body.proposalName;
    var description = req.body.proposalDesc;
    var argumentation = req.body.proposalArgumentation;

    proposalUtil.addProposal(name, description, argumentation, category, req.user.IdPracownik, req.user.IdZespol).then(function(){
        res.redirect("/settings");
    })
});

app.post('/acceptProposal', isLoggedIn, isHR, function(req, res){
    var idProposal = req.body.proposalIdReceived;
    console.log("proposal: " + idProposal )
    proposalUtil.acceptProposal(idProposal).then(function(){
        res.redirect("/settings");
    })
});

app.post('/declineProposal', isLoggedIn, isHR, function(req, res){
    var idProposal = req.body.proposalIdReceivedDec;

    proposalUtil.declineProposal(idProposal).then(function(){
        res.redirect("/settings");
    })
});

app.post('/createEmail', isLoggedIn, isAdmin, function(req, res){
    var address = req.body.address + "@comboBox.com";
    var alias = req.body.alias  + "@comboBox.com";
    var idWorker = req.body.worker;

    emailsUtil.createEmail(idWorker, address, alias, req.user.IdZespol).then(function(created){
        if(created == false){
            res.redirect('/createEmailFailed');
        }else{
            res.redirect('/emails');
        }
    });
});

app.post('/deleteEmail', isLoggedIn, isAdmin, function(req, res){
    var idEmail = req.body.idEmail;

    emailsUtil.ifGroupHasMail(idEmail).then(function(ok){
        if(ok){
            emailsUtil.deleteEmail(idEmail).then(function(){
                res.redirect('/emails');
            })            
        }else{
            return res.redirect('/emailsDeleteFailed');
        }
    })

});

app.post('/createEmailsGroup', isLoggedIn, isAdmin, function(req, res){
    var address = req.body.address + "@comboBox.com";
    var members = req.body.groupMember;
    var desc = req.body.groupDesc;

    emailsUtil.createEmailGroup(address, req.user.IdZespol, desc).then(function(idGroup){
        if(idGroup == false){
            res.redirect('/createEmailsGroupFaled');
        }else{
            emailsUtil.addNewMember(members, idGroup).then(function(){
                res.redirect('/emails');
            });
        }
    });
});

app.post('/deleteEmailGroup', isLoggedIn, isAdmin, function(req, res){
    var idEmailGroup = req.body.idEmailGroup;

    emailsUtil.deleteEmailGroup(idEmailGroup).then(function(){
        res.redirect('/emails');
    });
});

app.post('/editGroup', isLoggedIn, isAdmin, function(req, res){
    var address = req.body.address + "@comboBox.com";
    var desc = req.body.groupDesc;
    var idGroup = req.body.idGroup;

    emailsUtil.editEmailGroup(idGroup, address, desc).then(function(){
        res.redirect('/emails');
    });
})

    app.post('/editEmailGroup', isLoggedIn, isAdmin, function (req, res) {
        var idEmailGroup = req.body.idEmailGroup;

        domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
            workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                emailsUtil.getOneGroup(idEmailGroup).then(function (emailGroup) {
                    permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                        emailsUtil.getAllEmailsInGroup(idEmailGroup).then(function (members) {
                            emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
                                res.render('editEmailGroup', {
                                    name: profile.Imie,
                                    site: "Email",
                                    permission: permission,
                                    emailGroup: emailGroup,
                                    nameOfGroup: (emailGroup.AdresPocztowy).substring(0, (emailGroup.AdresPocztowy).lastIndexOf("@")),
                                    members: members,
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

    app.post('/deleteFromEmailGroup', isLoggedIn, isAdmin, function(req, res){
        var members = req.body.toDelete;
        var idGroup = req.body.idGroup;

        emailsUtil.deleteFromGroup(members, idGroup).then(function(){
            domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
                workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                    emailsUtil.getOneGroup(idGroup).then(function (emailGroup) {
                        permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                            emailsUtil.getAllEmailsInGroup(idGroup).then(function (members) {
                                emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
                                    res.render('editEmailGroup', {
                                        name: profile.Imie,
                                        site: "Email",
                                        permission: permission,
                                        emailGroup: emailGroup,
                                        nameOfGroup: (emailGroup.AdresPocztowy).substring(0, (emailGroup.AdresPocztowy).lastIndexOf("@")),
                                        members: members,
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
        })

        app.post('/addNewMembersEmailGroup', isLoggedIn, isAdmin, function(req, res){
            var members = req.body.toAdd;
            var idGroup = req.body.idGroup;
    
            emailsUtil.addNewMember(members, idGroup).then(function(){
                domaneAccount.getLogin(req.user.IdKontoDomenowe).then(function (account) {
                    workersUtil.getWorkerInfo(account.IdPracownik).then(function (profile) {
                        emailsUtil.getOneGroup(idGroup).then(function (emailGroup) {
                            permissionUtil.getPermission(req.user.IdPracownik).then(function (permission) {
                                emailsUtil.getAllEmailsInGroup(idGroup).then(function (members) {
                                    emailsUtil.getEmails(req.user.IdZespol).then(function (emails) {
                                        res.render('editEmailGroup', {
                                            name: profile.Imie,
                                            site: "Email",
                                            permission: permission,
                                            emailGroup: emailGroup,
                                            nameOfGroup: (emailGroup.AdresPocztowy).substring(0, (emailGroup.AdresPocztowy).lastIndexOf("@")),
                                            members: members,
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
            })
}
