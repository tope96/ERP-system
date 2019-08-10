$( document ).ready(function() {
    
    var permission = $('.permission').val();

    if(permission == 3){
        $("button.hr-perm").attr("disabled", true).prop("onclick", null).off("click");
        $("button.admin-perm").attr("disabled", true).prop("onclick", null).off("click");
        $('div.admin-perm').empty();
    }else if(permission == 1){
        $("button.hr-perm").attr("disabled", false);
        $("button.admin-perm").attr("disabled", false);
        $("div.admin-perm").show();
        $("div.normal-perm").empty();
        $("button.normal-perm").attr("disabled", true).prop("onclick", null).off("click");
    }else if(permission == 2){
        $("button.hr-perm").attr("disabled", false);
        $("button.admin-perm").attr("disabled", true).prop("onclick", null).off("click");
        $("div.normal-perm").empty();
    }

});