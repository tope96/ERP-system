var models = require('../../models');
var projectCategory = models.kategoria_projektu;
var projectModel = models.projekty;


function getAllProjectCategory(zespolDomenowy){
    return projectCategory.findAll({
        where:{
            IdZespolDomenowy: zespolDomenowy
        }
    }).then(function(found){
        if(found){
            return found;
        }
    });
}


function addCategory(categoryName, zespolDomenowy){
    return projectCategory.findOne({
        where:{
            IdZespolDomenowy: zespolDomenowy,
            Nazwa: categoryName
        }
    }).then(function(found){
        if(found){
            console.log("tu nie");
        }else{
            return projectCategory.create({
                IdZespolDomenowy: zespolDomenowy,
                Nazwa: categoryName
            });
        }
    });
}

function addProject(name, client, category, dateFrom, dateTo, description, zespolDomenowy){
    return projectModel.findOne({
        where:{
            Nazwa: name, 
            IdZespol: zespolDomenowy,
        }
    }).then(function(found){
        if(found){
            //TODO: co jesli istniej?
        }else{
            return projectModel.create({
                Nazwa: name,
                Opis: description,
                IdZespol: zespolDomenowy,
                DataRozpoczecia: dateFrom,
                DataZakonczenia: dateTo,
                KategoriaProjektu: category,
                IdKlient: client
            }).then(function(created){
                return created.IdProjekt;
            })
        }
    });
}

function getAllProjects(zespolyDomenowe){
    return projectModel.findAll({
        where:{
            IdZespol: zespolyDomenowe
        }
    });
}

function deleteProject(idProject){
    return projectModel.findOne({
        where:{
            IdProjekt: idProject
        }
    }).then(function(found){
        if(found){
            found.destroy();
        }
    })
}

module.exports = {
    getAllProjectCategory: getAllProjectCategory,
    addCategory: addCategory,
    addProject: addProject,
    getAllProjects:getAllProjects,
    deleteProject: deleteProject
}