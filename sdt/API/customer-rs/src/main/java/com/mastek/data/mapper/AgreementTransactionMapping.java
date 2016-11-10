package com.mastek.data.mapper;

import org.springframework.stereotype.Component;

import com.mastek.data.entity.VWTransaction;
import com.mastek.domain.TransactionHistoryDO;

import ma.glasnost.orika.MapperFactory;

@Component
public class AgreementTransactionMapping implements MappingConfigurer
{

	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWTransaction.class, TransactionHistoryDO.class).
		byDefault().register();
	}
	
}
