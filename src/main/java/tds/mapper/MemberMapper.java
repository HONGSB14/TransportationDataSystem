package tds.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

    String idCheck(String id);
    String emailCheck(String email);
}
