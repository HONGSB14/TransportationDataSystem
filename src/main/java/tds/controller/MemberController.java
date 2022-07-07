package tds.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.service.MemberService;
import tds.vo.MemberVo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

    @PostMapping("/loginSession")
    public void loginSession(@RequestParam("companyNumber") int companyNumber, HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session != null){    //만약 세션이 비어있지 않다면
            session.setAttribute("companyNumber",null); //해당 세션을 초기화
        }
        //세션을 다시 입력
        request.getSession().setAttribute("companyNumber",companyNumber);
    }
    @GetMapping("/login/{loginFalse}")
    @ResponseBody
    public String loginFalse(@PathVariable("loginFalse") String loginFalse){
        return loginFalse;
    }

    @PostMapping("/findId")
    @ResponseBody
    public Map<String , Object> findId(@RequestParam("memberName") String memberName, @RequestParam("email") String email){

        Map<String , Object>map = memberService.findId(memberName,email);
         return map;
    }
    @PostMapping("/findIdSuccess")
    @ResponseBody
    public Map<String,Object> findSuccess(String findId ,String findName ){

        Map<String,Object> map=new HashMap<>();
        map.put("findId",findId);
        map.put("findName",findName);
        System.out.println(map.toString());
        return map;
    }

}
