var element = document.getElementById("production");
element.classList.add("active-bar");
jobShow();

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


function hide() {
  var infoPanel = document.getElementById("infoPanel");
  var addProject = document.getElementById("addProject");
  addProject.style.display = "none";
  infoPanel.style.display = "block";
  jobShowHide();
  jobEditHide();
}

function jobShow(){
    var infoPanel = document.getElementById("infoPanel");
    infoPanel.style.display = "none";
    var jobShow = document.getElementById("jobShow");
    addJobHide();
    addClientHide();
    editProjectHide();
    addProjectHide();
    jobEditHide();
    jobShow.style.display = "block";
}

function submitForm(form) {
  var formObj = document.getElementById(form);
  formObj.submit();
}


function jobEditShow(){
  var infoPanel = document.getElementById("infoPanel");
  infoPanel.style.display = "none";
  var jobEdit = document.getElementById("jobEdit");
  jobEdit.style.display = "block";
  addJobHide();
  addClientHide();
  editProjectHide();
  addProjectHide();
  jobShowHide();
  console.log('================ <%=job.IdZadanie%>');
}

function addProjectShow() {
    var infoPanel = document.getElementById("infoPanel");
    var addProject = document.getElementById("addProject");
    infoPanel.style.display = "none";
    addJobHide();
    addClientHide();
    editProjectHide();
    jobShowHide();
    jobEditHide();
    if (addProject.style.display === "none") {
        addProject.style.display = "block";
    } else {
        addProject.style.display = "none";
    }
  }

  

  function addClientShow() {
    var clientPanel = document.getElementById("clientPanel");
    var infoPanel = document.getElementById("infoPanel");
    var addProject = document.getElementById("addProject");
    editProjectHide();
    addJobHide();
    jobShowHide();
    jobEditHide();
    infoPanel.style.display = "none";
    addProject.style.display = "none";

    clientPanel.style.display = "block";
  }

  function addJobShow(idProject) {
    var addJob = document.getElementById("addJob");
    var infoPanel = document.getElementById("infoPanel");

    editProjectHide();
    addClientHide()
    addProjectHide();
    jobEditHide();
    document.getElementById("projectIdJob").value = idProject;
    
    infoPanel.style.display = "none";
    addJob.style.display = "block";

  }


  function jobEditHide(){
    var jobEdit = document.getElementById("jobEdit");
    jobEdit.style.display = "none";
  }

  function jobShowHide(){
    var jobShow = document.getElementById("jobShow");
    jobShow.style.display = "none";
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
  }

  function addJobHide(){
    var x = document.getElementById("addJob");
    x.style.display = "none"; 
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

  