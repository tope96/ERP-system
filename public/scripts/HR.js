var element = document.getElementById("hr");
element.classList.add("active-bar");



$(document).ready(function () {

  $(function () {
    var $inputs = $('input[name=lumpSum],input[name=hourlyRate]');
    $inputs.on('input', function () {
        // Set the required property of the other input to false if this input is not empty.
        $inputs.not(this).prop('required', !$(this).val().length);
    });
  });

  $(function () {
    var $inputs = $('input[name=lumpSumEdit],input[name=hourlyRateEdit]');
    $inputs.on('input', function () {
        // Set the required property of the other input to false if this input is not empty.
        $inputs.not(this).prop('required', !$(this).val().length);
    });
  });

$(function () {

  $('#searchTeamsAdd').keyup(function () {
    var current_query = $('#searchTeamsAdd').val();
    if (current_query !== "") {
      $(".toCreate li").hide();
      $(".toCreate li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".toCreate li").show();
    };
  });

  $('#searchTeams1').keyup(function () {
    var current_query = $('#searchTeams1').val();
    if (current_query !== "") {
      $(".searchInDelete li").hide();
      $(".searchInDelete li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".searchInDelete li").show();
    };
  });
});

$(function () {
  $('#searchTeams2').keyup(function () {
    var current_query = $('#searchTeams2').val();
    if (current_query !== "") {
      $(".searchInAdd li").hide();
      $(".searchInAdd li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".searchInAdd li").show();
    };
  });
});

  if ($('#ifEdit').length) {
    var editTeam = document.getElementById("editTeam");
    editTeam.style.display = "block";

    var addCompany = document.getElementById("addCompany");
    addCompany.style.display = "none";

    var addTeam = document.getElementById("addTeam");
    addTeam.style.display = "none";

    var teamsManage = document.getElementById("teamsManage");
    teamsManage.style.display = "none";
  }

  if ($('#ifEditWorker').length) {
  

    var addCompany = document.getElementById("addCompany");
    addCompany.style.display = "none";

    var addTeam = document.getElementById("addTeam");
    addTeam.style.display = "none";

    var teamsManage = document.getElementById("teamsManage");
    teamsManage.style.display = "none";
    editTeamHide();
    var edit = document.getElementById("edit");
    edit.style.display = "block";
  }

  if ($('#oPrace').is(':checked')) {
    var editTeam = document.getElementById("agreementEdit");
    editTeam.style.display = "block";

    var agree2 = document.getElementById("agreement2Edit");
    agree2.style.display = "none";

    var b2bEdit = document.getElementById("b2bEdit");
    b2bEdit.style.display = "none";
  }

  if ($('#b2b1').is(':checked')) {
    var agree = document.getElementById("agreementEdit");
    agree.style.display = "none";

    var agree2 = document.getElementById("agreement2Edit");
    agree2.style.display = "none";

    var b2bEdit = document.getElementById("b2bEdit");
    b2bEdit.style.display = "block";
  }

  if ($('#zlecenie').is(':checked')) {
    var agree = document.getElementById("agreementEdit");
    agree.style.display = "none";

    var agree2 = document.getElementById("agreement2Edit");
    agree2.style.display = "block";

    var b2bEdit = document.getElementById("b2bEdit");
    b2bEdit.style.display = "none";
  }

  //if one of checkbox is checked - anable button
  $('#submitDelete').attr("disabled",true);
 
   $('.boxDelete').change(function() {
      $('#submitDelete').attr('disabled', $('.boxDelete:checked').length == 0);
   });

$('#submitAdd').attr("disabled",true);
 
   $('.boxAdd').change(function() {
      $('#submitAdd').attr('disabled', $('.boxAdd:checked').length == 0);
   });

$('#programmer').on('click', function() {
  $('#languages').show();
  $('#certs').hide();
  $('#certs').prop('required',false);
  $('#languages').prop('required',true);
});

$('#analitic').on('click', function() {
  $('#languages').hide();
  $('#certs').show();
  $('#certs').prop('required',true);
  $('#languages').prop('required',false);
});

$('#programmerEdit').on('click', function() {
  $('#languagesEdit').show();
  $('#certsEdit').hide();
  $('#languagesEdit').prop('required',true);
  $('#certsEdit').prop('required',false);
});

$('#analiticEdit').on('click', function() {
  $('#languagesEdit').hide();
  $('#certsEdit').show();
  $('#certsEdit').prop('required',true);
  $('#languagesEdit').prop('required',false);
});

  $('#agreementRadio').on('click', function() {
    $('#timeOfContract').prop('required',true);
    $('#ifStudent').prop('required',false);
    $('#ifZus').prop('required',false);
    $('#companyB2b').prop('required',false);
    $('#ifCompetition').prop('required',false);
  });

  $('#agreement2Radio').on('click', function() {
    $('#timeOfContract').prop('required',false);
    $('#ifStudent').prop('required',true);
    $('#ifZus').prop('required',true);
    $('#companyB2b').prop('required',false);
    $('#ifCompetition').prop('required',false);
  });

  $('#b2bRadio').on('click', function() {
    $('#timeOfContract').prop('required',false);
    $('#ifStudent').prop('required',false);
    $('#ifZus').prop('required',false);
    $('#companyB2b').prop('required',true);
    $('#ifCompetition').prop('required',true);
  });

  $('#agreementRadioEdit').on('click', function() {
    $('#timeOfContractEdit').prop('required',true);
    $('#ifStudentEdit').prop('required',false);
    $('#ifZusEdit').prop('required',false);
    $('#companyB2bEdit').prop('required',false);
    $('#ifCompetitionEdit').prop('required',false);
  });

  $('#agreement2RadioEdit').on('click', function() {
    $('#timeOfContractEdit').prop('required',false);
    $('#ifStudentEdit').prop('required',true);
    $('#ifZusEdit').prop('required',true);
    $('#companyB2bEdit').prop('required',false);
    $('#ifCompetitionEdit').prop('required',false);
  });

  $('#b2bRadioEdit').on('click', function() {
    $('#timeOfContractEdit').prop('required',false);
    $('#ifStudentEdit').prop('required',false);
    $('#ifZusEdit').prop('required',false);
    $('#companyB2bEdit').prop('required',true);
    $('#ifCompetitionEdit').prop('required',true);
  });
});

function submitDeleteWorker(id) {
  document.getElementById("submitDeleteWorkerId"+ id).value = id;
  document.getElementById("submitDeleteWorker" + id).submit();
}

function submitEditWorker(id) {
  document.getElementById("submitEditWorkerId"+ id).value = id;
  document.getElementById("submitEditWorker" + id).submit();
}

function editTeamHide() {
  var element = document.getElementById("editTeam");

  //If it isn't "undefined" and it isn't "null", then it exists.
  if (typeof (element) != 'undefined' && element != null) {
    element.style.display = "none";
  } else {
  }

}

function editWorkerHide() {

  var element = document.getElementById("ifEditWorker");
  var x = document.getElementById("edit");
  //If it isn't "undefined" and it isn't "null", then it exists.
  if (typeof (element) != 'undefined' && element != null) {
    x.style.display = "none";
  } else {
  }

}


$(function () {
  $('#searchTeam').keyup(function () {
    var current_query = $('#searchTeam').val();
    if (current_query !== "") {
      $(".list-group li").hide();
      $(".list-group li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".list-group li").show();
    };
  });
});

addCompanyHide()
addTeamHide();
editTeamHide();

function showWorkerInfoPanel(){
  var z = document.getElementById("infoPanel");
  z.style.display = "block";
}

function hideWorkerInfoPanel(){
  var z = document.getElementById("infoPanel");
  z.style.display = "none";
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

function addCompanyView() {
  var x = document.getElementById("addCompany");
  x.style.display = "inline";
}

function addCompanyHide() {
  var x = document.getElementById("addCompany");
  x.style.display = "none";
}

function addTeamHide() {
  var x = document.getElementById("addTeam");
  x.style.display = "none";
}


function teamsManageHide() {
  var x = document.getElementById("teamsManage");
  x.style.display = "none";
}

function teamsManageView() {
  var x = document.getElementById("teamsManage");
  x.style.display = "block";
}

function hideEditPanel(){
  var x = document.getElementById("editPanel");
  x.style.display = "none";
}

function editTeamView(teamId) {
  var x = document.getElementById("editTeam");
  x.style.display = "inline";
  teamsManageHide();
}

function newTeamview(){
  var x = document.getElementById("addTeam");
  x.style.display = "block";
}

function newTeamHide(){
  var x = document.getElementById("addTeam");
  x.style.display = "none";
}

function addTeamView() {
  var b = document.getElementById("addTeam");
  editTeamHide();
  editWorkerHide();
  hideWorkerInfoPanel();
  teamsManageHide();
  b.style.display = "block";
}

function myFunction() {
  var x = document.getElementById("editPanel");
  hideAgreementB2b();
  hideAgreementInput();
  hideAgreemtnInput2();
  editTeamHide();
  hideWorkerInfoPanel();
  editWorkerHide();
  teamsManageHide();
  addCompanyHide();
  addTeamHide();


  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

}

function teams() {
  var a = document.getElementById("teamsManage");
  hideEditPanel();
  addCompanyHide()
  hideWorkerInfoPanel();
  editWorkerHide();
  editTeamHide();
  addTeamHide();

  if (a.style.display === "none") {
    a.style.display = "block";
  } else {
    a.style.display = "none";
  }

}

function hide() {
  hideEditPanel();
  addCompanyHide()
  addTeamHide();
  teamsManageHide();
  showWorkerInfoPanel();
  editWorkerHide();
  editTeamHide();
}

function cancel() {
  showWorkerInfoPanel();
  editWorkerHide();
  hideEditPanel();
 
}

function edit(firstName, lastName, email, telephone, id, idUmowy) {
  hideEditPanel();
  hideWorkerInfoPanel();

  var agreementInput = document.getElementById("agreement");
  agreementInput.style.display = "none";

  document.getElementById("firstNameEdit").value = firstName;
  document.getElementById("lastNameEdit").value = lastName;
  document.getElementById("telephoneEdit").value = telephone;
  document.getElementById("emailEdit").value = email;
  document.getElementById("idEdit").value = id;

  var x = document.getElementById("edit");
  x.style.display = "block";

}


function agreementView() {
  hideAgreemtnInput2();
  hideAgreementB2b();
  var inputs = document.getElementById('agreement');
  inputs.style.display = "block";
}

function agreement2View() {
  hideAgreementInput();
  hideAgreementB2b();
  var input2 = document.getElementById("agreement2");
  input2.style.display = "block";
}

function agreementB2bView() {
  hideAgreementInput();
  hideAgreemtnInput2();
  var input3 = document.getElementById('b2b');
  input3.style.display = "block";
}

function agreementViewEdit(wymiarCzasu) {
  hideAgreemtnInput2Edit();
  hideAgreementB2bEdit();

  if(wymiarCzasu != null){
    document.getElementById("timeOfContractEdit").value = wymiarCzasu;
  }

  var editTeam = document.getElementById("agreementEdit");
  editTeam.style.display = "block";
}

function agreement2ViewEdit() {
  hideAgreementInputEdit();
  hideAgreementB2bEdit();
  var input2 = document.getElementById("agreement2Edit");
  input2.style.display = "block";
}

function agreementB2bViewEdit() {
  hideAgreementInputEdit();
  hideAgreemtnInput2Edit();
  var input3 = document.getElementById('b2bEdit');
  input3.style.display = "block";
}


function hideAgreementB2b() {
  var input3 = document.getElementById('b2b');
  input3.style.display = "none";
}

function hideAgreementInput() {
  var inputs = document.getElementById('agreement');
  inputs.style.display = "none";
}

function hideAgreemtnInput2() {
  var input2 = document.getElementById("agreement2");
  input2.style.display = "none";
}

function hideAgreementB2bEdit() {
  var input3 = document.getElementById('b2bEdit');
  input3.style.display = "none";
}

function hideAgreementInputEdit() {
  var inputs = document.getElementById('agreementEdit');
  inputs.style.display = "none";
}

function hideAgreemtnInput2Edit() {
  var input2 = document.getElementById("agreement2Edit");
  input2.style.display = "none";
}

function setvaluePraca(wymiar){
  document.getElementById("timeOfContractEdit").value = wymiar;
}

function downloadFileEdit(){
  document.getElementById("downloadFileEdit").submit();
}