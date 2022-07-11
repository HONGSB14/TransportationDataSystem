package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.vo.SaleVo;

@Mapper
public interface SaleMapper {

    boolean registration(SaleVo saleVo);

}
