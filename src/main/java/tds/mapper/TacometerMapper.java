package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.dto.TacometerDto;
import tds.vo.TacometerVo;

import java.util.List;

@Mapper
public interface TacometerMapper {

    List<TacometerVo> getLocation(int companyNumber);
}
