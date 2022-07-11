
let pass= false;

$(function(){

	 //비밀번호 중복체크
      $("#password").keyup(function(){

            let pwd=$("#password").val();
            let pwdc=/^[a-zA-Z0-9]{5,15}$/;

            if(pwdc.test(pwd)){ //비밀번호 형식이 알맞을 경우
                    $("#pwdcheck2").html("");
                    $("#pwdcheck").html("사용할 수 있는 비밀번호입니다."); pass = true;
                    $("#pwdcheck3").html("");
            		$("#pwdcheck4").html("");
            }else{ // 비밀번호 형식이 다를경우
                $("#pwdcheck").html("");
                $("#pwdcheck2").html("비밀번호 형식이 올바르지 않습니다."); pass = false;
            	$("#pwdcheck3").html("");
            	$("#pwdcheck4").html("");
            }
        });


        //비밀번호 재확인 중복체크
        $("#passwordCheck").keyup(function(){

            let pwd=$("#password").val();
            let pwdCheck=$("#passwordCheck").val();

            if(pwd==pwdCheck){
	  			$("#pwdcheck").html("");
	  			$("#pwdcheck2").html("");
                $("#pwdcheck4").html("");
                $("#pwdcheck3").html("비밀번호가 일치합니다.");	pass = true;
            }else{
				$("#pwdcheck").html("");
	  			$("#pwdcheck2").html("");
                $("#pwdcheck3").html("");
                $("#pwdcheck4").html("비밀번호가 일치하지 않습니다."); pass = false;
            }
        });
});

function passwordUpdate(){
       	let check=true;
       	if(check==pass){
        	 $.ajax({
                 url:"/member/passwordUpdate",
                 method:"PUT",
                 data:{"password":$("#password").val()},
                 success:function(data){
                       if(data==true){
                            sessionStorage.clear();
                            location.href="/";
                       }else{
                                $("#passwordUpdateCheck").html("비밀번호 변경이 실패하였습니다. 계속 반복되는 경우 관리자에게 문의 해 주십시오.");
                       }
                 }
             });
        }else{
        	$("#passwordUpdateCheck").html("비밀번호 변경 조건이 알맞은 형태가 아닙니다.");
        }

}