var models = require('../../models');
var permission = models.uprawnienia;
var dAccount = models.konta_domenowe;

function getPermission(idWorker){
    return dAccount.findOne({
        where:{
            IdPracownik: idWorker
        }
    }).then(function(found){
        return found.IdUprawnienia;
    });
}

function changePermission(idWorker, idPerm){
    return dAccount.findOne({
        where:{
            IdPracownik: idWorker
        }
    }).then(function(found){
        if(found){
            return found.update({
                IdUprawnienia: idPerm
            });
        }else{
            return false;
        }
    });
}

module.exports={
    getPermission: getPermission,
    changePermission: changePermission
}