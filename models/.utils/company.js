var models = require('../../models');
var companyModel = models.firma;
var townUtils = require('./townUtil.js');
var worker = require('./workerUtil.js');
var domaneAccount = require('./domaneAccount.js');

function getCompanyInfo(IdCompany, idTeam) {
    return companyModel.findOne({
        where: {
            IdFirma: IdCompany,
            IdZespol: idTeam,
        }
    }).then(function (company) {
        return company;
    });
}

function getAllCopmany(idTeam){
    return companyModel.findAll({
        where:{
            IdZespol: idTeam
        }
    }).then(function(company){
        return company;
    })
}

function editCompany(newName, newNip, newAddress, newTown, idCompany, idTeam) {
    return new Promise((resolve, reject) => { 
    if (newName != '' || newNip != '') {
        ifcompanyExists(newName, newNip, idTeam).then(function (ifExists) {
            if (ifExists == false) {
                resolve(false);
            } else {
                if (newName != '') {
                    editName(idCompany, newName, idTeam);
                }
                if (newNip != '') {
                    editNip(idCompany, newNip, idTeam);
                }
                if (newAddress != '') {
                    editAdress(idCompany, newAddress, idTeam);
                }
                if (newTown != '') {
                    editTown(idCompany, newTown, idTeam);
                }
                setTimeout(function(){
                    resolve(true);
                }, 500);
            }
        });
    } else {
        if (newAddress != '') {
            editAdress(idCompany, newNip, idTeam);
        }
        if (newTown != '') {
            editTown(idCompany, newTown, idTeam);
        }
        setTimeout(function(){
            resolve(true);
        }, 500);
    }
});

}

function editName(idCompany, newName, idTeam){
    return companyModel.findOne({
        where:{
            IdFirma: idCompany,
            IdZespol: idTeam
        }
    }).then(function(company){
        if(company){
            return company.update({
                Nazwa: newName
            });
        }
    });
}

function editNip(idCompany, newNip, idTeam){
    return companyModel.findOne({
        where:{
            IdFirma: idCompany,
            IdZespol: idTeam
        }
    }).then(function(company){
        if(company){
            return company.update({
                Nip: newNip
            });
        }
    });
}

function editAdress(idCompany, newAddress, idTeam){
    return companyModel.findOne({
        where:{
            IdFirma: idCompany,
            IdZespol: idTeam
        }
    }).then(function(company){
        if(company){
            return company.update({
                Adres: newAddress
            });
        }
    });
}

function editTown(idCompany, newTown, idTeam){
    townUtils.getOrInsertTown(newTown).then(function(newT){
        return companyModel.findOne({
            where:{
                IdFirma: idCompany,
                IdZespol: idTeam
            }
        }).then(function(company){
            if(company){
                return company.update({
                    IdMiasto: newT,
                    IdZespol: idTeam
                });
            }
        });
    })
}

function ifcompanyExists(name, nip){
    return companyModel.findOne({
        where:{
            $or:[{
                Nazwa:{
                    $eq: name
                }
            },
            {
            Nip:{
                    $eq: nip
                }
            }]
        }
    }).then(function(company){
        if(company){
            return true;
        }else{
            return false;
        }
    });
}



function addCompany(name, nip, address, town, team) {
    return new Promise((resolve, reject) => { 
        ifcompanyExists(name, nip).then(function (ifExists) {
            if (ifExists) {
                resolve(false);
            } else {
               return townUtils.getOrInsertTown(town).then(function(newT){
                    companyModel.create({
                        Nazwa: name,
                        Nip: nip,
                        IdMiasto: newT,
                        Adres: address,
                        IdZespol: team
               }).then(function(){
                resolve(true);
               })
            });
            }
        });
    
});

}


module.exports = {
    getCompanyInfo: getCompanyInfo,
    editCompany: editCompany,
    getAllCopmany: getAllCopmany,
    addCompany:addCompany
}