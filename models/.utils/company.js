var models = require('../../models');
var companyModel = models.firma;
var townUtils = require('./town');

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

module.exports = {
    createCompany: createCompany
}