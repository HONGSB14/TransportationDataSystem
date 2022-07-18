package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.service.CarService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/car")
public class CarController {

    @Autowired
    private CarService carService;

    //CarRegistration.js // DataInfo.js
    @GetMapping("/getSession")
    public Map<String,Object> getSession(HttpServletRequest request){
        Map<String,Object> map= new HashMap<>();
        int companyNumber=(Integer)request.getSession().getAttribute("companyNumber");
        map.put("companyNumber",companyNumber);
        return map;
    }
    //DataInfo.js
    @PostMapping("/getCarInfo")
    public void getCarInfo(@RequestParam("companyNumber") int companyNumber, HttpServletResponse response){

        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(carService.getCarInfo(companyNumber));
        }catch(Exception e){
            System.out.println("getCarInfo json err!! "+e);
        }
    }
    //CarRegistration.js
    @GetMapping("/selectCarNumber")
    public void selectCarNumber(HttpServletResponse response){
        try{
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(carService.selectCarNumber());
        }catch(Exception e){
            System.out.println("selectCarNumber json err!! "+e);
        }
    }

    //CarRegistration.js
    @PostMapping("/getApproveCarId")
    public void getApproveCarId(@RequestParam("approveCarNumber")String approveCarNumber,HttpServletResponse response){
        System.out.println(approveCarNumber);
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(carService.getApproveCarId(approveCarNumber));
        }catch(Exception e){
            System.out.println("getApproveCarId json err!! "+e);
        }
    }

    //CarRegistration.js
    @GetMapping("/carRegistration")
    public boolean carRegistration(@RequestParam("carList") String carList){
        return carService.carRegistration(carList);
    }
    //CarRegistration.js
    @GetMapping("/getCarList")
    public void getCarList(@RequestParam("companyNumber") int companyNumber,HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(carService.getCarList(companyNumber));
        }catch(Exception e){
            System.out.println("getCarList   json err!! "+e);
        }
    }

    @GetMapping("approveCarList")
    public void approveCarList(HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(carService.approveCarList());
        }catch(Exception e){
            System.out.println("approveCarList json err!!  :"+e);
        }
    }
}
