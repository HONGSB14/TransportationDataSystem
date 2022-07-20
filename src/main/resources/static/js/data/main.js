 //회사 세션값 가져오기
     let session="";
      $.ajax({
       url:"/sale/getSession",
       async:false,
       success: function(data){
          session=data.companyNumber;
       }
    });
let tmX="";
let tmY="";
let plainNo="";
$(function(){

     $("#companyNumberCheck").html("<span>회사번호 : "+session+"</span>");
     //지도 생성
     map();
});

function map(){

///////////////////////////////////////////////지도 생성///////////////////////////////////////////////////
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div
		 mapOption = {
			 center: new kakao.maps.LatLng(), // 지도의 중심좌표
			 level: null // 지도의 확대 레벨
		};

	// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
	var map = new kakao.maps.Map(mapContainer,mapOption);

	///////////////////////////////////////////마커생성//////////////////////////////////////////////////////////
	var imageSrc = "/img/taximaker2.png", // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(30, 39), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	// 마커가 표시될 위치입니다
	var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
	    markerPosition  = new kakao.maps.LatLng();

	// 마커를 생성합니다

	var marker = new kakao.maps.Marker({
	    position: markerPosition,
  		image: markerImage,
  		 clickable: true
	});

	marker.setMap(map);

	///////////////////////////////////////////////////////////버스 위치 ////////////////////////////////////////////


	setInterval(function(){
	//차량 번호 만큼 반복문 (다수 차량 지도 표시를 위해 )
		$.ajax({
			url:"/car/carInfo",
			method:"GET",
			data:{"companyNumber":session},
			success:function(data){
			console.log(data);
			console.log(data[0].tmX);
				if(data){
		            for(let i=0; i<data.length; i++){

		                	//데이터에서 좌표 불러오기  (타코미터 저장용)
                        	tmX=data[i].tmX;
                        	tmY=data[i].tmY;
                            planNo=data[i].plainNo;
                            //좌표를 먼저 합치고 형태:( 736733673,13551331)
                            let coordinate=tmY+","+tmX;

                                        //좌표 값 DB에 저장
                                        $.ajax({
                                            url:"/location/locationData",
                                            data:{"coordinate":coordinate ,"carNumber":plainNo , "companyNumber":session},
                                            method:"GET",
                                            success:function(setData){
                                                    if(setData){
                                                        console.log("좌표입력완료");
                                                    }else{
                                                        console.log("좌표입력실패");
                                                    }
                                                }
                                        });
		           }
                    //맵 생성
					mapOption = {
							center: new kakao.maps.LatLng(tmY, tmX), // 지도의 중심좌표
							level: 2 // 지도의 확대 레벨
					};

					map = new kakao.maps.Map(mapContainer, mapOption);


					//마커 생성
					maker= new kakao.maps.Marker ({

							position: new kakao.maps.LatLng(tmY,tmX),
							image: new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
							map:map
					});
				}else{
					console.log("에러가 났어요~!");
				}
			}
		});
	},10000);

}