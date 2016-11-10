package com.mastek.customer.rest.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mastek.commons.domain.SaveDelegatedCustomersDO;
import com.mastek.commons.domain.SaveDelegatedAgentDetailsDO;
import com.mastek.commons.rest.service.dto.BaseRequest;

public class SaveDelegatedCustomerRequest extends BaseRequest {
	
	@JsonProperty(value="delegatedCustomers")	
	List<SaveDelegatedCustomersDO> delegatedCustomers;
	
	@JsonProperty(value = "delegatedAgentDetails")
	SaveDelegatedAgentDetailsDO delegatedAgentDetails;

	public List<SaveDelegatedCustomersDO> getDelegatedCustomers() {
		return delegatedCustomers;
	}

	public void setDelegatedCustomers(List<SaveDelegatedCustomersDO> delegatedCustomers) {
		this.delegatedCustomers = delegatedCustomers;
	}

	public SaveDelegatedAgentDetailsDO getDelegatedAgentDetails() {
		return delegatedAgentDetails;
	}

	public void setDelegatedAgentDetails(SaveDelegatedAgentDetailsDO delegatedAgentDetails) {
		this.delegatedAgentDetails = delegatedAgentDetails;
	}

}
