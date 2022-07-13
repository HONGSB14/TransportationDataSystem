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
tableDayView();
tableMonthView();
$(function() {

    $("#companyNumberCheck").html("<span>회사번호 : "+session+"</span>");
    //헤더 월보 표시
    $("#headMonth").html("<h2>월보  "+month + "월</h2>");
    //달력날짜 선택 란
    $("#monthChoice").html("<input class='form-control' type='date'  id='date' name='date' min="+beforeDate+" max="+yesterday+">");



});

//검색버튼 클릭 시
function dateSearch(){

     let searchDate=$("#date").val();
     location.href="/page/sale/searchSale/"+searchDate;
}

//월별 일 매출
function tableDayView(){

    $.ajax({
        url:"/sale/mainDayTableView",
        data:{"companyNumber":session},
        success: function(data){
               let html="";
                for(let i=0; i<data.length; i++){
                        let yyMMdd=data[i].date;
                        let yy=yyMMdd.split("-")[0];
                        let MM=yyMMdd.split("-")[1];
                        let dd=yyMMdd.split("-")[2];
                        let  pay=parseInt((data[i].totalSale)-(data[i].totalSale/10));
                            if( year==yy && month==MM ){
                                if(day==dd){
                                           html +=
                                                          '<tr>'+
                                                                 	'<td>'+data[i].date+'</td>'+
                                                                 	'<td>'+data[i].flux.toLocaleString()+'</td>'+
                                                                 	'<td>'+data[i].fee.toLocaleString()+'</td>'+
                                                                 	'<td>'+data[i].cardFee.toLocaleString()+'</td>'+
                                                                 	'<td>'+data[i].totalSale.toLocaleString()+'</td>'+
                                                                 	'<td>'+pay.toLocaleString()+'</td>'+
                                                           '</tr>';
                                }else{
                                           html+=
                                             '<tr>'+
                                                   '<td><a href="/page/sale/searchSale/'+yyMMdd+'">'+yyMMdd+'</a></td>'+
                                                   '<td>'+data[i].flux.toLocaleString()+'</td>'+
                                                   '<td>'+data[i].fee.toLocaleString()+'</td>'+
                                                   '<td>'+data[i].cardFee.toLocaleString()+'</td>'+
                                                   '<td>'+data[i].totalSale.toLocaleString()+'</td>'+
                                                   '<td>'+pay.toLocaleString()+'</td>'+
                                             '</tr>';
                                }
                            }
           }
             $("#daySaleTable").append(html);
        }
    });
}

//월 총 매출

function tableMonthView(){
    $.ajax({
        url:"/sale/mainMonthTableView",
        data:{"companyNumber":session},
        success: function(data){
               let  pay=parseInt((data.totalSale)-(data.totalSale/10));
               let yyMMdd=data.date;
               let yy=yyMMdd.split("-")[0];
               let MM=yyMMdd.split("-")[1];
               let dd=yyMMdd.split("-")[2];
               html="";
                if(year==yy && month==MM){
                      html+=
                                            '<td>'+data.flux.toLocaleString()+'</td>'+
                                            '<td>'+data.fee.toLocaleString()+'</td>' +
                                            '<td>'+data.cardFee.toLocaleString()+'</td>'+
                                            '<td>'+data.totalSale.toLocaleString()+'</td>'	+
                                            '<td colspan="2">'+pay.toLocaleString()+'</td>';
                }
                $("#monthSaleTable").append(html);
        }
    });
}