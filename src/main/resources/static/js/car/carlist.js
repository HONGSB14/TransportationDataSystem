let session="";
$.ajax({
      url:"/car/getSession",
      async:false,
      success: function(data){
        session=data.companyNumber;
     }
});

let carIdBox=[];
$(function(){

    //승인 차량 리스트
    carList();


}); //문서 끝


function carList(){
   //승인차량 리스트
    $.ajax({
        url:"/car/getCarList",
        data:{"companyNumber":session},
        success: function(data){
        console.log(data);
            let html="";
            if(data != null){
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