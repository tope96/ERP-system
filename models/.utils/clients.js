var models = require('../../models');
var clientsModel = models.klienci;
var db = require('../../config/db')

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
            return false;
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
    });
}

function getClientInfo(clientId){
    return clientsModel.findOne({
        where:{
            IdKlient: clientId
        }
    }).then(function(clientInfo){
        return clientInfo;
    });
}

function getAllClients(zespolDomenowy){
    return db.query("SELECT IdKlient, ImiePrzedstawiciela, NazwiskoPrzedstawiciela, firma.Nazwa as firma FROM klienci INNER JOIN firma ON klienci.Firma = firma.IdFirma WHERE zespolDomenowy = " + zespolDomenowy + " ORDER BY NazwiskoPrzedstawiciela",
    {type: db.QueryTypes.SELECT}).then(clients =>
     {return clients}); 
   }

function deleteClient(IdClient){
    return clientsModel.destroy({
        where:{
            IdKlient: IdClient
        }
    });
}

function editClient(clientId, firstName, lastName, tel, email){
    return clientsModel.findOne({
        where:{
            IdKlient: clientId
        }
    }).then(function(found){
        return found.update({
            ImiePrzedstawiciela: firstName,
            NazwiskoPrzedstawiciela: lastName,
            NumerKontaktowy: tel, 
            EmailKontaktowy: email
        }).then(function(idCompany){
            return idCompany.Firma;
        });
    });
}

module.exports = {
    addClient: addClient,
    getAllClients: getAllClients,
    getClientInfo: getClientInfo,
    deleteClient: deleteClient,
    editClient: editClient
}