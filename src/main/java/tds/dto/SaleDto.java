package tds.dto;

import lombok.*;

@ToString
@Getter@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleDto {
    private int companyNumber; //회사번호
    private int slipNumber;          //매출표 번호
    private String carNumber;     //차량번호
    private int flux;                       //유량
    private int fee;                        //실입요금
    private int cardFee;               //카드요금
    private int totalSale;              //총 매출
    private String note;                //비고
    private String date;                //날짜
}
