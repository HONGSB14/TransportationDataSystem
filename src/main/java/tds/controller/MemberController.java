package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
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
    @GetMapping("/findIdSuccess")
    public void findIdSuccess(HttpServletRequest request, HttpServletResponse response){
        String findIdName=(String)request.getSession().getAttribute("findIdName");
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print( memberService.findIdSuccess(findIdName));
        }catch(Exception e){
            System.out.println("json err !!"+e);
        }
    }
    @PostMapping("/findPassword")
    public boolean findPassowrd(@RequestParam("memberId") String memberId, @RequestParam("memberName") String memberName){
        return memberService.findPassword(memberId,memberName);
    }

    @GetMapping("/authenticationNumber")
    @ResponseBody
    public Map<String , Object> authenticationNumber(@RequestParam("memberId") String memberId, HttpServletResponse response){
        Map<String,Object> map=new HashMap<>();
        String number=memberService.authenticationNumber(memberId);
        map.put("number",number);
        return map;
    }

    @PutMapping("/passwordUpdate")
    public boolean passwordUpdate(@RequestParam("password") String password,HttpServletRequest request){

        String id=(String)request.getSession().getAttribute("id");

        return memberService.passwordUpdate(id,password);
    }

}
