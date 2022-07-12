package tds.controller;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.dto.SaleDto;
import tds.service.SaleService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sale")
public class SaleController {

    @Autowired
    private SaleService saleService;
    @GetMapping("/getSession")
    public Map<String,Object> getSession(HttpServletRequest request){
        Map<String,Object> map= new HashMap<>();
        int companyNumber=(Integer)request.getSession().getAttribute("companyNumber");
        map.put("companyNumber",companyNumber);
        return map;
    }

    @GetMapping("/registration")
    public boolean registration(@RequestParam("slipForm") String slipForm) {
        return saleService.registration(slipForm);
    }

    @GetMapping("/tableView")
    public void tableVIew(@RequestParam("companyNumber") int companyNumber, HttpServletResponse response){

        try{
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(saleService.tableView(companyNumber));
        }catch (Exception e){
            System.out.println("json err  tableView check !!"+e);
        }

    }

    @DeleteMapping ("/saleDelete")
    public boolean saleDelete(@RequestParam("companyNumber") int companyNumber , @RequestParam( value="slipNumber[]") List<Integer> slipNumber){
        return saleService.delete(companyNumber,slipNumber);

    }
}
