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