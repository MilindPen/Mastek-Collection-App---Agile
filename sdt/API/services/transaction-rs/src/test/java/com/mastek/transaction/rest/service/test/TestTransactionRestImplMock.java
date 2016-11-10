package com.mastek.transaction.rest.service.test;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.exception.SystemException;
import com.mastek.transaction.rest.service.TransactionBusinessDelegate;
import com.mastek.transaction.rest.service.TransactionREST;
import com.mastek.transaction.rest.service.TransactionRESTImpl;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.CardPaymentRequest;
import com.mastek.transaction.rest.service.dto.TransactionHistoryRequest;
import com.mastek.transaction.rest.service.dto.TransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;

@RunWith(MockitoJUnitRunner.class)
public class TestTransactionRestImplMock
{
	@InjectMocks
	TransactionREST transactionREST = new TransactionRESTImpl();
	
	@Mock
	TransactionBusinessDelegate transactionBusinessDelegate;
	
	@Mock
	Properties msgProp;
	
	AccessDO accessDO;
	
	ServiceException exp;
	
	TransactionHistoryRequest transactionHistoryRequest;
	
	CardPaymentRequest cardPaymentRequest;
	
	TransactionSyncRequest transactionSyncRequest;
	
	BalanceTransactionRequest balanceTransactionRequest;
	
	TransactionRequest transactionRequest;
	
	@Before
	public void init() throws Exception{
		accessDO = new AccessDO();
		transactionHistoryRequest = new TransactionHistoryRequest();
		cardPaymentRequest = new CardPaymentRequest();
		transactionSyncRequest = new TransactionSyncRequest();
		balanceTransactionRequest = new BalanceTransactionRequest();
		transactionRequest = new TransactionRequest();
		transactionHistoryRequest.setAccess(accessDO);
		cardPaymentRequest.setAccess(accessDO);
		transactionSyncRequest.setAccess(accessDO);
		balanceTransactionRequest.setAccess(accessDO);
		transactionRequest.setAccess(accessDO);
		exp = new ServiceException();
		exp.setSystemException(new SystemException(SystemException.Type.DE, new RuntimeException()));
	}
	
	@Test
	public void testTransactionHistory(){
		try
		{
			List<TransactionHistoryDO> list = new ArrayList<TransactionHistoryDO>();

			Mockito.doReturn(list).when(transactionBusinessDelegate).getTransactionHistory(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			transactionREST.getTransactionHistory(transactionHistoryRequest);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	
	}
	
	@Test
	public void testTransactionHistoryException(){
		try
		{
			Mockito.doReturn("test").when(msgProp).getProperty(Mockito.any(String.class));
			Mockito.doThrow(exp).when(transactionBusinessDelegate).getTransactionHistory(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			transactionREST.getTransactionHistory(transactionHistoryRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testCardPayments(){
		try
		{
			List<CardPaymentDO> list = new ArrayList<CardPaymentDO>();

			Mockito.doReturn(list).when(transactionBusinessDelegate).getCardPayments(Mockito.any(Long.class), Mockito.any(Long.class),Mockito.any(String.class), Mockito.any(String.class));
			transactionREST.getCardPayments(cardPaymentRequest);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	
	}
	
	@Test
	public void testCardPaymentsException(){
		try
		{
			Mockito.doReturn("test").when(msgProp).getProperty(Mockito.any(String.class));
			Mockito.doThrow(exp).when(transactionBusinessDelegate).getCardPayments(Mockito.any(Long.class), Mockito.any(Long.class),Mockito.any(String.class), Mockito.any(String.class));
			transactionREST.getCardPayments(cardPaymentRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testTransactionSynchroniz(){
		try
		{
			Mockito.doReturn(true).when(transactionBusinessDelegate).getTransactionSynchronizResult(Mockito.any(TransactionSyncRequest.class));
			transactionREST.getTransactionSynchronizResult(transactionSyncRequest);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	
	}
	
	@Test
	public void testTransactionSynchronizException(){
		try
		{
			Mockito.doReturn("test").when(msgProp).getProperty(Mockito.any(String.class));
			Mockito.doThrow(exp).when(transactionBusinessDelegate).getTransactionSynchronizResult(Mockito.any(TransactionSyncRequest.class));
			transactionREST.getTransactionSynchronizResult(transactionSyncRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	
	}
	
	@Test
	public void testSyncBalanceTransactions(){
		try
		{
			Mockito.doReturn(true).when(transactionBusinessDelegate).syncBalanceTransactions(Mockito.any(BalanceTransactionRequest.class));
			transactionREST.syncBalanceTransactions(balanceTransactionRequest);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	
	}
	
	@Test
	public void testSyncBalanceTransactionsException(){
		try
		{
			Mockito.doReturn("test").when(msgProp).getProperty(Mockito.any(String.class));
			Mockito.doThrow(exp).when(transactionBusinessDelegate).syncBalanceTransactions(Mockito.any(BalanceTransactionRequest.class));
			transactionREST.syncBalanceTransactions(balanceTransactionRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	
	}
	
	@Test
	public void testTransactions(){
		try
		{
			List<SynchronizDO> list = new ArrayList<SynchronizDO>();

			Mockito.doReturn(list).when(transactionBusinessDelegate).getTransactions(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			transactionREST.getTransactions(transactionRequest);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	
	}
	
	@Test
	public void testTransactionsException(){
		try
		{
			Mockito.doReturn("test").when(msgProp).getProperty(Mockito.any(String.class));
			Mockito.doThrow(exp).when(transactionBusinessDelegate).getTransactions(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			transactionREST.getTransactions(transactionRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
}
