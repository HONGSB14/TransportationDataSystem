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
    public boolean check(String crn, String name){

        String result= companyMapper.companyCheck(crn,name);

        if(result == null){ //만약 검색이 된다면 실패
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
        jo.put("name",mapList.get("name"));
        jo.put("crn",mapList.get("crn"));
        return jo;
    }
}
