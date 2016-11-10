package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWBranchDetails;
import com.mastek.commons.domain.BranchSelectionDO;

import ma.glasnost.orika.MapperFactory;

public class BranchDetailsMapping implements MappingConfigurer
{
	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWBranchDetails.class, BranchSelectionDO.class).
		byDefault().register();
	}

}
