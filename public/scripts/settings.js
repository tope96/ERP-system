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