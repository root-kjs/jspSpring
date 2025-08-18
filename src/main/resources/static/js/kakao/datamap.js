console.log( 'datamap.js');
// [1] 공공데이터 , 인천시 동구 약국 , https://www.data.go.kr/data/15051492/fileData.do#tab-layer-openapi
const dataAPI = async()=>{
    // 1.공공데이터 준비
    const serviceKey = "nwPZ%2F9Z3sVtcxGNXxOZfOXwnivybRXYmyoIDyvU%2BVDssxywHNMU2tA55Xa8zvHWK0bninVkiuZAA4550BDqIbQ%3D%3D"
    const URL = "https://api.odcloud.kr/api/15051492/v1/uddi:852bbc11-63ed-493e-ab09-caaaf54fd144?page=1&perPage=34&serviceKey="
    // 2. fetch 실행 
    const response = await fetch( URL+serviceKey , { method : "GET"} );
    const data = await response.json();
    console.log( data );
    // 3. 사이드바 정보 출력하기(위도/경도 제외한->지도에서 사용) , 소재지도로명주소/약국명/전화번호
    const sidebar = document.querySelector('#sidebar');
    let html = '';
        data.data.forEach( (value)=>{ 
            html += `<div id="store">
                        <div> 약국명 :  ${ value.약국명 } </div>
                        <div> 전화번호 : ${ value.전화번호 } </div>
                        <div> 주소 : ${ value.소재지도로명주소 } </div>
                    </div>`
        });
    sidebar.innerHTML = html;
}
dataAPI();

// [2] 카카오맵 클러스터 라이브러리 , https://apis.map.kakao.com/web/sample/addClustererClickEvent
const kakaMap =  async ()=>{
    
}
kakaMap();