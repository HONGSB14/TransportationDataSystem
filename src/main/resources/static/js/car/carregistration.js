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


}); //문서 끝


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

        }
    });
}


