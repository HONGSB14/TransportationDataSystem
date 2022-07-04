package tds.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tds.vo.CompanyVo;

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

    @GetMapping("/company/success")
    public String companySuccess(){
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