package com.mastek.customer.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.DelegationCustomersDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

public class DelegationCustomerResponse extends BaseResponse {

	@JsonProperty(value = "delegationCustomers")
	List<DelegationCustomersDO> delegationCustomers;

	public List<DelegationCustomersDO> getDelegationCustomers() {
		return delegationCustomers;
	}

	public void setDelegationCustomers(List<DelegationCustomersDO> delegationCustomers) {
		this.delegationCustomers = delegationCustomers;
	}
}
