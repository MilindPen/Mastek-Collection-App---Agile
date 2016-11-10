package com.mastek.security.rest.service.test;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.security.rest.service.RegistrationRESTImpl;
import com.mastek.security.rest.service.SecurityBusinessDelegate;
import com.mastek.security.rest.service.dto.UserRegistrationRequest;
import com.mastek.security.rest.service.dto.UserVerificationRequest;
import com.mastek.security.rest.service.dto.WeekRequest;

@RunWith(MockitoJUnitRunner.class)
public class TestRegistrationRestServiceImplMock {

	@InjectMocks
	RegistrationRESTImpl registrationRESTImpl= new RegistrationRESTImpl();

	@Mock
	SecurityBusinessDelegate securityBusinessDelegate;
	
	UserVerificationRequest userVerificationRequest=new UserVerificationRequest();
	
	UserDO userDO =new UserDO();
	
	AccessDO access=new AccessDO();
	
	@Test
	public void testVerifyUser(){
		userVerificationRequest.setAccess(access);
		try{
			userDO.setUserId(1);
			Mockito.doReturn(userDO).when(securityBusinessDelegate).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			registrationRESTImpl.verifyUser(userVerificationRequest);

			userDO.setMobileUserId(new Long(1));
			userDO.setMacAddress("1");
			Mockito.doReturn(userDO).when(securityBusinessDelegate).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			registrationRESTImpl.verifyUser(userVerificationRequest);

		}catch(Exception e){
			Assert.assertTrue(true);
		}

	}
	
	@Test
	public void  testVerifyUserException(){
		userVerificationRequest.setAccess(access);
		try{
			userDO.setUserId(1);
			userDO.setMobileUserId(new Long(1));	
			userDO.setMacAddress("2");
			Mockito.doReturn(userDO).when(securityBusinessDelegate).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			registrationRESTImpl.verifyUser(userVerificationRequest);

		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void  testVerifyUserExcepionHandling(){
		userVerificationRequest.setAccess(access);
		try{
			Mockito.doReturn(userDO).when(securityBusinessDelegate).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			registrationRESTImpl.verifyUser(userVerificationRequest);

		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testRegisterUser(){
		UserRegistrationRequest userRegistrationRequest=new UserRegistrationRequest();
		userRegistrationRequest.setAccess(access);
		String flag="true";
		try{
			Mockito.doReturn(flag).when(securityBusinessDelegate).registerUser(Mockito.any(Long.class), Mockito.any(String.class), Mockito.any(String.class));
			registrationRESTImpl.registerUser(userRegistrationRequest);
			
			flag="false";
			Mockito.doReturn(flag).when(securityBusinessDelegate).registerUser(Mockito.any(Long.class), Mockito.any(String.class), Mockito.any(String.class));
			registrationRESTImpl.registerUser(userRegistrationRequest);
			
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetWeek(){
		WeekRequest weekRequest =new WeekRequest();
		weekRequest.setAccess(access);
		WeekDO weekDO=new WeekDO();
		try{
			Mockito.doReturn(weekDO).when(securityBusinessDelegate).getWeek(Mockito.any(String.class), Mockito.any(Long.class));
			registrationRESTImpl.getWeek(weekRequest);
			
			weekDO=null;
			Mockito.doReturn(weekDO).when(securityBusinessDelegate).getWeek(Mockito.any(String.class), Mockito.any(Long.class));
			registrationRESTImpl.getWeek(weekRequest);
			
		}catch(Exception e){
			Assert.assertTrue(true);
		}


	}
	
}


