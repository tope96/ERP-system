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

function editCompany(newName, newNip, newAddress, newTown, idCompany) {
    return new Promise((resolve, reject) => { 
    if (newName != '' || newNip != '') {
        ifcompanyExists(newName, newNip).then(function (ifExists) {
            if (ifExists == false) {
                resolve(false);
            } else {
                if (newName != '') {
                    editName(idCompany, newName);
                }
                if (newNip != '') {
                    editNip(idCompany, newNip);
                }
                if (newAddress != '') {
                    editAdress(idCompany, newAddress);
                }
                if (newTown != '') {
                    editTown(idCompany, newTown);
                }
                setTimeout(function(){
                    resolve(true);
                }, 500);
            }
        });
    } else {
        if (newAddress != '') {
            editAdress(idCompany, newNip);
        }
        if (newTown != '') {
            editTown(idCompany, newTown);
        }
        setTimeout(function(){
            resolve(true);
        }, 500);
    }
});

}

function editName(idCompany, newName){
    return companyModel.findOne({
        where:{
            IdFirma: idCompany
        }
    }).then(function(company){
        if(company){
            return company.update({
                Nazwa: newName
            });
        }
    });
}

function editNip(idCompany, newNip){
    return companyModel.findOne({
        where:{
            IdFirma: idCompany
        }
    }).then(function(company){
        if(company){
            return company.update({
                Nip: newNip
            });
        }
    });
}

function editAdress(idCompany, newAddress){
    return companyModel.findOne({
        where:{
            IdFirma: idCompany
        }
    }).then(function(company){
        if(company){
            return company.update({
                Adres: newAddress
            });
        }
    });
}

function editTown(idCompany, newTown){
    townUtils.getOrInsertTown(newTown).then(function(newT){
        console.log("----" + newT);
        return companyModel.findOne({
            where:{
                IdFirma: idCompany
            }
        }).then(function(company){
            if(company){
                return company.update({
                    IdMiasto: newT
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

module.exports = {
    getCompanyInfo: getCompanyInfo,
    editCompany: editCompany
}