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

module.exports = {
    getName: getName,
    getWorkerInfo: getWorkerInfo
}