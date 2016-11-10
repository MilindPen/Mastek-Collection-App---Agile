package com.mastek.customer.rest.service.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.CustomerDO;
import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.commons.domain.JourneyDO;
import com.mastek.customer.rest.service.dto.ScheduledCustomersRequest;
import com.mastek.customer.rest.service.dto.ScheduledCustomersResponse;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerResponse;

public class TestCustomerServiceDtoMock {
	
		@InjectMocks
		ScheduledCustomersRequest scheduledCustomersRequest=new ScheduledCustomersRequest();
		
		@InjectMocks
		ScheduledCustomersResponse customersResponse=new ScheduledCustomersResponse();
		
		@InjectMocks
		UpdateCustomerRequest updateCustomerRequest =new UpdateCustomerRequest();
		
		@InjectMocks
		UpdateCustomerResponse updateCustomerResponse =new UpdateCustomerResponse();
		
		AccessDO access;
		@Before
		public void init(){
			access = new AccessDO();
			scheduledCustomersRequest.setAccess(access);
		}
		
		@Test
		public void testDomainObjects(){
			List<CustomerVisitDO> customerVisits=new ArrayList<CustomerVisitDO>();
			JourneyDO journeyDO=new JourneyDO();
			List<CustomerDO> customerDetails =new ArrayList<CustomerDO>();
			
			
			scheduledCustomersRequest.setEndDate("test");
			scheduledCustomersRequest.getStartDate();
			scheduledCustomersRequest.setStartDate("test");
			scheduledCustomersRequest.getEndDate();
			
			customersResponse.setCustomerVisits(customerVisits);
			customersResponse.getCustomerVisits();
			customersResponse.setJourney(journeyDO);
			customersResponse.getJourney();
			
			updateCustomerRequest.setCustomerDetails(customerDetails);
			updateCustomerRequest.getCustomerDetails();
			
			updateCustomerResponse.getErrorCode();
			
		}			
			
					

}
