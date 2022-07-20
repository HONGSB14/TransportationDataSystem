 //회사 세션값 가져오기
     let session="";
      $.ajax({
       url:"/sale/getSession",
       async:false,
       success: function(data){
          session=data.companyNumber;
       }
    });
//차량 번호 배열
let carNumber=[];
//차량등록 시 아이디 값을 가져와야함
let vehId=[];

    //각회사의 차량 정보 가져오기
	$.ajax({

		url:"/car/getCarInfo",
		method:"GET",
		data:{"companyNumber":session},
		async:false,
		success:function(data){
		console.log(data);
		    	for(let i=0; i<data.length; i++){
            				carNumber.push(data[i].carNumber);
            				vehId.push(data[i].carId);
            		}
		}
	});


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
	for(let i=0; i<carNumber.length;i++){
		$.ajax({
																																								   //차량 아이디 vehId[i]//차량 아이디값 변수를 이용하여 등록  111033115
			url:"http://ws.bus.go.kr/api/rest/buspos/getBusPosByVehId?serviceKey=V1D0RoBJCl1PTrNrdovcJHzbZkwiiyLMbHx%2FsQfaQfsvS0iIM3OQ2x91yr6PXyIFl0hj0ETaeC1Fvd0WoSMHmg%3D%3D&vehId="+vehId[i],
			method:"GET",
			dataType:"TEXT",
			success:function(data){
				if(data){
					console.log(data);
					$(data).find('itemList').each(function(){
						//데이터에서 좌표 불러오기  (타코미터 저장용)
						let tmX= $(this).find("tmX").text();
						let tmY= $(this).find("tmY").text();
						let plainNo=$(this).find("plainNo").text();
						//차량번호 데이터로 for문
						for(let i=0; i<carNumber.length; i++){
						//좌표를 먼저 합치고 형태:( 736733673,13551331)
						let coordinate=tmY+","+tmX;
							//차량번호 유효성 검사
							if(carNumber[i]==plainNo){
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
									$("#map").html("");
									$("#mapinfo").html("현재 등록한 차량이 존재하지 않습니다. 다시한번 확인해 주십시오.");
								}
							};
					});
				}else{
					console.log("에러가 났어요~!");
				}
			}
		});
		}
	},10000);

}