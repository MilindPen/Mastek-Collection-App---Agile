package com.mastek.customer.rest.service.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.customer.rest.service.CustomerBusinessDelegate;
import com.mastek.customer.rest.service.CustomerRESTImpl;
import com.mastek.customer.rest.service.dto.ScheduledCustomersRequest;
import com.mastek.customer.rest.service.dto.ScheduledCustomersResponse;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerResponse;
@RunWith(MockitoJUnitRunner.class)
public class TestCustomerRestServiceImplMock {

	@InjectMocks
	CustomerRESTImpl customerRESTImpl=new CustomerRESTImpl();

	@Mock
	CustomerBusinessDelegate businessDelegate;
	
	ScheduledCustomersResponse scheduledCustomersResponse=new ScheduledCustomersResponse();
	
	UpdateCustomerResponse customerResponse=new UpdateCustomerResponse();
	
	ScheduledCustomersRequest getScheduledCustomersRequest=new ScheduledCustomersRequest();
	
	UpdateCustomerRequest customerRequest=new UpdateCustomerRequest();
	
	AccessDO accessDO=new AccessDO();
	
	@Test
	public void testGetScheduledCustomers(){
		String startDate="2016-04-21";
		String endDate= "2016-04-27";
		long journeyId=1320;
		long userId=2;
		getScheduledCustomersRequest.setAccess(accessDO);
		List<CustomerVisitDO> customerVisits=new ArrayList<CustomerVisitDO>();
		try{
			Mockito.doReturn(customerVisits).when(businessDelegate).getScheduledCustomersOfAgent(startDate, endDate, userId);
			customerRESTImpl.getScheduledCustomers(getScheduledCustomersRequest);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testUpdateCustomerDetails(){
		customerRequest.setAccess(accessDO);
		try{
			Mockito.doReturn(true).when(businessDelegate).updateCustomerDetails(customerRequest);
			customerRESTImpl.updateCustomerDetails(customerRequest);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}

}
