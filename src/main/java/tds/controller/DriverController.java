package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.service.DriverService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("/getSession")
    public Map<String,Object> getSession(HttpServletRequest request){
        Map<String,Object> map = new HashMap<>();
        int companyNumber=(Integer)request.getSession().getAttribute("companyNumber");
        map.put("companyNumber", companyNumber);
        return map;
    }

    @PostMapping("/driverSignup")
    public boolean driverSignup(@RequestParam("companyNumber") int companyNumber, @RequestParam("driverName") String driverName, @RequestParam("driverNote")String driverNote){

        return driverService.driverSignup(companyNumber,driverName,driverNote);
    }

    @GetMapping("/driverList")
    public void driverList(@RequestParam("companyNumber")int companyNumber,HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(driverService.driverList(companyNumber));
        }catch(Exception e){
            System.out.println("driverList json err!! " +e);
        }
    }
    @DeleteMapping("/driverDelete")
    public boolean driverDelete(@RequestParam(value="driverNumber[]")List<Integer> driverNumber){

        return driverService.driverDelete(driverNumber);

    }
}
