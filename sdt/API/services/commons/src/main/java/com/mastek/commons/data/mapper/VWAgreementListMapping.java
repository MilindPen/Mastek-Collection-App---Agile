package com.mastek.commons.data.mapper;

import com.mastek.commons.data.entity.VWAgreementList;
import com.mastek.commons.domain.AgreementDO;

import ma.glasnost.orika.MapperFactory;

public class VWAgreementListMapping implements MappingConfigurer
{
	/** 
	 * Configuration to map Agreement entity to Agreement domain object
	 */
	@Override
	public void configure(MapperFactory factory) {
		
		factory.classMap(VWAgreementList.class, AgreementDO.class).
		byDefault().register();
	}	

}
