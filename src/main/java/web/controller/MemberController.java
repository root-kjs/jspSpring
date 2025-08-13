package web.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.MemberDto;
import web.service.MemberService;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // [1] 회원가입
    @PostMapping("/signup")
    public int signUp(@RequestBody MemberDto memberDto ){
        int result = memberService.signUp( memberDto );
        return result;
    }

    // [2] 로그인
    @PostMapping("/login")
    public int login (@RequestBody MemberDto memberDto,
                      HttpServletRequest request ){
        // 1. 세션 정보 가져오기
        HttpSession session = request.getSession();
        // 2. 로그인 성공한 회원번호 확인
        int result = memberService.login( memberDto );
        if( result > 0 ){
            // 3. 세션 정보에 속성 추가하기.
            session.setAttribute("loginMno" , result );
        }
        // 4. 반환
        return result;
    }

    // [3] 로그아웃 , *세션은 서버를 재시작 하면 초기화*
    @GetMapping("/logout")
    public boolean logout( HttpServletRequest request ){
        // 1. 요청 객체내 세션 정보 꺼내기
        HttpSession session = request.getSession();
        // 2. 만약에 세션이 없거나 특정한 속성값이 없으면 ( 유효성검사 ) 비로그인상태
        if( session == null || session.getAttribute("loginMno")== null ){
            return false; // 비로그인상태; // 로그아웃 실패
        }
        // 3. 로그인상태이면 속성값 제거하기
        session.removeAttribute("loginMno");
        return true; // 로그아웃 성공
    }









} // class end
















