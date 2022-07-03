package tds.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tds.mapper.CompanyMapper;

@Service
public class CompanyService {

    @Autowired
    private CompanyMapper companyMapper;
    public boolean check(String crn, String name){
        companyMapper.companyCheck(crn,name);
        return true;
    }
}
