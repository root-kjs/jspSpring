// 썸머 노트 에디터 실행
$(document).ready(function() {
    $('#summernote').summernote({
        lang: 'ko-KR', // default: 'en-US'
        minHeight:300,
        placeholder : '내용 입력'
    });
});

const params = new URL( location.href ).searchParams;
const cno_page = params.get('cno');

const onWrite = async() => {
    const cno = document.querySelector('.cno').value ;
    const ptitle = document.querySelector('.ptitle').value ;
    const pcontent = document.querySelector('.pcontent').value ;
    const obj = { cno, ptitle, pcontent };

    const option = {
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify(obj)
    }
    try{
        const response = await fetch("/post", option);
        const data = await response.json();  //console.log( data );
        if( data > 0 ){
            alert('게시글 등록 성공!'); 
            location.href = `/post/post.jsp?cno=1`;
        }else{
             alert('게시글 등록 실패');
        }
    }catch(e){
        console.log( e );
    }
}// func end