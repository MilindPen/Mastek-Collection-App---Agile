package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWCashSummary;
import com.mastek.commons.domain.RetrieveTransactionsDO;

import ma.glasnost.orika.MapperFactory;

public class CashSummaryMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWCashSummary.class, RetrieveTransactionsDO.class).
		byDefault().register();
	}

}
