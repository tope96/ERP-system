var models = require('../../models');
var pracownik = models.pracownicy;
var dAccount = require('./domaneAccount.js');
var position = require('./position.js');
var teamsUtil = require('./teamsUtil.js');
var proposalUtil = require('./proposal.js');
var emailUtil = require('./emails.js');
var analit = models.analitycy;
var programmers = models.programisci;
var db = require('../../config/db')

function getName(id) {
    return pracownik.findOne({
        where: {
            IdPracownik: id
        }
    }).then(function (pracownikFound) {
        if (pracownikFound) {
            return pracownikFound;
        }
    });
}

function getWorkerInfo(id) {
    return pracownik.findOne({
        where: {
            IdPracownik: id
        }
    }).then(function (pracownikFound) {
        if (pracownikFound) {
            return pracownikFound;
        }
    });
}


function editUser(req, res, name, lastName, email, login, id) {
    var currentUser = req.user.IdPracownik;
    if (name != '') {
        newName(currentUser, name);
    }
    if (lastName != '') {
        newLastName(currentUser, lastName);
    }
    if (email != '') {
        newEmail(currentUser, email);
    }
    if (login != '') {
        dAccount.newLogin(currentUser, login);
    }
    setTimeout(function () {
        res.redirect('/profileEdited');
    }, 1000);
}

function editUserfromHr(req, res, name, lastName, email, tel, id, newPosition, spec, file, superior) {
    if (name != '') {
        newName(id, name);
    }
    if (lastName != '') {
        newLastName(id, lastName);
    }
    if (email != '') {
        newEmail(id, email);
    }
    if (tel != '') {
        newTelephone(id, tel);
    }
    if (position != '') {
        position.newPosition(id, newPosition);
    }

    return pracownik.findOne({
        where: {
            IdPracownik: id
        }
    }).then(function (found) {
        found.update({
            PlikUmowy: file,
            IdPrzelozony: superior,

        });
    });

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

function getWorkers(idTeam) {
    return pracownik.findAll({
        where: {
            IdZespol: idTeam
        }
    }).then(function (user) {
        if (user) {
            return user;
        }
    });
}

function addProfile(name, lastName, email, tel, superior, idTeam, contractLink) {
    return pracownik.findOne({
        where: {
            $or: [
                {
                    Email:
                    {
                        $eq: email
                    }
                },
                {
                    NumerTelefonu:
                    {
                        $eq: tel
                    }
                }
            ]
        }
    }).then(function (user) {
        if (user) {
            return false;
        } else {
            return pracownik.create({
                Imie: name,
                Nazwisko: lastName,
                Email: email,
                NumerTelefonu: tel,
                IdUmowy: null,
                IdPrzelozony: superior,
                IdZespol: idTeam,
                Firma: 1,
                PlikUmowy: contractLink
            });
        }
    });
}

function signUp(name, lastName, email, tel, idTeam, idCompany) {
    return pracownik.findOne({
        where: {
            Email: email,
            NumerTelefonu: tel
        }
    }).then(function (user) {
        if (user) {
            return false;
        } else {
            return pracownik.create({
                Imie: name,
                Nazwisko: lastName,
                Email: email,
                NumerTelefonu: tel,
                IdZespol: idTeam,
                Firma: idCompany,
                IdPrzelozony: null,
                IdUmowy: null
            }).then(function (created) {
                return created;
            });
        }
    });
}

function deleteWorker(IdWorker) {
    return pracownik.destroy({
        where: {
            IdPracownik: IdWorker
        }
    });
}

function layOff(IdWorker) {
    return new Promise((resolve, reject) => {
        teamsUtil.deleteFromTeam(IdWorker).then(function () {
            dAccount.deleteAccount(IdWorker).then(function () {
                position.deleteOne(IdWorker).then(function () {
                    proposalUtil.deleteProposals(IdWorker).then(function () {
                        emailUtil.deleteEmailFired(IdWorker).then(function () {
                            deleteWorker(IdWorker).then(function () {
                                resolve(true);
                            });
                        });
                    });
                });
            });
        });
    });
}

function addAgreeToHuman(IdWorker, IdAgree) {
    var workId = IdWorker.IdPracownik;
    return pracownik.findOne({
        where: {
            IdPracownik: workId
        }
    }).then(function (id) {
        if (id) {
            return id.update({
                IdUmowy: IdAgree
            });
        }
    })
}

function human(IdWorker, IdAgree) {
    return db.query("UPDATE pracownicy SET IdUmowy = " + IdAgree + " WHERE IdPracownik = " + IdWorker + ";",
        { type: db.QueryTypes.UPDATE }).then(clients => { return clients });
}

function getAllProgrammers() {
    return programmers.findAll({

    }).then(function (programm) {
        return programm;
    });
}

function getAllAnalit() {
    return analit.findAll({

    }).then(function (analit1) {
        return analit1;
    });
}

function analitOrProgrammer(IdWorker) {
    return programmers.findOne({
        where: {
            IdPracownik: IdWorker
        }
    }).then(function (foundProgrammer) {
        if (foundProgrammer) {
            return "programmer";
        } else {
            return "analitics";
        }
    });
}

function editSpec(IdWorker, newSpec) {
    return programmers.findOne({
        where: {
            IdPracownik: IdWorker
        }
    }).then(function (found) {
        if (found) {
            return found.update({
                IdSpecjalizacja: newSpec
            });
        } else {
            return analit.findOne({
                where: {
                    IdPracownik: IdWorker
                }
            }).then(function (foundAnalit) {
                return foundAnalit.update({
                    IdSpecjalizacja: newSpec
                });
            });
        }
    });
}

function getSpec(IdWorker) {
    return programmers.findOne({
        where: {
            IdPracownik: IdWorker
        }
    }).then(function (found) {
        if (found) {
            return found.IdSpecjalizacja;
        } else {
            return analit.findOne({
                where: {
                    IdPracownik: IdWorker
                }
            }).then(function (foundAnalit) {
                return foundAnalit.IdSpecjalizacja;
            });
        }
    });
}

function ifIsSuperior(idWorker) {
    return pracownik.findOne({
        where: {
            IdPrzelozony: idWorker
        }
    }).then(function (found) {
        if (found) {
            console.log("TUTAJ: " + found.IdZadanie);
            return true;
        } else {
            return false;
        }
    });
}

module.exports = {
    getName: getName,
    getWorkerInfo: getWorkerInfo,
    editUser: editUser,
    getWorkers: getWorkers,
    addProfile: addProfile,
    editUserfromHr: editUserfromHr,
    deleteWorker: deleteWorker,
    layOff: layOff,
    addAgreeToHuman: addAgreeToHuman,
    getAllProgrammers: getAllProgrammers,
    getAllAnalit: getAllAnalit,
    signUp: signUp,
    human: human,
    analitOrProgrammer: analitOrProgrammer,
    editSpec: editSpec,
    getSpec: getSpec,
    ifIsSuperior: ifIsSuperior
}