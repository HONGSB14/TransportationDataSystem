package tds.dto;

import lombok.*;

@AllArgsConstructor @NoArgsConstructor
@Getter@Setter
@ToString
public class LocationDto {
    private int companyNumber;      //회사번호
    private int locationNumber;        //pk
    private String coordinate;            //좌표
    private String carNumber;          // 차량번호
    private String date;                      //날짜
}
