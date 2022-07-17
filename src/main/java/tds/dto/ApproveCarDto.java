package tds.dto;


import lombok.*;

@Getter@Setter
@NoArgsConstructor@AllArgsConstructor
@ToString
public class ApproveCarDto {

    private String approveCarId;			    //차량 승인 아이디
    private String approveCarNumber;    //차량 승인 번호
    private String state;			                    //차량 승인  상태
}
