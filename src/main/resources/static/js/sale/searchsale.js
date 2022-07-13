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

//삭제 및 수정 배열 담기
let slipNumberBox=[];
let updateNumberBox=[];
let uFlux=[];
let uFee=[];
let uCardFee=[];
let uTotalSale=[];
let uCarNumber=[];
let uNote=[];
//테이블 뷰 실행
tableView();
$(function(){

   $("#searchDateCheck").html( "<h6>"+searchDate+"</h6>"+"<span>회사번호: "+session+"</span>");
   $("#dateChoice").html("<input class='form-control' type='date' name='date' id='date' min="+beforeDate+" max="+yesterday+">");

});
//테이블 뷰
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
function dateSearch(){
     let searchDate=$("#date").val();
     location.href="/page/sale/searchSale/"+searchDate;
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
			location.reload();
}

//클릭 시 pk 번호 가져오기
function updateClick(slipNumber){
	updateNumberBox.push(slipNumber);

}