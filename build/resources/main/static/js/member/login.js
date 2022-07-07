

function loginCheck(){

        $.ajax({
            url:"/member/loginSession",
            method: 'POST',
            data:{"companyNumber":$("#companyNumber").val()},
            success: function(data){
                $.ajax({
                        url:"/member/loginController",
                        method: 'POST',
                        data:{"memberId":$("#memberId").val(),"password":$("#password").val()},
                        success: function(data){
                            if(data==String(false)){
                                console.log("로그인 실패");
                                $("#loginCheck").html("일치하는 회원정보가 없습니다.");
                            }else{
                                 location.href="/";
                            }
//
                        }
                    });
            }
        });
}