console.log( "view.js open");

// 전역 변수 : URL에서 param(게시물번호/쿼리스트링) 가져오기
const params = new URL( location.href ).searchParams; 
const pno = params.get('pno');

//1. 게시글 개별 조회
const getPost = async() => {
    console.log(" 게시글 개별 조회 출력");
    
    // 1. fetch로부터 출력할 게시물 조회 요청
    const reponse = await fetch( `/post/view?pno=${pno}` ); // .jsp 쓰,지 말라고...
    const data = await reponse.json();
    //console.log(data);

    // 2. 응답받은 자료를 해당 html에 출력
    document.querySelector(".mid").innerHTML = data.mid;
    document.querySelector(".pview").innerHTML = data.pview;
    document.querySelector(".pdate").innerHTML = data.pdate;
    document.querySelector(".ptitle").innerHTML = data.ptitle;
    document.querySelector(".pcontent").innerHTML = data.pcontent;

    // 내가 쓴 글이면 해당 버튼 보이기
    if( data.host ){
        document.querySelector(".etcBox").innerHTML = 
        `
        <button type="button" onclick="deletePost()"> 삭제 </button>
        <button type="button" onclick="location.href='update.jsp?pno=${pno}'"> 수정 </button>
        `
    }
    //console.log("되라고...");
}//func end

//2. 게시글 개별 삭제
const deletePost = async() => {
    const option = { method : "DELETE"}
    const reponse = await fetch( `/post?pno=${pno}`, option )
    const data = await reponse.json()
    // 응답결과 처리
    if( data == true ){
        alert("삭제 성공"); 
        location.href ="/post/post.jsp?cno=1"
    }else{
        alert("삭제 실패");
    }

}//func end

//3. 게시물 개별 수정

//4. 게시물 댓글 등록
const writeReply = async() => {
    console.log("writeReply Start");
    // 1. 입력값 가져오기
        const rcontent = document.querySelector('.replyInput').value;
        const obj = { pno, rcontent };

    // 2. 입력값 페치로 보내기
    const option = { 
        method : "POST", 
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify(obj)

    }
    const response = await fetch( `/post/reply` , option ); //경로는 http메소드 경로 기준 참조
    const data = await response.json();

    // 3. 응답결과 보기

    if( data == 0 ){
         alert("댓글 등록 실패");
    }else{
        alert("댓글 등록 성공!");
        document.querySelector('.replyInput').value ="";
        findAllReply();
    }

}//func end

//5. 게시물 댓글 전체 조회
const findAllReply = async() => {
    //1. 페치 통신하여 데이터 가져오기
    const response = await fetch( `/post/reply?pno=${pno}` );
    const data = await response.json();
    //console.log( data );

    let html = "";
    //2. 가져온 데이터 뿌려주기
    data.forEach(( reply ) => { //forEach //data ==> list / 반복할 변수 ==> reply
        html += `
            <tr>
                <td> ${reply.rno} </td>
                <td> ${reply.rcontent} </td>
                <td> ${reply.mid} </td> 
                <td> ${reply.rdate} </td>
            </tr>
        `
    });
    document.querySelector('.replyBody').innerHTML = html;

}//func end

getPost();
findAllReply();