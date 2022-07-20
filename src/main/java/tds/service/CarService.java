package tds.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.dto.CarDto;
import tds.mapper.CarMapper;
import tds.vo.ApproveCarVo;
import tds.vo.CarVo;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;


@Service
public class CarService {

    @Autowired
    private CarMapper carMapper;


    public JSONArray getCarInfo(int companyNumber){
        List<CarVo> list=carMapper.getCarInfo(companyNumber);
        JSONArray ja =new JSONArray();
        for(CarVo carVo : list ){
            JSONObject jo= new JSONObject();
            jo.put("carId",carVo.getCarId());
            jo.put("carNumber",carVo.getCarNumber());
            ja.put(jo);
        }
      return ja;
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

    public boolean carDelete(List<String> carId){

        for(int i=0; i<carId.size(); i++){
           boolean result= carMapper.carDelete(carId.get(i));
           if(result){
               carMapper.stateUpdate2(carId.get(i));
           }else{
               return false;
           }
        }
        return true;
    }

    public JSONArray carInfo(int companyNumber){
        List<CarVo> list=carMapper.getCarInfo(companyNumber);
        JSONArray ja = new JSONArray();
        try {
            for(CarVo carVo :list){

                String carId=carVo.getCarId();

            StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/buspos/getBusPosByVehId"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=V1D0RoBJCl1PTrNrdovcJHzbZkwiiyLMbHx%2FsQfaQfsvS0iIM3OQ2x91yr6PXyIFl0hj0ETaeC1Fvd0WoSMHmg%3D%3D"); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("vehId", "UTF-8") + "=" + URLEncoder.encode(carId, "UTF-8")); /*노선ID*/
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }

            JSONObject jo = XML.toJSONObject(String.valueOf(sb));
            JSONObject ServiceResult=jo.getJSONObject("ServiceResult");
            JSONObject msgBody=ServiceResult.getJSONObject("msgBody");
            JSONObject itemList=msgBody.getJSONObject("itemList");
            ja.put(itemList);
            rd.close();
           conn.disconnect();
            }

        }catch (Exception e) {
            System.out.println("carInfo err:"+e);
        }
        return ja;
    }
}
