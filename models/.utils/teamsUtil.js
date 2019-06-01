var models = require('../../models');
var teams = models.zespoly;
var teamMember = models.czlonkowie_zespolow;

function createTeam(teamName){
    return teams.findOne({
        where:{
            Nazwa: teamName
        }
    }).then(function(team){
        if(team){
            //TODO: show error - team exists
        }else{
            return teams.create({
                Nazwa: teamName
            }).then(function(createdTeam){
                if(createdTeam){
                    return createdTeam.IdZespol;
                }
            })
        }
    });
}

function createTeamWithWorkers(teamId, workers){
    for(var i =0; i<2; i++){
        teamMember.create({
            IdPracownik: workers[i],
            IdZespol: teamId
        });
    }
}

module.exports = {
    createTeam: createTeam,
    createTeamWithWorkers: createTeamWithWorkers
}