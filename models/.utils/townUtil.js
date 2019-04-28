var models = require('../../models');
var town = models.miasto;

function getTown(townId){
    return town.findOne({
        where:{
            IdMiasto: townId
        }
    }).then(function(town){
        return town;
    });
}

function getOrInsertTown(town){
    return town.findOne({
        where:{
            Miasto: town
        }
    }).then(function(foundTown){
        if(foundTown){
            return foundTown.IdMiasto;
        }else{
            return town.create({
               Miasto: town
            }).then(function(createdTown){
                return createdTown.IdMiasto;
            })
        }
    });
}

module.exports = {
    getTown: getTown,
    getOrInsertTown: getOrInsertTown
}