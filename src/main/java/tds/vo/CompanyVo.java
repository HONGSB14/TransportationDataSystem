package tds.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CompanyVo {
    private String companyNumber;   //회사고유번호
    private int crn;                                 //회사 사업자번호
    private String price;                        //상품가격
    private String name;                       //회사명
}
