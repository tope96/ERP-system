var models = require('../../models');
var fixedAssets = models.srodki_trwale;

function getAssets(id){
    return fixedAssets.findAll({
        where:{
            IdPracownik: id
        }
    }).then(function(assetsFound){
        if(assetsFound){
            return assetsFound;
        }
    });
}

function addAssets(name, description, type, price, date, owner){
    return fixedAssets.create({
        Nazwa: name,
        Opis: description,
        Rodzaj: type,
        WartoscNetto: price,
        DataZakupu: date,
        IdPracownik: owner
    });
}

function deleteAsset(name, price, owner, type){
    return fixedAssets.destroy({
        where:{

        }
    })
}

module.exports = {
    getAssets: getAssets,
    addAsset: addAssets,
    deleteAsset: deleteAsset
}