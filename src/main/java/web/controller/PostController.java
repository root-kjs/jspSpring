package web.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.PageDto;
import web.model.dto.PostDto;
import web.service.PostService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.fasterxml.jackson.databind.type.LogicalType.Map;

@RestController // (1) HTTP 요청/응답 자료 매핑 기술
@RequestMapping("/post") // (2) HTTP URL 매핑 기술
@RequiredArgsConstructor // (3) final 변수에 대한 자동 생성자 주입
public class PostController {

    private final PostService postService; // @RequiredArgsConstructor 사용함으로 @Autowired 생략 한다.

    // [1] 게시물등록
    @PostMapping("") // method : post , url : localhost:8080/post , body : { "ptitle" : "게시물제목테스트" , "pcontent" : "게시물제목테스트" , "cno" : "1"  }
    public int writePost( @RequestBody PostDto postDto , HttpSession session ){
        // 1. 현재 로그인 상태 확인
        Object login = session.getAttribute("loginMno");
        // 2. 비로그인이면 등록 실패처리
        if( login == null  ) return 0;
        // 3. 로그인이면 현재 로그인한 회원번호를 postDto 대입하기
        int mno = (int)login;
        postDto.setMno( mno );
        // 4. 서비스 호출 하고 응답 반환 하기
        return postService.writePost( postDto );
    } // func end

    // [2] 게시물 전체 조회
    @GetMapping("")
    // 검색이 없을떄 : method : GET , URL : http://localhost:8080/post?cno=1&page=1&count=5 , 1번카테고리(뉴스)의 1페이지의 5개 게시물
    // 검색이 있을떄 : method : GET , URL : http://localhost:8080/post?cno=1&page=1&count=5&key=ptitle&keyword=ai , 1번카테고리(뉴스)의 1페이지에서 제목의 ai가 포함된  5개 게시물
    public PageDto findAllPost( @RequestParam( defaultValue = "1") int cno ,
                                @RequestParam( defaultValue = "1") int page ,
                                @RequestParam( defaultValue = "5" ) int count ,
                                @RequestParam( required = false ) String key ,
                                @RequestParam( required = false ) String keyword ){
        // 만약에 URL 주소상의 지정한 쿼리스트링 매개변수가 없으면 defaultValue 속성으로 기본값 대입 할 수 있다.
        // 만약에 URL 주소상의 지정한 쿼리스트링 매개변수가 존재하는 조건이 필수가 아닐때 required = false 속성을 사용한다.
        return postService.findAllPost( cno , page , count , key , keyword );
    }

    // [3-1] 게시물 개별 정보 조회
    @GetMapping("/view")
    public PostDto getPost(@RequestParam int pno, HttpSession session ){
        // HttpSession : 브라우저마다의(서버 메모리에 저장되는 세션) 별도의 클라이언트(client) 저장소 개념으로 생각할 것
        // 01. 24시간 내에 1번만 조회수 증가 요청 가능
            // 1. 세션 내 속성 "viewHistory" 값 가져오기
            // 세션 내 속성 viewHistory는 사용자의 웹사이트 방문 기록을 저장하고 관리하는 데 사용되는 속성
            // 이를 통해 개인화된 사용자 경험을 제공하거나, 사용자의 행동을 분석하여 마케팅 전략을 수립하는 데 활용
            // 예 시 : 사용자가 이전에 본 상품 목록을 보여주거나, 관심 있을 만한 다른 상품을 추천해주는 기능에 활용
        Object object = session.getAttribute("viewHistory");
        Map< Integer, String> viewHistory;
            // 2. viewHistory 존재하지 않으면 viewHistory 생성!
        if( object == null ){
            viewHistory = new HashMap<>();
        }else { // 3. 존재하면 기존 자료를 타입변환한다.
            viewHistory = (Map< Integer, String>) object;
        }
            //4. 오늘 날자를 문자열로 가져옴 {  3: 2025-08-26, 3: 2025-08-27 }
        String today = LocalDate.now().toString();
            //5. 현재 게시물을 오늘 날짜로 조합하여 본 기록을 체크
        String check = viewHistory.get(pno);
        if ( check == null || !check.equals( today )){
            //6. 조회수 증가 서비스 호출
            postService.incrementView( pno );
            viewHistory.put( pno, today );
            //7. 세션 속성 업데이트 -- > 브라우저마다 조회수 증가--> 싫다면 ip까지 체크해야 함.
            session.setAttribute("viewHistory", viewHistory);
        }
        // 02. 요청한 사람이(client) 본인이 작성한 글인지 확인
        PostDto postDto = postService.getPost(pno);
        Object loginObject = session.getAttribute("loginMno");
        int loginMno = loginObject == null ? 0 : (int) loginObject;
        if( postDto.getMno() == loginMno ){
            postDto.setHost( true );
        }
        return postDto;
       // return postService.getPost(pno);
    }//func end
    // [3-2] 게시물 조회수 증가 +1  --->
//    @PutMapping
//    public void incrementView( @RequestParam int pno) {
//        postService.incrementView( pno );
//    }//func end


    // [3-3] 개별 게시물 삭제
    //@DeleteMapping
//    public boolean deletePost(@RequestParam int pno, HttpSession session ){
//        if( session == null || session.getAttribute("loginMno") == null ) return false;
//        int loginMno = (int) session.getAttribute("loginMno");
//        boolean result = postService.deletePost( loginMno, pno );
//        return result;
//    }//func end
    @DeleteMapping
    public boolean deletePost( @RequestParam int pno ){
        return postService.deletePost( pno );

    }//func end

    // [3-4] 개별 게시물 수정
    @PutMapping
    public int updatePost( @RequestBody PostDto postDto){
        return postService.updatePost( postDto );
    }//func end

    // [4-1] 댓글등록
    @PostMapping("/reply")
    public int writeReply( @RequestBody Map<String, String> reply, HttpSession session) { 
        if( session.getAttribute("loginMno") == null ) return 0; // 비로그인이면 실패
        int loginMno = (int) session.getAttribute("loginMno");
        reply.put("mno",loginMno+"" ); //String.valueOf(loginMno), String 처리

        return postService.writeReply(reply);
    }//func end

    // [4-2] 댓글 전체조회
    @GetMapping("/reply")
    public List<Map<String, String>> findAllReply(@RequestParam int pno ){
        return postService.findAllReply(pno);
    }//func end


} // class end















