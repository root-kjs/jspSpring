<%@ page language = "java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>
<body>

    <jsp:include page="/header.jsp"></jsp:include>
    <div>
        <h3> 게시물 상세 페이지 </h3>
        작성자 : <span class="mid"></span>
        조회수 : <span class="pview"></span>
        작성일 : <span class="pdate"></span>
        제목 : <div class="ptitle"></div>
        내용 : <div class="pcontent"></div>
        <div class="etcBox">
            <!-- 내가 쓴글이면 보이는 버튼 -->
            <!-- <button type="button" onclick="deletePost()"> 삭제 </button>
            <button type="button" onclick="updatePost()"> 수정 </button> -->
        </div>
    </div>
    <div>
        <h3> 댓글 </h3>
        <textarea class="replyInput"></textarea>
        <button type="button" onclick="writeReply()"> 등록 </button>
    </div>

         <table>
            <thead>
                <tr> <th> 번호 </th> <th> 댓글내용 </th> <th> 작성자(ID) </th> <th> 작성일 </th> </tr>
            </thead>
            <tbody class="replyBody">
                <tr>
                    <td> 1 </td>
                    <td> 댓글내용이지롱.. </td>
                    <td> 유재석 </td> 
                    <td> 2025-08-26 </td>
                </tr>
            </tbody>
        </table>


    <script src='/js/post/view.js'></script>

</body>
</html>




