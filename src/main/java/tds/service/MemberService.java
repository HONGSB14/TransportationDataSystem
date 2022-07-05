package tds.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.mapper.MemberMapper;

@Service
public class MemberService {
    @Autowired
    private MemberMapper memberMapper;

    //아이디 유효성 검사
    public boolean idCheck(String memberId){
        String id=memberMapper.idCheck(memberId);
        if(id==null){
            return true;
        }else{
            return false;
        }
    }

    public boolean emailCheck(String email){
       String emailCheck=memberMapper.emailCheck(email);
       if(emailCheck==null){
           return true;
       }else {
           return false;
       }
    }
}
