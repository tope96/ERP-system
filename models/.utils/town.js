var models = require('../../models');
var townModel = models.miasto;


function getOrInsertTown(town) {
    return townModel.findOne({
        where: {
            Miasto: town
        }
    }).then(function (foundTown) {
        if (foundTown) {
            return foundTown.IdMiasto;
        } else {
            return townModel.create({
                Miasto: town
            }).then(function (createdTown) {
                return createdTown.IdMiasto;
            });
        }
    });
}

module.exports = {
    getOrInsertTown: getOrInsertTown
};