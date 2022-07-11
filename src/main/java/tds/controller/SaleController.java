package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tds.dto.SaleDto;
import tds.service.SaleService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
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
}
