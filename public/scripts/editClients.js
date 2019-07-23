var element = document.getElementById("editCompany");
element.classList.add("active-bar");

function submitForm(form) {
    var formObj = document.getElementById(form);
    formObj.submit();
  }

function edit(name, firstName, lastName, tel, email, address, town, nip, clientId){
  var infoPanel = document.getElementById("infoPanel");
  infoPanel.style.display = "none";

  var editPanel = document.getElementById("editPanel");
  editPanel.style.display = "block";

  console.log("name: " + name)

  document.getElementById("clientId").value = clientId;
  document.getElementById("nameEdit").value = name;
  document.getElementById("firstNameEdit").value = firstName;
  document.getElementById("lastNameEdit").value = lastName;
  document.getElementById("telEdit").value = tel;
  document.getElementById("emailEdit").value = email;
  document.getElementById("addressEdit").value = address;
  document.getElementById("townEdit").value = town;
  document.getElementById("nipEdit").value = nip;

}

function hideEditCompany(){
  var infoPanel = document.getElementById("infoPanel");
  infoPanel.style.display = "block";

  var editPanel = document.getElementById("editPanel");
  editPanel.style.display = "none";
}

function showAddingPanel(){
  var infoPanel = document.getElementById("infoPanel");
  infoPanel.style.display = "none";

  var clientPanel = document.getElementById("clientPanel");
  clientPanel.style.display = "block";

  var editPanel = document.getElementById("editPanel");
  editPanel.style.display = "none";
}


function hideInfoPanel() {
  window.history.back();
}
