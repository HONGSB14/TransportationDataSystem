//회사 세션값 가져오기
let session="";
$.ajax({
      url:"/sale/getSession",
      async:false,
      success: function(data){
        session=data.companyNumber;
     }
});

//날짜
let date = new Date();
let year = date.getFullYear();
let month= ('0' + (date.getMonth() + 1)).slice(-2);
let day=('0' + date.getDate()).slice(-2);
let today=year+"-"+month+"-"+day;
//날짜 검색 (전 날짜 생성 현재 날짜 -20년)
let beforeYear=year-20;
let beforeDate=beforeYear+"-01-01";
//현날짜에서 하루 전 까지 검색
let d = new Date();
let sel_day = -1;
d.setDate(d.getDate() + sel_day );
let dateOne= ('0' + d.getDate()).slice(-2);
let yesterday=year+"-"+month+"-"+dateOne;
//유효성 검사
let pass=[false,false,false,false];
//삭제 및 수정 배열 담기
let companyNumber=[];
let uFlux=[];
let uFee=[];
let uCardFee=[];
let uTotalSale=[];
let uCarNumber=[];
let uNote=[];

$(function(){


    //오늘날짜
    $("#today").html("<h6>"+today+"</h6");
    //날짜 검색
    $("#monthChoice").html("<input class='form-control' type='date' name='date' min="+beforeDate+" max="+yesterday+">");

    //입력 유효성 검사 및 컴마 생성

    //차번호 유효성검사
    $("#carNumber").keyup(function(){

        let carNumber =$("#carNumber").val();

        let carNumberCheck=/^([가-힣]{2,2})([0-9]{2,3})([가-힣]{1,1})([0-9]{4,4})$/;

        if( carNumberCheck.test(carNumber)){
            pass[0]=true;
        }else{
            pass[0]=false;
        }
    });

	//유량
	$("#flux").keyup(function(){
		//키에 입력되는 값 flux 변수에 입력
		let flux =$("#flux").val();
		//천단위 쉼표 제거
		flux=flux.replace(/,/g, "");
		//천단위 쉼표 생성변수
		let fluxComma =flux.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		//flux 에 쉼표생성변수 입력
		$("#flux").val(fluxComma);
		//유효성 검사
		let fluxCheck=/^([1-9]{1,1})([0-9]*)$/;
		let fluxCheck2="0";

		if(fluxCheck.test(flux)|| fluxCheck2==flux){
			pass[1]=true;

		}else{
			pass[1]=false;
		}
	});

    //실입요금
	$("#fee").keyup(function(){

		let fee =$("#fee").val();
		fee=fee.replace(/,/g, "");
		let feeComma=fee.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		$("#fee").val(feeComma);

		let feeCheck=/^([1-9]{1,1})([0-9]*)$/;
		let feeCheck2="0";


		if(feeCheck.test(fee)|| feeCheck2==fee){
			pass[2]=true;
		}else{
			pass[2]=false;
		}

	});

	//카드요금
	$("#cardFee").keyup(function(){

		let cardFee =$("#cardFee").val();

		cardFee=cardFee.replace(/,/g, "");
		let cardFeeComma=cardFee.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		$("#cardFee").val(cardFeeComma);

		let cardFeeCheck=/^([1-9]{1,1})([0-9]*)$/;
		let cardFeeCheck2="0";


		if( cardFeeCheck.test(cardFee)||cardFeeCheck2==cardFee){
			pass[3]=true;
		}else{
			pass[3]=false;
		}

	});

    //총 매출
	$("#totalSale").focus(function(){

		//실입요금 컴마제거
		let fee=$("#fee").val();
		feeCheck= fee.replace(/,/g, "");

		//카드요금 컴마제거
		let cardFee=$("#cardFee").val();
		cardFeeCheck=cardFee.replace(/,/g, "");

		//더하기 연산을 하기 위해 숫자로 변환
		let feeSum=parseInt(feeCheck);
		let cardSum=parseInt(cardFeeCheck);
		let sum=feeSum+cardSum;

		//연산한 값을 다시 문자열로 변환
		let sumSum=String(sum);

		//천단위컴마 실행
		let sumComma=sumSum.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

		if(sumComma=="NaN"){    //만약 계산결과값이 없다면
		    $("#totalSale").val("");
		}else{
			//컴마를 daysale에 삽입
        	$("#totalSale").val(sumComma);
		}

	});


});//문서종료


function saleCheck(){
    	//유량 컴마제거
    	let flux=$("#flux").val();
    	fluxCheck=flux.replace(/,/g, "");
    	$("#flux").val(fluxCheck);

    	//실입요금 컴마제거
    	let fee=$("#fee").val();
    	 feeCheck= fee.replace(/,/g, "");
    	$("#fee").val(feeCheck);

    	//카드요금 제거
    	let cardFee=$("#cardFee").val();
    	cardFeeCheck=cardFee.replace(/,/g, "");
    	$("#cardFee").val(cardFeeCheck);

    	//총 매출 컴마제거
    	let totalSale=$("#totalSale").val();
    	totalSaleCheck=totalSale.replace(/,/g, "");
    	$("#totalSale").val(totalSaleCheck);


    	//기본 체크값 true 로 설정
    	let check = true;

    	for(let i = 0; i<pass.length; i++){

    		if(pass[i] == false){
    			check = false;
    		}
    	}
    	if(check){  //유효성 검사를 통과했다면
            //전표 객체 생성
            let slipForm={
               "companyNumber":session,
                "carNumber":$("#carNumber").val(),
                "flux":$("#flux").val(),
                "fee":$("#fee").val(),
                "cardFee":$("#cardFee").val(),
                "totalSale":$("#totalSale").val(),
                "note":$("#note").val()
            };
            //등록
    	    $.ajax({
    	        url:"/sale/registration",
    	        method:"GET",
    	        contentType:"json",
    	        data:{"slipForm":JSON.stringify(slipForm)},
    	        success:function(data){
    	            console.log(data);
    	            if(data==true){
    	                  $("#registrationCheck2").html("");
                          $("#registrationCheck").html("등록되었습니다.");
    	                  valuesClear();

    	            }else{
    	                 $("#registrationCheck").html("");
                         $("#registrationCheck2").html("등록하신 차량번호를 다시한번 확인해주십시오.");
    	            }
    	        }
    	    });
    	}else{
    	     valuesClear();
    		$("#registrationCheck2").html("등록할 수 없는 형식입니다.");
    	}
}
//모든 값 제거
function valuesClear(){
     $("#carNumber").val("");
     $("#flux").val("");
     $("#fee").val("");
     $("#cardFee").val("");
     $("#totalSale").val("");
     $("#note").val("");
}

