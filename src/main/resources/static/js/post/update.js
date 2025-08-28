console.log("update open");
// 썸머 노트 에디터 실행
$(document).ready(function() {
    $('#summernote').summernote({
        lang: 'ko-KR', // default: 'en-US'
        minHeight:300,
        //placeholder : '내용 입력'
    });
});

// 전역 변수 : URL에서 param(게시물번호/쿼리스트링) 가져오기
const params = new URL( location.href ).searchParams; 
const pno = params.get('pno');

// 1. 개별 게시물 정보 가져오기
const updateview = async() => { //getPost()
    const response = await fetch(`/post/view?pno=${pno}`);
    const data = await response.json();
    //console.log(data);
    document.querySelector('.cno').value = data.cno;
    document.querySelector('.ptitle').value = data.ptitle;
    document.querySelector('.note-editable').innerHTML = data.pcontent;
    // 섬머노트 html  요소안에 데이터 넣기

}//func end

// 2. 개별 게시물 수정
const updatePost = async() => {
    const cno = document.querySelector('.cno').value ;
    const ptitle = document.querySelector('.ptitle').value ;
    const pcontent = document.querySelector('.pcontent').value ;

    const obj = { pno, cno, ptitle, pcontent };

    const option = {
        method : "PUT",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify(obj)
    }
    try{
        const response = await fetch("/post", option);
        const data = await response.json();  //console.log( data );
        if( data == 0 ){
            alert('수정 실패'); 
        }else{
            alert('수정 성공');
             location.href=`view.jsp?pno=${pno}`;
        }
    }catch(e){
        console.log( e );
    }

}//func end

updateview();