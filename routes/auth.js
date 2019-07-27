var authController = require('../controllers/authController.js');
var bodyParser = require('body-parser');
var user = require("../config/passport/passport.js");
var models = require("../models");
var passport = require('passport')
var companyUtils = require('../models/.utils/company');
var workerUtils = require('../models/.utils/workerUtil');
var dAccountUtils = require('../models/.utils/domaneAccount');
var positionUtil = require('../models/.utils/position');
var agreementUtil = require('../models/.utils/agreementsUtil.js');

module.exports = function (app, passport) {


    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/home', isLoggedIn, authController.home);
    app.get('/logout', authController.logout);
    app.get('/notConfirmedUser', authController.notConfirmedUser);
    app.get('/notCompleteSingUp', authController.notCompleteSingUp);
    app.get('/companyExists', authController.companyExists);
    app.get('/companyNew', authController.companyNew);
    app.get('/companyRegistered', authController.companyWait);
    app.get('/signUpInfo', authController.signUpInfo);
    app.get('/moreInfo', authController.moreInfo);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signUpInfo',
        failureRedirect: '/notConfirmedUser'
    }
    ));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/home',
        failureRedirect: '/notConfirmedUser'
        }
    ));
    
    app.post('/createWorker', function(req, res){
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var tel = req.body.tel;
        var companyName = req.body.companyName;
        var companyNip = req.body.companyNip;
        var companyTown = req.body.companyTown;
        var companyAddress = req.body.companyAddress;
        var maxId = req.body.maxId;

        companyUtils.addCompanyReturnId(companyName, companyNip, companyAddress, companyTown, maxId).then(function(company){
            workerUtils.signUp(firstName, lastName, email, tel, maxId, company.IdFirma).then(function(worker){
                dAccountUtils.updateDomaneAccount(req.user.IdKontoDomenowe, worker.IdPracownik, maxId).then(function(){
                    res.redirect('/moreInfo');
                });
            });
        });

        //companyUtils.createCompany(companyName, companyId, town, address).then(function(){
        //    res.redirect('/companyRegistered');
        //});
    });

    app.post('/addAgree', function(req, res){
        var typeOfAgreement = req.body.agreement; // 1 - umowa o prace, 2 - umowa zlecenie, 3 - umowa B2B
        var timeOfContract = req.body.timeOfContract;
        var ifStudent = req.body.ifStudent;
        var ifZus = req.body.ifZus;
        var ifCompetition = req.body.ifCompetition;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        var lumpSum = req.body.lumpSum;
        var hourlyRate = req.body.hourlyRate;
        var spec = req.body.spec;
        var position = req.body.position; // 0 - analityk, 1 - programista

        if(position == 1){
            positionUtil.addProgram(req.user.IdPracownik, parseInt(spec));
        }else{
            positionUtil.addAnalit(req.user.IdPracownik, parseInt(spec));
        }

        agreementUtil.addAgreement(startDate, endDate, parseInt(lumpSum), parseInt(hourlyRate)).then(function(agreeId){
            if(agreeId == false){
               
            }else{
                if(typeOfAgreement == 1){
                    agreementUtil.addOPrace(parseInt(timeOfContract)).then(function(oPrace){
                        agreementUtil.addOPraceToAgree(agreeId, oPrace).then(function(){
                            workerUtils.human(req.user.IdPracownik, agreeId).then(function(){
                                setTimeout(function(){
                                    res.redirect('/home');
                                }, 1000);
                            })
                            
                        })
                    });
                }
                if(typeOfAgreement == 2){
                    agreementUtil.addZlecenie(ifStudent, ifZus).then(function(zlecenie){
                        agreementUtil.addZlecenieToAgree(agreeId, zlecenie).then(function(){
                            workerUtils.human(req.user.IdPracownik, agreeId).then(function(){
                                setTimeout(function(){
                                    res.redirect('/home');
                                }, 1000);
                            })
                            
                        })
                    });
                }

            }
        })
    });

}