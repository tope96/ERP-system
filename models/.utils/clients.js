var models = require('../../models');
var clientsModel = models.klienci;


function addClient(company, firstName, lastName, tel, email, zespolDomenow){
    return clientsModel.findOne({
        where:{
            zespolDomenowy: zespolDomenow,
            Firma: company,
            ImiePrzedstawiciela: firstName,
            NazwiskoPrzedstawiciela: lastName,
            NumerKontaktowy: tel 
        }
    }).then(function(found){
        if(found){
            //TODO
        }else{
            return clientsModel.create({
                zespolDomenowy: zespolDomenow,
                Firma: company,
                ImiePrzedstawiciela: firstName,
                NazwiskoPrzedstawiciela: lastName,
                NumerKontaktowy: tel,
                EmailKontaktowy: email
            });
        }
    })
}

function getAllClients(zespolDomenowy){
    return clientsModel.findAll({
        where:{
            zespolDomenowy: zespolDomenowy
        }
    }).then(function(found){
        if(found){
            return found;
        }
    })
}

module.exports = {
    addClient: addClient,
    getAllClients: getAllClients
}