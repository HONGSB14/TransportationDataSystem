package tds.mapper;

import org.apache.ibatis.annotations.Mapper;
import tds.vo.LocationVo;

@Mapper
public interface LocationMapper {
    boolean locationData(LocationVo locationVo);
}
