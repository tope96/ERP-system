$(document).ready(function () {
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

if ($('#ifViewJob').length) {

  var addCompany = document.getElementById("jobEdit");
  addCompany.style.display = "none";
}
});

var element = document.getElementById("production");
element.classList.add("active-bar");

function editJobHide() {
  var element = document.getElementById("jobEdit");
  //If it isn't "undefined" and it isn't "null", then it exists.
  if (typeof (element) != 'undefined' && element != null) {
    element.style.display = "none";
  } else {
  }
}

function jobViewHide() {
  var element = document.getElementById("jobShow");
  //If it isn't "undefined" and it isn't "null", then it exists.
  if (typeof (element) != 'undefined' && element != null) {
    element.style.display = "none";
  } else {
  }
}

function showProjectInfo() {
  jobViewHide();
  addProjectHide();
  editJobHide();
  addClientHide();
  
  var infoPanel = document.getElementById("editProject");
  infoPanel.style.display = "none";
  var infoPanel = document.getElementById("infoPanel");
  infoPanel.style.display = "block";
}

function showJob(){
  var jobPanel = document.getElementById("jobShow");
  jobPanel.style.display = "block";
}

function jobEditHideShowJob(){
  editJobHide();
  showJob();
}

function jobEditShow() {
  addJobHide();
  addClientHide();
  editProjectHide();
  addProjectHide();
  jobViewHide();
  var jobEdit = document.getElementById("jobEdit");
  jobEdit.style.display = "block";
}

function submitForm(form) {
  var formObj = document.getElementById(form);
  formObj.submit();
}

function hieProjectInfoPanel(){
  var infoPanel = document.getElementById("infoPanel");
  infoPanel.style.display = "none";
}

function addProjectShow() {
  jobViewHide();
  editJobHide();
  var addProjectPanel = document.getElementById("addProject");
  var clientPanel = document.getElementById("clientPanel");
  editProjectHide();
  addJobHide();
  hieProjectInfoPanel();
  clientPanel.style.display = "none";

  if (addProjectPanel.style.display === "none") {
    addProjectPanel.style.display = "block";
  } else {
    addProjectPanel.style.display = "none";
  }
  }

  

  function addClientShow() {
    jobViewHide();
    editJobHide();
    var clientPanel = document.getElementById("clientPanel");
    var addProject = document.getElementById("addProject");
    editProjectHide();
    addJobHide();
    hieProjectInfoPanel();
    addProject.style.display = "none";

    if (clientPanel.style.display === "none") {
        clientPanel.style.display = "block";
    } else {
        clientPanel.style.display = "none";
    }
  }

  function addJobShow(idProject) {
    var addJob = document.getElementById("addJob");
    editProjectHide();
    addClientHide()
    addProjectHide();
    hieProjectInfoPanel();

    document.getElementById("projectIdJob").value = idProject;

    addJob.style.display = "block";

  }



  function addClientHide(){
    var clientPanel = document.getElementById("clientPanel");
    clientPanel.style.display = "none";
  }

  function addCompanyShow() {
    var x = document.getElementById("addCompany");
    x.style.display = "inline";
  }
  
  function addCompanyHide() {
    var x = document.getElementById("addCompany");
    x.style.display = "none";
  }

  function addCategoryShow() {
    var x = document.getElementById("addCategory");
    x.style.display = "inline";
  }
  
  function addCategoryHide() {
    var x = document.getElementById("addCategory");
    x.style.display = "none";
  }

  function addProjectHide() {
    var x = document.getElementById("addProject");
    x.style.display = "none";
  }

  function editProjectHide() {
    var x = document.getElementById("editProject");
    x.style.display = "none";
    showProjectInfo();
  }

  function addJobHide(){
    var x = document.getElementById("addJob");
    x.style.display = "none"; 
    showProjectInfo();
  }

  function edit(name, description, dateFrom, dateTo, client, category, id, team) {

    var z = document.getElementById("infoPanel");
    z.style.display = "none";

    document.getElementById("nameEdit").value = name;
    document.getElementById("descriptionEdit").value = description;
    document.getElementById("dateToEdit").value = dateTo;
    document.getElementById("dateFromEdit").value = dateFrom;
    document.getElementById("clientEdit").value = client;
    document.getElementById("categoryEdit").value = category;
    document.getElementById("projectIdEdit").value = id;
    document.getElementById("teamEdit").value = team;
    document.getElementById("oldTeamId").value = team;


    var x = document.getElementById("editProject");
    x.style.display = "block";

  }

  function completeEffect() {
    var a = new Audio("../sounds/complete.mp3");
    a.play();
  }
  
  var mp = 150
  
  var particleColors = {
    colorOptions: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
    colorIndex: 0,
    colorIncrementer: 0,
    colorThreshold: 10
  }