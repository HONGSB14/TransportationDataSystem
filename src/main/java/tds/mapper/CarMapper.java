package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.vo.ApproveCarVo;

import java.util.List;
import java.util.Map;

@Mapper
public interface CarMapper {

    Map<String,Object> getCarInfo(int companyNumber);

    List<ApproveCarVo> selectCarNumber();

    String getApproveCarId(String approveCarNumber);
}
