var element = document.getElementById("editCompany");
element.classList.add("active-bar");

function submitForm(form) {
    var formObj = document.getElementById(form);
    formObj.submit();
  }