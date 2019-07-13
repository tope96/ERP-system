function addProjectShow() {
    var infoPanel = document.getElementById("infoPanel");
    var addProject = document.getElementById("addProject");
    var clientPanel = document.getElementById("clientPanel");
    infoPanel.style.display = "none";
    clientPanel.style.display = "none";

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

    infoPanel.style.display = "none";
    addProject.style.display = "none";

    if (clientPanel.style.display === "none") {
        clientPanel.style.display = "block";
    } else {
        clientPanel.style.display = "none";
    }
  }

  function addCompanyShow() {
    var x = document.getElementById("addCompany");
    x.style.display = "inline";
  }
  
  function addCompanyHide() {
    var x = document.getElementById("addCompany");
    x.style.display = "none";
  }