package com.mastek.security.rest.service;

import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_USER_BY_EMAIL;
import static com.mastek.commons.util.ApplicationConstants.GET_WEEK;
import static com.mastek.commons.util.ApplicationConstants.REGISTER_USER;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;
import static com.mastek.commons.util.ApplicationConstants.VEFIFY_USER;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.exception.SystemException;
import com.mastek.security.business.service.RegistrationService;

/**
 * The Class SecurityBusinessDelegate.
 */
@Component
public class SecurityBusinessDelegate implements RegistrationService
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(SecurityBusinessDelegate.class);

	/** The registration service. */
	@Autowired
	RegistrationService registrationService;

	/**
	 * Verify user.
	 *
	 * @param surname the surname
	 * @param userId the user id
	 * @return the user do
	 * @throws ServiceException the service exception
	 */
	@Override
	public UserDO verifyUser(String surname, long userId) throws ServiceException
	{
		logger.info(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + "START");

		try
		{
			UserDO userDo = registrationService.verifyUser(surname, userId);

			logger.info(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + "END");
			return userDo;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
	}

	/**
	 * Register user.
	 *
	 * @param userID the user id
	 * @param pin the pin
	 * @param mac the mac
	 * @return the string
	 * @throws ServiceException the service exception
	 */
	@Override
	public String registerUser(long userID, String pin, String mac) throws ServiceException
	{
		String flag = null;
		try
		{
			logger.info(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + "START");
			flag = registrationService.registerUser(userID, pin, mac);
			logger.info(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + "END");
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
		return flag;
	}

	/**
	 * Gets the week.
	 *
	 * @param criteriaDate the criteria date
	 * @param userId the user id
	 * @return the week
	 * @throws ServiceException the service exception
	 */
	@Override
	public WeekDO getWeek(String criteriaDate, long userId) throws ServiceException
	{
		WeekDO weekDO;
		try
		{
			logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + START);
			weekDO = registrationService.getWeek(criteriaDate, userId);
			logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + END);
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
		return weekDO;

	}
	
	/**
	 * Gets the user by email.
	 *
	 * @param emailId the email id
	 * @return the user by email
	 * @throws ServiceException the service exception
	 */
	@Override
	public UserDO getUserByEmail(String emailId) throws ServiceException
	{
		UserDO userDO;
		try
		{
			logger.info(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + START);
			userDO = registrationService.getUserByEmail(emailId);
			logger.info(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + END);
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
		return userDO;

	}
}
