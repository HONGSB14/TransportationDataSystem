$(function() {

sessionStorage.clear();
    $.ajax({
            url:"/member/findIdSuccess",
            success: function(data){
               console.log(data);
               console.log(String(data));
               console.log(data.findId);
               console.log(data.findName);
            }
    });
});