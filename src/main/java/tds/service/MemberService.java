package tds.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tds.dto.LoginDto;
import tds.dto.MemberDto;
import tds.mapper.MemberMapper;
import tds.vo.MemberVo;
import tds.vo.Role;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;


@Service
public class MemberService implements UserDetailsService {


    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private HttpServletRequest request;

    //재정의 가 된 UserDetail
    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {

        int companyNumber = (Integer) request.getSession().getAttribute("companyNumber");

        MemberVo memberVo = memberMapper.login(memberId, companyNumber);

        if (memberVo == null) {

        } else {
            return LoginDto.builder()
                    .memberId(memberVo.getMemberId())
                    .password(memberVo.getPassword())
                    .memberName(memberVo.getMemberName())
                    .companyNumber(memberVo.getCompanyNumber())
                    .authorities(Collections.singleton(new SimpleGrantedAuthority(memberVo.getRole().getKey())))
                    .build();
        }
        return null;
    }

    //아이디 유효성 검사
    public boolean idCheck(String memberId) {
        String id = memberMapper.idCheck(memberId);
        if (id == null) {
            return true;
        } else {
            return false;
        }
    }

    //이메일 유효성 검사
    public boolean emailCheck(String email) {
        String emailCheck = memberMapper.emailCheck(email);
        if (emailCheck == null) {
            return true;
        } else {
            return false;
        }
    }

    //회원 가입
    public boolean signup(String memberInfo) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        // controller 에서 받아온 String 값을 json 으로 형 변환
        JSONObject jo = new JSONObject(memberInfo);
        //Dto 에 담기
        MemberDto memberDto = new MemberDto(
                Integer.parseInt(String.valueOf(jo.get("companyNumber"))),
                Integer.parseInt(String.valueOf(jo.get("memberNumber"))),
                (String) (jo.get("memberId")),
                encoder.encode((String) (jo.get("password"))),    //암호화
                (String) (jo.get("memberName")),
                (String) (jo.get("phone")),
                (String) (jo.get("email"))
        );
        //Dto--> VO 이동
        MemberVo memberVo = new MemberVo(
                memberDto.getCompanyNumber()
                , memberDto.getMemberNumber()
                , memberDto.getMemberId()
                , memberDto.getPassword()
                , memberDto.getMemberName()
                , memberDto.getPhone()
                , memberDto.getEmail()
                , Role.MEMBER);
        //매퍼 보내기
        boolean result = memberMapper.signup(memberVo);
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    //아이디 찾기
    public Map<String,Object> findId(String memberName, String email) {

        Map<String, Object> map = memberMapper.findId(memberName, email);

        if (map != null) {
            return map ;
        }else{
            return null;
        }
    }
}
