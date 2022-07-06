package tds.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.mapper.MemberMapper;
import tds.vo.MemberVo;


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
    //이메일 유효성 검사
    public boolean emailCheck(String email){
       String emailCheck=memberMapper.emailCheck(email);
       if(emailCheck==null){
           return true;
       }else {
           return false;
       }
    }
    //회원 가입
    public boolean signup(String memberInfo){
        // controller 에서 받아온 String 값을 json 으로 형 변환
        JSONObject jo = new JSONObject(  memberInfo  );
        //Vo 에 담기
        MemberVo memberVo =  new MemberVo(
                Integer.parseInt( String.valueOf( jo.get("companyNumber") ) ),
                Integer.parseInt(String.valueOf( jo.get("memberNumber") )),
                (String) (jo.get("memberId")),
                (String) (jo.get("password")),
                (String) (jo.get("memberName")),
                (String) (jo.get("phone")),
                (String) (jo.get("email"))
                );
        //매퍼 보내기
        boolean result=memberMapper.signup(memberVo);
        if(result){
            return true;
        }else{
            return false;
        }
    }
}
