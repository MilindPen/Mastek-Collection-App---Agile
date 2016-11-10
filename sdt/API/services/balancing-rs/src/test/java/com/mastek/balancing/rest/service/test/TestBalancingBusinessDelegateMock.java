package com.mastek.balancing.rest.service.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.balancing.business.service.BalancingService;
import com.mastek.balancing.rest.service.BalancingBusinessDelegate;
import com.mastek.commons.domain.BranchWeekStatusDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDO;
import com.mastek.commons.domain.JourneySelectionDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.UserSelectionDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.domain.WeeklySummaryDO;
import com.mastek.commons.exception.SystemException;
import com.mastek.commons.exception.SystemException.Type;

@RunWith(MockitoJUnitRunner.class)
public class TestBalancingBusinessDelegateMock
{

	@InjectMocks
	BalancingBusinessDelegate balancingBusinessDelegate = new BalancingBusinessDelegate();

	@Mock
	BalancingService balancingService;

	String startDate = "";
	String endDate = "";
	long userId = 0;
	long branchId = 1;

	@Test
	public void testGetWeek()
	{
		List<WeekDO> weeks = new ArrayList<WeekDO>();
		String criteriaDate = "";
		long userId = 0;
		try
		{
			Mockito.doReturn(weeks).when(balancingService).getWeek(criteriaDate, userId);
			balancingBusinessDelegate.getWeek(criteriaDate, userId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetWeekException()
	{
		String criteriaDate = "";
		long userId = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getWeek(criteriaDate, userId);
			balancingBusinessDelegate.getWeek(criteriaDate, userId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetJourney()
	{
		List<JourneySelectionDO> journeys = new ArrayList<JourneySelectionDO>();
		try
		{
			Mockito.doReturn(journeys).when(balancingService).getJourney(branchId, startDate, endDate, userId);
			balancingBusinessDelegate.getJourney(branchId, startDate, endDate, userId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetJourneyException()
	{
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getJourney(branchId, startDate, endDate, userId);
			balancingBusinessDelegate.getJourney(branchId, startDate, endDate, userId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetUsers()
	{
		List<UserSelectionDO> users = new ArrayList<UserSelectionDO>();
		try
		{
			Mockito.doReturn(users).when(balancingService).getUsers(branchId, startDate, endDate, userId);
			balancingBusinessDelegate.getUsers(branchId, startDate, endDate, userId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetUsersException()
	{
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getUsers(branchId, startDate, endDate, userId);
			balancingBusinessDelegate.getUsers(branchId, startDate, endDate, userId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetWeeklyCashSummary()
	{
		long journeyId = 0;
		long loggedInUserId = 0;
		WeeklySummaryDO weeklySummaryDO = new WeeklySummaryDO();
		try
		{
			Mockito.doReturn(weeklySummaryDO).when(balancingService).getWeeklyCashSummary(startDate, endDate, journeyId, userId, loggedInUserId);
			balancingBusinessDelegate.getWeeklyCashSummary(startDate, endDate, journeyId, userId, loggedInUserId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetWeeklyCashSummaryException()
	{
		long journeyId = 0;
		long loggedInUserId = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getWeeklyCashSummary(startDate, endDate, journeyId, userId, loggedInUserId);
			balancingBusinessDelegate.getWeeklyCashSummary(startDate, endDate, journeyId, loggedInUserId, loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testRetrieveBalanceTransactions()
	{
		String balanceTypeId = "";
		long journeyId = 0;
		long loggedInUserId = 0;
		List<RetrieveTransactionsDO> transactions = new ArrayList<RetrieveTransactionsDO>();
		try
		{
			Mockito.doReturn(transactions).when(balancingService).retrieveBalanceTransactions(startDate, endDate, journeyId, userId, balanceTypeId, loggedInUserId);
			balancingBusinessDelegate.retrieveBalanceTransactions(balanceTypeId, balanceTypeId, journeyId, userId, balanceTypeId, loggedInUserId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testRetrieveBalanceTransactionsException()
	{
		String balanceTypeId = "";
		long journeyId = 0;
		long loggedInUserId = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).retrieveBalanceTransactions(startDate, endDate, journeyId, userId, balanceTypeId, loggedInUserId);
			balancingBusinessDelegate.retrieveBalanceTransactions(balanceTypeId, balanceTypeId, journeyId, userId, balanceTypeId, loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetBranchWeekStatus()
	{
		long branchId = 0;
		int weekNo = 0;
		int yearNo = 0;
		long loggedInUserId = 0;
		try
		{
			Mockito.doReturn(new BranchWeekStatusDO()).when(balancingService).getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
			balancingBusinessDelegate.getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetBranchWeekStatusException()
	{
		long branchId = 0;
		int weekNo = 0;
		int yearNo = 0;
		long loggedInUserId = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
			balancingBusinessDelegate.getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetBranchList()
	{
		long loggedInUserId = 0;
		try
		{
			Mockito.doReturn(new ArrayList()).when(balancingService).getBranchList(loggedInUserId);
			balancingBusinessDelegate.getBranchList(loggedInUserId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetBranchListException()
	{
		long loggedInUserId = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getBranchList(loggedInUserId);
			balancingBusinessDelegate.getBranchList(loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetBranchBalanceReportData()
	{
		long loggedInUserId = 0;
		long branchId = 0;
		int weekNo = 0;
		int yearNo = 0;
		try
		{
			Mockito.doReturn(new ArrayList()).when(balancingService).getBranchBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			balancingBusinessDelegate.getBranchBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetBranchBalanceReportDataException()
	{
		long loggedInUserId = 0;
		long branchId = 0;
		int weekNo = 0;
		int yearNo = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getBranchBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			balancingBusinessDelegate.getBranchBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetJourneyBalanceReportData()
	{
		long loggedInUserId = 0;
		long branchId = 0;
		int weekNo = 0;
		int yearNo = 0;
		try
		{
			Mockito.doReturn(new ArrayList()).when(balancingService).getJourneyBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			balancingBusinessDelegate.getJourneyBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetJourneyBalanceReportDataException()
	{
		long loggedInUserId = 0;
		long branchId = 0;
		int weekNo = 0;
		int yearNo = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getJourneyBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			balancingBusinessDelegate.getJourneyBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetJourneyBalanceReportDataDetails()
	{
		long loggedInUserId = 0;
		long branchId = 0;
		int weekNo = 0;
		int yearNo = 0;
		try
		{
			Mockito.doReturn(new JourneyBalanceReportDetailsDO()).when(balancingService).getJourneyBalanceReportDataDetails(weekNo, yearNo, branchId, loggedInUserId);
			balancingBusinessDelegate.getJourneyBalanceReportDataDetails(weekNo, yearNo, branchId, loggedInUserId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testGetJourneyBalanceReportDataDetailsException()
	{
		long loggedInUserId = 0;
		long branchId = 0;
		int weekNo = 0;
		int yearNo = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).getJourneyBalanceReportDataDetails(weekNo, yearNo, branchId, loggedInUserId);
			balancingBusinessDelegate.getJourneyBalanceReportDataDetails(weekNo, yearNo, branchId, loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testSaveBranchWeekStatus()
	{
		long loggedInUserId = 0;
		long branchId = 0;
		int weekStatusId = 0;
		int weekNo = 0;
		int yearNo = 0;
		try
		{
			Mockito.doReturn(true).when(balancingService).saveBranchWeekStatus(branchId, weekNo, yearNo, weekStatusId, loggedInUserId);
			balancingBusinessDelegate.saveBranchWeekStatus(branchId, weekNo, yearNo, weekStatusId, loggedInUserId);
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testSaveBranchWeekStatusException()
	{
		long loggedInUserId = 0;
		long branchId = 0;
		int weekStatusId = 0;
		int weekNo = 0;
		int yearNo = 0;
		try
		{
			Mockito.doThrow(new SystemException(Type.DE)).when(balancingService).saveBranchWeekStatus(branchId, weekNo, yearNo, weekStatusId, loggedInUserId);
			balancingBusinessDelegate.saveBranchWeekStatus(branchId, weekNo, yearNo, weekStatusId, loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

}
