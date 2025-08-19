package web.model.dao;

import org.springframework.stereotype.Repository;
import web.model.dto.ProductDto;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

@Repository
public class ProductDao extends Dao {

    // [1-1] 제품 등록
    public int createProduct(ProductDto productDto ){
        try{
            String sql ="INSERT INTO product(pname,pprice,pcomment,plat,plng,mno)value(?,?,?,?,?,?)";
            PreparedStatement ps = conn.prepareStatement( sql , Statement.RETURN_GENERATED_KEYS ); // (1) PK 리턴 설정
            ps.setString( 1 , productDto.getPname() );
            ps.setInt( 2 , productDto.getPprice() );
            ps.setString( 3 , productDto.getPcomment() );
            ps.setDouble( 4 , productDto.getPlat() );
            ps.setDouble( 5 , productDto.getPlng() );
            ps.setInt( 6 , productDto.getMno() );
            int count = ps.executeUpdate();
            if( count == 1 ){
                ResultSet rs = ps.getGeneratedKeys(); // (2) 등록된 레코드의 PK값 조회
                if( rs.next() ) return rs.getInt( 1 ); // (3) 등록된 레코드의 첫번째 pk값 반환( 생성된 pno )
            }
        } catch (Exception e) { System.out.println(e);  }
        return 0; // 실패시 0 반환
    }

    // [1-2] 제품 이미지 등록
    public boolean createProductImage( int pno , String fileName ){
        try{
            String sql = "INSERT INTO productimg( pimgname , pno ) values(?,?)";
            PreparedStatement ps = conn.prepareStatement( sql );
            ps.setString( 1 , fileName );
            ps.setInt( 2 , pno );
            return ps.executeUpdate() == 1;
        } catch (Exception e) { System.out.println(e); }
        return false;
    }

} // func end






















