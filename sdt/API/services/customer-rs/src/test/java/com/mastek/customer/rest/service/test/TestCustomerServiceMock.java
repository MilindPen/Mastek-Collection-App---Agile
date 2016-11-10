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
import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.customer.business.service.CustomerService;
import com.mastek.customer.business.service.CustomerServiceImpl;
import com.mastek.customer.data.service.CustomerDAO;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;

@RunWith(MockitoJUnitRunner.class)
public class TestCustomerServiceMock  {
	@InjectMocks
	CustomerService customerService = new CustomerServiceImpl();
		
	@Mock
	CustomerDAO customerDAO;
	
	
	@Test
	public void testCustomerUpdate(){
		
		try{
			Boolean flag = true;
			AccessDO access=new AccessDO();
			UpdateCustomerRequest getUpdateCustomerRequest = new UpdateCustomerRequest();
			getUpdateCustomerRequest.setAccess(access);
			Mockito.doReturn(flag).when(customerDAO).updateCustomerDetails(Mockito.any(UpdateCustomerRequest.class));
			customerService.updateCustomerDetails(getUpdateCustomerRequest);
			
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testCustomerUpdateException(){
		
		try{
			AccessDO access=new AccessDO();
			UpdateCustomerRequest getUpdateCustomerRequest = new UpdateCustomerRequest();
			getUpdateCustomerRequest.setAccess(access);
			
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(customerDAO).updateCustomerDetails(Mockito.any(UpdateCustomerRequest.class));
			customerService.updateCustomerDetails(getUpdateCustomerRequest);
			
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetScheduledCustomers(){
		String startDate="2016-04-21";
		String endDate= "2016-04-27";
		long journeyId=1320;
		long userId=2;
		List<CustomerVisitDO> customerDO=new ArrayList<CustomerVisitDO>();
		try{
			
			Mockito.doReturn(customerDO).when(customerDAO).getScheduledCustomers(Mockito.any(String.class), Mockito.any(String.class),Mockito.any(Long.class));
			customerService.getScheduledCustomersOfAgent(startDate,endDate, userId);
			
			Assert.assertTrue(true);
			
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testGetScheduledCustomersException(){
		String startDate="2016-04-21";
		String endDate= "2016-04-27";
		long journeyId=1320;
		long userId=2;
		try{
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(customerDAO).getScheduledCustomers(Mockito.any(String.class), Mockito.any(String.class),Mockito.any(Long.class));
			customerService.getScheduledCustomersOfAgent(startDate,endDate, userId);

		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetJourney(){
		String startDate="2016-04-21";
		String endDate= "2016-04-27";
		long userId=2;
		JourneyDO journeyDO = new JourneyDO();
		try{

			Mockito.doReturn(journeyDO).when(customerDAO).getJourney(Mockito.any(String.class), Mockito.any(String.class),Mockito.any(Long.class));
			customerService.getJourney(startDate,endDate,userId);

			Assert.assertTrue(true);

		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testGetJourneyException(){
		String startDate="2016-04-21";
		String endDate= "2016-04-27";
		long userId=2;
		try{

			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(customerDAO).getJourney(Mockito.any(String.class), Mockito.any(String.class),Mockito.any(Long.class));
			customerService.getJourney(startDate,endDate,userId);

		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
}
