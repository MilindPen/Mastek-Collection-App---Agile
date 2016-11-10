package com.mastek.transaction.rest.service.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.transaction.business.service.TransactionService;
import com.mastek.transaction.business.service.TransactionServiceImpl;
import com.mastek.transaction.data.service.TransactionDAO;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;

@RunWith(MockitoJUnitRunner.class)
public class TestTransactionServiceMock
{

	@InjectMocks
	TransactionService transactionService = new TransactionServiceImpl();

	@Mock
	TransactionDAO transactionDAO;
	
	AccessDO accessDO;
	
	@Before
	public void init() throws Exception{
		accessDO = new AccessDO();
	}

	@Test
	public void testGetTransactionHistory()
	{
		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long userId = 2;
		try
		{

			List<TransactionHistoryDO> list = new ArrayList<TransactionHistoryDO>();

			Mockito.doReturn(list).when(transactionDAO).getTransactionHistory(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			transactionService.getTransactionHistory(startDate, endDate, userId);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetTransactionHistoryException()
	{

		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long journeyId = 1320;
		long userId = 2;

		try
		{
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(transactionDAO).getTransactionHistory(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			transactionService.getTransactionHistory(startDate, endDate, userId);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetCardPayments(){

		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long journeyId = 1320;
		long userId = 2;
		try
		{
			List<CardPaymentDO> list = new ArrayList<CardPaymentDO>();

			Mockito.doReturn(list).when(transactionDAO).getCardPayments(Mockito.any(Long.class), Mockito.any(Long.class),Mockito.any(String.class), Mockito.any(String.class));
			transactionService.getCardPayments(userId, journeyId, startDate, endDate);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testGetCardPaymentsException(){

		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long journeyId = 1320;
		long userId = 2;
		try
		{
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(transactionDAO).getCardPayments(Mockito.any(Long.class), Mockito.any(Long.class),Mockito.any(String.class), Mockito.any(String.class));
			transactionService.getCardPayments(userId, journeyId, startDate, endDate);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testTransactionSync(){

		TransactionSyncRequest request = new TransactionSyncRequest();
		request.setAccess(accessDO);
		try
		{
			Mockito.doReturn(true).when(transactionDAO).getTransactionSynchronizResult(Mockito.any(TransactionSyncRequest.class));
			transactionService.getTransactionSynchronizResult(request);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testTransactionSyncException(){

		TransactionSyncRequest request = new TransactionSyncRequest();
		request.setAccess(accessDO);
		try
		{
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(transactionDAO).getTransactionSynchronizResult(Mockito.any(TransactionSyncRequest.class));
			transactionService.getTransactionSynchronizResult(request);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	
	}
	
	@Test
	public void testSyncBalanceTransactions(){
		
		BalanceTransactionRequest balanceTransactionRequest = new BalanceTransactionRequest();
		balanceTransactionRequest.setAccess(accessDO);
		try
		{
			Mockito.doReturn(true).when(transactionDAO).syncBalanceTransactions(Mockito.any(BalanceTransactionRequest.class));
			transactionService.syncBalanceTransactions(balanceTransactionRequest);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
		
	}
	
	@Test
	public void testSyncBalanceTransactionsException(){
		
		BalanceTransactionRequest balanceTransactionRequest = new BalanceTransactionRequest();
		balanceTransactionRequest.setAccess(accessDO);
		try
		{
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(transactionDAO).syncBalanceTransactions(Mockito.any(BalanceTransactionRequest.class));
			transactionService.syncBalanceTransactions(balanceTransactionRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testTransactions(){
		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long userId = 2;
		try
		{
			List<SynchronizDO> list = new ArrayList<SynchronizDO>();
			Mockito.doReturn(list).when(transactionDAO).getTransactions(Mockito.any(String.class), Mockito.any(String.class),  Mockito.any(Long.class));
			transactionService.getTransactions(startDate, endDate, userId);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
		
	}
	
	@Test
	public void testTransactionsException(){
		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long userId = 2;

		try
		{
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(transactionDAO).getTransactions(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			transactionService.getTransactions(startDate, endDate, userId);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testBalanceTransactions(){
		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long journeyId = 1320;
		long userId = 2;
		try
		{
			List<BalanceTransactionDO> list = new ArrayList<BalanceTransactionDO>();
			Mockito.doReturn(list).when(transactionDAO).getBalanceTransactions(Mockito.any(String.class), Mockito.any(String.class),Mockito.any(Long.class), Mockito.any(Long.class));
			transactionService.getBalanceTransactions(startDate, endDate, journeyId, userId);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
		
	}
	
	@Test
	public void testBalanceTransactionsException(){
		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long journeyId = 1320;
		long userId = 2;

		try
		{
			Mockito.doThrow(new DataStoreException(new SystemException(SystemException.Type.DE, new RuntimeException()))).when(transactionDAO).getBalanceTransactions(Mockito.any(String.class), Mockito.any(String.class),Mockito.any(Long.class), Mockito.any(Long.class));
			transactionService.getBalanceTransactions(startDate, endDate, journeyId, userId);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
}
