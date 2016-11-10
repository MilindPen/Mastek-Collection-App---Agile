package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

public class SaveDelegatedAgentDetailsDO {
	
	/** The start date. */
	@JsonProperty(value = "startDate")
	String startDate;

	/** The end date. */
	@JsonProperty(value = "endDate")
	String endDate;
	
	@JsonProperty(value = "userJourneyId")
	Integer userJourneyId;
	
	@JsonProperty(value = "delegatedTo")
	Long delegatedTo;

	@JsonProperty(value = "isSelectAll")
	Integer isSelectAll;

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

	public Integer getUserJourneyId() {
		return userJourneyId;
	}

	public void setUserJourneyId(Integer userJourneyId) {
		this.userJourneyId = userJourneyId;
	}

	public Long getDelegatedTo() {
		return delegatedTo;
	}

	public void setDelegatedTo(Long delegatedTo) {
		this.delegatedTo = delegatedTo;
	}

	public Integer getIsSelectAll() {
		return isSelectAll;
	}

	public void setIsSelectAll(Integer isSelectAll) {
		this.isSelectAll = isSelectAll;
	}

}
