package com.mastek.balancing.rest.service.test;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;

import com.mastek.balancing.rest.service.dto.BranchBalanceReportRequest;
import com.mastek.balancing.rest.service.dto.BranchBalanceReportResponse;
import com.mastek.balancing.rest.service.dto.BranchWeekStatusRequest;
import com.mastek.balancing.rest.service.dto.BranchWeekStatusResponse;
import com.mastek.balancing.rest.service.dto.JourneyBalanceReportRequest;
import com.mastek.balancing.rest.service.dto.JourneyBalanceReportResponse;
import com.mastek.balancing.rest.service.dto.JourneySelectionRequest;
import com.mastek.balancing.rest.service.dto.JourneySelectionResponse;
import com.mastek.balancing.rest.service.dto.RetrieveTransactionsRequest;
import com.mastek.balancing.rest.service.dto.RetrieveTransactionsResponse;
import com.mastek.balancing.rest.service.dto.SaveBranchWeekStatusRequest;
import com.mastek.balancing.rest.service.dto.SaveBranchWeekStatusResponse;
import com.mastek.balancing.rest.service.dto.UserSelectionRequest;
import com.mastek.balancing.rest.service.dto.UserSelectionResponse;
import com.mastek.balancing.rest.service.dto.WeekSelectionRequest;
import com.mastek.balancing.rest.service.dto.WeekSelectionResponse;
import com.mastek.balancing.rest.service.dto.WeeklySummaryRequest;
import com.mastek.balancing.rest.service.dto.WeeklySummaryResponse;
import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.BranchBalanceReportDO;
import com.mastek.commons.domain.BranchWeekStatusDO;
import com.mastek.commons.domain.JourneyBalanceReportDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDO;

public class TestBalancingServiceDtoMock
{
	@InjectMocks
	BranchWeekStatusRequest branchWeekStatusRequest = new BranchWeekStatusRequest();
	
	@InjectMocks
	BranchWeekStatusResponse branchWeekStatusResponse = new BranchWeekStatusResponse();
	
	@InjectMocks
	BranchBalanceReportRequest branchBalanceReportRequest = new BranchBalanceReportRequest();
	
	@InjectMocks
	BranchBalanceReportResponse branchBalanceReportResponse = new BranchBalanceReportResponse();
	
	@InjectMocks
	JourneyBalanceReportRequest journeyBalanceReportRequest = new JourneyBalanceReportRequest();
	
	@InjectMocks
	JourneyBalanceReportResponse journeyBalanceReportResponse = new JourneyBalanceReportResponse();
	
	@InjectMocks
	SaveBranchWeekStatusRequest saveBranchWeekStatusRequest = new SaveBranchWeekStatusRequest();
	
	@InjectMocks
	SaveBranchWeekStatusResponse saveBranchWeekStatusResponse = new SaveBranchWeekStatusResponse();
	
	@InjectMocks
	WeekSelectionRequest weekSelectionRequest = new WeekSelectionRequest();
	
	@InjectMocks
	WeekSelectionResponse WeekSelectionResponse = new WeekSelectionResponse();
	
	@InjectMocks
	WeeklySummaryRequest weeklySummaryRequest = new WeeklySummaryRequest();
	
	@InjectMocks
	WeeklySummaryResponse weeklySummaryResponse = new WeeklySummaryResponse();
	
	@InjectMocks
	UserSelectionRequest userSelectionRequest = new UserSelectionRequest();
	
	@InjectMocks
	UserSelectionResponse userSelectionResponse = new UserSelectionResponse();
	
	@InjectMocks
	RetrieveTransactionsRequest retrieveTransactionsRequest = new RetrieveTransactionsRequest();
	
	@InjectMocks
	RetrieveTransactionsResponse retrieveTransactionsResponse = new RetrieveTransactionsResponse();
	
	@InjectMocks
	JourneySelectionRequest journeySelectionRequest = new JourneySelectionRequest();
	
	@InjectMocks
	JourneySelectionResponse journeySelectionResponse = new JourneySelectionResponse();
	
	AccessDO access;
	
	@Before
	public void init(){
		access = new AccessDO();
		branchWeekStatusRequest.setAccess(access);
		branchBalanceReportRequest.setAccess(access);
		journeyBalanceReportRequest.setAccess(access);
		saveBranchWeekStatusRequest.setAccess(access);
		weekSelectionRequest.setAccess(access);
		weeklySummaryRequest.setAccess(access);
		userSelectionRequest.setAccess(access);
		retrieveTransactionsRequest.setAccess(access);
		journeySelectionRequest.setAccess(access);
	}
	
	@Test
	public void testDomainObjects(){
		
		branchWeekStatusRequest.setBranchId(1);
		branchWeekStatusRequest.setWeekNumber(1);
		branchWeekStatusRequest.setYearNumber(1);
		branchWeekStatusRequest.getBranchId();
		branchWeekStatusRequest.getWeekNumber();
		branchWeekStatusRequest.getYearNumber();
		
		branchWeekStatusResponse.setBranchWeekStatus(new BranchWeekStatusDO());
		branchWeekStatusResponse.setSuccess(true);
		branchWeekStatusResponse.setErrorCode("ERR-102");
		branchWeekStatusResponse.setErrorMessage("test message");
		branchWeekStatusResponse.getErrorCode();
		branchWeekStatusResponse.getErrorMessage();
		branchWeekStatusResponse.getBranchWeekStatus();
		
		branchBalanceReportRequest.setBranchId(1);
		branchBalanceReportRequest.setWeekNumber(1);
		branchBalanceReportRequest.setYearNumber(1);
		branchBalanceReportRequest.getBranchId();
		branchBalanceReportRequest.getWeekNumber();
		branchBalanceReportRequest.getYearNumber();
		
		branchBalanceReportResponse.setBranchReportData(new ArrayList<BranchBalanceReportDO>());
		branchBalanceReportResponse.getBranchReportData();
		
		journeyBalanceReportRequest.setJourneyId(1);
		journeyBalanceReportRequest.setWeekNumber(1);
		journeyBalanceReportRequest.setYearNumber(1);
		journeyBalanceReportRequest.getJourneyId();
		journeyBalanceReportRequest.getWeekNumber();
		journeyBalanceReportRequest.getYearNumber();
		
		journeyBalanceReportResponse.setJourneyReportData(new ArrayList<JourneyBalanceReportDO>());
		journeyBalanceReportResponse.setJourneyBalanceReportDetails(new JourneyBalanceReportDetailsDO());
		journeyBalanceReportResponse.getJourneyReportData();
		journeyBalanceReportResponse.getJourneyBalanceReportDetails();
		
		saveBranchWeekStatusRequest.setWeekStatusId(1);
		saveBranchWeekStatusRequest.setBranchId(1);
		saveBranchWeekStatusRequest.setWeekNumber(1);
		saveBranchWeekStatusRequest.setYearNumber(1);
		saveBranchWeekStatusRequest.getBranchId();
		saveBranchWeekStatusRequest.getWeekNumber();
		saveBranchWeekStatusRequest.getYearNumber();
		saveBranchWeekStatusRequest.getWeekStatusId();
		
		weekSelectionRequest.setCriteriaDate(null);
		weekSelectionRequest.getCriteriaDate();
		
		WeekSelectionResponse.setBranchList(null);
		WeekSelectionResponse.setWeeks(null);
		WeekSelectionResponse.getBranchList();
		WeekSelectionResponse.getWeeks();
		
		weeklySummaryRequest.setJourneyId(1);
		weeklySummaryRequest.setUserId(1);
		weeklySummaryRequest.setStartDate(null);
		weeklySummaryRequest.setEndDate(null);
		weeklySummaryRequest.getJourneyId();
		weeklySummaryRequest.getUserId();
		weeklySummaryRequest.getStartDate();
		weeklySummaryRequest.getEndDate();
		
		weeklySummaryResponse.setWeeklySummaryDO(null);
		weeklySummaryResponse.getWeeklySummaryDO();
		
		userSelectionRequest.setBranchId(1);
		userSelectionRequest.setStartDate(null);
		userSelectionRequest.setEndDate(null);
		userSelectionRequest.getBranchId();
		userSelectionRequest.getStartDate();
		userSelectionRequest.getEndDate();
		
		userSelectionResponse.setUsers(null);
		userSelectionResponse.getUsers();
		
		journeySelectionRequest.setBranchId(1);
		journeySelectionRequest.setStartDate(null);
		journeySelectionRequest.setEndDate(null);
		journeySelectionRequest.getBranchId();
		journeySelectionRequest.getStartDate();
		journeySelectionRequest.getEndDate();
		
		journeySelectionResponse.setJourneys(null);
		journeySelectionResponse.getJourneys();
		
		retrieveTransactionsRequest.setBalanceTypeId("1");
		retrieveTransactionsRequest.setJourneyId(1);
		retrieveTransactionsRequest.setJourneyUserId(1);
		retrieveTransactionsRequest.setStartDate(null);
		retrieveTransactionsRequest.setEndDate(null);
		retrieveTransactionsRequest.getBalanceTypeId();
		retrieveTransactionsRequest.getJourneyId();
		retrieveTransactionsRequest.getJourneyUserId();
		retrieveTransactionsRequest.getStartDate();
		retrieveTransactionsRequest.getEndDate();
		
		retrieveTransactionsResponse.setTransactions(null);
		retrieveTransactionsResponse.getTransactions();
	}
}
