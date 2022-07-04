//회사등록 유효성 검사 조건: 모두 true 라면 가입 성공
let pass=[false,false,false,false];

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
	$("#name").keyup(function(){

		let name=$("#name").val();
		let namec=/^[0-9,가-힣,A-Z,a-z]{1,20}$/;

		if(namec.test(name)){
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
            data:{"crn":$("#crn").val(),"name":$("#name").val()},
            success:function(data){
                if(data == true){
                    if(pass[2]== true && pass[1]== true){
                       const ran=Math.random();
                       const random=Math.floor(ran*899999+100000);
                               $.ajax({
                                    url:"/company/numberCheck",
                                    method:"post",
                                    data:{"cnum":String($("#company_number").val())},
                                    success:function(data){
                                        if(data==true){
                                          $("#btncheck").attr("disabled",true);
                                           $("#numbercheck2").html("");
                                          $("#numbercheck").html("등록 할 수 있는 회사입니다.");
                                          $("#company_number").val(random); pass[3]=true;
                                        }else{
                                               $("#numbercheck").html("");
                                               $("#numbercheck2").html("");
                                              $("#company_number").val(random); pass[3]=false;
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
        for(let i = 0; i<pass.length; i++){
            if(pass[i] == false){
                check =false;
            }
        }
        if(check){

        let price=$("#price").val();
        let name=$("#name").val();
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
                      buyer_name: name,
                      buyer_tel: "",
                      buyer_addr: "",
                      buyer_postcode: ""
                  }, function (rsp) { // callback
                      if (rsp.success) {
                          console.log("결제성공");
                      } else {
                        $.ajax({
                                url:"/company/signup",
                                method:"POST",
                                data:"",
                                success:function(data){
                                }
                        });
                         console.log("결제실패");
                      }
                  });
        }else{
            alert("필수 입력 사항이 모두 입력되지 않았습니다.")
        }
   }