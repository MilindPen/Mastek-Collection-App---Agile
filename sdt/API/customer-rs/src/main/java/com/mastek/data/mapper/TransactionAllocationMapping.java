package com.mastek.data.mapper;

import org.springframework.stereotype.Component;

import com.mastek.data.entity.VWTransactionAllocation;
import com.mastek.domain.TransactionHistoryDO;

import ma.glasnost.orika.MapperFactory;

@Component
public class TransactionAllocationMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWTransactionAllocation.class, TransactionHistoryDO.class).
		byDefault().register();
	}

}
