let number="";
let id="";
function findPassword(){
 $.ajax({
           url:"/member/findPassword",
           data:{"memberId":$("#memberId").val() , "memberName":$("#memberName").val()},
           method:"POST",
           success: function(data){
                if(data==true){ //만약 값이 있을 경우
                        $("#passwordCheck2").html("");
                        $("#passwordCheck").html("가입하신 이메일로 인증번호가 발송되었습니다.");
                         //인증번호 발송
                        $.ajax({
                            url:"/member/authenticationNumber",
                            data:{memberId:$("#memberId").val()},
                            method:"GET",
                            success: function(data){
                                id=$("#memberId").val();
                                number=data.number;
                                console.log(number);
                            }
                        });
                }else { // 값이 없을 경우
                         $("#passwordCheck").html("");
                        $("#passwordCheck2").html("아이디 및 이름을 다시한번 확인 해주세요.");
                }
           }
       });
}

  function findAuthentication(){
     if($("#authenticationNumber").val() !=""){
            if(number==$("#authenticationNumber").val()){
                    location.href="/page/member/findPasswordSuccess/"+id;
            }else{
                 $("#numberCheck").html("인증이 실패되었습니다. 다시한번 확인해 주십시오.");
           }
     }else{
            $("#numberCheck").html("인증이 실패되었습니다. 다시한번 확인해 주십시오.");
     }
 }



