var workersUtil = require('../models/.utils/workerUtil.js');
var jobUtil = require('../models/.utils/job.js');

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
    workersUtil.getWorkerInfo(req.user.IdPracownik).then(function(user){
        jobUtil.countFinished(req.user.IdPracownik).then(function(finishedJobs){
            jobUtil.countInProgress(req.user.IdPracownik).then(function(jobsInProgress){
                jobUtil.countNotStarted(req.user.IdPracownik).then(function(jobsNotStarted){
                    jobUtil.countHighPriority(req.user.IdPracownik).then(function(highPriority){
                        jobUtil.countMediumPriority(req.user.IdPracownik).then(function(mediumPriority){
                            jobUtil.countTodayJobs(req.user.IdPracownik).then(function(todayJobs){


        res.render('home', {
            name: user.Imie,
            site: "Pulpit",
            finishedJobs: finishedJobs,
            jobsInProgress: jobsInProgress,
            jobsNotStarted: jobsNotStarted,
            highPriority: highPriority,
            mediumPriority: mediumPriority,
            todayJobs: todayJobs
        })
        })
    })
        });
        });
        });
        });
    })
}

exports.notConfirmedUser = function(req, res){
    res.render('notConfirmedUser');
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
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}