package tds.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DriverVo {
    private int companyNumber;
    private int driverNumber;
    private String name;
    private String note;
    private String date;
}
