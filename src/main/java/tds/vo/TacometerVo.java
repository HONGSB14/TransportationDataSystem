package tds.vo;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class TacometerVo {

    private int company_number;     //회사번호
    private String carNumber ;          //차번호
    private int flux;                              //유량
    private int totalMileage;               //총주행거리
    private int mileageFee ;               //실입요금
    private int mileageCardFee;        //카드요금
    private String driverName;          //운전자 이름
    private int driverNumber;           //운전자 번호
    private String startLocation;       //시작위치
    private String date;                      // 시작 위치 날짜

}
