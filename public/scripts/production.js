function addProjectShow() {
    var infoPanel = document.getElementById("infoPanel");
    var addProject = document.getElementById("addProject");
    infoPanel.style.display = "none";
    addJobHide();
    addClientHide();
    editProjectHide();

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
    infoPanel.style.display = "none";
    addProject.style.display = "none";

    if (clientPanel.style.display === "none") {
        clientPanel.style.display = "block";
    } else {
        clientPanel.style.display = "none";
    }
  }

  function addJobShow(idProject) {
    var addJob = document.getElementById("addJob");
    var infoPanel = document.getElementById("infoPanel");

    editProjectHide();
    addClientHide()
    addProjectHide();

    document.getElementById("projectIdJob").value = idProject;
    
    infoPanel.style.display = "none";
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