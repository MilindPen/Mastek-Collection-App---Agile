package com.mastek.customer.business.service;

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
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.ServiceException;
import com.mastek.customer.data.service.CustomerDAO;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;

/**
 * The Class CustomerServiceImpl.
 */
@Component
public class CustomerServiceImpl implements CustomerService
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
	/** The customer dao. */
	@Autowired
	CustomerDAO customerDAO;

	/** 
	 *  Gets the scheduled customers of agent.
	 * */
	@Override
	public List<CustomerVisitDO> getScheduledCustomersOfAgent(String startDate, String endDate, long userId)
	{
		logger.info(GET_SCHEDULED_CUSTOMES_OF_AGENT + " | " + USER_ID + userId + " | " + START);
		try
		{
			List<CustomerVisitDO> customerVisitDOList = customerDAO.getScheduledCustomers(startDate, endDate, userId);

			logger.info(GET_SCHEDULED_CUSTOMES_OF_AGENT + " | " + USER_ID + userId + " | " + END);
			return customerVisitDOList;

		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_SCHEDULED_CUSTOMES_OF_AGENT + " | " + USER_ID + userId + " | " + dataStoreException.getSystemException().getType().getErrorCode() + " | " + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_SCHEDULED_CUSTOMES_OF_AGENT + dataStoreException);
			throw dataStoreException.getSystemException();
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

		boolean response;
		try
		{

			logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + START);
			response = customerDAO.updateCustomerDetails(getUpdateCustomerRequest);
			logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + END);
			return response;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.info(UPDATE_CUSTOMER_DETAILS, dataStoreException);
			logger.error(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + dataStoreException.getSystemException().getType().getErrorCode() + " | " + dataStoreException.getSystemException().getType().getMessage());
			throw dataStoreException.getSystemException();
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
		JourneyDO journey = null;
		try
		{
			logger.info(GET_JOURNEY + " | " + USER_ID + userId + " | " + START);

			journey = customerDAO.getJourney(startDate, endDate, userId);

			logger.info(GET_JOURNEY + " | " + USER_ID + userId + " | " + END);
			return journey;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_JOURNEY + " | " + USER_ID + userId + " | " + dataStoreException.getSystemException().getType().getErrorCode() + " | " + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_JOURNEY + dataStoreException);
			throw dataStoreException.getSystemException();
		}
	}

	@Override
	public List<DelegationCustomersDO> delegationCustomers(String startDate, String endDate, long journeyId,
			long userId) throws ServiceException {

		List<DelegationCustomersDO> customerList = null;
		try
		{
			logger.info(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + START);

			customerList = customerDAO.delegationCustomers(startDate, endDate, journeyId, userId);

			logger.info(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + END);
			return customerList;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + dataStoreException.getSystemException().getType().getErrorCode() + " | " + dataStoreException.getSystemException().getType().getMessage());
			logger.info(DELEGATION_CUSTOMERS + dataStoreException);
			throw dataStoreException.getSystemException();
		}
	}

	@Override
	public boolean saveDelegatedCustomers(SaveDelegatedCustomerRequest saveDelegatedCustomerRequest)
			throws ServiceException {
		boolean response;
		try
		{
			logger.info(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + START);
			response = customerDAO.saveDelegatedCustomers(saveDelegatedCustomerRequest);
			logger.info(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(SAVE_DELEGATED_CUSTOMERS, dataStoreException);
			throw dataStoreException.getSystemException();
		}
	}
}
