package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.vo.DriverVo;

import java.util.List;

@Mapper
public interface DriverMapper {
    boolean driverSignup(DriverVo driverVo);

    String driverNumberCheck(int driverNumber);

    List<DriverVo> driverList(int companyNumber);

    boolean driverDelete(int driverNumber);
}
