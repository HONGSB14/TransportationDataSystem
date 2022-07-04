package tds.mapper;
import org.apache.ibatis.annotations.Mapper;
import tds.vo.CompanyVo;

@Mapper
public interface CompanyMapper {

  String companyCheck(String crn, String name);

  String numberCheck(String cnum);

  boolean signup(CompanyVo companyVo);
}
