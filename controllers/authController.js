var workersUtil = require('../models/.utils/workerUtil.js');
var jobUtil = require('../models/.utils/job.js');
var models = require("../models");
var exports = module.exports = {}
var workersUtil = require('../models/.utils/workerUtil.js');
var domaneAccountUtil = require('../models/.utils/domaneAccount.js');
var companyUtil = require('../models/.utils/company.js');
var specUtil = require('../models/.utils/specialization.js');
var exports = module.exports = {}

exports.index = function (req, res) {
    res.render('index');
}

exports.signup = function (req, res) {
    res.render('signup');
}

exports.signin = function (req, res) {
    res.render('signin');
}

exports.home = function (req, res) {
    workersUtil.getWorkerInfo(req.user.IdPracownik).then(function (user) {
        jobUtil.countFinished(req.user.IdPracownik).then(function (finishedJobs) {
            jobUtil.countInProgress(req.user.IdPracownik).then(function (jobsInProgress) {
                jobUtil.countNotStarted(req.user.IdPracownik).then(function (jobsNotStarted) {
                    jobUtil.countHighPriority(req.user.IdPracownik).then(function (highPriority) {
                        jobUtil.countMediumPriority(req.user.IdPracownik).then(function (mediumPriority) {
                            jobUtil.countTodayJobs(req.user.IdPracownik).then(function (todayJobs) {
                                res.render('home', {
                                    name: user.Imie,
                                    site: "Pulpit",
                                    finishedJobs: finishedJobs,
                                    jobsInProgress: jobsInProgress,
                                    jobsNotStarted: jobsNotStarted,
                                    highPriority: highPriority,
                                    mediumPriority: mediumPriority,
                                    todayJobs: todayJobs
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

exports.notConfirmedUser = function(req, res){
    res.render('NotConfirmedUser');
}
exports.notCompleteSingUp = function(req, res){
    res.render('notCompleteSingUp');
}
exports.UserChoose = function(req, res){
    res.render('UserChoose');
}
exports.companyExists = function(req, res){
    res.render('companyExists');
}
exports.companyNew = function(req, res){
    res.render('companyNew');
}

exports.companyWait = function(req, res){
    res.render('companyRegistered');
}

exports.signUpInfo = function(req, res){
    domaneAccountUtil.createNewDomane().then(function(maxId){
        res.render('signUpInfo',{
            maxId: maxId.IdZespolyDomenowe
        });
    });
}

exports.moreInfo = function (req, res) {
            companyUtil.getAllCopmany(req.user.IdZespol).then(function (company) {
                specUtil.getAllSpec().then(function (specs) {
                    res.render('moreInfo', {
                        site: "Zasoby ludzkie",
                        company: company,
                        spec: specs
                    });
                });
            });
    //res.render('moreInfo');
}



exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}