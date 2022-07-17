 //회사 세션값 가져오기
     let session="";
      $.ajax({
       url:"/sale/getSession",
       async:false,
       success: function(data){
          session=data.companyNumber;
       }
    });

    //각회사의 차량 정보 가져오기
	$.ajax({

		url:"/car/getCarInfo",
		data:{"companyNumber":session},
		async:false,
		success:function(data){
			for(let i=0; i<data.length; i++){
				carNumber.push(data[i]["carNumber"]);
				vehId.push(data[i]["carId"]);
			}
		}
	});
//차량 번호 배열
let carNum=[];
//차량등록 시 아이디 값을 가져와야함
let vehId=[];


$(function(){

     $("#companyNumberCheck").html("<span>회사번호 : "+session+"</span>");
});
