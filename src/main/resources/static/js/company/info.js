$(function(){
   let html="";
   //회사 정보
    $.ajax({
        url:"/company/info",
        method:"POST",
        success:function(company){
        let priceInfo="";
        //가격에 따른 가격 안내
        if(company.price==1){
             priceInfo="( 월 ) 30,000 원 ( 매출 표 제공 )";
        }else if (company.price==2){
            priceInfo="( 월 ) 60,000 원 ( 매출 표 + 매출 차트 제공 )";
        }else{
             priceInfo="( 월 ) 90,000 원 (매출 표 + 매출 차트 제공 + 데이터 제공)";
       };
          html += '<div class="text-center py-4">'+
                               '<h3>Thank You!! '+company.companyName+' </h3>'+
                         '</div>'+
                         '<div class="py-3">'+
                              '<h1>결제를 성공적으로 마쳤습니다.</h1>'+
                         '</div>'+
                         '<div class="col-md-12 text-center">'+
                                 '<div class="text-center" style="background: #FFFFCC;">'+
                                     '<h2> 회사 가입 정보 </h2>'+
                                 '</div>'+
                                 '<div class="py-5">'+
                                     '회사명 : '+company.companyName+
                                     '<br><br>'+
                                     '가입 등록 번호 :'+company.companyNumber+
                                     '<br><br>'+
                                     '결제 타입 :'+priceInfo+
                                 '</div>'+
                                 '<div class="offset-5 col-md-2">'+
                                     '<a href="/"><button class="form-control">홈으로</button></a>'+
                                 '</div>'+
                            '</div>'+
                        '</div>';
          $("#info").html(html);
        }
    });
});