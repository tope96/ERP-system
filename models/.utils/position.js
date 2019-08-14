var models = require('../../models');
var programm = models.programisci;
var analit = models.analitycy;

function addProgram(idWorker, idSpec, languages) {
    return programm.create({
        IdPracownik: idWorker,
        IdSpecjalizacja: idSpec,
        Jezyki: languages
    });
}

function addAnalit(idWorker, idSpec, certs) {
    return analit.create({
        IdPracownik: idWorker,
        IdSpecjalizacja: idSpec,
        Certyfikaty: certs
    });
}

function newPosition(idWorker, newPosition, lang, certs, spec) {
    return analit.findOne({
        where: {
            IdPracownik: idWorker
        }
    }).then(function (foundAnalit) {
        if (foundAnalit) {
            return foundAnalit.destroy({
                where: {
                    IdPracownik: idWorker
                }
            }).then(function () {
                if (newPosition == 0) {
                    addProgram(idWorker, spec, lang);
                } else {
                    addAnalit(idWorker, spec, certs);
                }
            });
        } else {
            return programm.findOne({
                where: {
                    IdPracownik: idWorker
                }
            }).then(function (programmer) {
                return programmer.destroy({
                    where: {
                        IdPracownik: idWorker
                    }
                }).then(function () {
                    if (newPosition == 0) {
                        addProgram(idWorker, spec, lang);
                    } else {
                        addAnalit(idWorker, spec, certs);
                    }
                });
            });
        }
    });
}


function deleteOne(idWorker) {
    return analit.findOne({
        where: {
            IdPracownik: idWorker
        }
    }).then(function (foundAnalit) {
        if (foundAnalit) {
            return analit.destroy({
                where: {
                    IdPracownik: idWorker
                }
            })
        } else {
            return programm.destroy({
                where: {
                    IdPracownik: idWorker
                }
            });
        }
    });
}

module.exports = {
    addProgram: addProgram,
    addAnalit: addAnalit,
    deleteOne: deleteOne,
    newPosition: newPosition
};