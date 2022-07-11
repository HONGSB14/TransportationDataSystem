    //회사 세션값 가져오기
     let session="";
      $.ajax({
       url:"/sale/getSession",
       async:false,
       success: function(data){
          session=data.companyNumber;
       }
    });
    //날짜
    let date = new Date();
    let year = date.getFullYear();
    let month= ('0' + (date.getMonth() + 1)).slice(-2);
    let day=('0' + date.getDate()).slice(-2);

    //날짜 검색 (전 날짜 생성 현재 날짜 -20년)
    let beforeYear=year-20;
    let beforeDate=beforeYear+"-01-01";
    //현날짜에서 하루 전 까지 검색
     let d = new Date();
     let sel_day = -1;
     d.setDate(d.getDate() + sel_day );
     let dateOne= ('0' + d.getDate()).slice(-2);
     let yesterday=year+"-"+month+"-"+dateOne;

     $(function() {

    $("#companyNumberCheck").html("<span>회사번호 : "+session+"</span>");
    //헤더 월보 표시
    $("#headMonth").html("<h2>월보  "+month + "월</h2>");
    //달력날짜 선택 란
    $("#monthChoice").html("<input class='form-control' type='date' name='date' min="+beforeDate+" max="+yesterday+">");













});