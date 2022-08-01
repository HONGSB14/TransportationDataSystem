package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tds.service.DataService;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/data")
public class DataController {

    @Autowired
    private DataService dataService;

    @GetMapping("/weekInfo")
    public void weekInfo(@RequestParam("companyNumber")int companyNumber, HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(dataService.weekInfo(companyNumber));
        }catch(Exception e){
            System.out.println("weekInfo json err!! "+e);
        }
    }


    @GetMapping("/monthInfo")
    public void monthInfo(@RequestParam("companyNumber")int companyNumber, HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(dataService.monthInfo(companyNumber));
        }catch(Exception e){
            System.out.println("weekInfo json err!! "+e);
        }
    }


    @GetMapping("/yearInfo")
    public void yearInfo(@RequestParam("companyNumber")int companyNumber, HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(dataService.yearInfo(companyNumber));
        }catch(Exception e){
            System.out.println("weekInfo json err!! "+e);
        }
    }
}
