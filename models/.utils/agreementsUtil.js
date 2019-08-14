var models = require('../../models');
var agreementModel = models.umowy;
var agreementB2b = models.umowy_b2b;
var agreementPraca = models.umowy_o_prace;
var agreementZlecenie = models.umowy_zlecenie;

function addAgreement(startDate, endDate, lumpSum, hourlyRate) {
    if (hourlyRate == "" || hourlyRate == null) {
        hourlyRate = null;
    }

    if (lumpSum == "" || lumpSum == null) {
        lumpSum = null;
    }

    return agreementModel.findOne({
        where: {
            DataRozpoczecia: startDate,
            DataZakonczenia: endDate
        }
    }).then(function (agreement) {
        if (agreement) {
            return agreement.IdUmowy;
        } else {
            return agreementModel.create({
                DataRozpoczecia: startDate,
                DataZakonczenia: endDate,
                StawkaRyczalt: lumpSum,
                StawkaGodzinowa: hourlyRate
            }).then(function (agree) {
                if (agree) {
                    return agree.IdUmowy;
                } else {
                    return false;
                }
            });
        }
    });
}

function addB2b(companyId, conc) {
    return agreementB2b.findOne({
        where: {
            IdFirma: companyId,
            ZakazKonkurencji: conc
        }
    }).then(function (b2b) {
        if (b2b) {
            return b2b.IdUmowy;
        } else {
            return agreementB2b.create({
                IdFirma: companyId,
                ZakazKonkurencji: conc
            }).then(function (b2bC) {
                if (b2bC) {
                    return b2bC.IdUmowy;
                } else {
                    return false;
                }
            });
        }
    });
}

function addOPrace(timeOfContract) {
    return agreementPraca.findOne({
        where: {
            WymiarCzasuPracy: timeOfContract
        }
    }).then(function (agree) {
        if (agree) {
            return agree.IdUmowy;
        } else {
            return agreementPraca.create({
                WymiarCzasuPracy: timeOfContract
            }).then(function (agreeC) {
                if (agreeC) {
                    return agreeC.IdUmowy;
                } else {
                    return false;
                }
            });
        }
    });
}

function addZlecenie(ifStudent, zus) {
    return agreementZlecenie.findOne({
        where: {
            StatusStudenta: ifStudent,
            ZUS: zus
        }
    }).then(function (agree) {
        if (agree) {
            return agree.IdUmowy;
        } else {
            return agreementZlecenie.create({
                StatusStudenta: ifStudent,
                ZUS: zus
            }).then(function (agreeC) {
                if (agreeC) {
                    return agreeC.IdUmowy;
                } else {
                    return false;
                }
            });
        }
    });
}

function addB2bToAgree(agreeId, b2bId) {
    return agreementModel.findOne({
        where: {
            IdUmowy: agreeId
        }
    }).then(function (agree) {
        if (agree) {
            agree.update({
                umowy_b2b: b2bId
            });
        }
    });
}

function addOPraceToAgree(agreeId, oPrace) {
    return agreementModel.findOne({
        where: {
            IdUmowy: agreeId
        }
    }).then(function (agree) {
        if (agree) {
            agree.update({
                umowy_o_prace: oPrace
            }).then(function (agreement) {
                return agreement.IdUmowy;
            });
        }
    });
}

function addZlecenieToAgree(agreeId, zlecenie) {
    return agreementModel.findOne({
        where: {
            IdUmowy: agreeId
        }
    }).then(function (agree) {
        if (agree) {
            agree.update({
                umowy_zlecenie: zlecenie
            }).then(function (agr) {
                return agr.IdUmowy;
            });
        }
    });
}

function getAllAgreInfo(idAgree) {
    return agreementModel.findOne({
        where: {
            IdUmowy: idAgree
        }
    }).then(function (agree) {
        return agree;
    });
}

function getAgreeInfo(idAgree) {
    return agreementModel.findOne({
        where: {
            IdUmowy: idAgree
        }
    }).then(function (agree) {
        if (agree.umowy_b2b != null) {
            return agreementB2b.findOne({
                where: {
                    IdUmowy: agree.umowy_b2b
                }
            }).then(function (agreeB2b) {
                return agreeB2b;
            });
        }

        if (agree.umowy_o_prace != null) {
            return agreementPraca.findOne({
                where: {
                    IdUmowy: agree.umowy_o_prace
                }
            }).then(function (agreeOPrace) {
                return agreeOPrace;
            });
        }

        if (agree.umowy_zlecenie != null) {
            return agreementZlecenie.findOne({
                where: {
                    IdUmowy: agree.umowy_zlecenie
                }
            }).then(function (agreeZlecenie) {
                return agreeZlecenie;
            });
        }
    });
}

function getAllAgree() {
    return agreementModel.findAll({
    }).then(function (founds) {
        return founds;
    });
}

function getB2b() {
    return agreementB2b.findAll({
    }).then(function (founds) {
        return founds;
    });
}

function getOPrace() {
    return agreementPraca.findAll({

    }).then(function (founds) {
        return founds;
    });
}

function getZlecenie() {
    return agreementZlecenie.findAll({

    }).then(function (founds) {
        return founds;
    });
}

function editAgreement(IdAgree, startDate, endDate, ryczalt, hourly) {
    if (ryczalt == "" || ryczalt == null) {
        ryczalt = null;
    }

    if (hourly == "" || hourly == null) {
        hourly = null;
    }
    return agreementModel.findOne({
        where: {
            IdUmowy: IdAgree
        }
    }).then(function (agree) {
        return agree.update({
            DataRozpoczecia: startDate,
            DataZakonczenia: endDate,
            StawkaRyczalt: ryczalt,
            StawkaGodzinowa: hourly
        });
    });
}

function deleteOld(IdAgree) {
    return agreementModel.findOne({
        where: {
            IdUmowy: IdAgree
        }
    }).then(function (found) {
        return found.update({
            umowy_b2b: null,
            umowy_o_prace: null,
            umowy_zlecenie: null
        });
    });
}

module.exports = {
    addAgreement: addAgreement,
    addB2b: addB2b,
    addB2bToAgree: addB2bToAgree,
    addOPrace: addOPrace,
    addOPraceToAgree: addOPraceToAgree,
    addZlecenie: addZlecenie,
    addZlecenieToAgree: addZlecenieToAgree,
    getAgreeInfo: getAgreeInfo,
    getAllAgree: getAllAgree,
    getB2b: getB2b,
    getOPrace: getOPrace,
    getZlecenie: getZlecenie,
    getAllAgreInfo: getAllAgreInfo,
    editAgreement: editAgreement,
    deleteOld: deleteOld
};