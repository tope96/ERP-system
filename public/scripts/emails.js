$(document).ready(function () {
  $(function () {
    $('#searchGroup').keyup(function () {
      console.log("dd")
      var current_query = $('#searchGroup').val();
      if (current_query !== "") {
        $(".searchInAdd li").hide();
        $(".searchInAdd li").each(function () {
          var current_keyword = $(this).text();
          if (current_keyword.indexOf(current_query) >= 0) {
            $(this).show();
          };
        });
      } else {
        $(".searchInAdd li").show();
      };
    });
  });
});    
function goBack() {
        window.history.back();
      }