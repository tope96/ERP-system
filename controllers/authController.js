
var exports = module.exports = {}

exports.index = function (req, res) {
    res.render('index');
}

exports.signup = function (req, res) {
    res.render('auth/signup');
}

exports.signin = function (req, res) {
    res.render('auth/signin');
}

exports.home = function (req, res) {
    console.log(req.user.IdUzytkownik)

        res.render('home', {
        name: req.user.Imie});
    
}

exports.notConfirmedUser = function(req, res){
    res.render('notConfirmedUser');
}

exports.notCompleteSingUp = function(req, res){
    res.render('notCompleteSingUp');
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}