

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
                            location.href="/";
                        }
                    });
            }
        });
}