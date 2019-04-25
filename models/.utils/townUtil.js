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

module.exports = {
    getTown: getTown
}