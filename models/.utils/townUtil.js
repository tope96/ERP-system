var models = require('../../models');
var town1 = models.miasto;

function getTown(townId){
    return town1.findOne({
        where:{
            IdMiasto: townId
        }
    }).then(function(town){
        return town;
    });
}

function getOrInsertTown(town){
    return town1.findOne({
        where:{
            Miasto: town
        }
    }).then(function(foundTown){
        if(foundTown){
            return foundTown.IdMiasto;
        }else{
            return town1.create({
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