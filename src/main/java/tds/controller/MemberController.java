package tds.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.service.MemberService;
import tds.vo.MemberVo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired
    private MemberService memberService;
    //아이디 유효성 검사
    @GetMapping("/idCheck")
    public boolean idCheck(@RequestParam("memberId")String memberId){
       return  memberService.idCheck(memberId);
    }

    @GetMapping("/emailCheck")
    public boolean emailCheck(@RequestParam("emailFinal") String email){
            return memberService.emailCheck(email);
    }

    @GetMapping("/signup")
    public boolean signup( @RequestParam("memberInfo") String memberInfo ){  //JS 에서 받아온 json 을 String 으로 변환
        return memberService.signup( memberInfo );
    }

}
