var workersUtil = require('../models/.utils/workerUtil.js');

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
    workersUtil.getName(req.user.IdKontoDomenowe).then(function(name){
        res.render('home', {
            name: name
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