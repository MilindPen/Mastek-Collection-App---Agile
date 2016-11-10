package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWTransactionHistory;
import com.mastek.commons.domain.TransactionHistoryDO;

import ma.glasnost.orika.MapperFactory;

public class TransactionHistoryMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWTransactionHistory.class, TransactionHistoryDO.class).
		byDefault().register();
	}

}
