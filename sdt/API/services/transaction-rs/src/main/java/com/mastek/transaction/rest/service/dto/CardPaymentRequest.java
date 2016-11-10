package com.mastek.transaction.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.rest.service.dto.BaseRequest;

public class CardPaymentRequest extends BaseRequest {

	/** The journey ID. */
	@JsonProperty(value = "journeyID")
	long journeyID;

	/** The start Date. */
	@JsonProperty(value = "startDate")
	String startDate;	
	
	/** The end Date. */
	@JsonProperty(value = "endDate")
	String endDate;

	public long getJourneyID() {
		return journeyID;
	}

	public void setJourneyID(long journeyID) {
		this.journeyID = journeyID;
	}

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
	
}
