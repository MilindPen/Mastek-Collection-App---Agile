package com.mastek.security.rest.service.test;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.security.business.service.RegistrationService;
import com.mastek.security.business.service.RegistrationServiceImpl;
import com.mastek.security.data.service.RegistrationDAO;

@RunWith(MockitoJUnitRunner.class)
public class TestRegistrationServiceMock
{

	@InjectMocks
	RegistrationService registrationService = new RegistrationServiceImpl();

	@Mock
	RegistrationDAO registrationDAO;

	@Test
	public void testRegisterUser()
	{
		long userId = 3617;
		String pin = "1357";
		String mac = "1";
		try
		{

			Mockito.doReturn("true").when(registrationDAO).registerUser(Mockito.any(Long.class), Mockito.any(String.class), Mockito.any(String.class));
			registrationService.registerUser(userId, pin, mac);

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
		long userId = 3617;
		String pin = "1357";
		String mac = "1";
		try
		{

			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(registrationDAO).registerUser(Mockito.any(Long.class), Mockito.any(String.class), Mockito.any(String.class));
			registrationService.registerUser(userId, pin, mac);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testVerifyUser()
	{
		long userId = 3617;
		String surname = "Lockard";
		UserDO userDo = new UserDO();
		try
		{

			Mockito.doReturn(userDo).when(registrationDAO).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			registrationService.verifyUser(surname, userId);

			surname = null;
			Mockito.doReturn(userDo).when(registrationDAO).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			registrationService.verifyUser(surname, userId);

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
		long userId = 3617;
		String surname = "Lockard";
		try
		{

			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(registrationDAO).verifyUser(Mockito.any(String.class), Mockito.any(Long.class));
			registrationService.verifyUser(surname, userId);

		}
		catch (Exception e)
		{

			Assert.assertTrue(true);
		}
	}

	@Test
	public void testSdtWeek()
	{
		long userId = 3617;
		String criteriaDate = "2016-05-16";
		WeekDO weekDo = new WeekDO();
		try
		{
			Mockito.doReturn(weekDo).when(registrationDAO).getWeek(Mockito.any(String.class), Mockito.any(Long.class));
			registrationService.getWeek(criteriaDate, userId);

			Assert.assertTrue(true);

		}
		catch (Exception e)
		{

			Assert.assertTrue(false);
		}

	}

	@Test
	public void testSdtWeekException()
	{
		long userId = 3617;
		String criteriaDate = "2016-05-16";
		try
		{
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(registrationDAO).getWeek(Mockito.any(String.class), Mockito.any(Long.class));
			registrationService.getWeek(criteriaDate, userId);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}

	}
	

}
