package com.mastek.customer.rest.service;

import static com.mastek.commons.util.ApplicationConstants.DELEGATION_CUSTOMERS;
import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_JOURNEY;
import static com.mastek.commons.util.ApplicationConstants.GET_SCHEDULED_CUSTOMES_OF_AGENT;
import static com.mastek.commons.util.ApplicationConstants.SAVE_DELEGATED_CUSTOMERS;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.UPDATE_CUSTOMER_DETAILS;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.commons.domain.DelegationCustomersDO;
import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.exception.ApplicationException;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.exception.SystemException;
import com.mastek.customer.business.service.CustomerService;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;

/**
 * The Class CustomerBusinessDelegate.
 */
@Component
public class CustomerBusinessDelegate implements CustomerService
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(CustomerBusinessDelegate.class);
	/** The customer service. */
	@Autowired
	private CustomerService customerService;

	/**
	 *  
	 *  Gets the scheduled customers of agent.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @return the scheduled customers of agent
	 * @throws ServiceException the service exception
	 */
	@Override
	public List<CustomerVisitDO> getScheduledCustomersOfAgent(String startDate, String endDate, long userId) throws ServiceException
	{
		logger.info(GET_SCHEDULED_CUSTOMES_OF_AGENT + " | " + USER_ID + userId + " | " + START);

		List<CustomerVisitDO> customerVisitDOList;

		try
		{
			customerVisitDOList = customerService.getScheduledCustomersOfAgent(startDate, endDate, userId);

			if (customerVisitDOList.isEmpty())
			{
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.NVFE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(GET_SCHEDULED_CUSTOMES_OF_AGENT + " | " + USER_ID + userId + " | " + applicationException.getType().getErrorCode() + " | " + applicationException.getType().getMessage());
				throw serviceException;
			}

			logger.info(GET_SCHEDULED_CUSTOMES_OF_AGENT + " | " + USER_ID + userId + " | " + END);

			return customerVisitDOList;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_SCHEDULED_CUSTOMES_OF_AGENT + " | " + USER_ID + userId + " | " + systemException.getType().getErrorCode() + " | " + systemException.getType().getMessage());
			throw serviceException;
		}
	}

	/**
	 * Update customer details.
	 *
	 * @param getUpdateCustomerRequest the get update customer request
	 * @return true, if successful
	 * @throws ServiceException the service exception
	 */
	@Override
	public boolean updateCustomerDetails(UpdateCustomerRequest getUpdateCustomerRequest) throws ServiceException
	{
		logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + START);

		try
		{
			boolean response = customerService.updateCustomerDetails(getUpdateCustomerRequest);
			logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + END);

			return response;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + systemException.getType().getErrorCode() + " | " + systemException.getType().getMessage());
			throw serviceException;
		}

	}

	/**
	 * Gets the journey.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the journey
	 * @throws ServiceException the service exception
	 */
	@Override
	public JourneyDO getJourney(String startDate, String endDate, long userId) throws ServiceException
	{
		logger.info(GET_JOURNEY + " | " + USER_ID + userId + " | " + START);
		JourneyDO journey = null;
		try
		{
			journey = customerService.getJourney(startDate, endDate, userId);

			logger.info(GET_JOURNEY + " | " + USER_ID + userId + " | " + END);
			return journey;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_JOURNEY + " | " + USER_ID + userId + " | " + systemException.getType().getErrorCode() + " | " + systemException.getType().getMessage());
			throw serviceException;
		}
	}

	@Override
	public List<DelegationCustomersDO> delegationCustomers(String startDate, String endDate, long journeyId,
			long userId) throws ServiceException {

		logger.info(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + START);
		
		List<DelegationCustomersDO> customerList = null;
		try
		{
			customerList = customerService.delegationCustomers(startDate, endDate, journeyId, userId);

			logger.info(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + END);
			return customerList;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + systemException.getType().getErrorCode() + " | " + systemException.getType().getMessage());
			throw serviceException;
		}
	}

	@Override
	public boolean saveDelegatedCustomers(SaveDelegatedCustomerRequest saveDelegatedCustomerRequest)
			throws ServiceException {
		try
		{
			logger.info(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + START);
			boolean response = customerService.saveDelegatedCustomers(saveDelegatedCustomerRequest);
			logger.info(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
	}

}
