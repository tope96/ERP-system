var models = require('../../models');
var teams = models.zespoly;
var teamMember = models.czlonkowie_zespolow;

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

module.exports = {
    createTeam: createTeam,
    createTeamWithWorkers: createTeamWithWorkers,
    getAllTeams: getAllTeams,
    getAllTeamsMembers:getAllTeamsMembers
}