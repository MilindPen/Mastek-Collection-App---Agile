package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWUser;
import com.mastek.commons.domain.UserDO;

import ma.glasnost.orika.MapperFactory;

public class UserMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWUser.class, UserDO.class).
		byDefault().register();

	}

}
