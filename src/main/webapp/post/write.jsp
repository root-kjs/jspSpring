<%@ page language = "java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>등록</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <!-- 썸머노트용 include libraries(jQuery, bootstrap) 
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

   
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote.min.js"></script> -->

    <!-- 최신 CDN https://cdnjs.com/libraries/bootstrap -->
    <!-- 부트스트랩 최신버전  -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" ></script>

    <!-- jquery 최신버전 -->
    <script  src="http://code.jquery.com/jquery-latest.min.js"></script>

    <!-- 썸머노트 0.9.1 최신버전 css/js , https://cdnjs.com/ -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/summernote-bs5.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/summernote-bs5.min.js"></script>
    <!-- 썸머노트 한글 js-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/lang/summernote-ko-KR.min.js"></script>



</head>
<body>

    <jsp:include page="/header.jsp"></jsp:include>

    <div class="container">
        <select class="cno"> <!-- select에서 선택한 value값을 js로 이동할 예정 -->
            <option value="1"> 뉴스 </option>
            <option value="2"> 이벤트 </option>
            <option value="3"> FAQ </option>
            <option value="4"> 튜토리얼 </option>
            <option value="5"> 사용자리뷰 </option>
        </select>
        <input type="text" class="ptitle"/>
        <textarea class="pcontent" id="summernote" name="editordata"></textarea>
        <button type="button" onclick="onWrite()">등록</button>
    </div>
    <script src='/js/post/write.js'></script>
    
</body>
</html>