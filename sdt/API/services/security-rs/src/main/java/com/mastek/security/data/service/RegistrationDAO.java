package com.mastek.security.data.service;

import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.exception.DataStoreException;

/**
 * The Interface RegistrationDAO.
 */
public interface RegistrationDAO
{

	/**
	 * Verify user.
	 *
	 * @param surname the surname
	 * @param userId the user id
	 * @return the user do
	 * @throws DataStoreException the data store exception
	 */
	UserDO verifyUser(String surname, long userId) throws DataStoreException;

	/**
	 * Register user.
	 *
	 * @param userID the user id
	 * @param pin the pin
	 * @param mac the mac
	 * @return the string
	 * @throws DataStoreException the data store exception
	 */
	String registerUser(long userID, String pin, String mac) throws DataStoreException;

	/**
	 * Gets the week.
	 *
	 * @param criteriaDate the criteria date
	 * @param userId the user id
	 * @return the week
	 * @throws DataStoreException the data store exception
	 */
	WeekDO getWeek(String criteriaDate, long userId) throws DataStoreException;
	
	
	/**
	 * Verify user.
	 *
	 * @param userId the user id
	 * @return the user do
	 * @throws DataStoreException the data store exception
	 */
	UserDO verifyUser(long userId) throws DataStoreException;
	
	/**
	 * Gets the user by email.
	 *
	 * @param emailId the email id
	 * @return the user by email
	 * @throws DataStoreException the data store exception
	 */
	UserDO getUserByEmail(String emailId) throws DataStoreException;
}
