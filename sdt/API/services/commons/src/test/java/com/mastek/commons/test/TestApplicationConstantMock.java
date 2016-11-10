package com.mastek.commons.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.util.ApplicationConstants;

@RunWith(MockitoJUnitRunner.class)
public class TestApplicationConstantMock {
	
	@InjectMocks
	ApplicationConstants applicationConstants;
	
	@Test
	public void testApplicationConstants(){
		
		String test=ApplicationConstants.GET_TRANSACTION_HISTORY;
		String test1=ApplicationConstants.GET_CARD_PAYMENTS;
		String test2=ApplicationConstants.GET_TRANSACTION_SYNC_RESULT;
		String test3=ApplicationConstants.SYNC_BALANCE_TRANSACTIONS;
		String test4=ApplicationConstants.USER_ID;
		String test5=ApplicationConstants.START;
		String test6=ApplicationConstants.END;
		String test7=ApplicationConstants.XML;
		String test8=ApplicationConstants.REQUEST;
		String test9=ApplicationConstants.RESPONSE;
		String test10=ApplicationConstants.GET_SCHEDULED_CUSTOMERS;
		String test11=ApplicationConstants.UPDATE_CUSTOMER_DETAILS;
		String test12=ApplicationConstants.GET_SCHEDULED_CUSTOMES_OF_AGENT;
		String test13=ApplicationConstants.GET_WEEK;
		String test14=ApplicationConstants.DELIMITER;
		String test15=ApplicationConstants.GET_RESULT;
		String test16=ApplicationConstants.GET_JOURNEY;
		String test17=ApplicationConstants.VEFIFY_USER;
		String test18=ApplicationConstants.VEFIFY_USER;
	}
	

}
