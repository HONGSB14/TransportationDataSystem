package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.service.MemberService;
import tds.vo.MemberVo;

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
            System.out.println(email);
            return memberService.emailCheck(email);
    }

    @PostMapping("/signup")
    public boolean signup(@RequestParam("memberInfo")Map<String,Object> memberInfo){
        System.out.println(memberInfo.toString());
        return false;
    }

}
