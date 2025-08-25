package web.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.PostDao;
import web.model.dto.PageDto;
import web.model.dto.PostDto;

import java.util.List;

@Service
@RequiredArgsConstructor // 롬복제공 : final 변수에 대한 ---(final)생성자 자동-- 제공
public class PostService {
    // (*) @RequiredArgsConstructor 사용시 ( @Autowired 생략해도 자동으로 의존성이 처리된다 )
    private final PostDao postDao;
    // (*) @RequiredArgsConstructor 미사용시
    /*
    private final PostDao postDao;
    @Autowired
    public PostService( PostDao postDao ){
        this.postDao = postDao;
    }
    */

    // [1] 게시물등록
    public int writePost(PostDto postDto ){
        return postDao.writePost( postDto );
    } // func end

    // [2] 게시물 전체조회 *페이징*
    public PageDto findAllPost( int cno , int page , int count ){
        // cno : 카테고리번호 , page : 현재페이지번호 , count : 페이지당게시물수

        // ******** 1. 페이지별 조회할 시작(인덱스)번호 계산 *************
        /* 페이지당 5개씩 조회 한다는 가정 : 1페이지 -> 0 , 2페이지 -> 5 , 3페이지 10  */
        int startRow = ( page -1 ) * count; // 현재페이지-1 하고 페이지당게시물수 곱한다.
        /* 1페이지 -> 1-1*5 -> 0  ,  2페이지 -> 2-1*5 -> 5   ,  3페이지 -> 3-1*5 -> 10  */
        /* 예] 네이버증권게시판 : 1페이지 -> 1-1*20 -> 0  ,  2페이지 -> 2-1*20 -> 20   ,  3페이지 -> 3-1*20 -> 30  */

        // ******** 2. 자료의 (게시물총)개수 구하기. 카테고리별 , 이유 : 전체 페이지수 계산하기 *************
        int totalCount = postDao.getTotalCount( cno );
        // ******** 3. 전체 페이지수 구하기  *************
        int totalPage = totalCount % count == 0 ? totalCount/count : totalCount/count + 1 ; // 나머지가 존재하면 +1
        /* 35개의 정보가 있을때 5개씩 조회한다면 총 페이지수는 몇개 ? 7페이지  */
        /* 42개의 정보가 있을때 10개씩 조회한다면 총 페이지수는 몇개 ? 4페이지 + 1페이지(나머지2개) => 5페이지 */

        int btnCount = 5; // 한 화면에 보여지는 최대 버튼수
        // ******** 4. 시작버튼 구하기    *************
        int startBtn = ( ( page - 1 ) / btnCount ) * btnCount + 1;
        // ******** 5. 끝버튼 구하기    *************
        int endBtn = startBtn + btnCount - 1 ;
        if( endBtn > totalPage ) endBtn = totalPage; // 만약에 끝버튼수가 총페이지수 보다 커지면 총페이지수로 끝버튼번호 사용
        /* 총 페이지수가 13 일때  ,  현재페이지가 3 이면 시작버튼 : 1  , 끝버튼 : 5   */
        /* 총 페이지수가 13 일때  ,  현재페이지가 7 이면 시작버튼 : 6  , 끝버튼 : 10   */
        /* 총 페이지수가 13 일때  ,  현재페이지가 12 이면 시작버튼 : 11  , 끝버튼 : 13(마지막페이지수) */

        // ******** 6. 자료 요청 , cno:카테고리번호 , startRow(시작인덱스) , count(페이당게시물수)  *************
        // SQL 페이징 처리 : LIMIT 시작인덱스 , 개수
        // 1페이지 : LIMIT 0 , 5     / 2페이지 : LIMIT 5 , 5   / 3페이지 : LIMIT 10 , 5    / 4페이지 : LIMIT 15 , 5
        List< PostDto > postList = postDao.findAll( cno , startRow , count );

        // ************* pageDto 구성하기 ***************
        PageDto pageDto = new PageDto();
        pageDto.setCurrentPage( page ); // 현재페이지 번호
        pageDto.setTotalPage( totalPage ); // 전체페이지 수
        pageDto.setPerCount( count ); // 한페이지당 게시물 수
        pageDto.setTotalCount( totalCount ); // 전체 게시물 수
        pageDto.setStartBtn( startBtn ); // 시작 페이징 버튼번호
        pageDto.setEndBtn( endBtn ); // 끝 페이징 버튼번호
        pageDto.setData( postList ); // 페이징한 게시물 리스트
        return pageDto; // 반환
    }


} // class end















