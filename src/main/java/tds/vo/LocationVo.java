package tds.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor@AllArgsConstructor
public class LocationVo {
    private int companyNumber;      //회사번호
    private int locationNumber;        //pk
    private String coordinate;            //좌표
    private String carNumber;          // 차량번호
    private String date;                      //날짜
}
