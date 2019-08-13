var models = require('../../models');
var teams = models.zespoly;
var teamMember = models.czlonkowie_zespolow;
var projectTeams = models.zespoly_projektowe;
var project = require('./projects.js');

function createTeam(teamName, idTeamDom) {
    return teams.findOne({
        where: {
            Nazwa: teamName
        }
    }).then(function (team) {
        if (team) {

        } else {
            return teams.create({
                Nazwa: teamName,
                zespolyDomenowe: idTeamDom
            }).then(function (createdTeam) {
                if (createdTeam) {
                    return createdTeam.IdZespol;
                }
            })
        }
    });
}

function deleteTeam(teamId) {
    project.deleteProjectForTeam(teamId).then(function () {
        return teamMember.destroy({
            where: {
                IdZespol: teamId
            }
        }).then(function () {
            return teams.destroy({
                where: {
                    IdZespol: teamId
                }
            }).then(function () {
                return true;
            });
        });
    });
}

function createTeamWithWorkers(teamId, workers) {
    if (Array.isArray(workers)) {
        for (var i = 0; i < workers.length; i++) {
            teamMember.create({
                IdPracownik: workers[i],
                IdZespol: teamId
            });
        }
    } else {
        teamMember.create({
            IdPracownik: workers,
            IdZespol: teamId
        });
    }
}

function getAllTeams(idTeamDom) {
    return teams.findAll({
        where: {
            zespolyDomenowe: idTeamDom
        }
    }).then(function (teams) {
        return teams;
    });
}

function getAllTeamsMembers() {
    return teamMember.findAll({

    }).then(function (teamsMember) {
        return teamsMember;
    });
}

function changeTeamName(idTeam, newName, idKontoDomenowe) {
    return teams.findAll({
        where: {
            Nazwa: newName,
            zespolyDomenowe: idKontoDomenowe
        }
    }).then(function (foundTeam) {
        if (foundTeam == null) {
            console.log('tutaj');
        } else {
            return teams.findOne({
                where: {
                    IdZespol: idTeam
                }
            }).then(function (team) {
                return team.update({
                    Nazwa: newName
                });
            });
        }
    });
}

function deleteFromTeam(toDelete, idTeam) {
    return teamMember.destroy({
        where: {
            IdPracownik: toDelete,
            IdZespol: idTeam
        }
    });
}

function addNewMembers(IdTeam, members) {
    return new Promise((resolve, reject) => {
        if (Array.isArray(members)) {
            for (var i = 0; i < members.length; i++) {
                teamMember.create({
                    IdPracownik: members[i],
                    IdZespol: IdTeam
                });
            }
            resolve(true);

        } else {
            return teamMember.create({
                IdPracownik: members,
                IdZespol: IdTeam
            }).then(function () {
                resolve(true);
            });
        }
    });
}

function teamToProject(idProject, idTeam) {
    return projectTeams.create({
        IdProjekt: idProject,
        IdZespol: idTeam
    });
}

function getAllProjectsTeams() {
    return projectTeams.findAll({
        where: {

        }
    }).then(function (projects) {
        return projects;
    });
}

function deleteProjectsTeam(idProject) {

    return projectTeams.destroy({
        where: {
            IdProjekt: idProject
        }
    });
}

function updateProjectsTeam(idProject, idTeam, oldIdTeam) {
    return projectTeams.findOne({
        where: {
            IdProjekt: idProject,
            IdZespol: oldIdTeam
        }
    }).then(function (found) {
        return found.update({
            IdZespol: idTeam
        });
    });
}

function deleteFromAllTeams(idWorker){
    return teamMember.destroy({
        where:{
            IdPracownik:idWorker
        }
    });
}


module.exports = {
    createTeam: createTeam,
    createTeamWithWorkers: createTeamWithWorkers,
    getAllTeams: getAllTeams,
    getAllTeamsMembers: getAllTeamsMembers,
    changeTeamName: changeTeamName,
    deleteFromTeam: deleteFromTeam,
    addNewMembers: addNewMembers,
    teamToProject: teamToProject,
    getAllProjectsTeams: getAllProjectsTeams,
    deleteProjectsTeam: deleteProjectsTeam,
    updateProjectsTeam: updateProjectsTeam,
    deleteTeam: deleteTeam,
    deleteFromAllTeams: deleteFromAllTeams
}