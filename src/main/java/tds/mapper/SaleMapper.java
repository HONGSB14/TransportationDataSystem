package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.vo.SaleVo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface SaleMapper {

    boolean registration(SaleVo saleVo);

   List<SaleVo> tableView(int companyNumber);

  boolean delete(int companyNumber,int slipNumber);

}
