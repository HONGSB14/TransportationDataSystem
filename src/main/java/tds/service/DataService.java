package tds.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.dto.TacometerDto;
import tds.mapper.TacometerMapper;
import tds.vo.TacometerVo;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DataService {

    @Autowired
    private TacometerMapper tacometerMapper;

    public JSONArray weekInfo(int companyNumber){
       List<TacometerVo> locationList=tacometerMapper.getLocation(companyNumber);

        //날짜 객체 생성
        Date newDate = new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        String date=sdf.format(newDate);
        int year=Integer.parseInt(date.split("-")[0]);
        int month=Integer.parseInt(date.split("-")[1]);
        int day=Integer.parseInt(date.split("-")[2]);
        JSONArray ja= new JSONArray();
        for(TacometerVo vo : locationList){
            String today=vo.getDate().split(" ")[0];
            int tacoYear=Integer.parseInt( today.split("-")[0]);
            int tacoMonth=Integer.parseInt( today.split("-")[1]);
            int tacoDay=Integer.parseInt( today.split("-")[2]);
            int realDay=(day-tacoDay);

            if(realDay<7 && realDay>=0 && month==tacoMonth && year==tacoYear||-24>=realDay) {

                if(vo.getStartLocation() !=null) {
                    String locationY=vo.getStartLocation().split(",")[0];
                    String locationX=vo.getStartLocation().split(",")[1];
                    JSONObject jo = new JSONObject();
                    jo.put("locationY", locationY);
                    jo.put("locationX", locationX);
                    jo.put("date",vo.getDate());
                    ja.put(jo);
                }else {
                    System.out.println("NULL POINER");
                }
            }
        }
        return ja;
    }

    public JSONArray monthInfo(int companyNumber) {

        List<TacometerVo> locationList = tacometerMapper.getLocation(companyNumber);
        //날짜 객체 생성
        Date newDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String date = sdf.format(newDate);
        int year = Integer.parseInt(date.split("-")[0]);
        int month = Integer.parseInt(date.split("-")[1]);
        JSONArray ja = new JSONArray();

        for (TacometerVo vo : locationList) {
            String today = vo.getDate().split(" ")[0];
            int tacoYear = Integer.parseInt(today.split("-")[0]);
            int tacoMonth = Integer.parseInt(today.split("-")[1]);
            if (month == tacoMonth && year == tacoYear) {
                if (vo.getStartLocation() != null) {
                    String locationY = vo.getStartLocation().split(",")[0];
                    String locationX = vo.getStartLocation().split(",")[1];
                    JSONObject jo = new JSONObject();
                    jo.put("locationY", locationY);
                    jo.put("locationX", locationX);
                    jo.put("date", vo.getDate());
                    ja.put(jo);
                }
            }
        }
        return ja;
    }

    public JSONArray yearInfo(int companyNumber) {
        List<TacometerVo> locationList = tacometerMapper.getLocation(companyNumber);
        //날짜 객체 생성
        Date newDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String date = sdf.format(newDate);
        int year = Integer.parseInt(date.split("-")[0]);
        JSONArray ja = new JSONArray();

        for (TacometerVo vo : locationList) {
            String today = vo.getDate().split(" ")[0];
            int tacoYear = Integer.parseInt(today.split("-")[0]);

            if( year==tacoYear) {
                if (vo.getStartLocation() != null) {
                    String locationY = vo.getStartLocation().split(",")[0];
                    String locationX = vo.getStartLocation().split(",")[1];
                    JSONObject jo = new JSONObject();
                    jo.put("locationY", locationY);
                    jo.put("locationX", locationX);
                    jo.put("date", vo.getDate());
                    ja.put(jo);
                }
            }
        }
        return ja;
    }

}
