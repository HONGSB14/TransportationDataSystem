//회사 세션값 가져오기
let session="";
$.ajax({
      url:"/sale/getSession",
      async:false,
      success: function(data){
        session=data.companyNumber;
     }
});
//검색 날짜 가져오기
let searchDate="";
$.ajax({
      url:"/sale/getDate",
      async:false,
      success: function(data){
        searchDate=data.searchDate;
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
let slipNumberBox=[];
let updateNumberBox=[];
let uFlux=[];
let uFee=[];
let uCardFee=[];
let uTotalSale=[];
let uCarNumber=[];
let uNote=[];
//테이블 뷰 함수 실행
 tableView();
$(function(){

    //오늘날짜
    $("#searchDateCheck").html( "<h6>"+searchDate+"</h6>");
    //날짜 검색
    $("#dateChoice").html("<input class='form-control' type='date' name='date' id='date' min="+beforeDate+" max="+yesterday+">");

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

});//전체 문서 끝

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
                "note":$("#note").val(),
                "date":searchDate,
            };
            //등록
    	    $.ajax({
    	        url:"/sale/registrationDate",
    	        method:"GET",
    	        contentType:"json",
    	        data:{"slipForm":JSON.stringify(slipForm)},
    	        success:function(data){
    	            console.log(data);
    	            if(data==true){
    	                  $("#registrationCheck2").html("");
                          $("#registrationCheck").html("등록되었습니다.");
                          location.reload();
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



//모든 값 제거 함수
function valuesClear(){
     $("#carNumber").val("");
     $("#flux").val("");
     $("#fee").val("");
     $("#cardFee").val("");
     $("#totalSale").val("");
     $("#note").val("");
}


//검색 날짜 테이블 뷰
function tableView(){
        $.ajax({
                url:"/sale/dateSearchTable",
                data:{"searchDate":searchDate,"companyNumber":session},
                success: function(data){
                        let html="";
                            for(let i=0; i<data.length; i++){
                                let searchDay=data[i].date;
                                let yyMMdd=searchDay.split(" ")[0];
                                html +=
                                              '<tr onclick="updateClick('+data[i].slipNumber+')">'+
                                              		'<td><input class="form-check-input" type="checkbox" value="checkbox" name="saleCheckBox" id="saleCheckBox'+data[i].slipNumber +'" onclick=" deleteCheck('+data[i].slipNumber+')"></td>'+
                                              		'<td><input class="form-control" type="text" value="'+data[i].carNumber+'" name="uCarNumber" id="uCarNumber'+i+'"></td>'+
                                              		'<td><input class="form-control" type="text" value="'+data[i].flux+'" name="uFlux" id="uFlux'+i+'"></td>'	+
                                              		'<td><input class="form-control" type="text" value="'+data[i].fee+'" name="uFee" id="uFee'+i+'"></td>'+
                                              		'<td><input class="form-control" type="text" value="'+data[i].cardFee+'" name="uCardFee" id="uCardFee'+i+'"></td>'+
                                              		'<td><input class="form-control" type="text" value="'+data[i].totalSale+'" name="uTotalSale" id="uTotalSale'+i+'"></td>'+
                                              		'<td><input class="form-control" type="text" value="'+data[i].note+'" name="uNote" id="uNote'+i+'"></td>'+
                                              		'<td><input class="form-control text-center" type="text" value="'+yyMMdd+'" name="uDate" id="uDate" disabled="disabled"></td>'+
                                             '</tr>';

                            }
                             $("#searchTable").append(html);
                        }
        });
}


//체크 박스 함수
function deleteCheck(slipNumber){

let boxId= "saleCheckBox"+slipNumber;
let check=$('input:checkbox[id='+boxId+']').is(":checked") == true

	if(check==true){
	     slipNumberBox.push(slipNumber);
	}else{
		for(let i=0; i<slipNumberBox.length; i++){
			if(slipNumberBox[i]===slipNumber){
			    slipNumberBox.splice(i,1);
			}
		}
	}
}
//삭제 버튼 클릭 시
function saleDelete(){

	let window=confirm("정말 삭제를 진행하시겠습니까?");
    if(window){
    		$.ajax({
    					url:"/sale/saleDelete",
    					method:"DELETE",
    					data:{"companyNumber":session,"slipNumber":slipNumberBox},
    					success:function(data){
    					console.log(data);
    						if(data==true){
    							 slipNumberBox.splice(0, slipNumberBox.length);
                                 location.reload();
    						}else{
    							alert("삭제진행 오류가 발생하였습니다. 관리자에게 문의해주십시오.");
    						}
    				    }
    			});
    }else{
        return;
    }

}
//검색버튼 클릭 시
function dateRegistrationSearch(){
     let searchDate=$("#date").val();
     location.href="/page/sale/searchRegistration/"+searchDate;
}

//업데이트 버튼
function saleUpdate(){

	for(let i=0; i<updateNumberBox.length; i++){

		uCarNumber.push( $("#uCarNumber"+i).val() );
		uFlux.push( $("#uFlux"+i).val() );
		uFee.push( $("#uFee"+i).val() );
		uCardFee.push( $("#uCardFee"+i).val() );
		uTotalSale.push( $("#uTotalSale"+i).val() );
		uNote.push( $("#uNote"+i).val() );

	}
	let uDate=$("#uDate").val();
        console.log(uCarNumber);
        console.log(uFlux);
        console.log(uFee);
        console.log(uCardFee);
        console.log(uTotalSale);
        console.log(uNote);
		for(let i=0; i<updateNumberBox.length; i++){

		$.ajax({
				url:"/sale/update",
				method:"PUT",
				data:{"slipNumber":updateNumberBox[i],"companyNumber":session,"date":uDate,"carNumber":uCarNumber[i],"fee":uFee[i],"cardFee":uCardFee[i],"note":uNote[i],"flux":uFlux[i],"totalSale":uTotalSale[i]},
				async:false,
				success:function(data){
					if(data==true){
						updateNumberBox.splice(0,updateNumberBox.length);
					}else{
						alert("수정진행 오류가 발생하였습니다. 관리자에게 문의해주십시오.");
					}
				}
			});
		}
		     alert("선택하신 항목이 수정 완료되었습니다.");
			slipNumberBox.splice(0,slipNumberBox.length);
			//location.reload();
}

//클릭 시 pk 번호 가져오기
function updateClick(slipNumber){
	updateNumberBox.push(slipNumber);

}
