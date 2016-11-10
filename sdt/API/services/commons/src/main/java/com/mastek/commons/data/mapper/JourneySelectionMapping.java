package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWJourneySelection;
import com.mastek.commons.domain.JourneySelectionDO;

import ma.glasnost.orika.MapperFactory;

public class JourneySelectionMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWJourneySelection.class, JourneySelectionDO.class).
		byDefault().register();
	}

}
