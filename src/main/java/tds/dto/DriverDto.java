package tds.dto;

import lombok.*;

@AllArgsConstructor@NoArgsConstructor
@Getter @Setter
@ToString
public class DriverDto {
    private int companyNumber;
    private int driverNumber;
    private String name;
    private String note;
    private String date;
}
