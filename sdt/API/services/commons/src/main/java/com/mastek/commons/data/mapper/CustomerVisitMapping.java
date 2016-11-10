package com.mastek.commons.data.mapper;

import org.springframework.stereotype.Component;

import com.mastek.commons.data.entity.VWVisitSummary;
import com.mastek.commons.domain.CustomerVisitDO;

import ma.glasnost.orika.MapperFactory;

/**
 * The Class CustomerVisitMapping.
 * This class maps VisitSummary entity to Customer visit domain object
 */
@Component
public class CustomerVisitMapping implements MappingConfigurer {

	/** 
	 * Configuration to map VisitSummary entity to Customer visit domain object
	 */
	@Override
	public void configure(MapperFactory factory) {
		
		factory.classMap(VWVisitSummary.class, CustomerVisitDO.class).
		field("customer.customerId", "customerId").
		field("customer.customerNumber", "customerRefNumber").
		field("customer.title", "title").
		field("customer.firstName", "firstName").
		field("customer.middleName", "middleName").
		field("customer.surname", "lastName").
		field("customer.paymentPerformance", "paymentPerformance").
		field("customer.phoneNumber", "phone").
		field("customer.mobile", "mobile").
		field("customer.email", "email").
		field("customer.address1", "addressLine1").
		field("customer.address2", "addressLine2").
		field("customer.address3", "addressLine3").
		field("customer.address4", "addressLine4").
		field("customer.city", "city").
		field("customer.postcode", "postcode").
		field("totalPaidAmount", "totalPaidAmount").
		//field("customer.collectionDay", "collectionDay").
		field("customer.dob", "dob").
		//field("customer.journeyOrder", "journeyOrder").
		byDefault().register();
	}	
}