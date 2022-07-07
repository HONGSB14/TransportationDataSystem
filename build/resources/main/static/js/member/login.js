

function loginCheck(){
          //세션을 UserDetails 에 저장 하기 위해 컨트롤로 전송
        $.ajax({
            url:"/member/loginSession",
            method: 'POST',
            data:{"companyNumber":$("#companyNumber").val()},
            success: function(data){
                //UserDetails 에 ID 와 PASSWORD 를 전송
                $.ajax({
                        url:"/member/loginController",
                        method: 'POST',
                        data:{"memberId":$("#memberId").val(),"password":$("#password").val()},
                        success: function(data){
                             if( data == "loginFalse" ){
                                    console.log("로그인 실패");
                             }else{
                                console.log("로그인 성공");
                             }
                        }
                    });
            }
        });
}