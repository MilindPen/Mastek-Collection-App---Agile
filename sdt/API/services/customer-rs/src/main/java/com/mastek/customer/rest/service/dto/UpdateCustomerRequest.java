package com.mastek.customer.rest.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mastek.commons.domain.CustomerDO;
import com.mastek.commons.rest.service.dto.BaseRequest;
/**
 * The Class UpdateCustomerRequest.
 */
public class UpdateCustomerRequest extends BaseRequest{
	
	
/** The customer details. */
@JsonProperty(value="customerDetails")

private List<CustomerDO> customerDetails;

/**
 * Gets the customer details.
 *
 * @return the customerDetails
 */
public List<CustomerDO> getCustomerDetails() {
	return customerDetails;
}

/**
 * Sets the customer details.
 *
 * @param customerDetails the customerDetails to set
 */
public void setCustomerDetails(List<CustomerDO> customerDetails) {
	this.customerDetails = customerDetails;
}

}