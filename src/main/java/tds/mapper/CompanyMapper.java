package tds.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CompanyMapper {
    boolean companyCheck(String crn, String name);

}
