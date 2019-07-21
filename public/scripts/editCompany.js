
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

  function submitForm(form) {
    var formObj = document.getElementById(form);
    formObj.submit();
  }

$(document).ready(function () {
    var element = document.getElementById("editCompany");
    element.classList.add("active-bar");
    
    //makes submit button disable when inputs are empty
    $(document).ready(function () {
        $('.input').keyup(function () {

            var empty = false;
            $('.input').each(function () {
                if ($(this).val().length == 0 || $('.selectWorker').val() == 'Brak pracowników bez kont' || $('.selectWorker').val() == 'Wybierz pracownika') {
                    empty = true;
                }
            });

            if (empty) {
                $('.continue').attr('disabled', 'disabled');
            } else {
                $('.continue').attr('disabled', false);
            }
        });

        $('.selectWorker').click(function () {
            var empty = false;
            $('.input').each(function () {
                if ($(this).val().length == 0 || $('.selectWorker').val() == 'Brak pracowników bez kont' || $('.selectWorker').val() == 'Wybierz pracownika') {
                    empty = true;
                }
            });

            if (empty) {
                $('.continue').attr('disabled', 'disabled');
            } else {
                $('.continue').attr('disabled', false);
            }
        });
    });

});