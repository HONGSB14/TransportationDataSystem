package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tds.service.CompanyService;


@RestController
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @PostMapping("/check")
    public boolean companyCheck(@RequestParam("crn") String crn, @RequestParam("name") String name){
        companyService.check(crn,name);
        return true;
    }

}
