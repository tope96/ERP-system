var element = document.getElementById("hr");
element.classList.add("active-bar");



$(document).ready(function () {

$(function () {
  $('#searchTeams1').keyup(function () {
    console.log("dd")
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
    console.log("dd")
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
    var edit = document.getElementById("edit");
    edit.style.display = "block";

    var addCompany = document.getElementById("addCompany");
    addCompany.style.display = "none";

    var addTeam = document.getElementById("addTeam");
    addTeam.style.display = "none";

    var teamsManage = document.getElementById("teamsManage");
    teamsManage.style.display = "none";
    editTeamHide();
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
});

 function editTeamHide() {
  var element = document.getElementById("editTeam");
 
  //If it isn't "undefined" and it isn't "null", then it exists.
  if(typeof(element) != 'undefined' && element != null){
    element.style.display = "none";
  } else{
  }

  }

  function editWorkerHide() {

    var element = document.getElementById("ifEditWorker");
    var x = document.getElementById("edit");
    //If it isn't "undefined" and it isn't "null", then it exists.
    if(typeof(element) != 'undefined' && element != null){
      x.style.display = "none";
    } else{
    }

  }


$(function () {
  $('#searchTeam').keyup(function () {
    console.log("dkkfkfkffkfkfkkf");
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

var addCompany = document.getElementById("addCompany");
addCompany.style.display = "none";
var addTeam = document.getElementById("addTeam");
addTeam.style.display = "none";
editTeamHide();
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

function editTeamView(teamId) {
  var x = document.getElementById("editTeam");
  x.style.display = "inline";
  teamsManageHide();
  dupa = 3;
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
  var y = document.getElementById("infoPanel");
  var x = document.getElementById("editPanel");

  var a = document.getElementById("teamsManage");
  var b = document.getElementById("addTeam");
  editTeamHide();
  editWorkerHide();
  a.style.display = "none";
  y.style.display = "none";
  b.style.display = "block";
}

function myFunction() {
  var y = document.getElementById("infoPanel");
  var x = document.getElementById("editPanel");
  var a = document.getElementById("teamsManage");
  var b = document.getElementById("addTeam");
  var addCompany = document.getElementById("addCompany");
  hideAgreementB2b();
  hideAgreementInput();
  hideAgreemtnInput2();
  editTeamHide();
  b.style.display = "none";
  a.style.display = "none";
  y.style.display = "none";
  editWorkerHide();
  addCompany.style.display = "none";

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

}

function teams() {
  var y = document.getElementById("infoPanel");
  var x = document.getElementById("editPanel");
  var a = document.getElementById("teamsManage");
  var b = document.getElementById("addTeam");
  var addCompany = document.getElementById("addCompany");
  b.style.display = "none";
  y.style.display = "none";
  x.style.display = "none";
  editWorkerHide();
  addCompany.style.display = "none";

  editTeamHide();
  if (a.style.display === "none") {
    a.style.display = "block";
  } else {
    a.style.display = "none";
  }

}

function hide() {
  var editPanel = document.getElementById("editPanel");
  var infoPanel = document.getElementById("infoPanel");
  var teamManage = document.getElementById("teamsManage");
  var addCompany = document.getElementById("addCompany");
  var b = document.getElementById("addTeam");
  b.style.display = "none";
  editPanel.style.display = "none";
  infoPanel.style.display = "block";
  teamManage.style.display = "none";
  addCompany.style.display = "none";
  editWorkerHide();
  editTeamHide();
}

function cancel() {
  editWorkerHide();
  var x = document.getElementById("editPanel");
  x.style.display = "none";
  editWorkerHide();
  var y = document.getElementById("infoPanel");
  y.style.display = "block";
}

function edit(firstName, lastName, email, telephone, id, idUmowy) {
  var y = document.getElementById("editPanel");
  y.style.display = "none";

  var z = document.getElementById("infoPanel");
  z.style.display = "none";

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