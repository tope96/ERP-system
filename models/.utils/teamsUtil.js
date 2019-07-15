var models = require('../../models');
var teams = models.zespoly;
var teamMember = models.czlonkowie_zespolow;
var projectTeams = models.zespoly_projektowe;

function createTeam(teamName, idTeamDom){
    return teams.findOne({
        where:{
            Nazwa: teamName
        }
    }).then(function(team){
        if(team){
            //TODO: show error - team exists
        }else{
            return teams.create({
                Nazwa: teamName,
                zespolyDomenowe: idTeamDom
            }).then(function(createdTeam){
                if(createdTeam){
                    return createdTeam.IdZespol;
                }
            })
        }
    });
}

function createTeamWithWorkers(teamId, workers){
    if(Array.isArray(workers)){
        for(var i =0; i<workers.length; i++){
            teamMember.create({
                IdPracownik: workers[i],
                IdZespol: teamId
            });
        }
    }else{
        teamMember.create({
            IdPracownik: workers,
            IdZespol: teamId
        });
    }
} 

function getAllTeams(idTeamDom){
    return teams.findAll({
        where:{
            zespolyDomenowe: idTeamDom
        }
    }).then(function(teams){
        return teams;
    });
}

function getAllTeamsMembers(){
    return teamMember.findAll({

    }).then(function(teamsMember){
        return teamsMember;
    });
}

function changeTeamName(idTeam, newName, idKontoDomenowe){
    return teams.findAll({
        where:{
            Nazwa: newName,
            zespolyDomenowe: idKontoDomenowe
        }
    }).then(function(foundTeam){
        if(foundTeam == null){
            console.log('tutaj');
        }else{
            return teams.findOne({
                where:{
                    IdZespol: idTeam
                }
            }).then(function(team){
                return team.update({
                    Nazwa: newName
                });
            });
        }
    });
}

function deleteFromTeam(toDelete, idTeam){
    return teamMember.destroy({
        where:{
            IdPracownik: toDelete
        }
    });
}

function addNewMembers(IdTeam, members){
    if(Array.isArray(members)){
        for(var i = 0; i<members; i++){
            return teamMember.create({
                IdPracownik: members[i],
                IdZespol: IdTeam
            });   
        }
    }else{
        return teamMember.create({
            IdPracownik: members,
            IdZespol: IdTeam
        });
    }
}

function teamToProject(idProject, idTeam){
    return projectTeams.create({
        IdProjekt: idProject,
        IdZespol: idTeam
    })
}

function getAllProjectsTeams(){
    return projectTeams.findAll({
        where:{

        }
    }).then(function(projects){
        return projects;
    })
}

function deleteProjectsTeam(idProject){
    return projectTeams.destroy({
        where:{
            IdProjekt: idProject
        }
    })
}

function updateProjectsTeam(idProject, idTeam, oldIdTeam){
    return projectTeams.findOne({
        where:{
            IdProjekt: idProject            
        }
    }).then(function(found){
        return found.update({
            IdZespol: oldIdTeam
        })
    })
}

module.exports = {
    createTeam: createTeam,
    createTeamWithWorkers: createTeamWithWorkers,
    getAllTeams: getAllTeams,
    getAllTeamsMembers:getAllTeamsMembers,
    changeTeamName: changeTeamName,
    deleteFromTeam: deleteFromTeam,
    addNewMembers:addNewMembers,
    teamToProject: teamToProject,
    getAllProjectsTeams: getAllProjectsTeams,
    deleteProjectsTeam: deleteProjectsTeam,
    updateProjectsTeam: updateProjectsTeam
}