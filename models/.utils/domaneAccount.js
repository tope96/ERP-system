var models = require('../../models');
var worker = require('./workerUtil.js');
var dAccount = models.konta_domenowe;
var teamDom = models.zespolydomenowe;
var bCrypt = require('bcrypt-nodejs');
const dotenv = require('dotenv').config();
var db = require('../../config/db')


function getLogin(id){
    return dAccount.findOne({
        where:{
            IdKontoDomenowe: id
        }
    }).then(function(accountFound){
        if(accountFound){
            return accountFound;
        }
    });
}

function newLogin(currUser, newLogin) {
    return dAccount.findOne({
        where: {
            Login: newLogin
        }
    }).then(function (user) {
        if (user) {
            return true;
        }else{
            return dAccount.findOne({
                where:{
                    IdPracownik: currUser
                }
            }).then(function(found){
                if(found){
                    return found.update({
                        Login: newLogin
                    }).then(function(){
                        return false;
                    })
                }
            });
        }
    }
    );
}

function newAccount(login, password, workerId, idTeam){
    var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    return dAccount.findOne({
        where:{
            Login: login, 
            Haslo: generateHash(password),
            IdPracownik: workerId,
            IdZespol: idTeam
        }
    }).then(function(account){
        if(account){
            //TODO: komunikat, jesli juz istnieje
        }else{
            return dAccount.create({
                Login: login,
                Haslo: generateHash(password),
                IdPracownik: workerId,
                IdZespol: idTeam,
                IdUprawnienia: 3
            }).then(function(newAcc){
                if(newAcc){
                    return true;
                }else{
                    return false;
                }
            })
        }
    })

}

function ifCurrPasswordValid(id, currPassword){
    var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
    }

    return dAccount.findOne({
        where:{
            IdKontoDomenowe: id
        }
    }).then(function(user){
        return isValidPassword(user.Haslo, currPassword)
    })
}

function changePassword(id, newPassword){
    var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    return dAccount.findOne({
        where:{
            IdKontoDomenowe: id
        }
    }).then(function(user){
        return user.update({
            Haslo: generateHash(newPassword)
        });
    });
}

function workersWithoutDomaneAccount(IdTeam){
    return db.query("SELECT Imie, Nazwisko, IdPracownik FROM pracownicy WHERE IdPracownik NOT IN (SELECT IdPracownik FROM konta_domenowe) AND IdZespol = " + IdTeam,
    {type: db.QueryTypes.SELECT}).then(workersWithoutDomane =>
     {return workersWithoutDomane}); 
   }

   function deleteAccount(IdWorker){
        
    return dAccount.destroy({
            where:{
                IdPracownik: IdWorker
            }
        });
   }

function createNewDomane(){
    return teamDom.create({

    }).then(function(created){
        return created;
    })
}

function updateDomaneAccount(idDomaneAccount, idWorker, teamDom){
    return dAccount.findOne({
        where:{
            IdKontoDomenowe: idDomaneAccount
        }
    }).then(function(found){
        return found.update({
            IdZespol: teamDom,
            IdPracownik: idWorker
        });
    });
}

function getDomaneAccounts(idTeam){
    return dAccount.findAll({
        where:{
            IdZespol: idTeam
        }
    }).then(function(founds){
        return founds;
    });
}

module.exports={
    getLogin: getLogin,
    newLogin: newLogin,
    newAccount: newAccount,
    ifCurrPasswordValid: ifCurrPasswordValid,
    changePassword: changePassword,
    workersWithoutDomaneAccount:workersWithoutDomaneAccount,
    deleteAccount: deleteAccount,
    createNewDomane: createNewDomane,
    updateDomaneAccount: updateDomaneAccount,
    getDomaneAccounts:getDomaneAccounts
}