var models = require('../../models');
var proposalCategoryModel = models.kategoria_wniosku;
var proposalModel = models.wnioski;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

function getProposalCategory(){
    return proposalCategoryModel.findAll({

    }).then(function(founds){
        return founds;
    })
}

function addProposal(name, description, argumentation, category, idWorker, idTeam){
    return proposalModel.create({
        IdPracownik: idWorker,
        Nazwa: name,
        Opis: description,
        ArgumentacjaWniosku: argumentation,
        KategoriaWniosku: category,
        DataWyslania: today,
        ZespolDomenowy: idTeam,
        Status: 3
    })
}

function getSentProposal(idWorker){
    return proposalModel.findAll({
        where:{
            IdPracownik: idWorker
        }
    }).then(function(founds){
        return founds;
    })
}

function getReceivedProposal(IdTeam){
    return proposalModel.findAll({
        where:{
            ZespolDomenowy: IdTeam
        }
    }).then(function(founds){
        return founds;
    })
}

function declineProposal(IdProposal){
    return proposalModel.findOne({
        where:{
            IdWniosek: IdProposal
        }
    }).then(function(found){
        return found.update({
            Status: 2
        })
    })
}

function acceptProposal(IdProposal){
    return proposalModel.findOne({
        where:{
            IdWniosek: IdProposal
        }
    }).then(function(found){
        return found.update({
            Status: 1
        })
    })
}

function deleteProposals(idWorker){
    return proposalModel.destroy({
        where:{
            IdPracownik: idWorker
        }
    })
}

module.exports ={
    getProposalCategory: getProposalCategory,
    addProposal: addProposal,
    getSentProposal:getSentProposal,
    getReceivedProposal: getReceivedProposal,
    declineProposal: declineProposal,
    acceptProposal: acceptProposal,
    deleteProposals: deleteProposals
}