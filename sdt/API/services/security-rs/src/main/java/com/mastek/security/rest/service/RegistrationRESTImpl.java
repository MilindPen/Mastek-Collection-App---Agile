package com.mastek.security.rest.service;

import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_USER_BY_EMAIL;
import static com.mastek.commons.util.ApplicationConstants.GET_WEEK;
import static com.mastek.commons.util.ApplicationConstants.REGISTER_USER;
import static com.mastek.commons.util.ApplicationConstants.REQUEST;
import static com.mastek.commons.util.ApplicationConstants.RESPONSE;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;
import static com.mastek.commons.util.ApplicationConstants.VEFIFY_USER;

import java.util.Date;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.exception.ApplicationException;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.util.CommonUtil;
import com.mastek.commons.util.PropertyResolver;
import com.mastek.security.rest.service.dto.UserRegistrationRequest;
import com.mastek.security.rest.service.dto.UserRegistrationResponse;
import com.mastek.security.rest.service.dto.UserRequest;
import com.mastek.security.rest.service.dto.UserResponse;
import com.mastek.security.rest.service.dto.UserVerificationRequest;
import com.mastek.security.rest.service.dto.UserVerificationResponse;
import com.mastek.security.rest.service.dto.WeekRequest;
import com.mastek.security.rest.service.dto.WeekResponse;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;

/**
 * The Class RegistrationRESTImpl.
 */
@Api(value = "api/security", description = "This API is related to the Registration procedure ")
@Component
public class RegistrationRESTImpl implements RegistrationREST
{
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(RegistrationRESTImpl.class);

	/** The security business delegate. */
	@Autowired
	SecurityBusinessDelegate securityBusinessDelegate;

	/**
	 * Verify user.
	 *
	 * @param userVerificationRequest the user verification request
	 * @return the user verification response
	 */
	@Path("/user/verification")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Verify an existing user", response = UserVerificationRequest.class, httpMethod = "POST")
	@Override
	public UserVerificationResponse verifyUser(UserVerificationRequest userVerificationRequest)
	{
		UserVerificationResponse response = new UserVerificationResponse();

		logger.info(VEFIFY_USER + DELIMITER + USER_ID + userVerificationRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(VEFIFY_USER + DELIMITER + USER_ID + userVerificationRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(userVerificationRequest));

		try
		{
			UserDO userDO = securityBusinessDelegate.verifyUser(userVerificationRequest.getSurname(), userVerificationRequest.getAccess().getUserId());

			if (userDO != null && userDO.getUserId() != 0 && userDO.getMobileUserId() == null && userDO.getMacAddress() == null)
			{
				//valid user
				response.setUser(userDO);
			}
			else if (userDO != null && userDO.getUserId() != 0 && userDO.getMobileUserId() != null && userDO.getMacAddress() != null && userDO.getMacAddress().equals("1"))
			{

				// not valid user, second device installation
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.DRE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(VEFIFY_USER + DELIMITER + USER_ID + userVerificationRequest.getAccess().getUserId() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
			}
			else if (userDO != null && userDO.getUserId() != 0 && userDO.getMobileUserId() != null && userDO.getMacAddress() != null && !userDO.getMacAddress().equals("1"))
			{
				// not valid user, second device installation
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.DRE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(VEFIFY_USER + DELIMITER + USER_ID + userVerificationRequest.getAccess().getUserId() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
			}
			else
			{
				// not valid user, not sdt user
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.NSUE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(VEFIFY_USER + DELIMITER + USER_ID + userVerificationRequest.getAccess().getUserId() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
			}

			response.setSuccess(true);

			logger.debug(VEFIFY_USER + DELIMITER + USER_ID + userVerificationRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(VEFIFY_USER + DELIMITER + USER_ID + userVerificationRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(VEFIFY_USER + DELIMITER + USER_ID + userVerificationRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(VEFIFY_USER, se);
			return response;
		}

	}

	/**
	 * Register user.
	 *
	 * @param userRegistrationRequest the user registration request
	 * @return the user registration response
	 */
	@Path("/user/registration")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Register a new user", response = UserRegistrationRequest.class, httpMethod = "POST")
	@Override
	public UserRegistrationResponse registerUser(UserRegistrationRequest userRegistrationRequest)
	{
		UserRegistrationResponse response = new UserRegistrationResponse();

		logger.info(REGISTER_USER + DELIMITER + USER_ID + userRegistrationRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(REGISTER_USER + DELIMITER + USER_ID + userRegistrationRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(userRegistrationRequest));

		try
		{
			String flag = securityBusinessDelegate.registerUser(userRegistrationRequest.getAccess().getUserId(), userRegistrationRequest.getPin(), userRegistrationRequest.getMac());
			logger.debug(REGISTER_USER + DELIMITER + "return"+ DELIMITER + flag);
			
			if (flag.equalsIgnoreCase("true"))
				response.setSuccess(true);
			else
			{
				response.setSuccess(false);
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.URE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(REGISTER_USER + DELIMITER + USER_ID + userRegistrationRequest.getAccess().getUserId() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
			}
			logger.debug(REGISTER_USER + DELIMITER + USER_ID + userRegistrationRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(REGISTER_USER + DELIMITER + USER_ID + userRegistrationRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(REGISTER_USER + DELIMITER + USER_ID + userRegistrationRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(REGISTER_USER, se);
			return response;
		}

	}

	/**
	 * Gets the week.
	 *
	 * @param sdtWeekRequest the sdt week request
	 * @return the week
	 */
	@Path("/sdtWeek")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get SDT Week", response = WeekRequest.class, httpMethod = "POST")
	@Override
	public WeekResponse getWeek(WeekRequest weekRequest)
	{
		WeekResponse response = new WeekResponse();

		logger.info(GET_WEEK + DELIMITER + USER_ID + weekRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_WEEK + DELIMITER + USER_ID + weekRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(weekRequest));

		WeekDO weekDO;
		try
		{
			Date d = new Date();
			String criteriaDate = weekRequest.getCriteriaDate();
			if (criteriaDate == null)
				criteriaDate = CommonUtil.getFormattedDate(d, CommonUtil.DATE_FORMAT);
			weekDO = securityBusinessDelegate.getWeek(criteriaDate, weekRequest.getAccess().getUserId());

			if (weekDO != null)
			{
				response.setErrorMessage(null);
				response.setErrorCode(null);
				response.setSuccess(true);
				response.setWeekDO(weekDO);

			}
			else
			{

				response.setSuccess(false);
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.FCE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(GET_WEEK + DELIMITER + USER_ID + weekRequest.getAccess().getUserId() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;

			}

		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_WEEK + DELIMITER + USER_ID + weekRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_WEEK, se);
			return response;
		}
		logger.debug(GET_WEEK + DELIMITER + USER_ID + weekRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(GET_WEEK + DELIMITER + USER_ID + weekRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	}
	
	/**
	 * Gets the user by email.
	 *
	 * @param userRequest the user request
	 * @return the user by email
	 */
	@Path("/user")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get user by email", response = UserRequest.class, httpMethod = "POST")
	@Override
	public UserResponse getUserByEmail(UserRequest userRequest)
	{
		UserResponse response = new UserResponse();

		logger.info(GET_USER_BY_EMAIL + DELIMITER + USER_ID + userRequest.getEmail() + DELIMITER + START);
		logger.debug(GET_USER_BY_EMAIL + DELIMITER + USER_ID + userRequest.getEmail() + DELIMITER + REQUEST + CommonUtil.objToJson(userRequest));

		try
		{
			UserDO userDO = securityBusinessDelegate.getUserByEmail(userRequest.getEmail());
			
			if(userDO != null && userDO.getIsActive() != null && userDO.getIsActive()){
				response.setSuccess(true);
				response.setErrorCode(null);
				response.setErrorMessage(null);
				response.setUser(userDO);
			}else if((userDO != null && userDO.getIsActive() == null) || (userDO != null && userDO.getIsActive() != null && !userDO.getIsActive()))
			{
				//not an active user
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.IAUE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(GET_USER_BY_EMAIL + DELIMITER + USER_ID + userRequest.getEmail() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
			}else{
				//user email not found
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.ENFE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(GET_USER_BY_EMAIL + DELIMITER + USER_ID + userRequest.getEmail() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
			}

			logger.debug(GET_USER_BY_EMAIL + DELIMITER + USER_ID + userRequest.getEmail() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(GET_USER_BY_EMAIL + DELIMITER + USER_ID + userRequest.getEmail() + DELIMITER + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_USER_BY_EMAIL + DELIMITER + USER_ID + userRequest.getEmail() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_USER_BY_EMAIL, se);
			return response;
		}

	}

}
