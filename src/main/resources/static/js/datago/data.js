console.log( 'data.js open');

// [2] 사업자등록정보 상태조회 서비스 
const dataAPI2 = async() =>{
    // 1. 데이터 준비 
    const b_no = document.querySelector('.b_no').value; // 입력받은 사업자번호
    const  obj ={
        "b_no" : [ b_no ] // -없는 사업자번호, 더조은학원(6408101354)으로 테스트 
    }  // var : 변수명이 중복 가능한 변수 타입 , 과거 많이 사용됨, 최근에는 let 키워드가 사용됨.
    // 2. fetch 
    const option = {
        method : "POST" ,
        headers : {"Conten2958802827t-Type" : "application/json"} , 
        body:JSON.stringify(obj)
    }
    const serviceKey = "nwPZ%2F9Z3sVtcxGNXxOZfOXwnivybRXYmyoIDyvU%2BVDssxywHNMU2tA55Xa8zvHWK0bninVkiuZAA4550BDqIbQ%3D%3D"
    const URL = "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey="
    const response = await fetch( URL+serviceKey , option );
    const data = await response.json(); 
    alert( data.data[0]["tax_type"] ) // 속성명이 특수문자가 포함된 경우 .(접근연산자) 불가능.

} //

// [1] 인천 부평구 주유소 현황 
const dataAPI1 = async()=>{
    // (1) 요청 URL  , perPage=10 -> perPage=38 변경
    const serviceKey = "nwPZ%2F9Z3sVtcxGNXxOZfOXwnivybRXYmyoIDyvU%2BVDssxywHNMU2tA55Xa8zvHWK0bninVkiuZAA4550BDqIbQ%3D%3D";// 일반 인증키(Encoding)
    const URL = "https://api.odcloud.kr/api/15102672/v1/uddi:d26dabc4-e094-463d-a4b1-cab3af66bb6d?page=1&perPage=38&serviceKey="
    // (2) fecth 활용한 공공데이터 API 요청 
    const option = { method : "GET" }
    const response = await fetch( URL+serviceKey , option );
    const data = await response.json();
    console.log( data ); // 요청 결과값을 CONSOLE **출력후 분석**하여 사용한다.
    // perPage : 페이지당 가져올 데이터수, data : 실질적인 데이터가 들어오는 속성명(주유소 목록)
    console.log( data.data );
    // (3) JSP(html) 표에 출력하기 
    const dataTbody = document.querySelector('#dataTbody');  // 1. 어디에
    let html = ''; // 2. 무엇을  , array.forEach( ( value ) => {} ) : 리스트내 요소를 하나씩 변수(value)에 반복대입 
    data.data.forEach( ( value )=> { // vs for( let i = 0 ; i< data.data.length ; i++ ){ let value = data.data[i]; }
        html += `<tr>
                    <td> ${ value.연번 } </td>  <td> ${ value.상호 } </td>
                    <td> ${ value.업종 } </td>   <td> ${ value.전화번호 } </td>
                    <td> ${ value['주소'] } </td>
                </tr>`
    });
    dataTbody.innerHTML = html;// 3. 출력
} // func end 
dataAPI1(); // JSP 열릴때 최초 1번 실행 

/*
    1. https://www.data.go.kr/
    2. 로그인 -> [카카오/네이버 간편로그인 ] 권장 아니면 회원가입진행
    3. 검색창 "부평구 주유소" 검색 -> "인천광역시 부평구_주유소 현황" 클릭 -> [Open API] 탭 클릭 
    4. https://www.data.go.kr/data/15102672/fileData.do#tab-layer-openapi
    5. JSON [ 활용신청 ]
    6. 활용목적 : 연구(논문 등) , 웹개발 테스트중 입니다.
       이용허락범위 :  [V] 동의합니다. , 체크
       [ 활용신청 ]
    7. 마이페이지 -> 데이터 활용 -> Open API -> 활용신청 현황 -> 승인된 API 확인후 클릭 
    8. 개발계정 상세보기
        [인증키 설정]
            ApiKeyAuth (apiKey) : 일반 인증키(Encoding) 를 복사하여 붙여넣기 
            ApiKeyAuth2 (apiKey) : 일반 인증키(Decoding) 를 복사하여 붙여넣기 
        [ API 목록 ] 선택후 [ OpenAPI 실행 준비 ] -> [ OpenAPI 호출 ]
    예] 강사가 신청한 API요청주소
    https://api.odcloud.kr/api/15102672/v1/uddi:d26dabc4-e094-463d-a4b1-cab3af66bb6d?page=1&perPage=10&serviceKey=nwPZ%2F9Z3sVtcxGNXxOZfOXwnivybRXYmyoIDyvU%2BVDssxywHNMU2tA55Xa8zvHWK0bninVkiuZAA4550BDqIbQ%3D%3D
*/

/*
    1. https://www.data.go.kr/
    2. 로그인 -> [카카오/네이버 간편로그인 ] 권장 아니면 회원가입진행
    3. 검색창 "사업자 상태 조회" 검색 -> "국세청_사업자등록정보 진위확인 및 상태조회 서비스" 클릭 
    4. https://www.data.go.kr/data/15081808/openapi.do
    5. JSON [ 활용신청 ]
    6. 활용목적 : 연구(논문 등) , 웹개발 테스트중 입니다.
       이용허락범위 :  [V] 동의합니다. , 체크
       [ 활용신청 ]
    7. 마이페이지 -> 데이터 활용 -> Open API -> 활용신청 현황 -> 승인된 API 확인후 클릭 
    8. 개발계정 상세보기
        [ 상태조회 샘플코드 ] 참고 
*/
