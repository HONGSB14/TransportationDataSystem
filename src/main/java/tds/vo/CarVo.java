package tds.vo;

import lombok.*;

@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CarVo {

    private int companyNumber;		//회사번호
    private String carNumber;		    //차량번호
    private String carId;		                //차량 등록번호
    private String type;		        //차량 종류
    private String carName;		        //차량 이름
    private String fuelType;	            //차량 연료타입

}
