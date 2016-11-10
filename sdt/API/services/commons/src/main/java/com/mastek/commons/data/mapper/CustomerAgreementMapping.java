package com.mastek.commons.data.mapper;


import org.springframework.stereotype.Component;

import com.mastek.commons.data.entity.VWAgreement;
import com.mastek.commons.domain.AgreementDO;

import ma.glasnost.orika.MapperFactory;

/**
 * The Class CustomerAgreementMapping.
 * This class maps Agreement entity to Agreement domain object
 */
@Component
public class CustomerAgreementMapping implements MappingConfigurer { 
	
	/** 
	 * Configuration to map Agreement entity to Agreement domain object
	 */
	@Override
	public void configure(MapperFactory factory) {
		
		factory.classMap(VWAgreement.class, AgreementDO.class).
		//field("customer.customerId", "customerId").		
		byDefault().register();
	}	
}