package com.mastek.customer.business.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.commons.domain.DelegationCustomersDO;
import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.exception.ServiceException;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;
/**
 * The Interface CustomerService.
 */
@Component
public interface CustomerService
{

	/**
	 * Gets the scheduled customers of agent.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @return the scheduled customers of agent
	 * @throws ServiceException the service exception
	 */
	List<CustomerVisitDO> getScheduledCustomersOfAgent(String startDate, String endDate, long userId) throws ServiceException;
	
	/**
	 * Update customer details.
	 *
	 * @param getUpdateCustomerRequest the get update customer request
	 * @return true, if successful
	 * @throws ServiceException the service exception
	 */
	boolean updateCustomerDetails(UpdateCustomerRequest getUpdateCustomerRequest) throws ServiceException;
	
	/**
	 * Gets the journey.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the journey
	 * @throws ServiceException the service exception
	 */
	JourneyDO getJourney(String startDate, String endDate,long userId) throws ServiceException;

	List<DelegationCustomersDO> delegationCustomers(String startDate, String endDate, long journeyId, long userId) throws ServiceException;
	
	boolean saveDelegatedCustomers(SaveDelegatedCustomerRequest saveDelegatedCustomerRequest) throws ServiceException;
	
}
