package com.mastek.customer.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.mastek.commons.exception.ApplicationException;
import com.mastek.customer.rest.service.dto.DelegationCustomerRequest;
import com.mastek.customer.rest.service.dto.DelegationCustomerResponse;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerRequest;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerResponse;
import com.mastek.customer.rest.service.dto.ScheduledCustomersRequest;
import com.mastek.customer.rest.service.dto.ScheduledCustomersResponse;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;

/**
 * The Interface CustomerREST.
 */
@Component
@Path("api/customers")
@Api(value = "api/customers")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface CustomerREST
{

	/**
	 * Gets the scheduled customers.
	 *
	 * @param getScheduledCustomersRequest the get scheduled customers request
	 * @return the scheduled customers
	 * @throws ApplicationException the application exception
	 */
	@POST
	@Path("/scheduled")
	@ApiOperation(value = "getScheduled", notes = "Get list of scheduled customers")
	@ApiResponses(value = {})
	ScheduledCustomersResponse getScheduledCustomers(@ApiParam(value = "Get scheduled customer request", required = true) ScheduledCustomersRequest getScheduledCustomersRequest) throws ApplicationException;

	
	/**
	 * Update customer details.
	 *
	 * @param updateCustomerRequest the update customer request
	 * @return the update customer response
	 * @throws ApplicationException the application exception
	 */
	@POST
	@Path("/update/sync")
	@ApiOperation(value = "updateCustomer", notes = "Update Customer Details")
	@ApiResponses(value = {})
	UpdateCustomerResponse updateCustomerDetails(@ApiParam(value = "Update Customer Details", required = true) UpdateCustomerRequest updateCustomerRequest)throws ApplicationException;
	
	@POST
	@Path("/delegationCustomers")
	@ApiOperation(value = "delegationCustomers", notes = "Get list of delegation customers")
	@ApiResponses(value = {})
	DelegationCustomerResponse delegationCustomers(@ApiParam(value = "Get list of delegation customers", required = true) DelegationCustomerRequest delegationCustomerRequest)throws ApplicationException;
	
	@POST
	@Path("/savedelegatedcustomers")
	@ApiOperation(value = "saveDelegatedCustomers", notes = "Save delegated customers")
	@ApiResponses(value = {})
	SaveDelegatedCustomerResponse saveDelegatedCustomers(@ApiParam(value = "Save delegated customers", required = true) SaveDelegatedCustomerRequest saveDelegatedCustomerRequest)throws ApplicationException;
}
