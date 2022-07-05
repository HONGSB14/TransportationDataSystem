package tds.controller;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.service.CompanyService;
import tds.vo.CompanyVo;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
    @Autowired
    private final CompanyService companyService;

    //회사 유효성 검사
    @PostMapping("/check")
    public boolean companyCheck(@RequestParam("crn") String crn, @RequestParam("name") String name){

        return companyService.check(crn,name);

    }
    //회사 고유번호 체크
    @PostMapping("/numberCheck")
    public boolean numberCheck(@RequestParam("cnum") int cnum){
        return companyService.numberCheck(cnum);
    }

     //회사 가입
    @PostMapping("/signup")
    public boolean signup(CompanyVo companyVo){
        return companyService.signup(companyVo);
    }

    //회사 정보
    @PostMapping("/info")
    public void info(HttpServletRequest request, HttpServletResponse response){
        int companyNumber=(Integer)request.getSession().getAttribute("companyNumber");
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(companyService.info(companyNumber));
        }catch(Exception e){
            System.out.println("JSON 에러 경로:/company/info" +e);
        }
    }
}
