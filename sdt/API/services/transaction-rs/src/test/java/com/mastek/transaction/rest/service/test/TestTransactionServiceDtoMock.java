package com.mastek.transaction.rest.service.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.BalanceTransactionResponse;
import com.mastek.transaction.rest.service.dto.CardPaymentRequest;
import com.mastek.transaction.rest.service.dto.CardPaymentResponse;
import com.mastek.transaction.rest.service.dto.TransactionHistoryRequest;
import com.mastek.transaction.rest.service.dto.TransactionHistoryResponse;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncResponse;

public class TestTransactionServiceDtoMock
{

	@InjectMocks
	TransactionHistoryRequest transactionHistoryRequest = new TransactionHistoryRequest();
	
	@InjectMocks
	TransactionHistoryResponse transactionHistoryResponse = new TransactionHistoryResponse();
	
	@InjectMocks
	CardPaymentRequest cardPaymentRequest = new CardPaymentRequest();
	
	@InjectMocks
	CardPaymentResponse cardPaymentResponse = new CardPaymentResponse();
	
	@InjectMocks
	TransactionSyncRequest transactionSyncRequest = new TransactionSyncRequest();
	
	@InjectMocks
	TransactionSyncResponse transactionSyncResponse = new TransactionSyncResponse();
	
	@InjectMocks
	BalanceTransactionRequest balanceTransactionRequest = new BalanceTransactionRequest();
	
	@InjectMocks
	BalanceTransactionResponse balanceTransactionResponse = new BalanceTransactionResponse();
	
	AccessDO access;
	
	@Before
	public void init(){
		access = new AccessDO();
		transactionHistoryRequest.setAccess(access);
		cardPaymentRequest.setAccess(access);
		transactionSyncRequest.setAccess(access);
		balanceTransactionRequest.setAccess(access);
	}
	
	@Test
	public void testDomainObjects(){
		
		transactionHistoryRequest.setStartDate("test");
		transactionHistoryRequest.setEndDate("test");
		
		transactionHistoryRequest.getAccess();
		transactionHistoryRequest.getStartDate();
		transactionHistoryRequest.getEndDate();
		
		transactionHistoryResponse.setSuccess(true);
		transactionHistoryResponse.setErrorCode("ERR-102");
		transactionHistoryResponse.setErrorMessage("test message");
		List<TransactionHistoryDO> transactions = new ArrayList<TransactionHistoryDO>();
		transactionHistoryResponse.setTransactions(transactions);
		transactionHistoryResponse.getTransactions();
		
		cardPaymentRequest.setStartDate("test");
		cardPaymentRequest.setEndDate("test");
		cardPaymentRequest.setJourneyID(1320);
		
		cardPaymentRequest.getStartDate();
		cardPaymentRequest.getEndDate();
		cardPaymentRequest.getJourneyID();
		
		List<CardPaymentDO> cardPayments = new ArrayList<CardPaymentDO>();
		cardPaymentResponse.setCardPayments(cardPayments);
		cardPaymentResponse.getCardPayments();
		
		List<SynchronizDO> transactionDetails = new ArrayList<SynchronizDO>();
		transactionSyncRequest.setTransactionDetails(transactionDetails);
		transactionSyncRequest.getTransactionDetails();
		
		List<BalanceTransactionDO> balanceTransactions = new ArrayList<BalanceTransactionDO>();
		balanceTransactionRequest.setBalanceTransactions(balanceTransactions);
		balanceTransactionRequest.getBalanceTransactions();
	}
	
}
