package com.mastek.commons.domain;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class ScheduledCustomersDO.
 */
public class ScheduledCustomersDO
{

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

}
