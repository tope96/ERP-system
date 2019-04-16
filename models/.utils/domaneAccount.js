var models = require('../../models');
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

module.exports={
getLogin: getLogin
}