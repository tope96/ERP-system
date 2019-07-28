$( document ).ready(function() {
    
    var permission = $('.permission').val();

    if(permission == 3){
        $("button.hr-perm").attr("disabled", true);
        $("button.admin-perm").attr("disabled", true);
    }else if(permission == 1){
        $("button.hr-perm").attr("disabled", false);
        $("button.admin-perm").attr("disabled", false);
    }else if(permission == 2){
        $("button.hr-perm").attr("disabled", false);
        $("button.admin-perm").attr("disabled", true);
    }

});