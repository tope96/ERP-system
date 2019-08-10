
var element = document.getElementById("fixedAssets");
element.classList.add("active-bar");

  function myFunction() {
    var y = document.getElementById("infoPanel");
    var x = document.getElementById("editPanel");
    var z = document.getElementById("edit");
    z.style.display = "none";
    y.style.display = "none";
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }

  function hide() {
    var z = document.getElementById("edit");
    z.style.display = "none";
    var x = document.getElementById("editPanel");
    var y = document.getElementById("infoPanel");
    x.style.display = "none";
    y.style.display = "block";
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

  function edit(nazwa, opis, rodzaj, WartoscNetto, DataZakupu, IdSrodkiTrwale, owner) {
    var y = document.getElementById("editPanel");
    y.style.display = "none";

    var z = document.getElementById("infoPanel");
    z.style.display = "none";

    document.getElementById("nameEdit").value = nazwa;
    document.getElementById("descriptionEdit").value = opis;
    document.getElementById("typeEdit").value = rodzaj;
    document.getElementById("priceEdit").value = WartoscNetto;
    document.getElementById("dateEdit").value = DataZakupu;
    document.getElementById("idEdit").value = IdSrodkiTrwale;
    document.getElementById("ownerEdit").value = owner;

    var x = document.getElementById("edit");
    x.style.display = "block";

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

  var width = $(window).width();
$(window).resize(function () {
    if (width <= 720) {
        $('demo').addClass('collapse');
    }
});
