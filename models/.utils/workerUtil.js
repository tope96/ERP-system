var models = require('../../models');
var pracownik = models.pracownicy;
var dAccount = require('./domaneAccount.js');

function getName(id){
    return pracownik.findOne({
        where:{
            IdPracownik: id
        }
    }).then(function(pracownikFound){
        if(pracownikFound){
            return pracownikFound.Imie;
        }
    });
}

function getWorkerInfo(id){
    return pracownik.findOne({
        where:{
            IdPracownik: id
        }
    }).then(function(pracownikFound){
        if(pracownikFound){
            return pracownikFound;
        }
    })
}

//TODO: dokonczyc edytowanie userow
function editUser(req, res, name, lastName, email, login){
    console.log("----> " + name);
    var currentUser = req.user.IdKontoDomenowe;
    if(name != ''){
        newName(currentUser, name);
    }
    if(lastName != ''){
        newLastName(currentUser, lastName);
    }
    if(email != ''){
        newEmail(currentUser, email);
    }
    if(login != ''){
        dAccount.newLogin(currentUser, login);
    }
    setTimeout(function(){
        res.redirect('/profileEdited');
    }, 500);
}

function newName(currUser, newName) {
    return pracownik.findOne({
        where: {
            IdPracownik: currUser
        }
    }).then(function (user) {
        if (user) {
            return user.update({
                Imie: newName
            });
        }
    }
    );
}

function newLastName(currUser, newLastName) {
    return pracownik.findOne({
        where: {
            IdPracownik: currUser
        }
    }).then(function (user) {
        if (user) {
            return user.update({
                Nazwisko: newLastName
            });
        }
    }
    );
}

function newLogin(currUser, newLogin) {
    return pracownik.findOne({
        where: {
            IdPracownik: currUser
        }
    }).then(function (user) {
        if (user) {
            return user.update({
                Login: newLogin
            });

        }
    }
    );
}

function newEmail(currUser, newEmail) {
    return pracownik.findOne({
        where: {
            IdPracownik: currUser
        }
    }).then(function (user) {
        if (user) {
            return user.update({
                Email: newEmail
            });
        }
    }
    );
}


module.exports = {
    getName: getName,
    getWorkerInfo: getWorkerInfo,
    editUser: editUser
}