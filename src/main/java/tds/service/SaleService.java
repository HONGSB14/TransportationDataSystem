package tds.service;


import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.dto.SaleDto;
import tds.mapper.SaleMapper;
import tds.vo.SaleVo;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.apache.ibatis.ognl.DynamicSubscript.last;

@Service
public class SaleService {

    @Autowired
    private SaleMapper saleMapper;

    public boolean registration(String slipForm) {

        //데이터 제이슨으로 변환
        JSONObject jo = new JSONObject(slipForm);
        //제이슨을 DTO로 변환
        SaleDto saleDto = new SaleDto(
                Integer.parseInt(String.valueOf(jo.get("companyNumber"))),
                0,
                String.valueOf(jo.get("carNumber")),
                Integer.parseInt(String.valueOf(jo.get("flux"))),
                Integer.parseInt(String.valueOf(jo.get("fee"))),
                Integer.parseInt(String.valueOf(jo.get("cardFee"))),
                Integer.parseInt(String.valueOf(jo.get("totalSale"))),
                String.valueOf(jo.get("note")),
                null
        );

        //시간 타입 만들어주기
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
        String todayResistration = sdf.format(date);

        SaleVo saleVo = new SaleVo(
                saleDto.getCompanyNumber(),
                0,
                saleDto.getCarNumber(),
                saleDto.getFlux(),
                saleDto.getFee(),
                saleDto.getCardFee(),
                saleDto.getTotalSale(),
                saleDto.getNote(),
                todayResistration
        );
        boolean result = saleMapper.registration(saleVo);
        if (result) { //만야 값이 있다면
            return true;
        } else {
            return false;
        }
    }

    public JSONArray mainDayTableView(int companyNumber) {
        List<SaleVo> list = saleMapper.mainDayTableView(companyNumber);

        JSONArray ja = new JSONArray();
        for (SaleVo saleVo : list) {
            JSONObject jo = new JSONObject();
            jo.put("companyNumber", saleVo.getCompanyNumber());
            jo.put("flux", saleVo.getFlux());
            jo.put("fee", saleVo.getFee());
            jo.put("cardFee", saleVo.getCardFee());
            jo.put("totalSale", saleVo.getTotalSale());
            jo.put("date", saleVo.getDate());
            ja.put(jo);
        }
        if (list != null) {
            return ja;
        } else {
            return null;
        }
    }

    public JSONObject mainMonthTableView(int companyNumber) {
        List<SaleVo> list = saleMapper.mainMonthTableView(companyNumber);
        JSONObject jo = new JSONObject();
        for (SaleVo saleVo : list) {
            jo.put("companyNumber", saleVo.getCompanyNumber());
            jo.put("flux", saleVo.getFlux());
            jo.put("fee", saleVo.getFee());
            jo.put("cardFee", saleVo.getFee());
            jo.put("totalSale", saleVo.getTotalSale());
            jo.put("date", saleVo.getDate());
        }

        if (list != null) {
            return jo;
        } else {
            return null;
        }
    }

    public JSONArray tableView(int companyNumber) {
        List<SaleVo> list = saleMapper.tableView(companyNumber);
        JSONArray ja = new JSONArray();
        for (SaleVo saleVo : list) {
            JSONObject jo = new JSONObject();
            jo.put("slipNumber", saleVo.getSlipNumber());
            jo.put("carNumber", saleVo.getCarNumber());
            jo.put("flux", saleVo.getFlux());
            jo.put("fee", saleVo.getFee());
            jo.put("cardFee", saleVo.getCardFee());
            jo.put("totalSale", saleVo.getTotalSale());
            jo.put("note", saleVo.getNote());
            jo.put("date", saleVo.getDate());
            ja.put(jo);
        }
        if (list != null) {
            return ja;
        } else {
            return null;
        }
    }

    public boolean delete(int companyNumber, List<Integer> slipNumber) {
        for (int i = 0; i < slipNumber.size(); i++) {
            int getSlipNumber = slipNumber.get(i);
            saleMapper.delete(companyNumber, getSlipNumber);
        }
        return true;
    }

    public JSONArray dateSearchTable(String searchDate, int companyNumber) {
        List<SaleVo> list = saleMapper.dateSearchTable(searchDate, companyNumber);
        JSONArray ja = new JSONArray();
        for (SaleVo saleVo : list) {
            JSONObject jo = new JSONObject();
            jo.put("slipNumber", saleVo.getSlipNumber());
            jo.put("carNumber", saleVo.getCarNumber());
            jo.put("flux", saleVo.getFlux());
            jo.put("fee", saleVo.getFee());
            jo.put("cardFee", saleVo.getCardFee());
            jo.put("totalSale", saleVo.getTotalSale());
            jo.put("note", saleVo.getNote());
            jo.put("date", saleVo.getDate());
            ja.put(jo);
        }
        return ja;
    }

    public boolean registrationDate(String slipForm) {

        //데이터 제이슨으로 변환
        JSONObject jo = new JSONObject(slipForm);
        //제이슨을 DTO로 변환
        SaleDto saleDto = new SaleDto(
                Integer.parseInt(String.valueOf(jo.get("companyNumber"))),
                0,
                String.valueOf(jo.get("carNumber")),
                Integer.parseInt(String.valueOf(jo.get("flux"))),
                Integer.parseInt(String.valueOf(jo.get("fee"))),
                Integer.parseInt(String.valueOf(jo.get("cardFee"))),
                Integer.parseInt(String.valueOf(jo.get("totalSale"))),
                String.valueOf(jo.get("note")),
                String.valueOf(jo.get("date") + " 00:00:00")
        );
        System.out.println(saleDto.toString());
        SaleVo saleVo = new SaleVo(
                saleDto.getCompanyNumber(),
                0,
                saleDto.getCarNumber(),
                saleDto.getFlux(),
                saleDto.getFee(),
                saleDto.getCardFee(),
                saleDto.getTotalSale(),
                saleDto.getNote(),
                saleDto.getDate()
        );
        boolean result = saleMapper.registrationDate(saleVo);
        if (result) { //만야 값이 있다면
            return true;
        } else {
            return false;
        }
    }

    public boolean update(SaleDto saleDto) {

        SaleVo saleVo = new SaleVo(
                saleDto.getCompanyNumber(),
                saleDto.getSlipNumber(),
                saleDto.getCarNumber(),
                saleDto.getFlux(),
                saleDto.getFee(),
                saleDto.getCardFee(),
                saleDto.getTotalSale(),
                saleDto.getNote(),
                saleDto.getDate()
        );
        return saleMapper.update(saleVo);

    }

    public JSONArray lineChart(int companyNumber) {
        String voDate = "";
        int voTotalSale = 0;
        String dtoDate = "";
        String dd = "";
        String  lastDtoDate="";
        JSONArray ja = new JSONArray();
        //1.DB에서 검색해서 먼저 해당 날짜에 있는 매출액
        List<SaleVo> list = saleMapper.lineChart(companyNumber);
        ArrayList<SaleDto> saleDtoList = new ArrayList<>();
        ArrayList<SaleDto> saleDtoList2 = new ArrayList<>();
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        String yyyyMM = sdf.format(d);
        //저번달 구하기
        Calendar cal = Calendar.getInstance();
        cal.add(cal.MONTH, -1); //한달 전
        String lastMonth = sdf.format(cal.getTime());
        for (int i = 1; i < 32; i++) {
            if (i < 10) {
                dd = "0" + i;
            } else {
                dd = String.valueOf(i);                 //dd 는 1~31 까지 자동생성
            }
            dtoDate = yyyyMM + "-" + dd;        //해당 월을 집어넣기위한 날짜 만들기 ( yyyy-MM-dd)
            lastDtoDate=lastMonth+"-"+dd;
            //2. 반복문을 통해 먼저 날짜별로 매출액을 0원으로  처리
            SaleDto saleDto = new SaleDto(companyNumber, 0, null, 0, 0, 0, 0, null, dtoDate);
            saleDtoList.add(saleDto);

            SaleDto lastSaleDto =new SaleDto(companyNumber, 0, null, 0, 0, 0, 0, null, lastDtoDate);
            saleDtoList2.add(lastSaleDto);
        }

        for (SaleVo saleVo : list) {
            voDate = saleVo.getDate();      //DB에서 추출한 날짜
        }

        for(   SaleDto dto : saleDtoList  ){
           int sum = 0;
            for( SaleVo vo :    list  ){ // db
                voDate = vo.getDate();      //DB에서 추출한 날짜 (yyyy-MM-dd )
                if(voDate.equals(dto.getDate())) {
                    sum += vo.getTotalSale();
                }
            }
            dto.setTotalSale( sum );
        }
        for(   SaleDto dto : saleDtoList    ){

                 JSONObject jo = new JSONObject();
                jo.put("date", dto.getDate());
                jo.put("totalSale", dto.getTotalSale());
                ja.put(jo);
        }
        for(   SaleDto dto : saleDtoList2  ){
            int sum = 0;
            for( SaleVo vo :    list  ){ // db
                voDate = vo.getDate();      //DB에서 추출한 날짜 (yyyy-MM-dd )
                if(voDate.equals(dto.getDate())) {
                    sum += vo.getTotalSale();
                }
            }
            dto.setTotalSale( sum );
        }

        for(   SaleDto dto : saleDtoList2    ){

            JSONObject jo = new JSONObject();
            jo.put("date", dto.getDate());
            jo.put("totalSale", dto.getTotalSale());
            ja.put(jo);
        }


        System.out.println(ja);
        return ja;
    }


    public JSONArray barChart (int companyNumber){
        List<SaleVo> list = saleMapper.barChart(companyNumber);
        JSONArray ja = new JSONArray();
        for(SaleVo saleVo : list){
            JSONObject jo = new JSONObject();
            jo.put("totalSale",saleVo.getTotalSale());
            jo.put("date",saleVo.getDate());
            ja.put(jo);
        }
        if(list !=null){
            return ja;
        }else{
            return null;
        }
    }

}
