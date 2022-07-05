package tds.mapper;
import org.apache.ibatis.annotations.Mapper;
import tds.vo.CompanyVo;

import java.util.Map;

@Mapper
public interface CompanyMapper {

  String companyCheck(String crn, String name);

  String numberCheck(int cnum);

  boolean signup(CompanyVo companyVo);

  Map<String,Object>info(int companyNumber);
}
