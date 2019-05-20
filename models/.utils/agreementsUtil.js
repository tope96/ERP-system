var models = require('../../models');
var agreementModel = models.umowy;
var agreementB2b = models.umowy_b2b;
var agreementPraca = models.umowy_o_prace;
var agreementZlecenie = models.umowy_zlecenie;

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
            return agreement.IdUmowy;
        }else{
            return agreementModel.create({
                DataRozpoczecia: startDate,
                DataZakonczenia: endDate,
                StawkaRyczalt: lumpSum,
                StawkaGodzinowa: hourlyRate
            }).then(function(agree){
                if(agree){
                    return agree.IdUmowy;
                }else{
                    return false;
                }
            })
        }
    });
}

function addB2b(companyId, conc){
    console.log("====== " + companyId);
    return agreementB2b.findOne({
        where:{
            IdFirma: companyId,
            ZakazKonkurencji: conc
        }
    }).then(function(b2b){
        if(b2b){
            return b2b.IdUmowy;
        }else{
            return agreementB2b.create({
                IdFirma: companyId,
                ZakazKonkurencji: conc
            }).then(function(b2bC){
                if(b2bC){
                    return b2bC.IdUmowy;
                }else{
                    return false;
                }
            })
        }
    })
}

function addOPrace(timeOfContract){
    return agreementPraca.findOne({
        where:{
            WymiarCzasuPracy: timeOfContract
        }
    }).then(function(agree){
        if(agree){
            return agree.IdUmowy;
        }else{
            return agreementPraca.create({
                WymiarCzasuPracy: timeOfContract
            }).then(function(agreeC){
                if(agreeC){
                    return agreeC.IdUmowy;
                }else{
                    return false;
                }
            })
        }
    })
}

function addZlecenie(ifStudent, zus){
    return agreementZlecenie.findOne({
        where:{
            StatusStudenta: ifStudent,
            ZUS: zus
        }
    }).then(function(agree){
        if(agree){
            return agree.IdUmowy;
        }else{
            return agreementZlecenie.create({
                StatusStudenta: ifStudent,
                ZUS: zus
            }).then(function(agreeC){
                if(agreeC){
                    return agreeC.IdUmowy;
                }else{
                    return false;
                }
            })
        }
    })
}

function addB2bToAgree(agreeId, b2bId){
    return agreementModel.findOne({
        where:{
            IdUmowy: agreeId
        }
    }).then(function(agree){
        if(agree){
            agree.update({
                umowy_b2b: b2bId
            });
        }
    });
}

function addOPraceToAgree(agreeId, oPrace){
    return agreementModel.findOne({
        where:{
            IdUmowy: agreeId
        }
    }).then(function(agree){
        if(agree){
            agree.update({
                umowy_o_prace: oPrace
            }).then(function(agreement){
                return agreement.IdUmowy;
            });
        }
    });
}
function addZlecenieToAgree(agreeId, zlecenie){
    return agreementModel.findOne({
        where:{
            IdUmowy: agreeId
        }
    }).then(function(agree){
        if(agree){
            agree.update({
                umowy_zlecenie: zlecenie
            }).then(function(agr){
                return agr.IdUmowy;
            })
        }
    });
}

function getAgreeInfo(idAgree){
    return agreementModel.findOne({
        where:{
            IdUmowy: 11
        }
    }).then(function(agree){
        if(agree.umowy_b2b != null){
            return agreementB2b.findOne({
                where:{
                    IdUmowy: agree.umowy_b2b
                }
            }).then(function(agreeB2b){
                return agreeB2b
            });
        }
        if(agree.umowy_o_prace != null){
            return agreementModel.findOne({
                where:{
                    IdUmowy: agree.umowy_o_prace
                }
            }).then(function(agreeOPrace){
                return agreeOPrace;
            });
        }
        if(agree.zlecenie != null){
            return agreementZlecenie.findOne({
                where:{
                    IdUmowy: agree.umowy_zlecenie
                }
            }).then(function(agreeZlecenie){
                return agreeZlecenie;
            });
        }
    })
}

module.exports = {
    addAgreement: addAgreement,
    addB2b: addB2b,
    addB2bToAgree:addB2bToAgree,
    addOPrace:addOPrace,
    addOPraceToAgree: addOPraceToAgree,
    addZlecenie: addZlecenie,
    addZlecenieToAgree: addZlecenieToAgree,
    getAgreeInfo: getAgreeInfo
}