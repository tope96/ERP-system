var models = require('../../models');
var worker = require('./workerUtil.js');
var dAccount = models.konta_domenowe;


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

module.exports={
    getLogin: getLogin,
    newLogin: newLogin
}