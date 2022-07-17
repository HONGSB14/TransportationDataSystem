package tds.dto;

import lombok.*;

@Getter@Setter
@NoArgsConstructor @AllArgsConstructor
@ToString
public class CarDto {

    private int companyNumber;		//회사번호
    private String carNumber;		    //차량번호
    private String carId;		                //차량 등록번호
    private String carType;		        //차량 종류
    private String carName;		        //차량 이름
    private String fuelType;	            //차량 연료타입

}
