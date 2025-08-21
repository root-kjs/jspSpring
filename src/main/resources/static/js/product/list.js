
console.log( 'list.js open ');
let productList = [];

// [1] 모든 제품 정보 가져오기 
const getList = async()=>{
    // fetch 
    const response = await fetch('/product/list');
    const data = await response.json();   console.log( data ); // 확인 
    productList = data; // 전역변수로 제품 정보 저장
} //func end 

// [2] 카카오지도,(마커클러스터) https://apis.map.kakao.com/web/sample/addClustererClickEvent/
const getMap = async ()=>{

    // 1. 지도 생성 
    var map = new kakao.maps.Map(document.getElementById('map'), { 
    center : new kakao.maps.LatLng( 37.4905335508 , 126.7244907601 ),  level : 8 });
    // 2. 마커 클러스터러를 생성합니다
    var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 10, // 클러스터 할 최소 지도 레벨
        disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    });
    // 3. 전역변수에 있는 제품리스트 를 마커로 생성 
    let markers = productList.map( ( product ) => {
        // 3-1 마커 생성 
        let marker = new kakao.maps.Marker({ position : new kakao.maps.LatLng( product.plat , product.plng ) })
        // 3-2 마커 클릭 이벤트 , kakao.maps.event.addListener( marker , 'click' , ()=>{} )
        kakao.maps.event.addListener( marker , 'click' , ()=>{
            alert( `클릭한 제품명은 : ${ product.pname } ` );

            // ************ 업로드 된 이미지 출력 ***********
            // 1. 어디에
            const productDiv = document.querySelector('#productDiv');
            // 2. 무엇을 , JSP(webapp이하), css/js/img등등(static이하) , java/string(controller)
            let html = ``;
                // * 이미지가 없는 경우 기본이미지 만등릭
                if( product.images.length == 0 ){
                    html += `<img src="/upload/default.png" />`
                }else{  // * 이미지 다수일때 반복문을 이용한 여러개 img 마크업 만들기
                    for( let i = 0 ; i < product.images.length; i++ ){
                        let img = product.images[i]; // i번째 이미지
                        html += `<img src="/upload/${img}" />`
                    }
                }
            // 3. 출력
            productDiv.innerHTML = html;

        });
        // 3-3 마커를 반환 
        return marker;
    })
    // 3-2 : 반복문 끝나고 마커들을 클러스터에 넣기 
    clusterer.addMarkers(markers); // 클러스터러에 마커들을 추가합니다

    // 4. 마커 클러스터러에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
        var level = map.getLevel()-1; // 현재 지도 레벨에서 1레벨 확대한 레벨
        map.setLevel(level, {anchor: cluster.getCenter()}); // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    });
}// func end 

// [*] 함수 동기화
const _init = async()=>{
    await getList(); // 카카오 맵이 실행되기 전에 제품정보 가져오기 먼저 실행
    await getMap();
}
_init();




/*
    // 3. 전역변수에 있는 제품리스트 를 마커로 생성 
        let markerList = []; // 여러개 마커를 저장하는 배열
        // 3-1 : 반복문을 이용한 전역변수의 제품리스트 반복하기 
        for( let i = 0 ; i< productList.length ; i++ ){
            // 3-2 : 제품리스트에서 i번째 제품객체 1개 반환 
            const product = productList[i]; 
            // 3-3 : 카카오 api의 마커 객체 생성 , 현재 제품의 위도 와 경도를 마커 객체에 대입
                // new kakao.maps.Marker( { position : new kakao.maps.LatLng( 위도 , 경도) } );
            let marker = new kakao.maps.Marker( { position : new kakao.maps.LatLng( product.plat , product.plng  ) } );
            // 3-4 : 마커들을 저장하는 마커 배열 에 .push
            markerList.push( marker );
        }
    // 3-5 : 반복문 끝나고 마커들을 클러스터에 넣기 
    clusterer.addMarkers(markerList); // 클러스터러에 마커들을 추가합니다

    --------------------------- vs ---------------------------

    // 3-1. 전역변수에 있는 제품리스트 를 마커로 생성 
    let markers = productList.map( ( product ) => {
        return new kakao.map.Marker({ position : new kakao.maps.LatLng( product.plat , product.plng ) })
    })
    // 3-2 : 반복문 끝나고 마커들을 클러스터에 넣기 
    clusterer.addMarkers(markers); // 클러스터러에 마커들을 추가합니다

*/
