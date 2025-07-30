package example.day01;

import example.day01.controller.BoardController;
import example.day01.model.dto.BoardDto;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;

@SpringBootApplication
public class AppStart {
    public static void main(String[] args) {
        System.out.println("자바실행");
        // BoardService 10 : view 제외한 동일한 구조
        // [MYSQL라이브러리등록]
        // Gradle 환경 아닐때 : "mysql-connector-j-9.3.0.jar" 파일을 오른쪽 클릭 -> 가장 하단에 '라이브러리 추가'
        // Gradle 환경 일때 : build.gradle 파일내 'runtimeOnly 'com.mysql:mysql-connector-j' 코드가 필요하다.
        // 1. 20250723 등록 테스트
        boolean result = BoardController.getInstance().boardWrite("테스트내용","강사");
        System.out.println( result );
        // 2. 20250723 전체조회 테스트
        ArrayList<BoardDto> result2 = BoardController.getInstance().boardPrint();
        System.out.println( result2 );

        // * Spring 환경 실행
        // SpringApplication.run( 현재클래스명.class);
        SpringApplication.run( AppStart.class);

    } // main end
} // class end

