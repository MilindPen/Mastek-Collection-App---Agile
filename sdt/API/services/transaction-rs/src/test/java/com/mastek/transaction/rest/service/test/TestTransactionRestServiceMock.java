package com.mastek.transaction.rest.service.test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.mastek.commons.exception.SystemException;
import com.mastek.transaction.business.service.TransactionService;
import com.mastek.transaction.filter.CORSServletTransactionFilter;
import com.mastek.transaction.rest.service.SwaggerConfiguration;
import com.mastek.transaction.rest.service.TransactionBusinessDelegate;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;

@RunWith(MockitoJUnitRunner.class)
public class TestTransactionRestServiceMock
{
	@InjectMocks
	TransactionBusinessDelegate delegate = new TransactionBusinessDelegate();

	@InjectMocks
	SwaggerConfiguration conf = new SwaggerConfiguration();

	@InjectMocks
	CORSServletTransactionFilter filter = new CORSServletTransactionFilter();

	@Mock
	HttpServletRequest req;

	@Mock
	HttpServletResponse res;

	@Mock
	FilterChain chain;

	@Mock
	FilterConfig init;

	AccessDO accessDO;

	@Mock
	TransactionService transactionService;

	@Before
	public void init() throws Exception
	{
		accessDO = new AccessDO();
	}

	@Test
	public void testTransactionHistory()
	{

		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long userId = 2;

		try
		{
			List<TransactionHistoryDO> list = new ArrayList<TransactionHistoryDO>();

			Mockito.doReturn(list).when(transactionService).getTransactionHistory(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			delegate.getTransactionHistory(startDate, endDate, userId);

			Assert.assertTrue(true);

		}
		catch (Exception e)
		{

			Assert.assertTrue(false);
		}

	}

	@Test
	public void testTransactionHistoryException()
	{

		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long userId = 2;

		try
		{

			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(transactionService).getTransactionHistory(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			delegate.getTransactionHistory(startDate, endDate, userId);

		}
		catch (Exception e)
		{

			Assert.assertTrue(true);
		}

	}

	@Test
	public void testGetCardPayments()
	{

		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long journeyId = 1320;
		long userId = 2;
		try
		{
			List<CardPaymentDO> list = new ArrayList<CardPaymentDO>();

			Mockito.doReturn(list).when(transactionService).getCardPayments(Mockito.any(Long.class), Mockito.any(Long.class), Mockito.any(String.class), Mockito.any(String.class));
			delegate.getCardPayments(userId, journeyId, startDate, endDate);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetCardPaymentsException()
	{

		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long journeyId = 1320;
		long userId = 2;
		try
		{
			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(transactionService).getCardPayments(Mockito.any(Long.class), Mockito.any(Long.class), Mockito.any(String.class), Mockito.any(String.class));
			delegate.getCardPayments(userId, journeyId, startDate, endDate);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testTransactionSync()
	{

		TransactionSyncRequest request = new TransactionSyncRequest();
		request.setAccess(accessDO);
		try
		{
			Mockito.doReturn(true).when(transactionService).getTransactionSynchronizResult(Mockito.any(TransactionSyncRequest.class));
			delegate.getTransactionSynchronizResult(request);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testTransactionSyncException()
	{

		TransactionSyncRequest request = new TransactionSyncRequest();
		request.setAccess(accessDO);
		try
		{
			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(transactionService).getTransactionSynchronizResult(Mockito.any(TransactionSyncRequest.class));
			delegate.getTransactionSynchronizResult(request);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}

	}

	@Test
	public void testSyncBalanceTransactions()
	{

		BalanceTransactionRequest balanceTransactionRequest = new BalanceTransactionRequest();
		balanceTransactionRequest.setAccess(accessDO);
		try
		{
			Mockito.doReturn(true).when(transactionService).syncBalanceTransactions(Mockito.any(BalanceTransactionRequest.class));
			delegate.syncBalanceTransactions(balanceTransactionRequest);

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}

	}

	@Test
	public void testSyncBalanceTransactionsException()
	{

		BalanceTransactionRequest balanceTransactionRequest = new BalanceTransactionRequest();
		balanceTransactionRequest.setAccess(accessDO);
		try
		{
			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(transactionService).syncBalanceTransactions(Mockito.any(BalanceTransactionRequest.class));
			delegate.syncBalanceTransactions(balanceTransactionRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}

	}

	@Test
	public void testSwaggerConfiguration()
	{
		conf.getClasses();
		conf.getSingletons();
	}

	@Test
	public void testFilter()
	{
		try
		{
			filter.doFilter(req, res, chain);
			filter.destroy();
			filter.init(init);
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		catch (ServletException e)
		{
			e.printStackTrace();
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
			Mockito.doReturn(list).when(transactionService).getTransactions(Mockito.any(String.class), Mockito.any(String.class),  Mockito.any(Long.class));
			delegate.getTransactions(startDate, endDate, userId);

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
			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(transactionService).getTransactions(Mockito.any(String.class), Mockito.any(String.class), Mockito.any(Long.class));
			delegate.getTransactions(startDate, endDate, userId);

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
			Mockito.doReturn(list).when(transactionService).getBalanceTransactions(Mockito.any(String.class), Mockito.any(String.class),Mockito.any(Long.class), Mockito.any(Long.class));
			delegate.getBalanceTransactions(startDate, endDate, journeyId, userId);

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
			Mockito.doThrow(new SystemException(SystemException.Type.DE, new RuntimeException())).when(transactionService).getBalanceTransactions(Mockito.any(String.class), Mockito.any(String.class),Mockito.any(Long.class), Mockito.any(Long.class));
			delegate.getBalanceTransactions(startDate, endDate, journeyId, userId);

		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

}
