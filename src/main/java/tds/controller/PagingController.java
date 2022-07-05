package tds.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tds.vo.CompanyVo;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/page")

public class PagingController {

    ////////////////////////////////productInfo paging////////////////////////////////////////////////
    @GetMapping("/productInfo")
    public String productInfo(){
        return "com.tds.productinfo/productinfo";
    }

    ////////////////////////////////////Company paging////////////////////////////////////////////////
    @GetMapping("/company/signup")
    public String companySignup(){
        return "com.tds.company/signup";
    }

    @GetMapping("/company/success/{companyNumber}")
    public String companySuccess(@PathVariable("companyNumber") int companyNumber , HttpServletRequest request){
        //세션에 값을 저장
        request.getSession().setAttribute("companyNumber",companyNumber);
        return "com.tds.company/success";
    }

    ////////////////////////////////// //member paging////////////////////////////////////////////////

    @GetMapping("/member/login")
    public String memberLogin(){
        return "com.tds.member/login";
    }

    @GetMapping("/member/signup")
    public String memberSignup(){
        return "com.tds.member/signup";
    }

}