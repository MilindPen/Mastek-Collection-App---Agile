package com.mastek.commons.data.mapper;

import org.springframework.stereotype.Component;

import com.mastek.commons.data.entity.VWTransactionAllocation;
import com.mastek.commons.domain.TransactionHistoryDO;

import ma.glasnost.orika.MapperFactory;

/**
 * The Class TransactionAllocationMapping.
 * This class maps VWTransactionAllocation entity to TransactionHistoryDO domain object
 */
@Component
public class TransactionAllocationMapping implements MappingConfigurer
{

	/** 
	 * Configuration to map VWTransactionAllocation entity to TransactionHistoryDO domain object
	 */
	@Override
	public void configure(MapperFactory factory)
	{
		factory.classMap(VWTransactionAllocation.class, TransactionHistoryDO.class).
		field("transaction.transactionId", "transactionId").
		field("transaction.customerId", "customerId").
		field("transaction.paidDate", "paidDate").
		field("transaction.responseStatusID", "status").
		byDefault().register();
	}

}
