package web.model.dao;

import org.springframework.stereotype.Repository;
import web.model.dto.PostDto;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

@Repository
public class PostDao extends Dao {
    // [1] 게시물등록
    public int writePost(PostDto postDto ){
        try{ String sql = "insert into post( ptitle, pcontent, cno, mno)values(?,?,?,?)";
            // Statement.RETURN_GENERATED_KEYS : SQL 실행시 자동 생성된 **PK 반환 설정**
            PreparedStatement ps = conn.prepareStatement( sql , Statement.RETURN_GENERATED_KEYS );
            // SQL문법내 '?'가 4개 이니까 setXXX 이용한 각 '?' 4개를 순서에 맞춰서 매개변수 대입
            ps.setString( 1, postDto.getPtitle() );
            ps.setString( 2, postDto.getPcontent() );
            ps.setInt( 3 , postDto.getCno() );
            ps.setInt( 4 , postDto.getMno() );
            int count = ps.executeUpdate();
            if( count == 1 ){
                ResultSet rs =  ps.getGeneratedKeys(); // SQL 실행후 자동 생성된 **PK 반환**
                if( rs.next() ) return rs.getInt( 1 ); // 등록 성공시 첫번째 pk속성 값 반환
            }
        } catch (Exception e) {  System.out.println(e); }
        return 0; // 등록 실패시
    } // func end
} // class end
