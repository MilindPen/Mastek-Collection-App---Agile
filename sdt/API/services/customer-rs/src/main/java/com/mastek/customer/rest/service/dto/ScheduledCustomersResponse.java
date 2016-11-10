package com.mastek.customer.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class ScheduledCustomersResponse.
 */
public class ScheduledCustomersResponse extends BaseResponse
{

	/** The journey. */
	@JsonProperty(value = "journey")
	JourneyDO journey;
	
	/** The customer visits. */
	@JsonProperty(value = "customerVisits")
	List<CustomerVisitDO> customerVisits;

	/**
	 * Gets the customer visits.
	 *
	 * @return the customer visits
	 */
	public List<CustomerVisitDO> getCustomerVisits()
	{
		return customerVisits;
	}

	/**
	 * Sets the customer visits.
	 *
	 * @param customerVisits the customer visits
	 */
	public void setCustomerVisits(List<CustomerVisitDO> customerVisits)
	{
		this.customerVisits = customerVisits;
	}

	/**
	 * Gets the journey.
	 *
	 * @return the journey
	 */
	public JourneyDO getJourney()
	{
		return journey;
	}

	/**
	 * Sets the journey.
	 *
	 * @param journey the journey
	 */
	public void setJourney(JourneyDO journey)
	{
		this.journey = journey;
	}

}
