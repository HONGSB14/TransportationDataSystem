

function findPassword(){
 $.ajax({
           url:"/member/findPassword",
           data:{"memberId":$("#memberId").val() , "memberName":$("#memberName").val()},
           method:"POST",
           success: function(data){
                if(data==true){ //만약 값이 있을 경우

                }else { // 값이 없을 경우

                }
           }
       });


}