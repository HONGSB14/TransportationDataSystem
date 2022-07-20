package tds.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.dto.DriverDto;
import tds.mapper.DriverMapper;
import tds.vo.DriverVo;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class DriverService {

    @Autowired
    private DriverMapper driverMapper;

    public  boolean driverSignup(int companyNumber,String driverName, String driverNote){
       //드라이버 ID를 위한 랜덤 변수 생성
        Random random = new Random();
        int driverNumber= random.nextInt(999999)+100000;
        //가입 기입날짜 생성
        Date d= new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String date=sdf.format(d);
        //Dto 생성
        DriverDto driverDto = new DriverDto(companyNumber,driverNumber,driverName,driverNote,date);
        ///DTO -> VO 변환
        DriverVo driverVo = new DriverVo(
                driverDto.getCompanyNumber(),
                driverDto.getDriverNumber(),
                driverDto.getName(),
                driverDto.getNote(),
                driverDto.getDate()
        );
        //중복체크
       String numberCheck=String.valueOf(driverMapper.driverNumberCheck(driverVo.getDriverNumber()));
       if(numberCheck.equals("null")){ //검색 값이 없다면 (중복이 아니라면)
            boolean result=driverMapper.driverSignup(driverVo);
            if(result){  //등록 성공했다면
                return true;
            }else{  //등록 성공을 하지 못했다면
                return false;
            }
        }else{  //검색값이 있다면 (중복이라면)
                return false;
        }
    }

    public JSONArray driverList(int companyNumber){
        List<DriverVo> list=driverMapper.driverList(companyNumber);
        JSONArray ja= new JSONArray();
        for(DriverVo driverVo : list){
            String date=driverVo.getDate().split(" ")[0];
            JSONObject jo=new JSONObject();
            jo.put("driverNumber",driverVo.getDriverNumber());
            jo.put("name",driverVo.getName());
            jo.put("note",driverVo.getNote());
            jo.put("date",date);
            ja.put(jo);
        }
        return ja;
    }

    public boolean driverDelete(List<Integer> driverNumber){
        for(int i=0; i<driverNumber.size(); i++){
          boolean result= driverMapper.driverDelete(driverNumber.get(i));
              if(result==false){
                  return false;
              }
        }
        return true;
    }
}
