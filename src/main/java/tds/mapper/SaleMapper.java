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

   List<SaleVo> mainDayTableView(int companyNumber);

   List<SaleVo> mainMonthTableView(int companyNumber);

  boolean delete(int companyNumber,int slipNumber);

  List<SaleVo> dateSearchTable(String searchDate,int companyNumber);

  boolean registrationDate(SaleVo saleVo);

  boolean update(SaleVo saleVo);

  List<SaleVo> lineChart(int companyNumber);

}
