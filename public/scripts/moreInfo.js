function agreementView() {
  hideAgreemtnInput2();
  var inputs = document.getElementById('agreement');
  inputs.style.display = "block";
}

function agreement2View() {
  hideAgreementInput();
  var input2 = document.getElementById("agreement2");
  input2.style.display = "block";
}

function hideAgreemtnInput2(){
    var input2 = document.getElementById("agreement2");
    input2.style.display = "none";
}

function hideAgreementInput(){
    var input2 = document.getElementById("agreement");
    input2.style.display = "none";
}