var models = require('../../models');
var job = models.zadania;

function addJob(projectId, name, description, status, priority, worker, realizationDate, idKontoDomenowe){
    return job.create({
        IdPracownik: worker,
        IdProjekt: projectId,
        Nazwa: name,
        Opis: description,
        Status: status,
        Priorytet: priority,
        IdKontoDomenowe: idKontoDomenowe,
        DataRealizacji: realizationDate
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

function deleteJob(idProject){
    return job.destroy({
        where:{
            IdProjekt: idProject
        }
    });
}

function deleteJobJob(idJob){
    return job.destroy({
        where:{
            IdZadanie: idJob
        }
    });
}

function getOneJob(idJob){
    return job.findOne({
        where:{
            IdZadanie: idJob
        }
    }).then(function(job){
        return job;
    })
}

function editJob(jobId, name, priority, status, description, realizationDate, worker){
    return job.findOne({
        where:{
            IdZadanie: jobId
        }
    }).then(function(found){
        return found.update({
            Nazwa: name,
            Priorytet: priority,
            Status: status,
            Opis: description,
            DataRealizacji: realizationDate,
            IdPracownik: worker 
        });
    });
}

function getCalendarJob(idKontoDomenowe){
    return job.findAll({
        where:{
            IdKontoDomenowe: idKontoDomenowe
        },
        raw: true,
    }).then(function(jobs){
        return jobs;
    })
}

module.exports = {
    addJob: addJob,
    getAllJob: getAllJob,
    deleteJob: deleteJob,
    getOneJob: getOneJob,
    deleteJobJob: deleteJobJob,
    editJob: editJob,
    getCalendarJob: getCalendarJob
}