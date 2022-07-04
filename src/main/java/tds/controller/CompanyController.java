package tds.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tds.service.CompanyService;


@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
    @Autowired
    private final CompanyService companyService;
    //회사 유효성 검사
    @PostMapping("/check")
    public boolean companyCheck(@RequestParam("crn") int crn, @RequestParam("name") String name){

        return companyService.check(crn,name);

    }
    //회사 고유번호 체크
    @PostMapping("/numberCheck")
    public boolean numberCheck(@RequestParam("cnum") String cnum){
            return companyService.numberCheck(cnum);
    }

}
