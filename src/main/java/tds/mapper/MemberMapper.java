package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.vo.MemberVo;

@Mapper
public interface MemberMapper {

    String idCheck(String memberId);
    String emailCheck(String email);
    boolean signup(MemberVo memberVo);
}
