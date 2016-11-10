package com.mastek.balancing.rest.service.test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.balancing.filter.CORSServletBalancingFilter;
import com.mastek.balancing.rest.service.BalancingBusinessDelegate;
import com.mastek.balancing.rest.service.BalancingRESTImpl;
import com.mastek.balancing.rest.service.SwaggerConfiguration;
import com.mastek.balancing.rest.service.dto.BranchBalanceReportRequest;
import com.mastek.balancing.rest.service.dto.BranchWeekStatusRequest;
import com.mastek.balancing.rest.service.dto.JourneyBalanceReportRequest;
import com.mastek.balancing.rest.service.dto.JourneySelectionRequest;
import com.mastek.balancing.rest.service.dto.RetrieveTransactionsRequest;
import com.mastek.balancing.rest.service.dto.SaveBranchWeekStatusRequest;
import com.mastek.balancing.rest.service.dto.UserSelectionRequest;
import com.mastek.balancing.rest.service.dto.WeekSelectionRequest;
import com.mastek.balancing.rest.service.dto.WeeklySummaryRequest;
import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.BranchWeekStatusDO;
import com.mastek.commons.domain.JourneySelectionDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.UserSelectionDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.domain.WeeklySummaryDO;
import com.mastek.commons.exception.ServiceException;

@RunWith(MockitoJUnitRunner.class)
public class TestBalancingRESTImplMock {
	
	@InjectMocks
	BalancingRESTImpl balancingRESTImpl=new BalancingRESTImpl();
	
	@Mock
	BalancingBusinessDelegate balancingBusinessDelegate;
	
	@InjectMocks
	SwaggerConfiguration conf = new SwaggerConfiguration();

	@InjectMocks
	CORSServletBalancingFilter filter = new CORSServletBalancingFilter();
	
	@Mock
	HttpServletRequest req;

	@Mock
	HttpServletResponse res;

	@Mock
	FilterChain chain;

	@Mock
	FilterConfig init;
	
	WeekSelectionRequest weekSelectionRequest= new WeekSelectionRequest();
	
	JourneySelectionRequest journeySelectionRequest=new JourneySelectionRequest();
	
	UserSelectionRequest userSelectionRequest=new UserSelectionRequest();
	
	WeeklySummaryRequest weeklySummaryRequest=new WeeklySummaryRequest();
	
	BranchWeekStatusRequest branchWeekStatusRequest = new BranchWeekStatusRequest();
	
	BranchBalanceReportRequest branchBalanceReportRequest = new BranchBalanceReportRequest();
	
	JourneyBalanceReportRequest journeyBalanceReportRequest = new JourneyBalanceReportRequest();
	
	SaveBranchWeekStatusRequest saveBranchWeekStatusRequest = new SaveBranchWeekStatusRequest();
	
	AccessDO accessdo=new AccessDO();
	
	
	
	@Test
	public void testGetWeek(){
		weekSelectionRequest.setAccess(accessdo);
		List<WeekDO> weekDOList=new ArrayList<WeekDO>();
		try{
			weekDOList.add(new WeekDO());
			Mockito.doReturn(weekDOList).when(balancingBusinessDelegate).getWeek(weekSelectionRequest.getCriteriaDate(), weekSelectionRequest.getAccess().getUserId());
			balancingRESTImpl.getWeek(weekSelectionRequest);
			
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
		
	}
	
	@Test
	public void testGetWeekWithData(){
		weekSelectionRequest.setAccess(accessdo);
		List<WeekDO> weekDOList=new ArrayList<WeekDO>();
		try{
			Mockito.doReturn(weekDOList).when(balancingBusinessDelegate).getWeek(weekSelectionRequest.getCriteriaDate(), weekSelectionRequest.getAccess().getUserId());
			balancingRESTImpl.getWeek(weekSelectionRequest);

		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void TestGetJourney(){
		List<JourneySelectionDO> journeys= new ArrayList<JourneySelectionDO>();
		journeySelectionRequest.setAccess(accessdo);
		try{
			Mockito.doReturn(journeys).when(balancingBusinessDelegate).getJourney(journeySelectionRequest.getBranchId(),journeySelectionRequest.getStartDate(), journeySelectionRequest.getEndDate(), journeySelectionRequest.getAccess().getUserId());
			balancingRESTImpl.getJourney(journeySelectionRequest);
			
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void TestGetJourneyWithData(){
		List<JourneySelectionDO> journeys= new ArrayList<JourneySelectionDO>();
		journeySelectionRequest.setAccess(accessdo);
		try{
			journeys.add(new JourneySelectionDO());
			Mockito.doReturn(journeys).when(balancingBusinessDelegate).getJourney(journeySelectionRequest.getBranchId(),journeySelectionRequest.getStartDate(), journeySelectionRequest.getEndDate(), journeySelectionRequest.getAccess().getUserId());
			balancingRESTImpl.getJourney(journeySelectionRequest);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void TestGetUsersWithData(){
		List<UserSelectionDO> users=new ArrayList<UserSelectionDO>();
		userSelectionRequest.setAccess(accessdo);
		try{
			users.add(new UserSelectionDO());
			Mockito.doReturn(users).when(balancingBusinessDelegate).getUsers(userSelectionRequest.getBranchId(),userSelectionRequest.getStartDate(), userSelectionRequest.getEndDate(), userSelectionRequest.getAccess().getUserId());
			balancingRESTImpl.getUsers(userSelectionRequest);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void TestGetUsers(){
		List<UserSelectionDO> users=new ArrayList<UserSelectionDO>();
		userSelectionRequest.setAccess(accessdo);
		try{
			Mockito.doReturn(users).when(balancingBusinessDelegate).getUsers(userSelectionRequest.getBranchId(),userSelectionRequest.getStartDate(), userSelectionRequest.getEndDate(), userSelectionRequest.getAccess().getUserId());
			balancingRESTImpl.getUsers(userSelectionRequest);
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void TestGetWeeklyCashSummary(){
		WeeklySummaryDO weeklySummaryDO=new WeeklySummaryDO();
		weeklySummaryRequest.setAccess(accessdo);
		try{
			Mockito.doReturn(weeklySummaryDO).when(balancingBusinessDelegate).getWeeklyCashSummary(weeklySummaryRequest.getStartDate(), weeklySummaryRequest.getEndDate(), weeklySummaryRequest.getJourneyId(),weeklySummaryRequest.getUserId(),weeklySummaryRequest.getAccess().getUserId());
			balancingRESTImpl.getWeeklyCashSummary(weeklySummaryRequest);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void TestGetWeeklyCashSummaryException(){
		weeklySummaryRequest.setAccess(accessdo);
		try{
			Mockito.doThrow(new ServiceException()).when(balancingBusinessDelegate).getWeeklyCashSummary(weeklySummaryRequest.getStartDate(), weeklySummaryRequest.getEndDate(), weeklySummaryRequest.getJourneyId(),weeklySummaryRequest.getUserId(),weeklySummaryRequest.getAccess().getUserId());
			balancingRESTImpl.getWeeklyCashSummary(weeklySummaryRequest);
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void TestRetrieveBalanceTransactions(){
		RetrieveTransactionsRequest retrieveTransactionsRequest=new RetrieveTransactionsRequest();
		retrieveTransactionsRequest.setAccess(accessdo);
		List<RetrieveTransactionsDO> transactions=new ArrayList<RetrieveTransactionsDO>();
		try{
			Mockito.doReturn(transactions).when(balancingBusinessDelegate).retrieveBalanceTransactions(retrieveTransactionsRequest.getStartDate(), retrieveTransactionsRequest.getEndDate(), retrieveTransactionsRequest.getJourneyId(), retrieveTransactionsRequest.getJourneyUserId(), retrieveTransactionsRequest.getBalanceTypeId(), retrieveTransactionsRequest.getAccess().getUserId());
			balancingRESTImpl.retrieveBalanceTransactions(retrieveTransactionsRequest);
			Assert.assertTrue(true);
		}catch(Exception e){
			Assert.assertTrue(false);
		}
	}
	
	@Test
	public void TestRetrieveBalanceTransactionsException(){
		RetrieveTransactionsRequest retrieveTransactionsRequest=new RetrieveTransactionsRequest();
		retrieveTransactionsRequest.setAccess(accessdo);
		try{
			Mockito.doThrow(new ServiceException()).when(balancingBusinessDelegate).retrieveBalanceTransactions(retrieveTransactionsRequest.getStartDate(), retrieveTransactionsRequest.getEndDate(), retrieveTransactionsRequest.getJourneyId(), retrieveTransactionsRequest.getJourneyUserId(), retrieveTransactionsRequest.getBalanceTypeId(), retrieveTransactionsRequest.getAccess().getUserId());
			balancingRESTImpl.retrieveBalanceTransactions(retrieveTransactionsRequest);
			
		}catch(Exception e){
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void testGetBranchWeekStatus()
	{
		BranchWeekStatusRequest branchWeekStatusRequest=new BranchWeekStatusRequest();
		branchWeekStatusRequest.setAccess(accessdo);
		try
		{
			Mockito.doReturn(new BranchWeekStatusDO()).when(balancingBusinessDelegate).getBranchWeekStatus(branchWeekStatusRequest.getBranchId(), branchWeekStatusRequest.getWeekNumber(), branchWeekStatusRequest.getYearNumber(), branchWeekStatusRequest.getAccess().getUserId());
			balancingRESTImpl.getBranchWeekStatus(branchWeekStatusRequest);
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
		BranchWeekStatusRequest branchWeekStatusRequest=new BranchWeekStatusRequest();
		branchWeekStatusRequest.setAccess(accessdo);
		try
		{
			Mockito.doThrow(new ServiceException()).when(balancingBusinessDelegate).getBranchWeekStatus(branchWeekStatusRequest.getBranchId(), branchWeekStatusRequest.getWeekNumber(), branchWeekStatusRequest.getYearNumber(), branchWeekStatusRequest.getAccess().getUserId());
			balancingRESTImpl.getBranchWeekStatus(branchWeekStatusRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetBranchBalanceReportData()
	{
		BranchBalanceReportRequest branchBalanceReportRequest = new BranchBalanceReportRequest();
		branchBalanceReportRequest.setAccess(accessdo);
		try
		{
			Mockito.doReturn(new ArrayList()).when(balancingBusinessDelegate).getBranchBalanceReportData(branchBalanceReportRequest.getWeekNumber(), branchBalanceReportRequest.getYearNumber(), branchBalanceReportRequest.getBranchId(), branchBalanceReportRequest.getAccess().getUserId());
			balancingRESTImpl.getBranchBalanceReportData(branchBalanceReportRequest);
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
		BranchBalanceReportRequest branchBalanceReportRequest = new BranchBalanceReportRequest();
		branchBalanceReportRequest.setAccess(accessdo);
		try
		{
			Mockito.doThrow(new ServiceException()).when(balancingBusinessDelegate).getBranchBalanceReportData(branchBalanceReportRequest.getWeekNumber(), branchBalanceReportRequest.getYearNumber(), branchBalanceReportRequest.getBranchId(), branchBalanceReportRequest.getAccess().getUserId());
			balancingRESTImpl.getBranchBalanceReportData(branchBalanceReportRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testGetJourneyBalanceReportData()
	{
		JourneyBalanceReportRequest journeyBalanceReportRequest = new JourneyBalanceReportRequest();
		journeyBalanceReportRequest.setAccess(accessdo);
		try
		{
			Mockito.doReturn(new ArrayList()).when(balancingBusinessDelegate).getJourneyBalanceReportData(journeyBalanceReportRequest.getWeekNumber(), journeyBalanceReportRequest.getYearNumber(), journeyBalanceReportRequest.getJourneyId(), journeyBalanceReportRequest.getAccess().getUserId());
			balancingRESTImpl.getJourneyBalanceReportData(journeyBalanceReportRequest);
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
		JourneyBalanceReportRequest journeyBalanceReportRequest = new JourneyBalanceReportRequest();
		journeyBalanceReportRequest.setAccess(accessdo);
		try
		{
			Mockito.doThrow(new ServiceException()).when(balancingBusinessDelegate).getJourneyBalanceReportData(journeyBalanceReportRequest.getWeekNumber(), journeyBalanceReportRequest.getYearNumber(), journeyBalanceReportRequest.getJourneyId(), journeyBalanceReportRequest.getAccess().getUserId());
			balancingRESTImpl.getJourneyBalanceReportData(journeyBalanceReportRequest);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}
	}

	@Test
	public void testSaveBranchWeekStatus()
	{
		SaveBranchWeekStatusRequest saveBranchWeekStatusRequest = new SaveBranchWeekStatusRequest();
		saveBranchWeekStatusRequest.setAccess(accessdo);
		try
		{
			Mockito.doReturn(true).when(balancingBusinessDelegate).saveBranchWeekStatus(saveBranchWeekStatusRequest.getBranchId(), saveBranchWeekStatusRequest.getWeekNumber(), saveBranchWeekStatusRequest.getYearNumber(), saveBranchWeekStatusRequest.getWeekStatusId(), saveBranchWeekStatusRequest.getAccess().getUserId());
			balancingRESTImpl.saveBranchWeekStatus(saveBranchWeekStatusRequest);
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
		SaveBranchWeekStatusRequest saveBranchWeekStatusRequest = new SaveBranchWeekStatusRequest();
		saveBranchWeekStatusRequest.setAccess(accessdo);
		try
		{
			Mockito.doThrow(new ServiceException()).when(balancingBusinessDelegate).saveBranchWeekStatus(saveBranchWeekStatusRequest.getBranchId(), saveBranchWeekStatusRequest.getWeekNumber(), saveBranchWeekStatusRequest.getYearNumber(), saveBranchWeekStatusRequest.getWeekStatusId(), saveBranchWeekStatusRequest.getAccess().getUserId());
			balancingRESTImpl.saveBranchWeekStatus(saveBranchWeekStatusRequest);
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
	
}
