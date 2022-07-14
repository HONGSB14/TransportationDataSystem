package tds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tds.dto.SaleDto;
import tds.service.SaleService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @GetMapping("/mainDayTableView")
    public void mainDayTableView(@RequestParam("companyNumber") int companyNumber, HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(saleService.mainDayTableView(companyNumber));
        }catch(Exception e){
            System.out.println("json err  mainDayTableView check !!"+e);
        }
    }

    @GetMapping("/mainMonthTableView")
    public void mainMonthTableView(@RequestParam("companyNumber")int companyNumber,HttpServletResponse response){

        try {
                response.setCharacterEncoding("UTF-8");
                response.setContentType("application/json");
                response.getWriter().print(saleService.mainMonthTableView(companyNumber));
        }catch(Exception e){
               System.out.println("json err  mainMonthTableView check !!"+e);
        }

    }
    @GetMapping("/getDate")
    public Map<String,Object> getDate(HttpServletRequest request){
        String searchDate=(String)request.getSession().getAttribute("searchDate");
        Map<String,Object> map= new HashMap<>();
        map.put("searchDate",searchDate);
        return  map;
    }

    @GetMapping("/dateSearchTable")
    public void dateSearchTable(@RequestParam("searchDate") String searchDate, @RequestParam("companyNumber") int companyNumber,HttpServletResponse response){
        try{
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(saleService.dateSearchTable(searchDate,companyNumber));
        }
        catch(Exception e){
            System.out.println("dateSearchTable json err!!"+e);
        }
    }

    @GetMapping("/registrationDate")
    public boolean registrationDate(@RequestParam("slipForm") String slipForm) {
        return saleService.registrationDate(slipForm);
    }


    @DeleteMapping ("/saleDelete")
    public boolean saleDelete(@RequestParam("companyNumber") int companyNumber , @RequestParam( value="slipNumber[]") List<Integer> slipNumber){
        return saleService.delete(companyNumber,slipNumber);

    }
    @PutMapping("/update")
    public boolean update(@RequestParam("slipNumber")int slipNumber,
                                                @RequestParam("companyNumber")int companyNumber,
                                                @RequestParam("date") String date,
                                                @RequestParam("carNumber") String carNumber,
                                                @RequestParam("fee") int fee,
                                                @RequestParam("cardFee") int cardFee,
                                                @RequestParam("note")String note,
                                                @RequestParam("flux") int flux,
                                                @RequestParam("totalSale") int totalSale) {

        SaleDto saleDto = new SaleDto(companyNumber,slipNumber,carNumber,flux,fee,cardFee,totalSale,note,date);
        return  saleService.update(saleDto);
    }

    @GetMapping("/lineChart")
    public void lineChart(@RequestParam("companyNumber") int companyNumber, HttpServletResponse response){
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.getWriter().print(saleService.mainDayTableView(companyNumber));
        }catch(Exception e){
            System.out.println("json err  mainDayTableView check !!"+e);
        }
    }

}
