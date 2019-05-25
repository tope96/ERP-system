var models = require('../../models');
var programm = models.programisci;
var analit = models.analitycy;

function addProgram(idWorker, idSpec){
    return programm.create({
        IdPracownik: idWorker,
        IdSpecjalizacja: idSpec
    });
}

function addAnalit(idWorker, idSpec){
    return analit.create({
        IdPracownik: idWorker,
        IdSpecjalizacja: idSpec
    });
}

function newPosition(idWorker, newPosition){
    return analit.findOne({
        where:{
            IdPracownik: idWorker
        }
    }).then(function(foundAnalit){
        if(foundAnalit){
            return foundAnalit.destroy({
                where:{
                    IdPracownik: idWorker
                }
            }).then(function(){
                addProgram(idWorker, foundAnalit.IdSpecjalizacja);
            });
        }else{
            return programm.findOne({
                where:{
                    IdPracownik: idWorker
                }
            }).then(function(programmer){
                return programmer.destroy({
                    where:{
                        IdPracownik: idWorker
                    }
                }).then(function(){
                    addAnalit(idWorker, programmer.IdSpecjalizacja);
                })
            })
        }
    })
}


function deleteOne(idWorker){
    return analit.findOne({
        where:{
            IdPracownik: idWorker
        }
    }).then(function(foundAnalit){
        if(foundAnalit){
            return analit.destroy({
                where:{
                    IdPracownik: idWorker
                }
            })
        }else{
            return programm.destroy({
                where:{
                    IdPracownik: idWorker
                }
            })
        }
    })
}

module.exports = {
    addProgram: addProgram,
    addAnalit: addAnalit,
    deleteOne: deleteOne,
    newPosition: newPosition
}