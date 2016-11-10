package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWUserSelection;
import com.mastek.commons.domain.UserSelectionDO;

import ma.glasnost.orika.MapperFactory;

public class UserSelectionMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWUserSelection.class, UserSelectionDO.class).
		byDefault().register();
	}

}
