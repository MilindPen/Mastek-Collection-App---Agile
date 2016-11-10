package com.mastek.security.data.service;

import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_WEEK;
import static com.mastek.commons.util.ApplicationConstants.REGISTER_USER;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;
import static com.mastek.commons.util.ApplicationConstants.VEFIFY_USER;
import static com.mastek.commons.util.ApplicationConstants.GET_USER_BY_EMAIL;

import java.util.Date;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mastek.commons.data.dao.impl.AbstractDAO;
import com.mastek.commons.data.entity.VWLoginUser;
import com.mastek.commons.data.entity.VWUser;
import com.mastek.commons.data.entity.VWWeekEnding;
import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.commons.util.CommonUtil;

import ma.glasnost.orika.MapperFacade;

/**
 * The Class RegistrationDAOImpl.
 */
@Repository
public class RegistrationDAOImpl extends AbstractDAO implements RegistrationDAO
{
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(RegistrationDAOImpl.class);

	/** The mapper facade. */
	@Autowired
	private MapperFacade mapperFacade;

	/**
	 * This method verifies logged in user.
	 *
	 * @param surname the surname
	 * @param userId the user id
	 * @return the user do
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public UserDO verifyUser(String surname, long userId) throws DataStoreException
	{
		logger.info(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + START);

		UserDO userDO = null;
		try
		{
			Query query = openSession().getNamedQuery("VWLoginUser.getUser");
			query.setLong("userId", userId);
			query.setString("surname", surname);
			VWLoginUser user = (VWLoginUser) query.uniqueResult();

			userDO = mapperFacade.map(user, UserDO.class);

		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(VEFIFY_USER, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(VEFIFY_USER, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(VEFIFY_USER, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + END);

		return userDO;
	}

	/**
	 * This method registers logged in user.
	 *
	 * @param userID the user id
	 * @param pin the pin
	 * @param mac the mac
	 * @return the string
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public String registerUser(long userID, String pin, String mac) throws DataStoreException
	{
		logger.info(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + START);
		try
		{
			mac = "'" + mac + "'";
			pin = "'" + pin + "'";
			Query query = openSession().createSQLQuery("DECLARE @IsDone INT EXec [mobile].[AP_I_MobiletblUser]" + " " + userID + "," + pin + "," + 1 + "," + "@IsDone OUTPUT SELECT @isDone");
			Integer x = (Integer) query.uniqueResult();
			
			logger.debug(REGISTER_USER + DELIMITER + "SP_OUTPUT"+ DELIMITER + x);
			
			if (x > 0){
				logger.debug(REGISTER_USER + DELIMITER + "return true"+ DELIMITER + x);
				logger.info(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + END);
				return "true";
			}else{
				logger.debug(REGISTER_USER + DELIMITER + "return false"+ DELIMITER + x);
				logger.info(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + END);
				return "false";
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(REGISTER_USER, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(REGISTER_USER, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(REGISTER_USER, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}catch(Exception e){
			logger.error(REGISTER_USER + DELIMITER + USER_ID + userID + DELIMITER + e.getCause() + DELIMITER + e.getMessage());
			logger.error(REGISTER_USER, e);
			throw new DataStoreException(new SystemException(SystemException.Type.UE, e));
		}
	}

	/**
	 * Gets the week.
	 *
	 * @param criteriaDate the criteria date
	 * @param userId the user id
	 * @return the week
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public WeekDO getWeek(String criteriaDate, long userId) throws DataStoreException
	{
		logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + START);
		WeekDO weekDO = null;
		try
		{

			Query query = openSession().getNamedQuery("VWWeekEnding.getWeek");
			Date d = CommonUtil.getDate(criteriaDate, CommonUtil.DATE_FORMAT);
			query.setParameter(0, d);
			VWWeekEnding weekEnding = (VWWeekEnding) query.uniqueResult();
			weekDO = mapperFacade.map(weekEnding, WeekDO.class);
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_WEEK, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_WEEK, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_WEEK, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}
		logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + END);

		return weekDO;
	}

	/**
	 * Verify user.
	 *
	 * @param userId the user id
	 * @return the user do
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public UserDO verifyUser(long userId) throws DataStoreException
	{
		logger.info(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + START);

		UserDO userDO = null;
		try
		{
			Query query = openSession().getNamedQuery("VWUser.getUser");
			query.setLong("userId", userId);
			VWUser user = (VWUser) query.uniqueResult();

			userDO = mapperFacade.map(user, UserDO.class);

		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(VEFIFY_USER, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(VEFIFY_USER, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(VEFIFY_USER, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(VEFIFY_USER + DELIMITER + USER_ID + userId + DELIMITER + END);

		return userDO;
	}

	/**
	 * Gets the user by email.
	 *
	 * @param emailId the email id
	 * @return the user by email
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public UserDO getUserByEmail(String emailId) throws DataStoreException
	{
		logger.info(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + START);

		UserDO userDO = null;
		try
		{
			Query query = openSession().getNamedQuery("VWUser.getUserByEmail");
			query.setString("emailId", emailId);
			VWUser user = (VWUser) query.uniqueResult();
			
			if(user != null)
			logger.debug("Email:" + emailId + DELIMITER + USER_ID + user.getUserId() + DELIMITER + "FirstName:" + user.getFirstName() + DELIMITER + "LastName:"+ user.getLastName());
			
			userDO = mapperFacade.map(user, UserDO.class);
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_USER_BY_EMAIL, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_USER_BY_EMAIL, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_USER_BY_EMAIL, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_USER_BY_EMAIL + DELIMITER + USER_ID + emailId + DELIMITER + END);

		return userDO;
	}

}
