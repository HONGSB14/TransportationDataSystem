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
    //마커저장배열
	let markers=[];
///////////////////////////////////////////////지도 생성///////////////////////////////////////////////////
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div
		 mapOption = {
			 center: new kakao.maps.LatLng(37.49311801652184, 126.8372818518843), // 지도의 중심좌표
			 level: 5 // 지도의 확대 레벨
		};

	// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
	var map = new kakao.maps.Map(mapContainer,mapOption);

	///////////////////////////////////////////마커생성//////////////////////////////////////////////////////////
	var imageSrc = "/img/taximaker2.png", // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(30, 39), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  ///////////////////////////////////////////////////////////버스 위치 ////////////////////////////////////////////


	setInterval(function(){
		//마커 제거
    	for (var i = 0; i < markers.length; i++) {
    	        markers[i].setMap(null);
    	}
    	markers=[];
       console.log(markers);
		$.ajax({
			url:"/car/carInfo",
			method:"GET",
			data:{"companyNumber":session},
			contentType:"application/json; charset:UTF-8",
			success:function(data){

			console.log(data);
				if(data){
		            for(let i=0; i<data.length; i++){

		                	//데이터에서 좌표 불러오기  (타코미터 저장용)
                        	tmX=data[i].tmX;
                        	tmY=data[i].tmY;
                            plainNo=data[i].plainNo;   //***********************한글 인코딩  오류 ( 인텔리 제이 오류)
                            console.log(plainNo);
                            //좌표를 먼저 합치고 형태:( 736733673,13551331)
                            let coordinate=tmY+","+tmX;

                                        //좌표 값 DB에 저장
                                        $.ajax({
                                            url:"/location/locationData",
                                            data:{"coordinate":coordinate ,"carNumber":plainNo, "companyNumber":session},
                                            method:"GET",
                                            success:function(setData){
                                                    if(setData){
                                                        console.log("좌표입력완료");
                                                    }else{
                                                        console.log("좌표입력실패");
                                                    }
                                                }
                                        });

	                //마커 생성
					var marker= new kakao.maps.Marker ({
							position: new kakao.maps.LatLng(data[i].tmY,data[i].tmX),
							image: new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
							map:map
					});
					//마커를 배열에 저장
                    markers.push(marker);
		           }
				}else{
					console.log("에러가 났어요~!");
				}
			}
		});
	},8000);
}

//지도통계 (1주)
function onWeek(){
	//버튼 클릭 시 안내문구 가리기
	$("#info").html("");
	//지도 생성
	var map = new kakao.maps.Map(document.getElementById('mapData'), { // 지도를 표시할 div
			 center : new kakao.maps.LatLng(37.49311801652184, 126.8372818518843), // 지도의 중심좌표
			 level : 10 // 지도의 확대 레벨
	});
	setInterval(function(){
    //json 형태의 데이터 가져오기
		$.ajax({

			url:"/data/weekInfo",
			data:{"companyNumber":session},
			success:function(dataLocation){
                console.log(dataLocation);
				if(dataLocation){
					// 마커 클러스터러 생성
					var clusterer = new kakao.maps.MarkerClusterer({
							 map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
							 averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
							 minLevel: 4 // 클러스터 할 최소 지도 레벨
					});
					//저장용 배열 생성
					let y=[];
					let x=[];
					let markers=[];
					//데이터 생성

					for(let i=0; i<dataLocation.length; i++){

						y[i]=dataLocation[i]["locationY"];
						x[i]=dataLocation[i]["locationX"];
						//마커 생성
						 var marker =new kakao.maps.Marker({
						  position : new kakao.maps.LatLng(y[i], x[i])

						 });
						markers.push(marker);
					};

				      // 클러스터러에 마커들을 추가합니다
				      clusterer.addMarkers(markers);

				}else{
					console.log("error: null");
				}
			}
		});
	},5000);
}


//지도통계 (1달)
function onMonth(){
	//버튼 클릭 시 안내문구 가리기
	$("#info").html("");
	//지도 생성
	var map = new kakao.maps.Map(document.getElementById('mapData'), { // 지도를 표시할 div
			 center : new kakao.maps.LatLng(37.49311801652184, 126.8372818518843), // 지도의 중심좌표
			 level : 10 // 지도의 확대 레벨
	});
	setInterval(function(){
    //json 형태의 데이터 가져오기
		$.ajax({

			url:"/data/monthInfo",
			data:{"companyNumber":session},
			success:function(dataLocation){

				if(dataLocation){

					// 마커 클러스터러 생성
					var clusterer = new kakao.maps.MarkerClusterer({
							 map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
							 averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
							 minLevel: 4 // 클러스터 할 최소 지도 레벨
					});
					//저장용 배열 생성
					let y=[];
					let x=[];
					let markers=[];
					//데이터 생성

					for(let i=0; i<dataLocation.length; i++){

						y[i]=dataLocation[i]["locationY"];
						x[i]=dataLocation[i]["locationX"];
						//마커 생성
						 var marker =new kakao.maps.Marker({
						  position : new kakao.maps.LatLng(y[i], x[i])

						 });
						markers.push(marker);
					};

				      // 클러스터러에 마커들을 추가합니다
				      clusterer.addMarkers(markers);

				}else{
					console.log("error: null");
				}
			}
		});
	},5000);
}


//지도통계 (1년)
function onYear(){
	//버튼 클릭 시 안내문구 가리기
	$("#info").html("");
	//지도 생성
	var map = new kakao.maps.Map(document.getElementById('mapData'), { // 지도를 표시할 div
			 center : new kakao.maps.LatLng(37.49311801652184, 126.8372818518843), // 지도의 중심좌표
			 level : 10 // 지도의 확대 레벨
	});
	setInterval(function(){
    //json 형태의 데이터 가져오기
		$.ajax({

			url:"/data/yearInfo",
			data:{"companyNumber":session},
			success:function(dataLocation){

				if(dataLocation){

					// 마커 클러스터러 생성
					var clusterer = new kakao.maps.MarkerClusterer({
							 map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
							 averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
							 minLevel: 4 // 클러스터 할 최소 지도 레벨
					});
					//저장용 배열 생성
					let y=[];
					let x=[];
					let markers=[];
					//데이터 생성

					for(let i=0; i<dataLocation.length; i++){

						y[i]=dataLocation[i]["locationY"];
						x[i]=dataLocation[i]["locationX"];
						//마커 생성
						 var marker =new kakao.maps.Marker({
						  position : new kakao.maps.LatLng(y[i], x[i])

						 });
						markers.push(marker);
					};

				      // 클러스터러에 마커들을 추가합니다
				      clusterer.addMarkers(markers);

				}else{
					console.log("error: null");
				}
			}
		});
	},5000);
}


