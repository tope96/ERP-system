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

module.exports = {
    getAssets: getAssets
}