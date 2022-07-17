package tds.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor@AllArgsConstructor
@Getter@ToString
public class ApproveCarVo {

    private String approveCarId;	     //차량 승인 아이디
    private String approveCarNumber;		//차량 승인 번호
    private String state;			            //차량 승인  상태
}
