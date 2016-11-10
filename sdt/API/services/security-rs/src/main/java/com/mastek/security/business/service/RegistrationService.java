package com.mastek.security.business.service;

import org.springframework.stereotype.Component;

import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.exception.ServiceException;

/**
 * The Interface RegistrationService.
 */
@Component
public interface RegistrationService
{

	/**
	 * Verify user.
	 *
	 * @param surname the surname
	 * @param userId the user id
	 * @return the user do
	 * @throws ServiceException the service exception
	 */
	UserDO verifyUser(String surname, long userId) throws ServiceException;

	/**
	 * Register user.
	 *
	 * @param userID the user id
	 * @param pin the pin
	 * @param mac the mac
	 * @return the string
	 * @throws ServiceException the service exception
	 */
	String registerUser(long userID, String pin, String mac) throws ServiceException;

	/**
	 * Gets the week.
	 *
	 * @param criteriaDate the criteria date
	 * @param userId the user id
	 * @return the week
	 * @throws ServiceException the service exception
	 */
	WeekDO getWeek(String criteriaDate, long userId) throws ServiceException;
	
	/**
	 * Gets the user by email.
	 *
	 * @param emailId the email id
	 * @return the user by email
	 * @throws ServiceException the service exception
	 */
	UserDO getUserByEmail(String emailId) throws ServiceException;
}
