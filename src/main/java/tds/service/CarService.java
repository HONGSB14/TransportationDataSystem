package tds.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.dto.ApproveCarDto;
import tds.dto.CarDto;
import tds.mapper.CarMapper;
import tds.vo.ApproveCarVo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CarService {

    @Autowired
    private CarMapper carMapper;


    public JSONArray getCarInfo(int companyNumber){

        Map<String,Object> carList=carMapper.getCarInfo(companyNumber);

      return null;
    }

    public JSONArray selectCarNumber(){
       List<ApproveCarVo> list=carMapper.selectCarNumber();
        JSONArray  ja= new JSONArray();
        for(ApproveCarVo vo : list){
            JSONObject jo = new JSONObject();
            jo.put("approveCarId",vo.getApproveCarId());
            jo.put("approveCarNumber",vo.getApproveCarNumber());
            jo.put("state",vo.getState());
            ja.put(jo);
        }
        return ja;
    }

    public JSONObject getApproveCarId(String approveCarNumber){
        String approveCarId = carMapper.getApproveCarId(approveCarNumber);
       JSONObject jo = new JSONObject();
       jo.put("approveCarId",approveCarId);
       return jo;
    }
    public boolean carRegistration(String carList){
        JSONObject jo = new JSONObject(carList);
        CarDto carDto =new CarDto(
                 Integer.parseInt(String.valueOf(jo.get("companyNumber"))) ,
                (String)jo.get("carNumber"),
                (String)jo.get("carId"),
                (String)jo.get("type"),
                (String)jo.get("carName"),
                (String)jo.get("fuelType")
        );
        System.out.println(carDto.toString());

        return false;
    }

}
