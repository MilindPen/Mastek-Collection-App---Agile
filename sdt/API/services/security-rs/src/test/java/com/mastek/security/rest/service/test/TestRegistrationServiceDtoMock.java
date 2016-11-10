package com.mastek.security.rest.service.test;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.security.rest.service.dto.UserRegistrationRequest;
import com.mastek.security.rest.service.dto.UserRegistrationResponse;
import com.mastek.security.rest.service.dto.UserVerificationRequest;
import com.mastek.security.rest.service.dto.UserVerificationResponse;
import com.mastek.security.rest.service.dto.WeekRequest;
import com.mastek.security.rest.service.dto.WeekResponse;

public class TestRegistrationServiceDtoMock
{
	@InjectMocks
	UserRegistrationRequest userRegistrationRequest = new UserRegistrationRequest();

	@InjectMocks
	UserRegistrationResponse userRegistrationResponse = new UserRegistrationResponse();
	
	@InjectMocks
	UserVerificationRequest userVerificationRequest = new UserVerificationRequest();
	
	@InjectMocks
	UserVerificationResponse userVerificationResponse = new UserVerificationResponse();
	
	@InjectMocks
	WeekResponse weekResponse = new WeekResponse();
	
	@InjectMocks
	WeekRequest weekRequest = new WeekRequest();
	
	
	
	AccessDO access;
	UserDO user;
	WeekDO week;
	@Before
	public void init(){
		access = new AccessDO();
		user= new UserDO();
		week=new WeekDO();
	}
	
	@Test
	public void testRegistrationServiceDtoMock(){
		
		userRegistrationRequest.setAccess(access);
		userRegistrationRequest.setMac("mac");
		userRegistrationRequest.setPin("pin");
		
		userRegistrationRequest.getAccess();
		userRegistrationRequest.getMac();
		userRegistrationRequest.getPin();
		
		userVerificationRequest.setAccess(access);
		userVerificationRequest.setMacid("macid");
		userVerificationRequest.setSurname("surname");
		
		userVerificationRequest.getAccess();
		userVerificationRequest.getMacid();
		userVerificationRequest.getSurname();
		
		weekRequest.setAccess(access);
		weekRequest.setCriteriaDate("");
		
		weekRequest.getAccess();
		weekRequest.getCriteriaDate();
		
		userVerificationResponse.setUser(user);
		userVerificationResponse.getUser();
		
		weekResponse.getWeekDO();
		weekResponse.setWeekDO(week);
	}
}
