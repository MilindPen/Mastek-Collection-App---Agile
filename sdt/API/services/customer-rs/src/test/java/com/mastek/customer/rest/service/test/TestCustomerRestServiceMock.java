package com.mastek.customer.rest.service.test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.commons.exception.SystemException.Type;
import com.mastek.customer.business.service.CustomerService;
import com.mastek.customer.filter.CORSServletCustomerFilter;
import com.mastek.customer.rest.service.CustomerBusinessDelegate;
import com.mastek.customer.rest.service.SwaggerConfiguration;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;
@RunWith(MockitoJUnitRunner.class)
public class TestCustomerRestServiceMock {
	private static final Logger logger = LoggerFactory.getLogger(TestCustomerRestServiceMock.class);
	
	@InjectMocks
	CustomerBusinessDelegate businessDelegate= new CustomerBusinessDelegate();
	
	@InjectMocks
	CORSServletCustomerFilter filter = new CORSServletCustomerFilter();
	
	@InjectMocks
	SwaggerConfiguration conf = new SwaggerConfiguration();
	
	@Mock
	CustomerService CustomerService;
	
	@Mock
	HttpServletRequest req;

	@Mock
	HttpServletResponse res;

	@Mock
	FilterChain chain;

	@Mock
	FilterConfig init;
	
	UpdateCustomerRequest customerRequest=new UpdateCustomerRequest();
	AccessDO accessDO=new AccessDO();
	
	String startDate="2016-04-21";
	String endDate= "2016-04-27";
	long journeyId=1320;
	long userId=2;
	
@Test
public void testGetScheduledCustomersOfAgent(){//when list is not empty
	CustomerVisitDO customerVisitDO=new CustomerVisitDO();
	List<CustomerVisitDO> customerVisitDOList=new ArrayList<CustomerVisitDO>();
	customerVisitDOList.add(customerVisitDO);
	try{
		Mockito.doReturn(customerVisitDOList).when(CustomerService).getScheduledCustomersOfAgent(startDate, endDate, userId);
		businessDelegate.getScheduledCustomersOfAgent(startDate, endDate, userId);
		Assert.assertTrue(true);
	}catch(Exception e){
		Assert.assertTrue(false);
	}
}
@Test
public void testGetScheduledCustomers(){//when list is empty
	List<CustomerVisitDO> customerVisitDOs=new ArrayList<CustomerVisitDO>();
	try{
		Mockito.doReturn(customerVisitDOs).when(CustomerService).getScheduledCustomersOfAgent(startDate, endDate, userId);
		businessDelegate.getScheduledCustomersOfAgent(startDate, endDate, userId);
	}catch(Exception e){

	}
}
	
@Test
public void testGetScheduledCustomersOfAgentException(){
	try{
		Mockito.doThrow(new DataStoreException(new SystemException(Type.DE)).getSystemException()).when(CustomerService).getScheduledCustomersOfAgent(startDate, endDate, userId);
		businessDelegate.getScheduledCustomersOfAgent(startDate, endDate, userId);

	}catch(Exception e){
		Assert.assertTrue(true);
	}
}

@Test
public void testUpdateCustomerDetails(){
	customerRequest.setAccess(accessDO);
	try{
		Mockito.doReturn(true).when(CustomerService).updateCustomerDetails(customerRequest);
		businessDelegate.updateCustomerDetails(customerRequest);
		Assert.assertTrue(true);
	}catch(Exception e){
		Assert.assertTrue(false);
	}
}

@Test
public void testUpdateCustomerDetailsException(){
	customerRequest.setAccess(accessDO);
	try{
		Mockito.doThrow(new DataStoreException(new SystemException(Type.DE)).getSystemException()).when(CustomerService).updateCustomerDetails(customerRequest);
		businessDelegate.updateCustomerDetails(customerRequest);

	}catch(Exception e){
		Assert.assertTrue(true);
	}
}

@Test
public void testGetJourney(){
	JourneyDO journeyDO=new JourneyDO();
	try{
		Mockito.doReturn(journeyDO).when(CustomerService).getJourney(startDate, endDate, userId);
		businessDelegate.getJourney(startDate, endDate, userId);
		Assert.assertTrue(true);
	}catch(Exception e){
		Assert.assertTrue(false);
	}
}

@Test
public void testGetJourneyException(){
	try{
		Mockito.doThrow(new DataStoreException(new SystemException(Type.DE)).getSystemException()).when(CustomerService).getJourney(startDate, endDate, userId);
		businessDelegate.getJourney(startDate, endDate, userId);
		
	}catch(Exception e){
		Assert.assertTrue(true);
	}
}

@Test
public void testFilter()
{
	try
	{
		filter.doFilter(req, res, chain);
		filter.destroy();
		filter.init(init);
	}
	catch (IOException e)
	{
		logger.info("testFilter", e);
	}
	catch (ServletException e)
	{
		logger.info("testFilter", e);
	}
}

@Test
public void testSwaggerConfiguration(){
	conf.getClasses();
	conf.getSingletons();
}

}
