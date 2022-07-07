$(function() {

sessionStorage.clear();
    $.ajax({
            url:"/member/findIdSuccess",
            Method: "GET",
            contentType:false,
            dataType: false,
            success: function(data){
            html="";
            html+='<div class="py-3">'+
                                '<div class="py-2">'+
                                    '<h3>'+data.findName+'회원님!!</h3>'+
                                '</div>'+
                                        '회원님이 가입하신 아이디는<br>'+data.findId+'<br>입니다.'+
                         '</div>'+
                        '<div class="py-5">'+
                              '<a href="/page/member/login"><button class="form-control">확인</button></a>'+
                        '</div>';
            $("#idInfo").html(html);
             //세션 클리어
             sessionStorage.clear();
            }
    });
});