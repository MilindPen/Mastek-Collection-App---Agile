package com.mastek.commons.data.mapper;
import com.mastek.commons.data.entity.VWWeekEnding;
import com.mastek.commons.domain.WeekDO;
import ma.glasnost.orika.MapperFactory;

public class WeekEndingMapping implements MappingConfigurer
{
	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWWeekEnding.class, WeekDO.class).
		byDefault().register();
		
	}
}
