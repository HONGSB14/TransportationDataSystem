//회사 세션값 가져오기
let session="";
$.ajax({
      url:"/driver/getSession",
      async:false,
      success: function(data){
        session=data.companyNumber;
     }
});
let driverNumberBox=[];
$(function() {
    //운전자 리스트
    driverList();

});//문서 끝


function driverSignup(){
     $.ajax({

            url:"/driver/driverSignup",
            method:"POST",
            data:{"companyNumber":session ,"driverName":$("#driverName").val() ,"driverNote":$("#driverNote").val()},
            success: function(data){
                if(data){
                    location.reload();
                }else{
                     $("#driverCheck2").html("등록이 실패되었습니다. 다시한번 시도하여 주십시오.");
                }
            }
    });
}

function driverList(){

    $.ajax({
        url:"/driver/driverList",
        data:{"companyNumber":session},
        success: function(data){
               let html="";
               for(let i=0; i<data.length; i++){
                    html += '<tr>'+
                                            '<td><input type="checkbox" class="form-check-input text-center" id="checkBox'+data[i].driverNumber+'" onclick="deleteCheckBox('+data[i].driverNumber+')"></td>'+
                                          '<td>'+data[i].driverNumber+'</td>'+
                                           '<td>'+data[i].name+'</td>'+
                                            '<td>'+data[i].note+'</td>'+
                                            '<td>'+data[i].date+'</td>'+
                                '</tr>';
               }
               $("#driverList").append(html);
        }
    });
}

function deleteCheckBox(driverNumber){

let boxId="checkBox"+driverNumber;
let check=$('input:checkbox[id='+boxId+']').is(":checked") == true

	if(check==true){
	     driverNumberBox.push(driverNumber);
	}else{
		for(let i=0; i<driverNumberBox.length; i++){
			if(driverNumberBox[i]===driverNumber){
			  driverNumberBox.splice(i,1);
			}
		}
	}
	console.log(driverNumberBox);
}

///차량 삭제
function driverDelete(){

    let window=confirm("정말 삭제를 진행하시겠습니까?");
    if(window){
           $.ajax({
                        url:"/driver/driverDelete",
                        method:"delete",
                        data:{"driverNumber":driverNumberBox},
                        success: function(data){
                        console.log(data);
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
