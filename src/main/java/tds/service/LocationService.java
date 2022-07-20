package tds.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.dto.LocationDto;
import tds.mapper.LocationMapper;
import tds.vo.LocationVo;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class LocationService {

    @Autowired
    private LocationMapper locationMapper;
    //좌표 저장
    public boolean locationData(String coordinate,String carNumber,int companyNumber){
        //날짜 생성
        Date d =new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh-mm-ss");
        String date=sdf.format(d);
      //dto로 변환
      LocationDto locationDto =new LocationDto(companyNumber,0,coordinate,carNumber,date);
       //dto --> vo
      LocationVo  locationVo = new LocationVo(
                locationDto.getCompanyNumber(),
                0,
                locationDto.getCoordinate(),
                locationDto.getCarNumber(),
                locationDto.getDate()
        );
        //입력
        return locationMapper.locationData(locationVo);
    }
}
