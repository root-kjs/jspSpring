package 종합.예제12.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import 종합.예제12.model.dto.BoardDto;
import 종합.예제12.service.BoardService;

@RestController
@RequestMapping("/board") // + 공통 URL
public class BoardController {
    @Autowired private BoardService boardService;
    // [1] 등록
    @PostMapping("") // localhost:8080/board
    public boolean boardWrite(@RequestBody BoardDto boardDto ){
        System.out.println("BoardController.boardWrite");
        System.out.println("boardDto = " + boardDto);
        boolean result = boardService.boardWrite( boardDto ); // 서비스 호출 하고 응답을 반환
        return result;
    }
} // CLASS END













