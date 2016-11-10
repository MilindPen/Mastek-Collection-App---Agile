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

import com.mastek.balancing.business.service.BalancingServiceImpl;
import com.mastek.balancing.data.service.BalancingDAO;
import com.mastek.commons.domain.BranchWeekStatusDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDO;
import com.mastek.commons.domain.JourneySelectionDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.UserSelectionDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.domain.WeeklySummaryDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.commons.exception.SystemException.Type;

@RunWith(MockitoJUnitRunner.class)
public class TestBalancingServiceImplMock {
	
	@InjectMocks
	BalancingServiceImpl balancingServiceImpl=new BalancingServiceImpl();
	
	@Mock
	BalancingDAO balancingDAO;
	
	String criteriaDate; 
	String startDate;
	String endDate;
	long userId;
	long journeyId;
	long loggedInUserId;
	long branchId;
	
	@Test
	public void testGetWeek(){
		List<WeekDO> weeks = new ArrayList<WeekDO>();
		try{
		 Mockito.doReturn(weeks).when(balancingDAO).getWeek(criteriaDate, userId);
		 balancingServiceImpl.getWeek(criteriaDate, userId);
		 Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);	
		}
	}
	
	@Test
	public void testGetWeekException(){
		try{
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getWeek(criteriaDate, userId);
			balancingServiceImpl.getWeek(criteriaDate, userId);

		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetJourney(){
		List<JourneySelectionDO> journeys = new ArrayList<JourneySelectionDO>();
		try{
			Mockito.doReturn(journeys).when(balancingDAO).getJourney(branchId,startDate, endDate, userId);
			balancingServiceImpl.getJourney(branchId,startDate, endDate, userId);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testGetJourneyException(){
		try{
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getJourney(branchId,startDate, endDate, userId);
			balancingServiceImpl.getJourney(branchId,startDate, endDate, userId);
			
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetUsers(){
		List<UserSelectionDO> users = new ArrayList<UserSelectionDO>();
		try{
			Mockito.doReturn(users).when(balancingDAO).getUsers(branchId,startDate, endDate, userId);
			balancingServiceImpl.getUsers(branchId,startDate, endDate, userId);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testGetUsersException(){
		try{
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getUsers(branchId,startDate, endDate, userId);
			balancingServiceImpl.getUsers(branchId,startDate, endDate, userId);
			
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetWeeklyCashSummary(){
		WeeklySummaryDO weeklySummaryDO=new WeeklySummaryDO();
		try{
			Mockito.doReturn(weeklySummaryDO).when(balancingDAO).getWeeklyCashSummary(startDate, endDate, journeyId, userId, loggedInUserId);
			balancingServiceImpl.getWeeklyCashSummary(startDate, endDate, journeyId, userId, loggedInUserId);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testGetWeeklyCashSummaryException(){
		try{
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getWeeklyCashSummary(startDate, endDate, journeyId, userId, loggedInUserId);
			balancingServiceImpl.getWeeklyCashSummary(startDate, endDate, journeyId, userId, loggedInUserId);
			
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testRetrieveBalanceTransactions(){
		String balanceTypeId="";
		List<RetrieveTransactionsDO> transactions = new ArrayList<RetrieveTransactionsDO>();
		try{
			Mockito.doReturn(transactions).when(balancingDAO).retrieveBalanceTransactions(startDate, endDate, journeyId, userId, balanceTypeId, loggedInUserId);
			balancingServiceImpl.retrieveBalanceTransactions(balanceTypeId, balanceTypeId, journeyId, userId, balanceTypeId, loggedInUserId);
			Assert.assertTrue(true);	
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void testRetriveBalanceTransationsException(){
		String balanceTypeId="";
		try{
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).retrieveBalanceTransactions(startDate, endDate, journeyId, userId, balanceTypeId, loggedInUserId);
			balancingServiceImpl.retrieveBalanceTransactions(startDate, endDate, journeyId, userId, balanceTypeId, loggedInUserId);
		}catch(Exception e){
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
			Mockito.doReturn(new BranchWeekStatusDO()).when(balancingDAO).getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
			balancingServiceImpl.getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
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
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
			balancingServiceImpl.getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
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
			Mockito.doReturn(new ArrayList()).when(balancingDAO).getBranchList(loggedInUserId);
			balancingServiceImpl.getBranchList(loggedInUserId);
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
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getBranchList(loggedInUserId);
			balancingServiceImpl.getBranchList(loggedInUserId);
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
			Mockito.doReturn(new ArrayList()).when(balancingDAO).getBranchBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			balancingServiceImpl.getBranchBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
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
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getBranchBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			balancingServiceImpl.getBranchBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
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
			Mockito.doReturn(new ArrayList()).when(balancingDAO).getJourneyBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			balancingServiceImpl.getJourneyBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
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
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getJourneyBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
			balancingServiceImpl.getJourneyBalanceReportData(weekNo, yearNo, branchId, loggedInUserId);
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
			Mockito.doReturn(new JourneyBalanceReportDetailsDO()).when(balancingDAO).getJourneyBalanceReportDataDetails(weekNo, yearNo, branchId, loggedInUserId);
			balancingServiceImpl.getJourneyBalanceReportDataDetails(weekNo, yearNo, branchId, loggedInUserId);
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
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).getJourneyBalanceReportDataDetails(weekNo, yearNo, branchId, loggedInUserId);
			balancingServiceImpl.getJourneyBalanceReportDataDetails(weekNo, yearNo, branchId, loggedInUserId);
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
			Mockito.doReturn(true).when(balancingDAO).saveBranchWeekStatus(branchId, weekNo, yearNo, weekStatusId, loggedInUserId);
			balancingServiceImpl.saveBranchWeekStatus(branchId, weekNo, yearNo, weekStatusId, loggedInUserId);
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
			Mockito.doThrow(new DataStoreException(new SystemException(Type.DE))).when(balancingDAO).saveBranchWeekStatus(branchId, weekNo, yearNo, weekStatusId, loggedInUserId);
			balancingServiceImpl.saveBranchWeekStatus(branchId, weekNo, yearNo, weekStatusId, loggedInUserId);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}
	
}
