// [1] 아이디 찾기
const findId = async ()=>{
    // 1. HTML 로 부터 사용자가 이름과 연락처를 입력받은 INPUT 마크업을 객체로 가져오기
    const nameInput = document.queryString("#mname");
    const phoneInput = document.queryString("#mphone");
    // 2. 가져온 DOM객체내 입력받은 값value 가져오기
    const mname = nameInput.value;
    const mphone = phoneInput.value;
    // 선택] body가 아니므로 이름 과 연락처를 객체화 선택
    // 3. FETCH 이용하여 controller 매핑 통신하기 "/member/findid?mname=&mphone="
    const response = await fetch( `/member/findid?mname=${ mname }&mphone=${ mphone }` );
    const data = await response.json();
    // 4-1. 통신한 결과 { msg: 결과메시지 } 출력하기
    alert( data.msg );
}
// [2]
const findPwd = async ()=>{
    // 1. html 로 부터 아이디와 연락처 입력받을 input 마크업 가져오기
    const idInput = document.queryString("#mid");
    const phoneInput = document.queryString("#mphone");
    // 2. 가져온 input 마크업에서 입력받은 값 가져오기
    const mid = idInput.value;
    const mphone = phoneInput.value;
    // 3. fetch 이용하여 controller 와 통신 , "/member/findpwd?mid=&mphone="
    const response = await fetch( `/member/findpwd?mid=${ mid }&mphone=${ mphone }` );
    const data = await response.json();
    // 4. 통신결과 메시지 출력하기 , { msg : 결과메시지 }
    alert( data.msg );
}