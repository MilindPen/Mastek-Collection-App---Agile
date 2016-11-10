package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWCustomerVisitList;
import com.mastek.commons.domain.CustomerVisitDO;

import ma.glasnost.orika.MapperFactory;

public class CustomerVisitListMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWCustomerVisitList.class, CustomerVisitDO.class).
		byDefault().register();
	}

}
