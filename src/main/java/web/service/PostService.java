package web.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.PostDao;
import web.model.dto.PostDto;

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

} // class end
