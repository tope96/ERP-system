var models = require('../../models');
var agreementModel = models.umowy;


function addAgreement(startDate, endDate, lumpSum, hourlyRate) {
    return agreementModel.findOne({
        where: {
            DataRozpoczecia: startDate,
            DataZakonczenia: endDate,
            StawkaRyczalt: lumpSum,
            StawkaGodzinowa: hourlyRate
        }
    }).then(function (agreement) {
        if(agreement){

        }else{
            
        }
    });
}

module.exports = {

}