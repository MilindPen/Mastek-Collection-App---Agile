package com.mastek.commons.test;
import org.junit.Test;
import org.mockito.InjectMocks;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.domain.AgreementDO;
import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.domain.BranchBalanceReportDO;
import com.mastek.commons.domain.BranchSelectionDO;
import com.mastek.commons.domain.BranchWeekStatusDO;
import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.domain.CustomerDO;
import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.commons.domain.JourneyBalanceReportDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDataDO;
import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.domain.JourneySelectionDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.ScheduledCustomersDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.domain.TransactionDO;
import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.commons.domain.UserDO;
import com.mastek.commons.domain.UserSelectionDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.domain.WeeklySummaryDO;
import com.mastek.commons.rest.service.dto.BaseRequest;
import com.mastek.commons.rest.service.dto.BaseResponse;
public class TestDomainObjects
{
	@InjectMocks
	AccessDO accessDO=new AccessDO();
	
	@InjectMocks
	AgreementDO agreementDO=new AgreementDO();
	
	@InjectMocks
	BalanceTransactionDO balanceTransactionDO=new BalanceTransactionDO();
	
	@InjectMocks
	CardPaymentDO cardPaymentDO=new CardPaymentDO();
   
	@InjectMocks
	CustomerDO customerDO=new CustomerDO();
	
	@InjectMocks
	JourneyDO journeyDO=new JourneyDO();
	
	@InjectMocks
	ScheduledCustomersDO scheduledCustomersDO=new ScheduledCustomersDO();
	
	@InjectMocks
	SynchronizDO synchronizDO=new SynchronizDO();
	
	@InjectMocks
	TransactionDO transactionDO=new TransactionDO();

	@InjectMocks
	TransactionHistoryDO transactionHistoryDO=new TransactionHistoryDO(); 

	@InjectMocks
	UserDO userDO=new UserDO();
	
	@InjectMocks
	WeekDO weekDO=new WeekDO();
	
	@InjectMocks
	BaseRequestImpl baseRequestImpl=new BaseRequestImpl();
	
	@InjectMocks
	BaseResponseImpl baseResponseImpl=new BaseResponseImpl();
	
	@InjectMocks
	CustomerVisitDO customerVisitDO=new CustomerVisitDO(); 
	
	@InjectMocks
	JourneySelectionDO journeySelectionDO=new JourneySelectionDO();
	
	@InjectMocks
	UserSelectionDO userSelectionDO=new UserSelectionDO();
	
	@InjectMocks
	WeeklySummaryDO weeklySummaryDO=new WeeklySummaryDO();
	
	@InjectMocks
	RetrieveTransactionsDO retrieveTransactionsDO=new RetrieveTransactionsDO();
	
	@InjectMocks
	JourneyBalanceReportDetailsDO journeyBalanceReportDetailsDO = new JourneyBalanceReportDetailsDO();
	
	@InjectMocks
	JourneyBalanceReportDO journeyBalanceReportDO = new JourneyBalanceReportDO();
	
	@InjectMocks
	JourneyBalanceReportDetailsDataDO journeyBalanceReportDetailsDataDO = new JourneyBalanceReportDetailsDataDO();
	
	@InjectMocks
	BranchBalanceReportDO branchBalanceReportDO = new BranchBalanceReportDO();
	
	@InjectMocks
	BranchWeekStatusDO branchWeekStatusDO = new BranchWeekStatusDO();
	
	@InjectMocks
	BranchSelectionDO branchSelectionDO = new BranchSelectionDO();
	
	@Test
	public void testDomainObjects()
	{
		accessDO.setUserId(2);
		accessDO.setUserType("Agent");
		accessDO.getUserId();
		accessDO.getUserType();
		
		agreementDO.setAaIndicatorId("aaIndicatorId");
		agreementDO.setAgreementId(1234);
		agreementDO.setAgreementNumber("1234");
		agreementDO.setAgreementStartDate("agreementStartDate");
		agreementDO.setArrears(12.00);
		agreementDO.setBalance(21.00);
		agreementDO.setCharges(23.00);
		agreementDO.setCustomerId(1234);
		agreementDO.setElapsedWeek("elapsedWeek");
		agreementDO.setInstalments("instalments");
		agreementDO.setPaymentFrequencyID(1234);
		agreementDO.setPreviousFolioNumber("previousFolioNumber");
		agreementDO.setPrincipal(987.00);
		agreementDO.setReloanedFromAgreementID(1234L);
		agreementDO.setSettledDate("settledDate");
		agreementDO.setSettlementAmount(897.00);
		agreementDO.setSettlementRebate(123.00);
		agreementDO.setStatus("status");
		agreementDO.setTermAmount(214.00);
		agreementDO.setTotalPayableAmount(1234.00);
		agreementDO.getSettlementRebate();
		agreementDO.getSettledDate();
		agreementDO.getAaIndicatorId();
		agreementDO.getAgreementId();
		agreementDO.getAgreementNumber();
		agreementDO.getAgreementStartDate();
		agreementDO.getArrears();
		agreementDO.getBalance();
		agreementDO.getCharges();
		agreementDO.getCustomerId();
		agreementDO.getElapsedWeek();
		agreementDO.getInstalments();
		agreementDO.getPaymentFrequencyID();
		agreementDO.getPreviousFolioNumber();
		agreementDO.getPreviousFolioNumber();
		agreementDO.getPrincipal();
		agreementDO.getTotalPayableAmount();
		agreementDO.getTermAmount();
		agreementDO.getStatus();
		agreementDO.getReloanedFromAgreementID();
		agreementDO.getSettlementAmount();
		
		balanceTransactionDO.setAmount("amount");
		balanceTransactionDO.setBalanceDate("balanceDate");
		balanceTransactionDO.setBalanceId("balanceId");
		balanceTransactionDO.setBalanceTypeId("balanceTypeId");
		balanceTransactionDO.setChequeIndicator("chequeIndicator");
		balanceTransactionDO.setIsDeleted("isDeleted");
		balanceTransactionDO.setJourneyId("journeyId");
		balanceTransactionDO.setPeriodIndicator("periodIndicator");
		balanceTransactionDO.setReference("reference");
		balanceTransactionDO.setReason("Reason");
		balanceTransactionDO.setJourneyUserId("1");
		balanceTransactionDO.setIsPrimaryJourney("isPrimary");
		balanceTransactionDO.setUserBalanceId("9000");
		balanceTransactionDO.getAmount();
		balanceTransactionDO.getBalanceDate();
		balanceTransactionDO.getBalanceId();
		balanceTransactionDO.getBalanceTypeId();
		balanceTransactionDO.getChequeIndicator();
		balanceTransactionDO.getIsDeleted();
		balanceTransactionDO.getJourneyId();
		balanceTransactionDO.getPeriodIndicator();
		balanceTransactionDO.getReference();
		balanceTransactionDO.getIsPrimaryJourney();
		balanceTransactionDO.getReason();
		balanceTransactionDO.getJourneyUserId();
		balanceTransactionDO.getUserBalanceId();
		
		cardPaymentDO.setCardPaymentAmount(123.00);
		cardPaymentDO.setWeekDate("weekDate");
		cardPaymentDO.getCardPaymentAmount();
		cardPaymentDO.getWeekDate();
		
		customerDO.setAddressLine1("addressLine1");
		customerDO.setAddressLine2("addressLine2");
		customerDO.setAddressLine3("addressLine3");
		customerDO.setAddressLine4("");
		customerDO.setCity("");
		customerDO.setCollectionDay(123L);
		customerDO.setCustomerId(123L);
		customerDO.setEmail("");
		customerDO.setJourneyId(123L);
		customerDO.setJourneyOrder("");
		customerDO.setMobileNumber("");
		customerDO.setPhoneNumber("");
		customerDO.setPostCode("");
		customerDO.setUpdatedDate("");
		customerDO.getAddressLine1();
		customerDO.getAddressLine2();
		customerDO.getAddressLine3();
		customerDO.getAddressLine4();
		customerDO.getCity();
		customerDO.getCollectionDay();
		customerDO.getCustomerId();
		customerDO.getEmail();
		customerDO.getJourneyId();
		customerDO.getJourneyOrder();
		customerDO.getMobileNumber();
		customerDO.getPhoneNumber();
		customerDO.getPostCode();
		customerDO.getPhoneNumber();
		customerDO.getUpdatedDate();
		
		journeyDO.setDescription("description");
		journeyDO.setJourneyId(1234L);
		journeyDO.getJourneyId();
		journeyDO.getDescription();
		
		scheduledCustomersDO.setCustomerVisits(null) ;
      scheduledCustomersDO.getCustomerVisits();
      
      transactionHistoryDO.setAgreementId(123L);
      transactionHistoryDO.setAllocationId(123L);
      transactionHistoryDO.setAmount(12.00);
      transactionHistoryDO.setArrears(123.00);
      transactionHistoryDO.setCustomerId(123L);
      transactionHistoryDO.setPaidDate("paidDate");
      transactionHistoryDO.setStatus("status");
      transactionHistoryDO.setTransactionId(123L);
      transactionHistoryDO.setWeekNumber("");
      transactionHistoryDO.setYear("year");
      transactionHistoryDO.getAgreementId();
      transactionHistoryDO.getAllocationId();
      transactionHistoryDO.getAmount();
      transactionHistoryDO.getArrears();
      transactionHistoryDO.getCustomerId();
      transactionHistoryDO.getPaidDate();
      transactionHistoryDO.getStatus();
      transactionHistoryDO.getTransactionId();
      transactionHistoryDO.getWeekNumber();
      transactionHistoryDO.getYear();
      
      userDO.setFirstName("");
      userDO.setIsActive(false);
      userDO.setLastName("");
      userDO.setMacAddress("");
      userDO.setMiddleName("");
      userDO.setMobileUserId(123L);
      userDO.setPin("12");
      userDO.setTitle("");
      userDO.setUserId(123L);
      userDO.getFirstName();
      userDO.getIsActive();
      userDO.getLastName();
      userDO.getMacAddress(); 
      userDO.getMiddleName();
      userDO.getMobileUserId();
      userDO.getPin();
      userDO.getTitle();
      userDO.getUserId();
      userDO.setEmail("");
      userDO.setUserType("");
      userDO.setUserTypeId(1);
      userDO.getEmail();
      userDO.getUserType();
      userDO.getUserTypeId();
      
      weekDO.setEndDate("");
      weekDO.setStartDate("");
      weekDO.setWeekNo(23);
      weekDO.setYearNo(2016);
      
      weekDO.getEndDate();
      weekDO.getStartDate();
      weekDO.getWeekNo();
      weekDO.getYearNo();
	
      baseRequestImpl.getAccess();
      baseRequestImpl.setAccess(accessDO);
      
      baseResponseImpl.isSuccess();
      baseResponseImpl.setSuccess(true);
      baseResponseImpl.setErrorCode("");
      baseResponseImpl.getErrorCode();
      baseResponseImpl.setErrorMessage("");
      baseResponseImpl.getErrorMessage();
      
      customerVisitDO.setAddressLine1("");
		customerVisitDO.setAddressLine2("");
		customerVisitDO.setAddressLine3("");
		customerVisitDO.setAddressLine4("");
		customerVisitDO.setAgreements(null);
		customerVisitDO.setCity("");
		customerVisitDO.setCollectionDay("");
		customerVisitDO.setCustomerId(123L);
		customerVisitDO.setCustomerRefNumber("1234");
		customerVisitDO.setDob("");
		customerVisitDO.setEmail("");
		customerVisitDO.setFirstName("");
		customerVisitDO.setJourneyOrder("");
		customerVisitDO.setLastName("");
		customerVisitDO.setMiddleName("");
		customerVisitDO.setMobile("");
		customerVisitDO.setPaymentPerformance(1234);;
		customerVisitDO.setPaymentTypeId(123);
		customerVisitDO.setPaymentTypeId(123);
		customerVisitDO.setPhone("");
		customerVisitDO.setPostcode("");
		customerVisitDO.setStatus("");
		customerVisitDO.setTitle("");
		customerVisitDO.setTotalPaidAmount(123.00);
		customerVisitDO.setTotalTermAmount(123.00);
		customerVisitDO.setVisitDate("");
		customerVisitDO.setVisitId(123L);
		customerVisitDO.setAtRisk(1);
		customerVisitDO.setVulnerable("");
		
		customerVisitDO.getAddressLine1();
		customerVisitDO.getAddressLine2();
		customerVisitDO.getAddressLine3();
		customerVisitDO.getAddressLine4();
		customerVisitDO.getCity();
		customerVisitDO.getCollectionDay();
		customerVisitDO.getCustomerId();
		customerVisitDO.getCustomerRefNumber();
		customerVisitDO.getDob();
		customerVisitDO.getEmail();
		customerVisitDO.getFirstName();
		customerVisitDO.getJourneyOrder();
		customerVisitDO.getLastName();
		customerVisitDO.getMiddleName();
		customerVisitDO.getMobile();
		customerVisitDO.getTotalTermAmount();
		customerVisitDO.getTotalPaidAmount();
		customerVisitDO.getPaymentTypeId();
		customerVisitDO.getTitle();
		customerVisitDO.getVisitDate();
		customerVisitDO.getVisitId();
		customerVisitDO.getPostcode();
		customerVisitDO.getPhone();
		customerVisitDO.getPaymentPerformance();
		customerVisitDO.getStatus();
		customerVisitDO.getAgreements();
		customerVisitDO.getAtRisk();
		customerVisitDO.getVulnerable();
      
		synchronizDO.setAgreementAmountPaid("");
        synchronizDO.setAgreementID("");
        synchronizDO.setAgreementMode("");
        synchronizDO.setCustomerID("");
        synchronizDO.setResultDate("");
        synchronizDO.setResultID("");
        synchronizDO.setResultStatusID("");
        synchronizDO.setVisitID("");
        synchronizDO.setVisitStatusID("");
      
        synchronizDO.getAgreementAmountPaid();
        synchronizDO.getAgreementID();
        synchronizDO.getAgreementMode();
        synchronizDO.getCustomerID();
        synchronizDO.getResultID();
        synchronizDO.getResultDate();
        synchronizDO.getResultStatusID();
        synchronizDO.getVisitID();
        synchronizDO.getVisitStatusID();
        
     	userSelectionDO.setUserId(4);
		userSelectionDO.getUserId();
		
		userSelectionDO.getFirstName();
		userSelectionDO.setFirstName("SDT");
		
		userSelectionDO.getLastName();
		userSelectionDO.setLastName("SDT");
		
		userSelectionDO.getUserTypeId();
		userSelectionDO.setUserTypeId(1);
		
		userSelectionDO.getAreaId();
		userSelectionDO.setAreaId(1l);
				
		userSelectionDO.getAreaName();
		userSelectionDO.setAreaName("Test");
		
		userSelectionDO.getBranchId();
		userSelectionDO.setBranchId(1l);
		
		userSelectionDO.getBranchName();
		userSelectionDO.setBranchName("Test");
		
		userSelectionDO.getJourneyId();
		userSelectionDO.setJourneyId(2l);
		
		userSelectionDO.getJourneyDescription();
		userSelectionDO.setJourneyDescription("Description");
		
		userSelectionDO.getRegionId();
		userSelectionDO.setRegionId(1l);
		
		userSelectionDO.getRegionName();
		userSelectionDO.setRegionName("Test");
		
		userSelectionDO.getSectionId();
		userSelectionDO.setSectionId(1l);
		
		userSelectionDO.getSectionName();
		userSelectionDO.setSectionName("Test");
		
		userSelectionDO.getUserType();
		userSelectionDO.setUserType("Test");
		
		journeySelectionDO.setBranchId(1);
		journeySelectionDO.getBranchId();
		
		journeySelectionDO.getBranchName();
		journeySelectionDO.setBranchName("Test");
		
		journeySelectionDO.getFirstName();
		journeySelectionDO.setFirstName("SDT");
		
		journeySelectionDO.getJourneyDescription();
		journeySelectionDO.setJourneyDescription("Test");
		
		journeySelectionDO.getJourneyId();
		journeySelectionDO.setJourneyId(1);
		
		journeySelectionDO.getLastName();
		journeySelectionDO.setLastName("Test");
		
		journeySelectionDO.getUserId();
		journeySelectionDO.setUserId(1);
		
		weeklySummaryDO.getCashBanked();
		weeklySummaryDO.setCashBanked(0.00);
		
		weeklySummaryDO.getCollections();
		weeklySummaryDO.setCollections(0.00);
		
		weeklySummaryDO.getFloatWithdrawn();
		weeklySummaryDO.setFloatWithdrawn(0.00);
		
		weeklySummaryDO.setLoansIssued(0.00);
		weeklySummaryDO.getLoansIssued();
		
		weeklySummaryDO.getRaf();
		weeklySummaryDO.setRaf(0.00);
		
		retrieveTransactionsDO.setAmount("0");
		retrieveTransactionsDO.setBalanceDate("");
		retrieveTransactionsDO.setBalanceId("1");
		retrieveTransactionsDO.setBalanceTypeId("1");
		retrieveTransactionsDO.setChequeIndicator("");
		retrieveTransactionsDO.setJourneyId("1");
		retrieveTransactionsDO.setPeriodIndicator("");
		retrieveTransactionsDO.setReference("");
		retrieveTransactionsDO.setReason("");
		retrieveTransactionsDO.getAmount();
		retrieveTransactionsDO.getBalanceDate();
		retrieveTransactionsDO.getBalanceId();
		retrieveTransactionsDO.getBalanceTypeId();
		retrieveTransactionsDO.getChequeIndicator();
		retrieveTransactionsDO.getJourneyId();
		retrieveTransactionsDO.getPeriodIndicator();
		retrieveTransactionsDO.getReference();
		retrieveTransactionsDO.getReason();
		
		journeyBalanceReportDetailsDO.setActualCashBanked(null);
		journeyBalanceReportDetailsDO.setActualCollections(null);
		journeyBalanceReportDetailsDO.setActualFloats(null);
		journeyBalanceReportDetailsDO.setActualLoans(null);
		journeyBalanceReportDetailsDO.setDeclaredCashBanked(null);
		journeyBalanceReportDetailsDO.setDeclaredCollections(null);
		journeyBalanceReportDetailsDO.setDeclaredFloats(null);
		journeyBalanceReportDetailsDO.setDeclaredLoans(null);
		journeyBalanceReportDetailsDO.setDeclaredRaf(null);
		journeyBalanceReportDetailsDO.getActualCashBanked();
		journeyBalanceReportDetailsDO.getActualCollections();
		journeyBalanceReportDetailsDO.getActualFloats();
		journeyBalanceReportDetailsDO.getActualLoans();
		journeyBalanceReportDetailsDO.getDeclaredCashBanked();
		journeyBalanceReportDetailsDO.getDeclaredCollections();
		journeyBalanceReportDetailsDO.getDeclaredFloats();
		journeyBalanceReportDetailsDO.getDeclaredLoans();
		journeyBalanceReportDetailsDO.getDeclaredRaf();
		
		journeyBalanceReportDO.setActualCard(null);
		journeyBalanceReportDO.setActualCash(null);
		journeyBalanceReportDO.setActualCashBanked(null);
		journeyBalanceReportDO.setActualCentral(null);
		journeyBalanceReportDO.setActualFloat(null);
		journeyBalanceReportDO.setActualLoans(null);
		journeyBalanceReportDO.setActualShortsAndOvers(null);
		journeyBalanceReportDO.setDeclaredCash(null);
		journeyBalanceReportDO.setDeclaredCashBanked(null);
		journeyBalanceReportDO.setDeclaredFloat(null);
		journeyBalanceReportDO.setDeclaredLoans(null);
		journeyBalanceReportDO.setDeclaredShortsAndOvers(null);
		journeyBalanceReportDO.setDeclaredRaf(null);
		journeyBalanceReportDO.setJourneyId(1);
		journeyBalanceReportDO.setJourneyDesc("");
		journeyBalanceReportDO.getActualCard();
		journeyBalanceReportDO.getActualCash();
		journeyBalanceReportDO.getActualCashBanked();
		journeyBalanceReportDO.getActualCentral();
		journeyBalanceReportDO.getActualFloat();
		journeyBalanceReportDO.getActualLoans();
		journeyBalanceReportDO.getActualShortsAndOvers();
		journeyBalanceReportDO.getDeclaredCash();
		journeyBalanceReportDO.getDeclaredCashBanked();
		journeyBalanceReportDO.getDeclaredFloat();
		journeyBalanceReportDO.getDeclaredLoans();
		journeyBalanceReportDO.getDeclaredShortsAndOvers();
		journeyBalanceReportDO.getDeclaredRaf();
		journeyBalanceReportDO.getJourneyId();
		journeyBalanceReportDO.getJourneyDesc();
		journeyBalanceReportDO.setUserId(1);
		journeyBalanceReportDO.setFirstName("");
		journeyBalanceReportDO.setLastName("");
		journeyBalanceReportDO.setYearNumber(1);
		journeyBalanceReportDO.setWeekNumber(1);
		journeyBalanceReportDO.getUserId();
		journeyBalanceReportDO.getFirstName();
		journeyBalanceReportDO.getLastName();
		journeyBalanceReportDO.getYearNumber();
		journeyBalanceReportDO.getWeekNumber();
		journeyBalanceReportDO.setIsPrimaryUser(true);
		journeyBalanceReportDO.getIsPrimaryUser();
		
		journeyBalanceReportDetailsDataDO.setAmount(null);
		journeyBalanceReportDetailsDataDO.setBalanceDate(null);
		journeyBalanceReportDetailsDataDO.setBalanceType("");
		journeyBalanceReportDetailsDataDO.setChequeIndicator(true);
		journeyBalanceReportDetailsDataDO.setFirstName("");
		journeyBalanceReportDetailsDataDO.setIsPrimaryUser(false);
		journeyBalanceReportDetailsDataDO.setJourneyId(1);
		journeyBalanceReportDetailsDataDO.setLastName("");
		journeyBalanceReportDetailsDataDO.setReference("");
		journeyBalanceReportDetailsDataDO.setUserId(1);
		journeyBalanceReportDetailsDataDO.setWeekNumber(1);
		journeyBalanceReportDetailsDataDO.setYearNumber(1);
		journeyBalanceReportDetailsDataDO.getAmount();
		journeyBalanceReportDetailsDataDO.getBalanceDate();
		journeyBalanceReportDetailsDataDO.getBalanceType();
		journeyBalanceReportDetailsDataDO.getChequeIndicator();
		journeyBalanceReportDetailsDataDO.getFirstName();
		journeyBalanceReportDetailsDataDO.getIsPrimaryUser();
		journeyBalanceReportDetailsDataDO.getJourneyId();
		journeyBalanceReportDetailsDataDO.getLastName();
		journeyBalanceReportDetailsDataDO.getReference();
		journeyBalanceReportDetailsDataDO.getUserId();
		journeyBalanceReportDetailsDataDO.getWeekNumber();
		journeyBalanceReportDetailsDataDO.getYearNumber();
		
		branchBalanceReportDO.setActualCard(null);
		branchBalanceReportDO.setActualCash(null);
		branchBalanceReportDO.setActualCashBanked(null);
		branchBalanceReportDO.setActualCentral(null);
		branchBalanceReportDO.setActualFloat(null);
		branchBalanceReportDO.setActualLoans(null);
		branchBalanceReportDO.setActualShort(null);
		branchBalanceReportDO.setDeclaredCash(null);
		branchBalanceReportDO.setDeclaredCashBanked(null);
		branchBalanceReportDO.setDeclaredFloat(null);
		branchBalanceReportDO.setDeclaredLoans(null);
		branchBalanceReportDO.setDeclaredShort(null);
		branchBalanceReportDO.setDeclaredRaf(null);
		branchBalanceReportDO.setJourneyId(1);
		branchBalanceReportDO.setJourneyDesc("");
		branchBalanceReportDO.getActualCard();
		branchBalanceReportDO.getActualCash();
		branchBalanceReportDO.getActualCashBanked();
		branchBalanceReportDO.getActualCentral();
		branchBalanceReportDO.getActualFloat();
		branchBalanceReportDO.getActualLoans();
		branchBalanceReportDO.getActualShort();
		branchBalanceReportDO.getDeclaredCash();
		branchBalanceReportDO.getDeclaredCashBanked();
		branchBalanceReportDO.getDeclaredFloat();
		branchBalanceReportDO.getDeclaredLoans();
		branchBalanceReportDO.getDeclaredShort();
		branchBalanceReportDO.getDeclaredRaf();
		branchBalanceReportDO.getJourneyId();
		branchBalanceReportDO.getJourneyDesc();
		branchBalanceReportDO.setBranchId(1);
		branchBalanceReportDO.getBranchId();
		branchBalanceReportDO.setUserId(1);
		branchBalanceReportDO.setFirstName("");
		branchBalanceReportDO.setLastName("");
		branchBalanceReportDO.setYearNumber(1);
		branchBalanceReportDO.setWeekNumber(1);
		branchBalanceReportDO.getUserId();
		branchBalanceReportDO.getFirstName();
		branchBalanceReportDO.getLastName();
		branchBalanceReportDO.getYearNumber();
		branchBalanceReportDO.getWeekNumber();
		
		branchWeekStatusDO.setBranchId(1);
		branchWeekStatusDO.setClosedDateTime(null);
		branchWeekStatusDO.setFirstName("");
		branchWeekStatusDO.setLastName("");
		branchWeekStatusDO.setWeekNo(1);
		branchWeekStatusDO.setYearNo(1);
		branchWeekStatusDO.setWeekStatusDesc("");
		branchWeekStatusDO.setWeekStatusId(1);
		branchWeekStatusDO.getBranchId();
		branchWeekStatusDO.getClosedDateTime();
		branchWeekStatusDO.getFirstName();
		branchWeekStatusDO.getLastName();
		branchWeekStatusDO.getWeekNo();
		branchWeekStatusDO.getYearNo();
		branchWeekStatusDO.getWeekStatusDesc();
		branchWeekStatusDO.getWeekStatusId();
		
		branchSelectionDO.setAreaId(1L);
		branchSelectionDO.setAreaName("");
		branchSelectionDO.setBranchId(1L);
		branchSelectionDO.setBranchName("");
		branchSelectionDO.setRegionId(1L);
		branchSelectionDO.setRegionName("");
		branchSelectionDO.getAreaId();
		branchSelectionDO.getAreaName();
		branchSelectionDO.getBranchId();
		branchSelectionDO.getBranchName();
		branchSelectionDO.getRegionId();
		branchSelectionDO.getRegionName();
	}
	
}

class BaseRequestImpl extends BaseRequest{
	//no implemention
}

class BaseResponseImpl extends BaseResponse{
	//no implemention
}
