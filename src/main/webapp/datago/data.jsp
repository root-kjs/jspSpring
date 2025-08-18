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
    
    <div id="container">
        
        <h3> [2] 사업자 상태 조회 </h3>
        <input type="text" class="b_no" placeholder="-없이사업자번호"/>
        <button type="button" onclick="dataAPI2()"> 확인 </button>

        <h3> [1]인천 부평구 주유소 현황 API </h3>
        <table>
            <thead>
                <tr>
                    <td> 연번 </td>
                    <td> 상호 </td>
                    <td> 업종 </td>
                    <td> 전화번호 </td>
                    <td> 주소 </td>
                </tr>
            </thead>
            <tbody id="dataTbody">
                
            </tbody>
        </table>
    </div>

    <script src="/js/datago/data.js"></script>

</body>
</html>