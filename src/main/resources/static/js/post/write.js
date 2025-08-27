// 썸머 노트 에디터 실행
$(document).ready(function() {
    $('#summernote').summernote({
        lang: 'ko-KR', // default: 'en-US'
        minHeight:300,
        placeholder : '내용 입력'
    });
});

console.log( "write.js open");

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
        const reponse = await fetch("/post", option);
        const data = await reponse.json();  //console.log( data );
        if( data > 0 ){
            alert('등록 성공'); 
        }else{
            alert('등록 실패');
        }
    }catch(e){
        console.log( e );
    }
}// func end