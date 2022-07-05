//회사등록 유효성 검사 조건: 모두 true 라면 가입 성공
let pass=[false,false,false,false];
let companyNumber=1;
$(function(){ //문서 시작

	//가격 선택 란
	$("#price").change(function(){

		let price=$("#price").val();

		if(price=="1" || price=="2" || price=="3"){
			$("#pricecheck").html("가격이 선택되었습니다."); pass[0]=true;
		}else{
			$("#pricecheck").html("");pass[0]=false;
		}
	});

	//사업자 등록번호 입력 란
	$("#crn").keyup(function(){

		let crn=$("#crn").val();
		let crnc=/^[0-9]{10,10}$/;

		if(crnc.test(crn)){

		  $("#bncheck2").html("");
		  $("#bncheck").html("가입가능한 번호입니다.");	pass[1]=true;
		}else{

		  $("#bncheck").html("");
		  $("#bncheck2").html("유효하지 않은 번호입니다.");	pass[1]=false;
		}
	});

	//회사명 입력 란
	$("#companyName").keyup(function(){

		let companyName=$("#companyName").val();
		let companyNameCheck=/^[0-9,가-힣,A-Z,a-z]{1,20}$/;

		if(companyNameCheck.test(companyName)){
		 $("#namecheck2").html("");
		 $("#namecheck").html("가입할 수 있는 회사명 입니다.");	pass[2]=true;
		}else{
			$("#namecheck").html("");
		  $("#namecheck2").html("가입할 수 없는 회사명 입니다.");	pass[2]=false;
		}

	});

}); //문서 끝 (유효성 검사)

 //회사 유효성 검사 버튼
    function companyCheck(){

        $.ajax({
            url:"/company/check",
            method:"post",
            data:{"crn":String( $("#crn").val() ),"companyName":$("#companyName").val()},
            success:function(data){
                if(data == true){
                    if(pass[2]== true && pass[1]== true){
                       const ran=Math.random();
                       const random=Math.floor(ran*899999+100000);
                       companyNumber=random;
                       $("#companyNumber").val(random); pass[3]=true;
                               $.ajax({
                                    url:"/company/numberCheck",
                                    method:"post",
                                    data:{"cnum": $("#companyNumber").val() },
                                    success:function(data){
                                        if(data==true){
                                          $("#btncheck").attr("disabled",true);
                                          $("#numbercheck2").html("");
                                          $("#numbercheck").html("등록 할 수 있는 회사입니다.");
                                        }else{
                                           $("#numbercheck").html("등록 할 수 있는 회사입니다.");
                                           $("#numbercheck2").html("");
                                           companyNumber=random;
                                           $("#companyNumber").val(random); pass[3]=true;

                                        }
                                     }
                               });
                    }
                }else{
                        $("#numbercheck").html("");
                        $("#numbercheck2").html("이미 등록되어있는 회사입니다.");  pass[3]=false;
                }
            }
        });
    }

    //회사 등록 및 결제 등록
    function requestPay() {

        let check = true;
        let form=$("#signupForm")[0];
        let formData= new FormData(form);

        for(let i = 0; i<pass.length; i++){
            if(pass[i] == false){
                check =false;
            }
        }
        if(check){
        let price=$("#price").val();
        let companyName=$("#companyName").val();
        realPrice="";
        productInfo="";
        if(price==1){
            realPrice=30000;
            productInfo="기본 표 제공";
        }else if(price ==2){
            realPrice=60000;
             productInfo="기본 표 + 차트 제공";
        }else if(price==3){
            realPrice=90000;
             productInfo="기본 표 + 차트 + 데이터 제공";
        }else{
            alert("가격을 선택하여 주십시오.");
        }
         var IMP = window.IMP; // 생략 가능
         IMP.init("imp70174656"); // 예: imp00000000
             // IMP.request_pay(param, callback) 결제창 호출
                  IMP.request_pay({ // param
                      pg: "html5_inicis",
                      pay_method: "card",
                      merchant_uid: "ORD20180131-0000011",
                      name: productInfo,
                      amount: realPrice,
                      buyer_email: "",
                      buyer_name: companyName,
                      buyer_tel: "",
                      buyer_addr: "",
                      buyer_postcode: ""
                  }, function (rsp) { // callback
                      if (rsp.success) { //결제 성공 시

                      } else {  //결제 실패 시 ( 결제가 실제로 이루어지지 않기때문에 이쪽에 데이터전송)
                        $.ajax({
                                url:"/company/signup",
                                method:"POST",
                                data:formData,
                                processData:false,
                                contentType:false,
                                success:function(data){
                                    if(data==true){
                                         location.href="/page/company/success/"+companyNumber;
                                         $("#signupcheck2").html("");
                                    }else{
                                        $("#signupcheck2").html("알수없는 이유로 결제가 실패되었습니다.다시한번 시도하여주십시오. 반복적으로 결제 실패할 경우  관리자에게 문의해 주십시오.");
                                    }
                                }
                        });
                      }
                  });
        }else{
            alert("필수 입력 사항이 모두 입력되지 않았습니다.");
        }
   }