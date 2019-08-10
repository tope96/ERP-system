var element = document.getElementById("hr");
element.classList.add("active-bar");

var addCompany = document.getElementById("addCompany");
addCompany.style.display = "none";

var addTeam = document.getElementById("addTeam");
addTeam.style.display = "none";

var teamsManage = document.getElementById("teamsManage");
teamsManage.style.display = "none";

var editTeam = document.getElementById("editTeam");
editTeam.style.display = "block";

$(function () {
  $('#searchTeams').keyup(function () {
    var current_query = $('#searchTeams').val();
    if (current_query !== "") {
      $(".list-group-teams li").hide();
      $(".list-group-teams li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".list-group-teams li").show();
    };
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
});



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

function editTeamHide() {
  var x = document.getElementById("editTeam");
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
  var z = document.getElementById("edit");
  var a = document.getElementById("teamsManage");
  var b = document.getElementById("addTeam");
  editTeamHide();
  a.style.display = "none";
  z.style.display = "none";
  y.style.display = "none";
  b.style.display = "block";
}

function myFunction() {
  var y = document.getElementById("infoPanel");
  var x = document.getElementById("editPanel");
  var z = document.getElementById("edit");
  var a = document.getElementById("teamsManage");
  var b = document.getElementById("addTeam");
  var addCompany = document.getElementById("addCompany");
  hideAgreementB2b();
  hideAgreementInput();
  hideAgreemtnInput2();
  editTeamHide();
  b.style.display = "none";
  a.style.display = "none";
  z.style.display = "none";
  y.style.display = "none";
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
  var z = document.getElementById("edit");
  var a = document.getElementById("teamsManage");
  var b = document.getElementById("addTeam");
  var addCompany = document.getElementById("addCompany");
  b.style.display = "none";
  z.style.display = "none";
  y.style.display = "none";
  x.style.display = "none";
  addCompany.style.display = "none";
  editTeamHide();
  if (a.style.display === "none") {
    a.style.display = "block";
  } else {
    a.style.display = "none";
  }

}

function hide() {
  var edit = document.getElementById("edit");
  var editPanel = document.getElementById("editPanel");
  var infoPanel = document.getElementById("infoPanel");
  var teamManage = document.getElementById("teamsManage");
  var addCompany = document.getElementById("addCompany");
  var b = document.getElementById("addTeam");
  b.style.display = "none";
  editPanel.style.display = "none";
  infoPanel.style.display = "block";
  edit.style.display = "none";
  teamManage.style.display = "none";
  addCompany.style.display = "none";
  editTeamHide();
}

function cancel() {
  var z = document.getElementById("edit");
  z.style.display = "none";
  var x = document.getElementById("editPanel");
  x.style.display = "none";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("type").value = "";
  document.getElementById("price").value = "";
  document.getElementById("date").value = "";
  document.getElementById("owner").value = "";
  var y = document.getElementById("infoPanel");
  y.style.display = "block";
}

function edit(firstName, lastName, email, telephone, id) {
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

$(function () {
  $('#search').keyup(function () {
    var current_query = $('#search').val();
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
