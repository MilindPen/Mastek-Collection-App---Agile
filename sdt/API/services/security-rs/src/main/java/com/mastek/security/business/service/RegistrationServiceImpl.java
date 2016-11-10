package com.mastek.security.business.service;

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
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.ServiceException;
import com.mastek.security.data.service.RegistrationDAO;

/**
 * The Class RegistrationServiceImpl.
 */
@Component
public class RegistrationServiceImpl implements RegistrationService
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(RegistrationServiceImpl.class);

	/** The registration dao. */
	@Autowired
	RegistrationDAO registrationDAO;

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
		logger.info(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + START);
		logger.debug(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + "surname" + DELIMITER + surname);
		
		try
		{
			UserDO userDo;
			if(surname!=null && !surname.isEmpty()){
				userDo = registrationDAO.verifyUser(surname, userId);
			}else{
				userDo = registrationDAO.verifyUser(userId);
			}

			logger.info(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + END);
			return userDo;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(VEFIFY_USER, dataStoreException);
			throw dataStoreException.getSystemException();
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
		logger.info(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + START);
		String flag = "true";
		try
		{
			flag = registrationDAO.registerUser(userID, pin, mac);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(REGISTER_USER, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		logger.info(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + END);
		logger.debug(REGISTER_USER + DELIMITER + "return"+ DELIMITER + flag);
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
		logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + START);
		WeekDO weekDO = new WeekDO();
		try
		{
			weekDO = registrationDAO.getWeek(criteriaDate, userId);
			logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_WEEK, dataStoreException);
			throw dataStoreException.getSystemException();
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
		logger.info(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + START);
		UserDO userDO = new UserDO();
		try
		{
			userDO = registrationDAO.getUserByEmail(emailId);
			logger.info(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_USER_BY_EMAIL, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return userDO;
	}
}
