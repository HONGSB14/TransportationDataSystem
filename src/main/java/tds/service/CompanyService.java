package tds.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.mapper.CompanyMapper;

@Service
@RequiredArgsConstructor
public class CompanyService {

    @Autowired
    private final CompanyMapper companyMapper;
    //회사 유효성 검사
    public boolean check(int crn, String name){

        String result= companyMapper.companyCheck(crn,name);

        if(result == null){ //만약 검색이 된다면 실패
            return true;
        }else{
            return false;
        }
    }

    //회사 고유번호 검사
    public boolean numberCheck(String cnum){
      String result= companyMapper.numberCheck(cnum);
        if (result == null){
            return true;
        }else{
            return false;
        }
    }
}
