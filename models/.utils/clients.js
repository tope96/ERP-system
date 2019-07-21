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


function getClientInfo(clientId){
    return db.query("SELECT klienci.ImiePrzedstawiciela, firma.Nazwa, firma.IdFirma FROM klienci INNER JOIN firma ON klienci.Firma = firma.IdFirma WHERE IdKlient=" + 2,
    {type: db.QueryTypes.SELECT}).then(clientInfo =>
     {return clientInfo}); 
}

function getAllClients(zespolDomenowy){
    return db.query("SELECT IdKlient, ImiePrzedstawiciela, NazwiskoPrzedstawiciela, firma.Nazwa as firma FROM klienci INNER JOIN firma ON klienci.Firma = firma.IdFirma WHERE zespolDomenowy = " + zespolDomenowy,
    {type: db.QueryTypes.SELECT}).then(clients =>
     {return clients}); 
   }

module.exports = {
    addClient: addClient,
    getAllClients: getAllClients,
    getClientInfo: getClientInfo
}