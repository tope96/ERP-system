var models = require('../../models');
var pracownik = models.pracownicy;


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

}

module.exports = {
    getName: getName,
    getWorkerInfo: getWorkerInfo,
    editUser: editUser
}