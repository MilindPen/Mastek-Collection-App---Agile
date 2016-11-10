package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWLoginUser;
import com.mastek.commons.domain.UserDO;

import ma.glasnost.orika.MapperFactory;

public class LoginUserMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWLoginUser.class, UserDO.class).
		//field("macAddress", "macid").
		byDefault().register();
		
	}

}
