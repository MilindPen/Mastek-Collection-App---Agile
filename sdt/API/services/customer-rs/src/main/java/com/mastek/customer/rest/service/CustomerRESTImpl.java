package com.mastek.customer.rest.service;

import static com.mastek.commons.util.ApplicationConstants.DELEGATION_CUSTOMERS;
import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_SCHEDULED_CUSTOMERS;
import static com.mastek.commons.util.ApplicationConstants.REQUEST;
import static com.mastek.commons.util.ApplicationConstants.RESPONSE;
import static com.mastek.commons.util.ApplicationConstants.SAVE_DELEGATED_CUSTOMERS;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.UPDATE_CUSTOMER_DETAILS;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.exception.ApplicationException;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.util.CommonUtil;
import com.mastek.commons.util.PropertyResolver;
import com.mastek.customer.rest.service.dto.DelegationCustomerRequest;
import com.mastek.customer.rest.service.dto.DelegationCustomerResponse;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerRequest;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerResponse;
import com.mastek.customer.rest.service.dto.ScheduledCustomersRequest;
import com.mastek.customer.rest.service.dto.ScheduledCustomersResponse;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerResponse;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/**
 * The Class CustomerRESTImpl.
 */
@Api(value = "api/customers", description = "This API retrives list of scheduled customers for an agent ")
@Component
public class CustomerRESTImpl implements CustomerREST
{
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(CustomerRESTImpl.class);
	/** The business delegate. */
	@Autowired
	CustomerBusinessDelegate customerBusinessDelegate;

	/**
	 * Gets the scheduled customers.
	 *
	 * @param getScheduledCustomersRequest the get scheduled customers request
	 * @return the scheduled customers
	 * @throws ApplicationException the application exception
	 */
	@Path("/scheduled")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get Scheduled Customers", response = ScheduledCustomersRequest.class, httpMethod = "POST")
	@Override
	public ScheduledCustomersResponse getScheduledCustomers(@ApiParam(value = "Get scheduled customer request", required = true) ScheduledCustomersRequest getScheduledCustomersRequest)
	{

		logger.info(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + getScheduledCustomersRequest.getAccess().getUserId() + " | " + START);
		logger.debug(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + getScheduledCustomersRequest.getAccess().getUserId() + " | " + REQUEST + CommonUtil.objToJson(getScheduledCustomersRequest));

		ScheduledCustomersResponse response = new ScheduledCustomersResponse();
		
		try
		{
			JourneyDO journey = customerBusinessDelegate.getJourney(getScheduledCustomersRequest.getStartDate(), getScheduledCustomersRequest.getEndDate(), getScheduledCustomersRequest.getAccess().getUserId());
			
			logger.debug(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + getScheduledCustomersRequest.getAccess().getUserId() + " | ");
			
				response.setJourney(journey);
			response.setCustomerVisits(customerBusinessDelegate.getScheduledCustomersOfAgent(getScheduledCustomersRequest.getStartDate(), getScheduledCustomersRequest.getEndDate(), getScheduledCustomersRequest.getAccess().getUserId()));
				response.setSuccess(true);

			logger.debug(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + getScheduledCustomersRequest.getAccess().getUserId() + " | " + RESPONSE + CommonUtil.objToJson(response));
			logger.info(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + getScheduledCustomersRequest.getAccess().getUserId() + " | " + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_SCHEDULED_CUSTOMERS + se);
			logger.error(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + getScheduledCustomersRequest.getAccess().getUserId() + " | " + se.getErrorCode() + " | " + PropertyResolver.getProperty(se.getErrorCode()));
			return response;
		}

	}

	/**
	 * Update customer details.
	 *
	 * @param updateCustomerRequest the update customer request
	 * @return the update customer response
	 * @throws ApplicationException the application exception
	 */
	@Path("/update/sync")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Update Customer Details", response = UpdateCustomerRequest.class, httpMethod = "POST")
	@Override
	public UpdateCustomerResponse updateCustomerDetails(UpdateCustomerRequest getUpdateCustomerRequest)
	{
		logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + START);
		logger.debug(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + REQUEST + CommonUtil.objToJson(getUpdateCustomerRequest));

		UpdateCustomerResponse response = new UpdateCustomerResponse();
		try
		{

			response.setSuccess(customerBusinessDelegate.updateCustomerDetails(getUpdateCustomerRequest));
			logger.debug(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + RESPONSE + CommonUtil.objToJson(response));
			logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(UPDATE_CUSTOMER_DETAILS + se);
			logger.error(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + se.getErrorCode() + " | " + PropertyResolver.getProperty(se.getErrorCode()));
			return response;
		}
	}

	@Path("/delegationCustomers")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get list of delegation customers", response = DelegationCustomerRequest.class, httpMethod = "POST")
	@Override
	public DelegationCustomerResponse delegationCustomers(DelegationCustomerRequest delegationCustomerRequest)
			throws ApplicationException {

		logger.info(DELEGATION_CUSTOMERS + " | " + USER_ID + delegationCustomerRequest.getAccess().getUserId() + " | " + START);
		logger.debug(DELEGATION_CUSTOMERS + " | " + USER_ID + delegationCustomerRequest.getAccess().getUserId() + " | " + REQUEST + CommonUtil.objToJson(delegationCustomerRequest));

		DelegationCustomerResponse response = new DelegationCustomerResponse();
		try
		{
			response.setDelegationCustomers(customerBusinessDelegate.delegationCustomers(delegationCustomerRequest.getStartDate(), delegationCustomerRequest.getEndDate(), delegationCustomerRequest.getJourneyId(), delegationCustomerRequest.getAccess().getUserId()));
			response.setSuccess(true);
			
			logger.debug(DELEGATION_CUSTOMERS + " | " + USER_ID + delegationCustomerRequest.getAccess().getUserId() + " | " + RESPONSE + CommonUtil.objToJson(response));
			logger.info(DELEGATION_CUSTOMERS + " | " + USER_ID + delegationCustomerRequest.getAccess().getUserId() + " | " + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(DELEGATION_CUSTOMERS + se);
			logger.error(DELEGATION_CUSTOMERS + " | " + USER_ID + delegationCustomerRequest.getAccess().getUserId() + " | " + se.getErrorCode() + " | " + PropertyResolver.getProperty(se.getErrorCode()));
			return response;
		}
	}
	
	@Path("/savedelegatedcustomers")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Save delegated customers", response = SaveDelegatedCustomerRequest.class, httpMethod = "POST")
	@Override
	public SaveDelegatedCustomerResponse saveDelegatedCustomers(
			SaveDelegatedCustomerRequest saveDelegatedCustomerRequest) throws ApplicationException {
		SaveDelegatedCustomerResponse response = new SaveDelegatedCustomerResponse();
		logger.info(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(saveDelegatedCustomerRequest));
		try
		{
			response.setSuccess(customerBusinessDelegate.saveDelegatedCustomers(saveDelegatedCustomerRequest));

			logger.debug(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(SAVE_DELEGATED_CUSTOMERS + se);
			return response;
		}
	}
}
