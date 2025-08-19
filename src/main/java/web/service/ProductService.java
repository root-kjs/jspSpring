package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ProductDao;
import web.model.dto.ProductDto;

@Service
public class ProductService {

    @Autowired private ProductDao productDao;

    // [1-1] 제품 등록
    public int createProduct(ProductDto productDto ){
        return productDao.createProduct( productDto ); // DB에 제품 정보 저장
    }

    // [1-2] 제품 이미지 등록
    public boolean createProductImage( int pno , String fileName ){
        return productDao.createProductImage( pno ,fileName ); // DB에 제품 이미지 저장
    }

}








