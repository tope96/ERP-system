var models = require('../../models');
var job = models.zadania;

function addJob(projectId, name, description, status, priority, worker, idKontoDomenowe){
    return job.create({
        IdPracownik: worker,
        IdProjekt: projectId,
        Nazwa: name,
        Opis: description,
        Status: status,
        Priorytet: priority,
        IdKontoDomenowe: idKontoDomenowe
    })
}

function getAllJob(idKontoDomenowe){
    return job.findAll({
        where:{
            IdKontoDomenowe: idKontoDomenowe
        }
    }).then(function(jobs){
        return jobs;
    })
}

module.exports = {
    addJob: addJob,
    getAllJob: getAllJob
}