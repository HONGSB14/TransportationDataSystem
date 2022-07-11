
function findId(){
    $.ajax({
        url:"/member/findId",
        method:"POST",
        data:{"memberName":$("#memberName").val(),"email":$("#email").val()},
        success:function(data){

            if(data.member_name==null){  //만약 찾은 값이 없다면
                    $("#idCheck").html("존재 하지 않는 정보 입니다.");
            }else{
                    let findId=data.member_id;
                    let findName=data.member_name;
                    location.href="/page/member/findIdSuccess/"+findId+"/"+findName;
            }
        }
    });
}


