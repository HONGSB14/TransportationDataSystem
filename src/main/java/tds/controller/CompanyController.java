package tds.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.dto.CompanyDto;
import tds.service.CompanyService;

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
    public boolean companyCheck(@RequestParam("crn") String crn, @RequestParam("companyName") String companyName){

        return companyService.check(crn,companyName);

    }
    //회사 고유번호 체크
    @PostMapping("/numberCheck")
    public boolean numberCheck(@RequestParam("cnum") int cnum){
        return companyService.numberCheck(cnum);
    }

    //회사 고유 번호 리턴
    @PostMapping("/findNumber")
    public int number(@RequestParam("crn")String crn,@RequestParam("companyName") String companyName){
        int number=Integer.parseInt(companyService.findNumber(crn,companyName));
        return number;
    }

     //회사 가입
    @PostMapping("/signup")
    public boolean signup(CompanyDto companyDto){
        return companyService.signup(companyDto);
    }

    //회사 정보 가져오기
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
