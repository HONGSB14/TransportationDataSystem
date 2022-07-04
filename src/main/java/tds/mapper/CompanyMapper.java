package tds.mapper;
import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface CompanyMapper {

  String companyCheck(int crn, String name);

  String numberCheck(String cnum);
}
