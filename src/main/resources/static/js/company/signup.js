//회사등록 유효성 검사 조건: 모두 true 라면 가입 성공
let pass=[false,false,false,false,false];

$(function(){ //문서 시작

	//가격 선택 란
	$("#selectprice").change(function(){

		let selectprice=$("#selectprice").val();

		if(selectprice=="1" || selectprice=="2" || selectprice=="3"){
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

		let name=$("#companyname").val();
		let namec=/^[0-9,가-힣,A-Z,a-z]{1,20}$/;

		if(namec.test(name)){
		 $("#namecheck2").html("");
		 $("#namecheck").html("가입할 수 있는 회사명 입니다.");	pass[2]=true;



		}else{
			$("#namecheck").html("");
		  $("#namecheck2").html("가입할 수 없는 회사명 입니다.");	pass[2]=false;
		}

	});
	$.ajax({    //db 처리


	});
	 if(pass[2]== true && pass[1]== true){
         $("#cuum").ready(function(){

           const ran=Math.random();
           const random=Math.floor(ran*899999+100000);
            $("#cnum").val(random);
          });
     }
	//결제은행 입력 란
	//신한
	$("#sinhanbank").click(function(){
		pass[3]=true;
		$('input[name="bank"]:checked').val();
	});
	//카카오
	$("#kakaobank").click(function(){
		pass[3]=true;
		$('input[name="bank"]:checked').val();

	});
	//국민
	$("#kbbank").click(function(){
		pass[3]=true;
		$('input[name="bank"]:checked').val();
	});
	//농협
	$("#nhbank").click(function(){
		pass[3]=true;
		$('input[name="bank"]:checked').val();
	});
	//기업
	$("#ibkbank").click(function(){
		pass[3]=true;
		$('input[name="bank"]:checked').val();
	});
	//하나
	$("#hanabank").click(function(){
		pass[3]=true;
		$('input[name="bank"]:checked').val();
	});
	//우리
	$("#wooribank").click(function(){
		pass[3]=true;
		$('input[name="bank"]:checked').val();
	});
	//수협
	$("#shbank").click(function(){
		pass[3]=true;
		$('input[name="bank"]:checked').val();
	});


	//계좌번호 등록
	$("#account").keyup(function(){

		let account = $("#account").val();
		let accountc= /^[0-9]{12,12}$/;

		if(accountc.test(account)){
			$("#accountcheck2").html("");
			$("#accountcheck").html("사용가능한 계좌번호입니다."); pass[4]=true;
		}else{
			$("#accountcheck").html("");
			$("#accountcheck2").html("사용 할 수 없는 계좌번호입니다."); pass[4]=false;
		}
	});
}); //문서 끝 (유효성 검사)

function companySignup(){
    let form=$("")
	let check = true;

	for(let i = 0; i<pass.length; i++){

		if(pass[i] == false){
			check =false;
		}
	}
	if(check){

		    $.ajax({
		          data:"",
		          url:"",
		          success: function(data){
		          }
		    });
	}else{
		alert("필수 입력 사항이 모두 입력되지 않았습니다.")
	}
}

/* 아임포트 API = 결제API */
function payment(){
	var IMP = window.IMP;
	IMP.init("imp35631338"); // [본인]관리자 식별코드 [ 관리자 계정마다 다름]
    IMP.request_pay({ // 결제 요청변수
	    pg: "html5_inicis",	// pg사 [ 아임포트 관리자페이지에서 선택한 pg사 ]
	    pay_method: 'card',	// 결제방식
	    merchant_uid: "ORD20180131-0000011", // 주문번호[별도]
	    name: "EZEN SHOP", // 결제창에 나오는 결제이름
	    amount: totalpay,	// 결제금액
	    buyer_email: "gildong@gmail.com",
	    buyer_name: '임시이름',
	    buyer_tel: '임시번호',
		  }, function (rsp) { // callback
		      if (rsp.success) { // 결제 성공했을때 -> 주문 완료 페이지로 이동 []
		      } else {
				saveorder(); // 결제 실패 했을때 -> 테스트 할시에는 이부분 활용
		      }
	  });
}
// 주문 처리 메소드
function saveorder(){
	alert("DB처리시작");
	$.ajax({
		url : "saveorder",
		success : function( re ){
			alert("DB처리 성공")
		}
	});
}