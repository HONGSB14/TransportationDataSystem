package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
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


    ////////////////////////////////PRODUCT INFO PAGE////////////////////////////////////////////////
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

    ////////////////////////////////////MEMBER PAGE////////////////////////////////////////////////

    @GetMapping("/member/login")
    public String memberLogin(){
        return "com.tds.member/login";
    }

    @GetMapping("/member/signup")
    public String memberSignup(){
        return "com.tds.member/signup";
    }

    @GetMapping("/member/agreement")
    public String memberAgreement(){
        return "com.tds.member/agreement";
    }

    @GetMapping("/member/signupSuccess")
    public String memberSignupsuccess(){
        return "com.tds.member/signupsuccess";
    }

    @GetMapping("/member/findid")
    public String findId(){
        return "com.tds.member/findid";
    }

    @GetMapping("/member/findIdSuccess/{findId}/{findName}")
    public String findIdSuccess(@PathVariable("findId") String findId, @PathVariable("findName") String findName,HttpServletRequest request){
        String findIdName=findId+","+findName;
        request.getSession().setAttribute("findIdName",findIdName);
        return "com.tds.member/findidsuccess";
    }
    @GetMapping("/member/findPassword")
    public String findPassword(){
        return "com.tds.member/findpassword";
    }

    @GetMapping("/member/findPasswordSuccess/{id}")
    public String findPasswordSuccess(@PathVariable("id") String id,HttpServletRequest request){
        request.getSession().setAttribute("id",id);
        return "com.tds.member/findpasswordsuccess";
    }
    ///////////////////////////////////////SALE PAGE ////////////////////////////////////////////////////////////
    @GetMapping("/sale/mainSaleTable")
    public String mainSaleTable(){
        return "com.tds.sale/mainsaletable";
    }

    @GetMapping("/sale/registration")
    public String saleResistration(){
        return "com.tds.sale/registration";
    }
}