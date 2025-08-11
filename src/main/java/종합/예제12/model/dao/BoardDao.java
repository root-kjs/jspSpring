package 종합.예제12.model.dao;

import org.springframework.stereotype.Repository;
import 종합.예제12.model.dto.BoardDto;

import java.sql.PreparedStatement;

@Repository
public class BoardDao extends Dao  {

    // [1] 등록
    public boolean boardWrite(BoardDto boardDto ){
        System.out.println("BoardDao.boardWrite");
        System.out.println("boardDto = " + boardDto);
        try{
            String sql = "insert into board(bcontent,bwriter)values(?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString( 1 , boardDto.getBcontent() );
            ps.setString( 2 , boardDto.getBwriter() );
            int count = ps.executeUpdate();
            if( count == 1 ) return true;
        } catch (Exception e) { System.out.println(e); }
        return false;
    }
}
