var models = require('../../models');
var priority = models.priorytet;

function getAllPriority() {
    return priority.findAll({

    }).then(function (priority) {
        return priority;
    });
}


module.exports = {
    getAllPriority: getAllPriority
};