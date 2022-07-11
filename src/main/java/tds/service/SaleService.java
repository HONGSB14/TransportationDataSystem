package tds.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import tds.dto.SaleDto;
import tds.mapper.SaleMapper;
import tds.vo.SaleVo;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class SaleService {

    @Autowired
    private SaleMapper saleMapper;

    public boolean registration(String slipForm){

        //데이터 제이슨으로 변환
        JSONObject jo = new JSONObject(slipForm);
        //제이슨을 DTO로 변환
        SaleDto saleDto = new SaleDto(
                Integer.parseInt(String.valueOf(jo.get("companyNumber"))) ,
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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String todayResistration=sdf.format(date);

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
      boolean result=saleMapper.registration(saleVo);
        if(result){
            return true;
        }else{
            return false;
        }
    }







}
