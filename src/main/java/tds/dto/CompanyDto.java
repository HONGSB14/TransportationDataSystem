package tds.dto;

import lombok.*;

@Getter@Setter
@NoArgsConstructor@AllArgsConstructor
@ToString
public class CompanyDto {
    private int companyNumber;   //회사고유번호
    private String crn;                      //회사 사업자번호
    private String price;                   //상품가격
    private String companyName; //회사명
}
