package com.mastek.customer.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.rest.service.dto.BaseRequest;

public class DelegationCustomerRequest extends BaseRequest{
	
	/** The start date. */
	@JsonProperty(value = "startDate")
	String startDate;

	/** The end date. */
	@JsonProperty(value = "endDate")
	String endDate;
	
	/** The journey id. */
	@JsonProperty(value = "journeyId")
	long journeyId;

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public long getJourneyId() {
		return journeyId;
	}

	public void setJourneyId(long journeyId) {
		this.journeyId = journeyId;
	}
	
}
