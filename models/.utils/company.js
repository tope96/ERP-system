var models = require('../../models');
var companyModel = models.firma;
var townUtils = require('./town');
var worker = require('./workerUtil.js');
var domaneAccount = require('./domaneAccount.js');

function createCompany(companyName, companyId, town, address) {
    return new Promise((resolve, reject) =>{
       townUtils.getOrInsertTown(town).then(function (townId) {
        return companyModel.create({
            Nazwa: companyName,
            Nip: companyId,
            IdMiasto: townId,
            Adres: address
        }).then(function(){
            resolve(true);
        });
    }) ;
    });
}

function getCompanyInfo(IdCompany) {
    return companyModel.findOne({
        where: {
            IdFirma: IdCompany
        }
    }).then(function (company) {
        return company;
    });
}

module.exports = {
    createCompany: createCompany,
    getCompanyInfo: getCompanyInfo
}