var models = require('../../models');
var companyModel = models.firma;
var townUtils = require('./townUtil.js');
var worker = require('./workerUtil.js');
var domaneAccount = require('./domaneAccount.js');

function getCompanyInfo(IdCompany) {
    return companyModel.findOne({
        where: {
            IdFirma: IdCompany
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

function editCompanyNew(newName, newNip, newAddress, newTown, idCompany, idTeam){
    return companyModel.findOne({
        where:{
           IdFirma: idCompany
        }
    }).then(function(company){
        if(company){
            companyModel.update({
                Nazwa: newName,
                Nip: newNip,
                IdMiasto: newTown,
                Adres: newAddress
            })
        }
    });
}


function editCompany(newName, newNip, newAddress, newTown, idCompany, idTeam) {
    return new Promise((resolve, reject) => { 
    if (newName != '' || newNip != '') {
        ifcompanyExists(newName, newNip, idTeam).then(function (ifExists) {
            if (ifExists == false) {
                console.log("false");
                resolve(false);
            } else {
                console.log("ok")
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
                }, 1000);
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

function ifcompanyExists(name, nip, idZespol){
    return companyModel.findOne({
        where:{
           Nip: nip,
           IdZespol: idZespol
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
        ifcompanyExists(name, nip, team).then(function (ifExists) {
            if (ifExists) {
                resolve(false);
            } else {
                return townUtils.getOrInsertTown(town).then(function (newT) {
                    companyModel.create({
                        Nazwa: name,
                        Nip: nip,
                        IdMiasto: newT,
                        Adres: address,
                        IdZespol: team
                    }).then(function () {
                        resolve(true);
                    })
                });
            }
        });

    });

}

function addCompanyReturnId(name, nip, address, town, team){
    return townUtils.getOrInsertTown(town).then(function (newT) {
        return companyModel.create({
            Nazwa: name,
            Nip: nip,
            IdMiasto: newT,
            Adres: address,
            IdZespol: team
        }).then(function (created) {
            return created;
        });
    });
}



module.exports = {
    getCompanyInfo: getCompanyInfo,
    editCompany: editCompany,
    getAllCopmany: getAllCopmany,
    addCompany:addCompany,
    addCompanyReturnId: addCompanyReturnId,
    editCompanyNew: editCompanyNew
}