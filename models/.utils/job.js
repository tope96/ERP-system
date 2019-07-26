var models = require('../../models');
var job = models.zadania;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '/' + mm + '/' + dd;

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

function countFinished(workerId){
    return job.findAndCountAll({
        where:{
            IdPracownik: workerId,
            Status: 2
        }
    }).then(function(job){
        return job.count;
    });
}

function countInProgress(workerId){
    return job.findAndCountAll({
        where:{
            IdPracownik: workerId,
            Status: 1
        }
    }).then(function(job){
        return job.count;
    });
}

function countNotStarted(workerId){
    return job.findAndCountAll({
        where:{
            IdPracownik: workerId,
            Status: 3
        }
    }).then(function(job){
        return job.count;
    });
}

function countLowPriority(workerId){
    return job.findAndCountAll({
        where:{
            IdPracownik: workerId,
            Priorytet: 1
        }
    }).then(function(job){
        return job.count;
    });
}

function countMediumPriority(workerId){
    return job.findAndCountAll({
        where:{
            IdPracownik: workerId,
            Priorytet: 2,
            Status: 3
        }
    }).then(function(job){
        return job.count;
    });
}

function countHighPriority(workerId){
    return job.findAndCountAll({
        where:{
            IdPracownik: workerId,
            Priorytet: 3,
            Status: 3
        }
    }).then(function(job){
        return job.count;
    });
}

function countTodayJobs(workerId){
    return job.findAndCountAll({
        where:{
            IdPracownik: workerId,
            DataRealizacji: today
        }
    }).then(function(job){
        return job.count;
    });
}

function getCalendarJob(idKontoDomenowe){
    return job.findAll({
        where:{
            IdKontoDomenowe: idKontoDomenowe
        },
        raw: true,
    }).then(function(jobs){
        return jobs
    })
}

function jobDone(IdJob){
    return job.findOne({
        where:{
            IdZadanie: IdJob
        }
    }).then(function(found){
        found.update({
            Status: 2 
        });
    });
}

module.exports = {
    addJob: addJob,
    getAllJob: getAllJob,
    deleteJob: deleteJob,
    getOneJob: getOneJob,
    deleteJobJob: deleteJobJob,
    editJob: editJob,
    getCalendarJob: getCalendarJob,
    countFinished: countFinished,
    countInProgress: countInProgress,
    countNotStarted: countNotStarted,
    countHighPriority: countHighPriority,
    countMediumPriority: countMediumPriority,
    countLowPriority: countLowPriority,
    countTodayJobs: countTodayJobs,
    jobDone: jobDone
}