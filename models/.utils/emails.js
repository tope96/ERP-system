var models = require('../../models');
var emailsModel = models.konta_pocztowe;

function createEmail(idWorker, address, alias, idTeam) {
    return emailsModel.findOne({
        where: {
            AdresPocztowy: address,
            ZespolDomenowy: idTeam
        }
    }).then(function (found) {
        if (found) {
            return false;
        } else {
            return emailsModel.findOne({
                where: {
                    IdPRacownik: idWorker
                }
            }).then(function (foundName) {
                if (foundName) {
                    return false;
                } else {
                    return emailsModel.create({
                        IdPracownik: idWorker,
                        AdresPocztowy: address,
                        AliasPocztowy: alias,
                        ZespolDomenowy: idTeam
                    }).then(function (created) {
                        if (created) {
                            return true;
                        }
                    });
                }
            })

        }
    });
}

function getEmails(idTeam){
    return emailsModel.findAll({
        where:{
            ZespolDomenowy: idTeam
        }
    }).then(function(founds){
        return founds;
    });
}

function deleteEmail(idEmail){
    return emailsModel.destroy({
        where:{
            IdKontoPocztowe: idEmail
        }
    });
}

function deleteEmailFired(IdWorker){
    return emailsModel.destroy({
        where:{
            IdPracownik: IdWorker
        }
    });
}

module.exports = {
    createEmail: createEmail,
    getEmails: getEmails,
    deleteEmail: deleteEmail,
    deleteEmailFired: deleteEmailFired
}