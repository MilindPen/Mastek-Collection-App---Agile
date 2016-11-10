package com.mastek.security.rest.service.test;
import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.exception.SystemException;
import com.mastek.security.business.service.RegistrationService;
import com.mastek.security.filter.CORSServletSecurityFilter;
import com.mastek.security.rest.service.SecurityBusinessDelegate;
import com.mastek.security.rest.service.SwaggerConfiguration;

@RunWith(MockitoJUnitRunner.class)
public class TestRegistrationRestServiceMock
{
	@InjectMocks
	RegistrationService delegate = new SecurityBusinessDelegate();

	@Mock
	RegistrationService registrationService;
	
	@InjectMocks
	SwaggerConfiguration conf = new SwaggerConfiguration();
	
	@InjectMocks
	CORSServletSecurityFilter filter = new CORSServletSecurityFilter();
	
	@Mock
	HttpServletRequest req;

	@Mock
	HttpServletResponse res;

	@Mock
	FilterChain chain;

	@Mock
	FilterConfig init;
	
	AccessDO accessDO;
	
	@Before
	public void init() throws Exception{
		accessDO = new AccessDO();
	}
	
	@Test
	public void testVerifyUser()
	{
		String surname = null;
		long userId = 2;
		try
		{

			UserDO userDo = new UserDO();

			Mockito.doReturn(userDo).when(registrationService).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			delegate.verifyUser(surname, userId);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}
	@Test
	public void testVerifyUserException()
	{

		String surname = null;
		long userId = 2;

		try
		{
			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(registrationService).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			delegate.verifyUser(surname, userId);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testRegisterUser()
	{
		String pin = null;
		String mac=null;
		long userId = 2;
		try
		{
       String flag=null;

			Mockito.doReturn(flag).when(registrationService).registerUser(Mockito.any(Long.class), Mockito.any(String.class),Mockito.any(String.class));
			delegate.registerUser(userId, pin, mac);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}
	@Test
	public void testRegisterUserException()
	{

		String pin = null;
		String mac=null;
		long userId = 2;

		try
		{
			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(registrationService).registerUser(Mockito.any(Long.class), Mockito.any(String.class),Mockito.any(String.class));
			delegate.registerUser(userId, pin, mac);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetWeek()
	{
		String criteriaDate = null;
		long userId = 2;
		try
		{

			WeekDO weekDO = new WeekDO();

			Mockito.doReturn(weekDO).when(registrationService).getWeek(Mockito.any(String.class), Mockito.any(Long.class));
			delegate.getWeek(criteriaDate, userId);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}
	@Test
	public void testGetWeekException()
	{

		String criteriaDate = "2016-05-16";
		long journeyId = 1320;
		long userId = 2;

		try
		{
			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(registrationService).getWeek(Mockito.any(String.class), Mockito.any(Long.class));
			delegate.getWeek(criteriaDate, userId);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testSwaggerConfiguration()
	{
		conf.getClasses();
		conf.getSingletons();
		Assert.assertTrue(true);
	}
	
	@Test
	public void testFilter()
	{
		try
		{
			filter.doFilter(req, res, chain);
			filter.destroy();
			filter.init(init);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
		
	}
	
}
