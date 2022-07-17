let session="";
$.ajax({
      url:"/car/getSession",
      async:false,
      success: function(data){
        session=data.companyNumber;
     }
});

let getApproveCarId="";


$(function(){

    //DB에 저장되어있는 차량 번호 불러오기
    selectCarNumber();

    //승인차량 리스트
    $.ajax({
        url:"/car/getCarList",
        data:{"companyNumber":session},
        success: function(data){
            let html="";
            if(data!=null){
                      console.log(data);
                for(let i=0; i<data.length; i++){

                       html +=		   '<tr>' +
                                                        '<td><input type="checkbox" class="form-check-input text-center" id="deleteCar" value="'+data[i].carNumber+'"></td>'+
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


