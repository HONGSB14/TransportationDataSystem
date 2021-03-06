let session="";
$.ajax({
      url:"/car/getSession",
      async:false,
      success: function(data){
        session=data.companyNumber;
     }
});
//승인 차량 아이디 전역변수
let getApproveCarId="";
//삭제 및 수정 배열담기
let carIdBox=[];
$(function(){

    //DB에 저장되어있는 차량 번호 불러오기
    selectCarNumber();
    //승인 차량 리스트
    carList();
    //승인가능한 차량 리스트
    approveCarList();

}); //문서 끝


//DB에 저장되어있는 차량 번호 불러오기
function selectCarNumber(){

    $.ajax({
        url:"/car/selectCarNumber",
        method:"GET",
        async:false,
        success: function(data){

            let html ="";
            for(let i=0; i<data.length; i++){
                html += '<option value="'+data[i].approveCarNumber+'">'+data[i].approveCarNumber+'</option>';
            }
             $("#selectCarNumber").html(html);
        }
    });
}

//차량 등록
function carRegistration(){

     $.ajax({
         url:"/car/getApproveCarId",
         method:"post",
         data:{"approveCarNumber":$("#selectCarNumber").val()},
         async:false,
         success: function(data){
              getApproveCarId=data.approveCarId;
         }
     });

 //객체 생성
    let carList={
        companyNumber:session,
        carNumber:$("#selectCarNumber").val(),
        carId:getApproveCarId,
        type:$("#selectCarType").val(),
        carName:$("#carName").val(),
        fuelType:$("#selectFuel").val()
    };
    $.ajax({
        url:"/car/carRegistration",
        data:{"carList":JSON.stringify(carList)},
        success: function(data){
                if(data){
                     $("#carRegistrationCheck").html("");
                     location.reload();
                }else{
                    $("#carRegistrationCheck").html("차량등록을 실패하였습니다. 다시한번 확인해 주십시오.");
                }
        }
    });
}


function carList(){
   //승인차량 리스트
    $.ajax({
        url:"/car/getCarList",
        data:{"companyNumber":session},
        success: function(data){
            let html="";
            if(data!=null){
                for(let i=0; i<data.length; i++){

                       html +=		   '<tr>' +
                                                        '<td><input type="checkbox" class="form-check-input text-center" id="checkBox'+data[i].carId+'" onclick="deleteCheckBox('+data[i].carId+')"></td>'+
                                                      '<td>'+data[i].carNumber+'</td>'+
                                                      '<td>'+data[i].type+'</td>'+
                                                     '<td>'+data[i].carName+'</td>'+
                                                     '<td>'+data[i].fuelType+'</td>'
                                               '</tr>';

                }
                $("#carList").append(html);
            }else{
                      html +='<tr>현재 등록되어있는 차량이 존재하지 않습니다.</tr>';
                      $("#carList").html(html);
            }
        }
    });

}

//  승인가능한 차량 리스트
function approveCarList(){

    $.ajax({

         url:"/car/approveCarList",
         success: function(data){
               html="";
               for(let  i=0; i<data.length; i++){
                    html +=         '<tr>'+
                           						'<td>'+data[i].approveCarNumber+'</td>'+
                           						'<td>'+data[i].approveCarId+'</td>'+
                           					'</tr>';
               }
               $("#approveCarList").append(html);
         }
    });

}

function deleteCheckBox(carId){

let boxId="checkBox"+carId;
let check=$('input:checkbox[id='+boxId+']').is(":checked") == true

	if(check==true){
	     carIdBox.push(carId);
	}else{
		for(let i=0; i<carIdBox.length; i++){
			if(carIdBox[i]===carId){
			    carIdBox.splice(i,1);
			}
		}
	}
}
///차량 삭제
function carDelete(){
console.log(carIdBox);
    let window=confirm("정말 삭제를 진행하시겠습니까?");
    if(window){
           $.ajax({
                        url:"/car/carDelete",
                        method:"delete",
                        data:{"carId":carIdBox},
                        success: function(data){
                                if(data){ //차량 삭제가 됬다면
                                    location.reload();
                                }else{
                                    alert("알 수 없는 이유로 삭제가 실패되었습니다. 계속 오류가 발생하는경우 관리자에게 문의하십시오.");
                                }
                        }
                   });
    }else{
        return;
    }
}
