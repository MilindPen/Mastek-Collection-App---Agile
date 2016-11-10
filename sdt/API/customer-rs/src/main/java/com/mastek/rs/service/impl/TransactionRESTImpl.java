package com.mastek.rs.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.mastek.exception.ApplicationException;
import com.mastek.rs.dto.request.TransactionHistoryRequest;
import com.mastek.rs.dto.response.TransactionHistoryResponse;
import com.mastek.rs.service.TransactionREST;
import com.mastek.util.PropertyResolver;

@Component
public class TransactionRESTImpl extends AbstractRESTImpl implements TransactionREST
{

	private static final Logger logger = LoggerFactory.getLogger(TransactionRESTImpl.class);
	
	@Override
	public TransactionHistoryResponse getTransactionHistory(TransactionHistoryRequest transactionHistoryRequest) throws ApplicationException
	{
		TransactionHistoryResponse response = new TransactionHistoryResponse();
		
		logger.info("TransactionRESTImpl : getTransactionHistory : START");
		
		try
		{
			response.setTransactions(businessDelegate.getTransactionHistory(transactionHistoryRequest.getStartDate(), transactionHistoryRequest.getEndDate(), transactionHistoryRequest.getAgreementIds()));
			response.setSuccess(true);
			return response;
		}
		catch (ApplicationException e)
		{
			response.setSuccess(false);
			response.setErrorCode("ERR5002");
			response.setErrorMessage(PropertyResolver.getProperty("ERR5002"));
			return response;
		}
		
	}
	
}
