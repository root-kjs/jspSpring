
console.log( 'map.js open');
/*
    [ APP KEY 발급 ]
    1. https://developers.kakao.com/
    2. 로그인( 회원가입 ) , 최초 로그인시 부가정보 입력
    3. 상단 메뉴 -> [앱] 클릭 -> [앱 생성]
    4.
        앱이름 : springweb(아무거나)
        회사명 : 개발테스트(아무거나)
        카테고리 : 교육(아무거나)
        동의여부 체크 
        [생성]
    5. 생성된 앱 클릭 -> 대시보드 접속
    6. 사이드바메뉴 -> [앱]->[일반]-> 중간 스크롤 쯤에 
        '앱 키' 확인 가능.  * JS 카카오지도 사용시 에는 'JavaScript 키' 사용한다.
    7. '플랫폼' Web 주소 등록 -> [Web 플랫폼 등록]
        http://localhost:8080
        http://192.168.40.185:8080
        * 추후에 배포단계에서는 실제 존재하는 도메인 또는 클라우드 ip를 등록한다.
    8. 사이드바메뉴 -> [카카오맵]
        사용 설정 -> 활성화(ON) , * 계정마다 카카오지도 1개만 활성화 가능 *

    [ KAKAO 지도 ]
    1. https://apis.map.kakao.com/
    2. [WEB] 클릭 -> 왼쪽 메뉴 -> [Guide] -> 시작하기

*/

// [1] 간단한 주소 출력 
const kakaoMap1 = async () => {
    // (1) 지도를 담을 영역의 DOM 레퍼런스
    var container = document.getElementById('map'); 
    // (2)지도를 생성할 때 필요한 기본 옵션
    var options = { 
        center: new kakao.maps.LatLng( 37.4905335508 , 126.7244907601 ), //지도의 중심좌표. 부평역 37.4905335508 ,  126.7244907601 
        level: 5 //지도의 레벨(확대, 축소 정도) // 0(확대)~14(축소)
    };
    // (3) 지도 생성 및 객체 리턴
    var map = new kakao.maps.Map(container, options);
} // func end 
// kakaoMap1(); // 예제1


// [2] 클릭한 위치에 마커 표시하기 , https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
const kakaoMap2 = async () => {
    // 1. // 지도를 표시할 div 
    var mapContainer = document.getElementById('map'), 
    mapOption = { center: new kakao.maps.LatLng(33.450701, 126.570667),  level: 3 }; // 지도의 확대 레벨
    // 2. 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption); // 
    // 3. 지도를 클릭한 위치에 표출할 마커입니다 // 지도 중심좌표에 마커를 생성합니다 
    var marker = new kakao.maps.Marker({  position: map.getCenter()   }); 
    // 4. 지도에 마커를 표시합니다
    marker.setMap(map);
    // 5. 지도에 클릭 이벤트를 등록합니다. 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
        var latlng = mouseEvent.latLng; // 클릭한 위도, 경도 정보를 가져옵니다 
        marker.setPosition(latlng);// 마커 위치를 클릭한 위치로 옮깁니다
        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        console.log( message );
    });
} // func end 
// kakaoMap2(); // 예제2 

// [3] 클릭한 위치에 마커 표시하기 , https://apis.map.kakao.com/web/sample/addMarkerClickEvent/
const kakaoMap3 = async () =>{
    // 1. // 지도를 표시할 div 
    var mapContainer = document.getElementById('map'), 
    // 2. 지도의 옵션  
    mapOption = { center: new kakao.maps.LatLng(33.450701, 126.570667),level: 3 };
    // 3. 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption); 
    // 4. 마커 옵션 
    var position =  new kakao.maps.LatLng(33.450701, 126.570667);
    // 5. 마커를 생성합니다
    var marker = new kakao.maps.Marker({  position: position, clickable: true });// 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    // 6. 마커를 지도에 표시합니다.
    marker.setMap(map);
    // 7. 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커 클릭시 실행되는 코드들 
        alert(' 해당 마커 클릭 했습니다. ');
    });
}
// kakaoMap3(); // 예제3 

// [4] 여러개 마커 표시하기 , https://apis.map.kakao.com/web/sample/multipleMarkerImage/
const kakaoMap4 = async() => {
    // 1. 지도를 표시할 div  , 지도 옵션 
    var mapContainer = document.getElementById('map'),
    mapOption = { center: new kakao.maps.LatLng(33.450701, 126.570667),level: 3 };
    // 2. 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption); 
    // 3. 마커를 표시할 위치와 title 객체 배열입니다 
    var positions = [
        {  title: '카카오', latlng: new kakao.maps.LatLng(33.450705, 126.570677) },
        {  title: '생태연못',  latlng: new kakao.maps.LatLng(33.450936, 126.569477) },
        { title: '텃밭',   latlng: new kakao.maps.LatLng(33.450879, 126.569940)  },
        { title: '근린공원',  latlng: new kakao.maps.LatLng(33.451393, 126.570738)  },
        { title: '부평역',  latlng: new kakao.maps.LatLng( 37.4905335508  , 126.7244907601 )  },
    ];
    // 4. 마커 이미지의 이미지 주소입니다, // static -> img 폴더내 이미지 경로
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    // 5. 반복문을 이용한 여러개 마커 생성
    for (var i = 0; i < positions.length; i ++) {
        var imageSize = new kakao.maps.Size(24, 35);  // 마커 이미지의 이미지 크기 입니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);  // 마커 이미지를 생성합니다    
        var marker = new kakao.maps.Marker({  // 마커를 생성합니다
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });
    }
} // func end 
kakaoMap4();