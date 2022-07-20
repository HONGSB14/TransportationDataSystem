package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.vo.ApproveCarVo;
import tds.vo.CarVo;
import tds.vo.SaleVo;

import java.util.List;
import java.util.Map;

@Mapper
public interface CarMapper {

    List<CarVo> getCarInfo(int companyNumber);

    List<ApproveCarVo> selectCarNumber();

    String getApproveCarId(String approveCarNumber);

    boolean carRegistration(CarVo carVo);
    //등록시 상태변경
    boolean stateUpdate(String carId);
    //등록 삭제 시 상태변경
    boolean stateUpdate2(String carId);

    List<CarVo> getCarList(int companyNumber);

    List<ApproveCarVo> approveCarList();

    boolean carDelete(String carId);

}
