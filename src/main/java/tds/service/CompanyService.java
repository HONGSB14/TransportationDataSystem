package tds.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.mapper.CompanyMapper;
import tds.vo.CompanyVo;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CompanyService {
    @Autowired
    private final CompanyMapper companyMapper;
    //회사 유효성 검사
    public boolean check(String crn, String companyName){

        String result= companyMapper.companyCheck(crn,companyName);

        if(result == null){ //만약 검색값이 없다면
            return true;
        }else{
            return false;
        }
    }

    //회사 고유번호 검사
    public boolean numberCheck(int cnum){
      String result= companyMapper.numberCheck(cnum);
        if (result == null){
            return true;
        }else{
            return false;
        }
    }
    //회사 가입
    public boolean signup(CompanyVo companyVo){
       return companyMapper.signup(companyVo);
    }

    //회사 정보
    public JSONObject info(int companyNumber){
        Map<String,Object> mapList=companyMapper.info(companyNumber);
        JSONObject jo=new JSONObject();
        jo.put("companyNumber",mapList.get("company_number"));
        jo.put("price",mapList.get("price"));
        jo.put("companyName",mapList.get("company_name"));
        jo.put("crn",mapList.get("crn"));
        return jo;
    }

    //회사 고유 번호 가져오기
    public String findNumber(String crn,String companyName){
        return companyMapper.findNumber(crn,companyName);
    }
}
