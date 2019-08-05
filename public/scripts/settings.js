
$(document).ready(function () {
  $('#dtOrderExample').DataTable({
  "order": [[ 3, "desc" ]]
  });
  $('.dataTables_length').addClass('bs-select');
  });

function showWorkers() {
    var y = document.getElementById("permissions");
    y.style.display = "block";

    var x = document.getElementById("perms");
    x.style.display = "none";
  }

  function changePerm(idWorker){
    var y = document.getElementById("permissions");
    y.style.display = "none";

    var x = document.getElementById("perms");
    document.getElementById("idWorker").value= idWorker;
    x.style.display = "block";
  }

  function hideWorkers(){
    var y = document.getElementById("permissions");
    y.style.display = "none";

    var x = document.getElementById("perms");
    x.style.display = "none";
  }

  function check() {
    document.getElementById("red").checked = true;
  }

  function showProposal(name, desc, arg, category, date){
    var showProposal = document.getElementById("proposal");
    showProposal.style.display = "block";

    document.getElementById("proposalName").value = name;
    document.getElementById("proposalDescription").value = desc;
    document.getElementById("proposalArgumentation").value = arg;
    document.getElementById("proposalCategory").value = category;
    document.getElementById("proposalDate").value = date;
}

function hideProposal(){
  var showProposal = document.getElementById("proposal");
  showProposal.style.display = "none";
  var showProposal = document.getElementById("proposalReceived");
  showProposal.style.display = "none";
}

function showProposalReceived(name, desc, arg, category, date, sender, id){
  var showProposal = document.getElementById("proposalReceived");
  showProposal.style.display = "block";

  document.getElementById("proposalSenderReceived").value = sender;
  document.getElementById("proposalNameReceived").value = name;
  document.getElementById("proposalDescriptionReceived").value = desc;
  document.getElementById("proposalArgumentationReceived").value = arg;
  document.getElementById("proposalCategoryReceived").value = category;
  document.getElementById("proposalDateReceived").value = date;
  document.getElementById("proposalIdReceived").value = id;
  document.getElementById("proposalIdReceivedDec").value = id;
}

function acceptProposal(){
  document.getElementById("acceptProposal").submit();
}

function declineProposal(){
  document.getElementById("declineProposal").submit();
}