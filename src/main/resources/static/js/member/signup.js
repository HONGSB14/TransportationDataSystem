//회원가입 유효성 검사 조건: 모두 true 라면 가입 성공
let pass=[false,false,false,false,false,false];

$(function(){ //문서시작 시 함수시작
	//회사 유효성 검사
  	$("#name").keyup(function(){

		let crn=$("#crn").val();
		let name=$("#name").val();
		$.ajax({
			url:"/company/check",
			data:{"crn":crn,"name":name},
			method:"POST",
			success: function(result){
			console.log(result);
				if(result==false){
					$("#cnamecheck2").html("");
					$("#cnamecheck").html("승인된 회사입니다.");		pass[0] = true;
					$("#companyNumber").val(function(){

						$.ajax({
							url:"/company/findNumber",
							data:{"crn":crn,"name":name},
							method:"POST",
							success:function(result){
								if(result!=null){
									$("#companyNumber").val(result);
								}
							}
						});
				});
				}else{
					$("#cnamecheck").html("");
					$("#cnamecheck2").html("가입할 수 없는 회사입니다.");  pass[0] = false;
				}
			}
		});
	});
    //아이디 중복체크
    $("#id").keyup(function(){
        let id=$("#id").val()
        let idc=/^[a-zA-Z0-9]{4,15}$/;
        if(idc.test(id)){
          $.ajax({
				url: "/member/idCheck",
				data: {"id":id},
				method: "GET",
				success: function(result){
					if(result==true){
						$("#idcheck2").html("");
           				$("#idcheck").html("사용가능한 아이디 입니다.");  pass[1] = true;
					}else{
						$("#idcheck").html("");
           				$("#idcheck2").html("현재 사용중인 아이디가 존재합니다.");	pass[1] = false;
					}
				}
			});
        }else{
           $("#idcheck").html("");
           $("#idcheck2").html("영문,숫자 포함 4~15길이로 입력해주세요.");	pass[1] = false;
        }

    });

        //비밀번호 중복체크
        $("#password").keyup(function(){

            let password=$("#password").val();
            let passwordc=/^[a-zA-Z0-9]{5,15}$/;

            if(passwordc.test(password)){ //비밀번호 형식이 알맞을 경우
                    $("#pwdcheck3").html("");
            		$("#pwdcheck4").html("");
                    $("#pwdcheck2").html("");
                    $("#pwdcheck").html("사용할 수 있는 비밀번호입니다."); pass[2] = true;
            }else{ // 비밀번호 형식이 다를경우
               	$("#pwdcheck3").html("");
            	$("#pwdcheck4").html("");
                $("#pwdcheck").html("");
                $("#pwdcheck2").html("비밀번호 형식이 올바르지 않습니다."); pass[2] = false;
            }
        });

        //비밀번호 재확인 중복체크
        $("#passwordCheck").keyup(function(){

            let password=$("#password").val();
            let passwordCheck=$("#passwordCheck").val();

            if(password==passwordCheck){
                $("#pwdcheck").html("");  pass[2] = true;
	  			$("#pwdcheck2").html("");
                $("#pwdcheck4").html("");
                $("#pwdcheck3").html("비밀번호가 일치합니다.");	pass[2] = true;
            }else{
                $("#pwdcheck").html("");
	  			$("#pwdcheck2").html("");
                $("#pwdcheck3").html("");
                $("#pwdcheck4").html("비밀번호가 일치하지 않습니다."); pass[2] = false;
            }
        });

   		//이름 체크
        $("#mname").keyup(function(){

            let name=$("#mname").val();

            let namec=/^[가-힣]{2,5}$/;


            if(namec.test(name)){
                $("#namecheck2").html("");
                $("#namecheck").html("환영합니다. ' "+name+" '　님");	pass[3] = true;
            }else{
                $("#namecheck").html("");
                $("#namecheck2").html("사용할 수 없는 이름입니다.");	pass[3] =false;
            }
        });

        //전화번호 중복 체크
         $("#phone").keyup(function(){

            let phone=$("#phone").val();

            let phonec=/^([010]{3,3})([0-9]{8,8})$/;

            if(phonec.test(phone)){
                $("#phonecheck2").html("");
                $("#phonecheck").html("사용가능한 전화번호입니다.");	pass[4] = true;
            }else{
                $("#phonecheck").html("");
                $("#phonecheck2").html("사용할 수 없는 전화번호 이거나 올바르지 않은 형식입니다.");  pass[4] = false;
            }
         });
         let email=$("#email").val();
         //이메일 체크
         $("#email").keyup(function(){
          email=$("#email").val();
          validation(email);
        });

        //이메일 선택상자 체크
        $("#selectEmail").change(function(){
		   email=$("#email").val();
		    validation(email);
            let selectEmail = $("#selectEmail").val();
            let emailAddress=$("#emailAddress").val();
            let emailFinal=email+"@"+selectEmail;
            $.ajax({
            		url:"/member/emailCheck",
            		method:"GET",
            		data:{"emailFinal":emailFinal},
            		success: function(result){
            		if(result==false){
                         $("#emailcheck").html("");
                         $("#emailcheck2").html("동일한 이메일주소가 존재합니다.");	pass[5] = false;
                    }
            	}
            });
			   if(selectEmail=="직접입력"){ //만약 "직접입력" 을 선택했다면

				$("#first").attr('disabled',true);
				$("#emailcheck").html("");
                $("#emailcheck2").html("이메일을 입력해 주세요.");	pass[5] = false;
                $("#emailAddress").val("");
                $("#emailAddress").attr("readonly",false);

                $("#emailAddress").keyup(function() {
                  let email=$("#email").val();
                  validation(email);
                  let  emailAddress=$("#emailAddress").val();
                  let emailFinal=email+"@"+emailAddress;
                $.ajax({
                     url:"/member/emailCheck",
                     method:"GET",
                     data:{"emailFinal":emailFinal},
                      success: function(result){
                          if(result==true){
                               if(emailAddress==""){
                                 $("#emailcheck2").html("사용 할 수 없는 이메일 주소입니다.");	pass[5] = false;
                               }else{
                                  let emailc = /^([a-z0-9]{4,10}).([a-z]{3,3})$/;
                                  let emailc2 = /^([a-z0-9]{4,10}).([a-z]{2,2}).([a-z]{2,2})$/;
                                  if( emailc.test(emailAddress) || emailc2.test(emailAddress) ){
                                          console.log(emailAddress);
                                          $("#emailcheck2").html("");
                                          $("#emailcheck").html("사용가능한 이메일주소입니다."); pass[5] = true;
                                  }else{
                                          $("#emailcheck").html("");
                                          $("#emailcheck2").html("사용할 수 없는 이메일 주소입니다.");	pass[5] = false;
                                  }
                               }
                          }else{
                                 $("#emailcheck").html("");
                                 $("#emailcheck2").html("동일한 이메일주소가 존재합니다.");	pass[5] = false;
                          }
                      }
                 });
             });
            }else{ //"직접입력" 을 선택 안했다면
                $("#first").attr('disabled',true);
                $("#emailAddress").attr("readonly" ,true);
			    $("#emailAddress").val(selectEmail);
            	$("#emailcheck2").html("");
                $("#emailcheck").html("사용가능한 이메일주소입니다.");	pass[5] = true;
            }
                if(email==""){	//만약 이메일 공백이라면
                $("#emailcheck").html("");
                $("#emailcheck2").html("이메일을 입력해 주세요.");	pass[5] = false;
                }
        });
}); //문서종료 시 함수종료
//유효성 검사
function validation(email){

  let emailc=/^[a-zA-Z0-9]{3,20}$/;
    if(emailc.test(email)){
         $("#emailcheck2").html("");
         $("#emailcheck").html("");
    }else{
         $("#emailcheck").html("");
         $("#emailcheck2").html("올바른 이메일 기입방식으로 입력하여주세요.");pass[5] = false;
     }
}

