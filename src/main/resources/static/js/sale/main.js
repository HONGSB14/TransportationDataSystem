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
     let sel_dmy = -1;
     d.setDate(d.getDate() + sel_dmy);
     let dateOne= ('0' + d.getDate()).slice(-2);
     let yesterday=year+"-"+month+"-"+dateOne;
     //현 날짜에서 한달 전 까지 검색
     d.setMonth(d.getMonth() + sel_dmy );
     let  lastMonth   = ('0' + (d.getMonth() +  1 )).slice(-2);
     //현날짜에서  작년 구하기
     d.setFullYear(d.getFullYear() + sel_dmy );
     let lastYear=d.getFullYear();
     //매출 리스트 담기 용 배열
       //week
       let saleList =[];
       let saleDate=[];
       //month
       let lastMonthList=[];
       let lastMonthDate=[];
       let todayMonthList=[];
       let todayMonthDate=[];
        //year
        let todayYearList=[];
        let todayYearDate=[];
tableDayView();
tableMonthView();
$(function() {

    $("#companyNumberCheck").html("<span>회사번호 : "+session+"</span>");
    //헤더 월보 표시
    $("#headMonth").html("<h2>월보  "+month + "월</h2>");
    //달력날짜 선택 란
    $("#monthChoice").html("<input class='form-control' type='date'  id='date' name='date' min="+beforeDate+" max="+yesterday+">");


    //구글 차트 시각화
    google.charts.load('current', {'packages':['corechart']});

    // 구글 시각화 API가 로딩이 완료되면,
   // 인자로 전달된 콜백함수를 내부적으로 호출하여 차트를 그리는 메소드
    google.charts.setOnLoadCallback(weekChart);
    google.charts.setOnLoadCallback(monthChart);
    google.charts.setOnLoadCallback(yearChart);


});
    ////weekChart (pie)
     function weekChart() {

              $.ajax({
                    url:"/sale/mainDayTableView",
                    data:{"companyNumber":session},
                    async:false,
                    success: function(data){
                            for(let j=0; j<data.length; j++){
                                    let yyMMdd=data[j].date;
                                    let yy=yyMMdd.split("-")[0];
                                    let MM=yyMMdd.split("-")[1];
                                    let dd=yyMMdd.split("-")[2];
                                    let realDay=day-dd;
                                    let weekDay=-24;

                                    if(realDay>=0 && realDay<7 && year==yy && month==MM && realDay>weekDay){

                                                saleList.push(data[j].totalSale);
                                                saleDate.push(data[j].date);
                                    }
                            }
                    }
              });

              // Create the data table.
               var data = new google.visualization.DataTable();
                     data.addColumn('string', 'Topping');
                     data.addColumn('number', 'Slices');

                    let dataRow= [];

			     for(let i=0; i<7; i++){
                     dataRow=[saleDate[i],parseInt(saleList[i])];
                     data.addRow(dataRow);
                }

	      // Set chart options
	      var options = {'title':'',
	                       'width':1650,
	                       'height':1080
	                       };

	      // Instantiate and draw our chart, passing in some options.
	      var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
	      chart.draw(data, options);


	}

    ////MonthChart (line)
    function monthChart() {

                //비교날짜 선언
                 let yearLastMonth=year+"-"+lastMonth;
                 let yearMonth=year+"-"+month;
                       $.ajax({
                               url:"/sale/lineChart",
                               async: false,
                               data:{"companyNumber":session},
                               success: function(data){
                                            console.log(data);
                                         for(let i=0; i<data.length; i++){
                                                let yyMMdd=data[i].date;
                                                let yy=yyMMdd.split("-")[0];
                                                let MM=yyMMdd.split("-")[1];
                                                let dd=yyMMdd.split("-")[2];
                                                let YM=yy+"-"+MM;

                                                if(YM==yearLastMonth){      //데이터가 저번달날짜와 같다면
                                                    lastMonthDate.push(data[i].date);             //비교된 날짜 배열에 담기
                                                    lastMonthList.push(data[i].totalSale);       //비교된 날짜 매출 배열에 담기
                                                }
                                                if(YM==yearMonth){      //데이터가 현재 날짜와 같다면
                                                    todayMonthDate.push(data[i].date);           //비교된 날짜 배열에 담기
                                                    todayMonthList.push(data[i].totalSale);     //비교된 날짜 매출 배열에 담기
                                                }

                                   }
                               }
                        });
                	     // Create the data table.
                	     var data = new google.visualization.DataTable();
                        //이부분때문에 매출기준이 날짜는 고정이고 매출액은 달라서 다르게나와요..
                	     data.addColumn('string', 'yearDate');
                	     data.addColumn('number',month+'월 ');
                	   	 data.addColumn('number' ,lastMonth+'월 ');

                	    let dataRow=[];

                	    for(let i=0; i<todayMonthDate.length; i++) {

                	          let dateDay=todayMonthDate[i].split("-")[2];      //일별
                              dataRow=[dateDay+"",todayMonthList[i],lastMonthList[i]];
                              data.addRow(dataRow);
                		}


                	      // Set chart options
                	      var options = {'title':'',
                                            'left':0,
                	                       'width':1850,
                	                       'height':900};

                	      // Instantiate and draw our chart, passing in some options.
                	      var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
                	      chart.draw(data, options);

    }

    //yearChart (bar)
     function yearChart() {

                $.ajax({
                     url:"/sale/barChart",
                      data:{"companyNumber":session},
                     async:false,
                     success: function(data){

                            for(let i=0; i<data.length; i++){

                                      let yyMMdd=data[i].date;
                                      let yy=yyMMdd.split("-")[0];
                                      let MM=yyMMdd.split("-")[1];
                                       if(year==yy){
                                            todayYearList.push(data[i].totalSale);
                                            todayYearDate.push(data[i].date.split("-")[1]);
                                       }
                             }
                     }
                 });

              // Create the data table.
              var data = new google.visualization.DataTable();

              data.addColumn('string', 'year');
               data.addColumn('number','월 매출');

               let dataRow=[];

                for(let i=0; i<12; i++){
                    let yearDate=todayYearDate[i];
                    dataRow=[yearDate,parseInt(todayYearList[i])];
                    data.addRow(dataRow);
                }
                 // Set chart options
                var options = {'title':'',
                             'left':0,
                	         'width':1850,
                	         'height':900};

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.ColumnChart(document.getElementById('bar_chart'));
                chart.draw(data, options);
     }


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