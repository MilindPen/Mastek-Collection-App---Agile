package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

public class SaveDelegatedCustomersDO {
	
	@JsonProperty(value = "customerJourneyIds")
	Integer customerJourneyIds;

	public Integer getCustomerJourneyIds() {
		return customerJourneyIds;
	}

	public void setCustomerJourneyIds(Integer customerJourneyIds) {
		this.customerJourneyIds = customerJourneyIds;
	}
}
