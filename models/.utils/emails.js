var models = require('../../models');
var emailsModel = models.konta_pocztowe;
var groupMembersModel = models.czlonkowie_grup_mailowych;
var emailsGroupsModel = models.grupy_mailowe;

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

function emailsAlreadyAdd(IdEmailGroup){
    return groupMembersModel.findAll({
        where:{
            IdGrupaMailowa: IdEmailGroup
        }
    }).then(function(founds){
        return founds;
    })
}

function addMembersGroupEmails(members, idGroup){
    
    if(Array.isArray(members)){
        console.log("CZY ARRAY: " + Array.isArray(members))
        for(var i =0; i<members.length; i++){
            return groupMembersModel.create({
                IdGrupaMailowa: idGroup,
                IdKontoPocztowe: members[i]
            });
        }
    }else{
        return groupMembersModel.create({
            IdGrupaMailowa: idGroup,
            IdKontoPocztowe: members
        });
    }
}

function createEmailGroup(address, idTeam, description){
    return emailsGroupsModel.findOne({
        where:{
            AdresPocztowy: address
        }
    }).then(function(found){
        if(found){
            return false;
        }else{
            return emailsGroupsModel.create({
                AdresPocztowy: address,
                ZespolDomenowy: idTeam,
                Opis: description
            }).then(function(created){
                return created.IdGrupaMailowa;
            });
        }
    });
}

function getEmailsGroups(idTeam){
    return emailsGroupsModel.findAll({
        where:{
            ZespolDomenowy: idTeam
        }
    }).then(function(founds){
        return founds;
    })
}

function deleteEmailGroup(idEmailGroup){
    return groupMembersModel.destroy({
        where:{
            IdGrupaMailowa: idEmailGroup
        }
    }).then(function(){
        return emailsGroupsModel.destroy({
            where:{
                IdGrupaMailowa: idEmailGroup
            }
        });
    });
}

function editEmailGroup(idEmailGroup, address, desc){
    return emailsGroupsModel.findOne({
        where:{
            IdGrupaMailowa: idEmailGroup
        }
    }).then(function(found){
        return found.update({
            AdresPocztowy: address,
            Opis: desc
        });
    });
}

function addNewMember(members, idEmailGroup){
    return new Promise((resolve, reject) => {
        if(Array.isArray(members)){
            console.log("tutaj!!!!! " + members.length)
            for(var i = 0; i<members.length; i++){
                groupMembersModel.create({
                    IdKontoPocztowe: members[i],
                    IdGrupaMailowa: idEmailGroup
                });
            }
                    resolve(true);
    
        }else{
            return groupMembersModel.create({
                IdKontoPocztowe: members,
                IdGrupaMailowa: idEmailGroup
            }).then(function(){
                resolve(true);
            });
        }
    });
}

function deleteFromGroup(toDelete, idTeam){
    return groupMembersModel.destroy({
        where:{
            IdGrupaMailowa: idTeam,
            IdKontoPocztowe: toDelete
        }
    });
}

function getOneGroup(idEmailGroup){
    return emailsGroupsModel.findOne({
        where:{
            IdGrupaMailowa: idEmailGroup
        }
    }).then(function(found){
        return found;
    })
}

function getAllEmailsInGroup(IdEmailGroup){
    return groupMembersModel.findAll({
        where:{
            IdGrupaMailowa: IdEmailGroup
        }
    }).then(function(founds){
        return founds;
    })
}

module.exports = {
    createEmail: createEmail,
    getEmails: getEmails,
    deleteEmail: deleteEmail,
    deleteEmailFired: deleteEmailFired,
    emailsAlreadyAdd: emailsAlreadyAdd,
    addMembersGroupEmails: addMembersGroupEmails,
    createEmailGroup: createEmailGroup,
    getEmailsGroups: getEmailsGroups,
    deleteEmailGroup: deleteEmailGroup,
    editEmailGroup: editEmailGroup,
    addNewMember: addNewMember,
    getOneGroup: getOneGroup,
    deleteFromGroup: deleteFromGroup,
    getAllEmailsInGroup: getAllEmailsInGroup
}