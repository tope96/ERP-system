var models = require('../../models');
var fixedAssets = models.srodki_trwale;

function getAssets(id, idTeam){
    return fixedAssets.findAll({
        where:{
            IdZespol: idTeam
        },
        order: [
            ['Nazwa', 'ASC'],
        ],
    }).then(function(assetsFound){
        if(assetsFound){
            return assetsFound;
        }
    });
}

function addAssets(name, description, type, price, date, owner, amount, idTeam){
    return fixedAssets.create({
        Nazwa: name,
        Opis: description,
        Rodzaj: type,
        WartoscNetto: price,
        IdPracownik: owner,
        Ilosc: amount,
        DataZakupu: date,
        IdZespol: idTeam
    });
}

function deleteAsset(id, idTeam){
    return fixedAssets.destroy({
        where:{
            IdSrodkiTrwale: id,
            IdZespol: idTeam
        }
    });
}

function editAsset(name, description, type, price, date, id, owner, idTeam){
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
            Nazwa: name,
            IdZespol: idTeam,
            IdPracownik: owner
        });
    })
}

function deleteOneasset(id, idTeam){
    return fixedAssets.findOne({
        where:{
            IdSrodkiTrwale: id,
            IdZespol: idTeam
        }
    }).then(function(asset){
        var ile = asset.Ilosc;
        return asset.update({
            Ilosc: ile-1
        });
    });
}


function addOneAsset(id, idTeam){
    return fixedAssets.findOne({
        where:{
            IdSrodkiTrwale: id,
            IdZespol: idTeam
        }
    }).then(function(asset){
        var ile = asset.Ilosc;
        return asset.update({
            Ilosc: ile+1
        });
    });
}

function ifWorkerHasAsset(idWorker){
    return fixedAssets.findOne({
        where:{
            IdPracownik: idWorker
        }
    }).then(function(found){
        if(found){
            return true;
        }else{
            return false;
        }
    });
}

module.exports = {
    getAssets: getAssets,
    addAsset: addAssets,
    deleteAsset: deleteAsset,
    editAsset: editAsset,
    deleteOneasset: deleteOneasset,
    addOneAsset:addOneAsset,
    ifWorkerHasAsset: ifWorkerHasAsset
}