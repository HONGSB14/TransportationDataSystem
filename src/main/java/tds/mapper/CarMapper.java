package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.vo.ApproveCarVo;
import tds.vo.CarVo;
import tds.vo.SaleVo;

import java.util.List;
import java.util.Map;

@Mapper
public interface CarMapper {

    Map<String,Object> getCarInfo(int companyNumber);

    List<ApproveCarVo> selectCarNumber();

    String getApproveCarId(String approveCarNumber);

    boolean carRegistration(CarVo carVo);

    boolean stateUpdate(String carId);

    List<CarVo> getCarList(int companyNumber);

}
