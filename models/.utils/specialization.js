var models = require('../../models');
var spec = models.specjalizacja;

function getAllSpec() {
    return spec.findAll({

    }).then(function (specs) {
        return specs;
    });
}

module.exports = {
    getAllSpec: getAllSpec
};