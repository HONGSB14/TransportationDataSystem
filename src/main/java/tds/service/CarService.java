package tds.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import tds.dto.ApproveCarDto;
import tds.dto.CarDto;
import tds.mapper.CarMapper;
import tds.vo.ApproveCarVo;
import tds.vo.CarVo;

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
        CarVo carVo = new CarVo(
                carDto.getCompanyNumber(),
                carDto.getCarNumber(),
                carDto.getCarId(),
                carDto.getType(),
                carDto.getCarName(),
                carDto.getFuelType()
        );

       boolean result=carMapper.carRegistration(carVo);
        if(result){
            carMapper.stateUpdate(carVo.getCarId());
            return true;
        }else{
            return false;
        }
    }


    public JSONArray getCarList(int companyNumber){
        List<CarVo> list=carMapper.getCarList(companyNumber);
        JSONArray ja =new JSONArray();
        for(CarVo carVo : list){
            JSONObject jo =new JSONObject();
            jo.put("carNumber",carVo.getCarNumber());
            jo.put("carId",carVo.getCarId());
            jo.put("type",carVo.getType());
            jo.put("carName",carVo.getCarName());
            jo.put("fuelType",carVo.getFuelType());
            ja.put(jo);
        }
            return ja;
    }

    public JSONArray approveCarList(){
        List<ApproveCarVo> list =carMapper.approveCarList();
        JSONArray ja =new JSONArray();
        for(ApproveCarVo vo :list) {
            JSONObject jo = new JSONObject();
            jo.put("approveCarId", vo.getApproveCarId());
            jo.put("approveCarNumber", vo.getApproveCarNumber());
            ja.put(jo);
        }
        return ja;
    }
}
