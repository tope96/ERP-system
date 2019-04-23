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

function deleteAsset(id){
    return fixedAssets.destroy({
        where:{
            IdSrodkiTrwale: id 
        }
    });
}

function editAsset(name, description, type, price, date, id){
    return fixedAssets.findOne({
        where:{
            IdSrodkiTrwale: id
        }
    }).then(function(asset){
        return asset.update({
            Opis: description,
            Rodzaj: type,
            WartoscNetto: price,
            DataZakupu: date,
            Nazwa: name
        });
    })
}

function deleteOneasset(id){
    return fixedAssets.findOne({
        where:{
            IdSrodkiTrwale: id
        }
    }).then(function(asset){
        var ile = asset.Ilosc;
        return asset.update({
            Ilosc: ile-1
        });
    });
}


function addOneAsset(id){
    return fixedAssets.findOne({
        where:{
            IdSrodkiTrwale: id
        }
    }).then(function(asset){
        var ile = asset.Ilosc;
        return asset.update({
            Ilosc: ile+1
        });
    });
}

module.exports = {
    getAssets: getAssets,
    addAsset: addAssets,
    deleteAsset: deleteAsset,
    editAsset, editAsset,
    deleteOneasset: deleteOneasset,
    addOneAsset:addOneAsset
}