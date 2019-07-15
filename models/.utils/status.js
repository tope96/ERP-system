var models = require('../../models');
var status = models.status;

function getAllStatus(){
    return status.findAll({

    }).then(function(statuses){
        return statuses;
    })
}


module.exports = {
    getAllStatus: getAllStatus
}