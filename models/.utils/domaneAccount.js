var models = require('../../models');
var worker = require('./workerUtil.js');
var dAccount = models.konta_domenowe;
var bCrypt = require('bcrypt-nodejs');

function getLogin(id){
    return dAccount.findOne({
        where:{
            IdPracownik: id
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

function newAccount(login, workerId, password){
    var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    return dAccount.findOne({
        where:{
            Login: login, 
            Haslo: generateHash(password),
            IdPracownik: workerId
        }
    }).then(function(account){
        if(account){
            //TODO: komunikat, jesli juz istnieje
        }else{
            return dAccount.create({
                Login: login,
                Haslo: generateHash(password),
                IdPracownik: workerId
            });
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

module.exports={
    getLogin: getLogin,
    newLogin: newLogin,
    newAccount: newAccount,
    ifCurrPasswordValid: ifCurrPasswordValid,
    changePassword: changePassword
}