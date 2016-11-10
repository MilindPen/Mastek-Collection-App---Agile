package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWBranchWeekDetails;
import com.mastek.commons.domain.BranchWeekStatusDO;

import ma.glasnost.orika.MapperFactory;

public class BranchWeekDetailsMapping implements MappingConfigurer
{
	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWBranchWeekDetails.class, BranchWeekStatusDO.class).
		byDefault().register();
		
	}
}
