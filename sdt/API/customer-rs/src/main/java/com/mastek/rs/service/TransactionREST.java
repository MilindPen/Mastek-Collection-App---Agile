package com.mastek.rs.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.mastek.exception.ApplicationException;
import com.mastek.rs.dto.request.TransactionHistoryRequest;
import com.mastek.rs.dto.response.TransactionHistoryResponse;

@Component
@Path("/transactions")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface TransactionREST
{

	@POST
	@Path("/history")
	TransactionHistoryResponse getTransactionHistory(TransactionHistoryRequest transactionHistoryRequest) throws ApplicationException;
}
