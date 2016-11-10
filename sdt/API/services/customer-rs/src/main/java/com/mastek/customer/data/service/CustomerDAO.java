package com.mastek.customer.data.service;

import java.util.List;

import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.commons.domain.DelegationCustomersDO;
import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;
/**
 * The Interface CustomerDAO.
 */
public interface CustomerDAO
{

	/**
	 * Gets the scheduled customers.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @return the scheduled customers
	 * @throws DataStoreException the data store exception
	 */
	List<CustomerVisitDO> getScheduledCustomers(String startDate, String endDate, long userId) throws DataStoreException;
	
	/**
	 * Update customer details.
	 *
	 * @param getUpdateCustomerRequest the get update customer request
	 * @return true, if successful
	 * @throws DataStoreException the data store exception
	 */
	boolean updateCustomerDetails(UpdateCustomerRequest getUpdateCustomerRequest) throws DataStoreException;
	
	/**
	 * Gets the journey.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the journey
	 * @throws DataStoreException the data store exception
	 */
	JourneyDO getJourney(String startDate, String endDate,long userId) throws DataStoreException;
	
	List<DelegationCustomersDO> delegationCustomers(String startDate, String endDate, long journeyId, long userId) throws DataStoreException;
	
	boolean saveDelegatedCustomers(SaveDelegatedCustomerRequest saveDelegatedCustomerRequest) throws DataStoreException;

}
