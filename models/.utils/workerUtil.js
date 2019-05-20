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
            return pracownikFound;
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


function editUser(req, res, name, lastName, email, login, id){
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

function editUserfromHr(req, res, name, lastName, email, tel, id){
    if(name != ''){
        newName(id, name);
    }
    if(lastName != ''){
        newLastName(id, lastName);
    }
    if(email != ''){
        newEmail(id, email);
    }
    if(tel != ''){
        newTelephone(id, tel);
    }
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

function newTelephone(currUser, newTel) {
    return pracownik.findOne({
        where: {
            IdPracownik: currUser
        }
    }).then(function (user) {
        if (user) {
            return user.update({
                NumerTelefonu: newTel
            });
        }
    }
    );
}

function getWorkers(idTeam){
    return pracownik.findAll({
        where:{
            IdZespol: idTeam
        }
    }).then(function(user){
        if(user){
            return user;
        }
    })
}

function addProfile(name, lastName, email, tel, superior, idTeam){
    return pracownik.findOne({
        where:{
            Email: email,
            NumerTelefonu: tel
        }
    }).then(function(user){
        if(user){
            return false;
        }else{
            return pracownik.create({
                Imie: name,
                Nazwisko: lastName,
                Email: email,
                NumerTelefonu: tel,
                IdUmowy: null, 
                IdPrzelozony: superior,
                IdZespol: idTeam,
                Firma: 1
            });
        }
    });
}

function deleteWorker(IdWorker){
    return pracownik.destroy({
        where:{
            IdPracownik: IdWorker
        }
    });
}

function layOff(IdWorker){
    return new Promise((resolve, reject) => { 
    dAccount.deleteAccount(IdWorker).then(function(){
        deleteWorker(IdWorker).then(function(){
            resolve(true);
        });
    });
});
}

function addAgreeToHuman(IdWorker, IdAgree){
    var workId = IdWorker.IdPracownik;
    return pracownik.findOne({
        where:{
            IdPracownik: workId
        }
    }).then(function(id){
        if(id){
            return id.update({
                IdUmowy: IdAgree
            });
        }
    })
}

module.exports = {
    getName: getName,
    getWorkerInfo: getWorkerInfo,
    editUser: editUser,
    getWorkers:getWorkers,
    addProfile: addProfile,
    editUserfromHr: editUserfromHr,
    deleteWorker: deleteWorker,
    layOff:layOff,
    addAgreeToHuman:addAgreeToHuman
}