package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tds.service.MemberService;


@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired
    private MemberService memberService;
    //아이디 유효성 검사
    @GetMapping("/idCheck")
    public boolean idCheck(@RequestParam("id")String id){
       return  memberService.idCheck(id);
    }

    @GetMapping("/emailCheck")
    public boolean emailCheck(@RequestParam("emailFinal") String email){
            System.out.println(email);
            return memberService.emailCheck(email);
    }

}
