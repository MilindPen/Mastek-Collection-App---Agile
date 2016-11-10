package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWJourney;
import com.mastek.commons.domain.JourneyDO;

import ma.glasnost.orika.MapperFactory;

public class JourneyMapping implements MappingConfigurer
{
	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWJourney.class, JourneyDO.class).
		byDefault().register();
		
	}
}
