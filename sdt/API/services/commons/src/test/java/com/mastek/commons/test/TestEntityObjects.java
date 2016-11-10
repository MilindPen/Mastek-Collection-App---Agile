package com.mastek.commons.test;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.data.entity.VWAgreement;
import com.mastek.commons.data.entity.VWAgreementList;
import com.mastek.commons.data.entity.VWAgreementTransaction;
import com.mastek.commons.data.entity.VWBranchDetails;
import com.mastek.commons.data.entity.VWBranchWeekDetails;
import com.mastek.commons.data.entity.VWCardPaymentSummary;
import com.mastek.commons.data.entity.VWCashSummary;
import com.mastek.commons.data.entity.VWCustomer;
import com.mastek.commons.data.entity.VWCustomerVisitList;
import com.mastek.commons.data.entity.VWDashboardAmount;
import com.mastek.commons.data.entity.VWJourney;
import com.mastek.commons.data.entity.VWJourneyAgent;
import com.mastek.commons.data.entity.VWJourneyCustomer;
import com.mastek.commons.data.entity.VWJourneySelection;
import com.mastek.commons.data.entity.VWLoginUser;
import com.mastek.commons.data.entity.VWTransaction;
import com.mastek.commons.data.entity.VWTransactionAllocation;
import com.mastek.commons.data.entity.VWTransactionHistory;
import com.mastek.commons.data.entity.VWUser;
import com.mastek.commons.data.entity.VWUserSelection;
import com.mastek.commons.data.entity.VWVisitResult;
import com.mastek.commons.data.entity.VWVisitSummary;
import com.mastek.commons.data.entity.VWWeekEnding;


@RunWith(MockitoJUnitRunner.class)
public class TestEntityObjects
{
	@InjectMocks
   VWAgreement vWAgreement;
	
	@InjectMocks
   VWAgreementList vWAgreementList;
	
	@InjectMocks
   VWCardPaymentSummary vWCardPaymentSummary;
	
	@InjectMocks
   VWCustomer vWCustomer;
	
	@InjectMocks
	VWCustomerVisitList vWCustomerVisitList;

	@InjectMocks
   VWJourney vWJourney;
	
	@InjectMocks
   VWJourneyAgent  vWJourneyAgent;
	
	@InjectMocks
   VWJourneyCustomer vWJourneyCustomer;
	
	@InjectMocks
   VWLoginUser VWLoginUser;
	
	@InjectMocks
   VWTransaction vWTransaction;
	
	@InjectMocks
	VWTransactionAllocation vWTransactionAllocation;
    
	@InjectMocks
	VWUser vWUser; 
	
	@InjectMocks
	VWVisitResult vWVisitResult;
	
	@InjectMocks
	VWVisitSummary vWVisitSummary;
	
	@InjectMocks
	VWWeekEnding vWWeekEnding; 
	
	@InjectMocks
	VWTransactionHistory vWTransactionHistory; 
	
	@InjectMocks
	VWDashboardAmount vWDashboardAmount;
	
	@InjectMocks
	VWAgreementTransaction vwAgreementTransaction;
	
	@InjectMocks
	VWCashSummary  vWCashSummary;
	
	@InjectMocks
	VWJourneySelection vWJourneySelection;
	
	@InjectMocks
	VWUserSelection vWUserSelection;
	
	@InjectMocks
	VWBranchWeekDetails vWBranchWeekDetails;
	
	@InjectMocks
	VWBranchDetails vWBranchDetails;
	
	Date dateObj=new Date();
	
	@Test
	public void testEntityObjects()
	{
		vWAgreement.setAgreementId(123L);
		vWAgreement.setAgreementNumber("");
		vWAgreement.setAgreementStartDate(null);
		vWAgreement.setArrears(123.00);
		vWAgreement.setBalance(123.00);
		vWAgreement.setCharges(123.00);
		vWAgreement.setCreatedBy("");
		vWAgreement.setCreatedDate(null);
		vWAgreement.setCustomerId(123L);
		vWAgreement.setInstalments("");
		vWAgreement.setPrincipal(123.00);
		vWAgreement.setReloanedFromAgreementID(123L);
		vWAgreement.setSettledDate(null);
		vWAgreement.setSettlementRebate(123.00);
		vWAgreement.setStatus(123);
		vWAgreement.setTermAmount(123.00);
		vWAgreement.setUpdatedBy("");
		vWAgreement.setUpdatedDate(null);
		vWAgreement.setUpdatedBy("");
		
		vWAgreement.getAgreementId();
		vWAgreement.getAgreementNumber();
		vWAgreement.getAgreementStartDate();
		vWAgreement.getArrears();
		vWAgreement.getBalance();
		vWAgreement.getCharges();
		vWAgreement.getCreatedBy();
		vWAgreement.getCreatedDate();
		vWAgreement.getCustomerId();
		vWAgreement.getInstalments();
		vWAgreement.getPrincipal();
		vWAgreement.getReloanedFromAgreementID();
		vWAgreement.getSettledDate();
		vWAgreement.getSettlementRebate();
		vWAgreement.getStatus();
		vWAgreement.getTermAmount();
		vWAgreement.getUpdatedBy();
		vWAgreement.getUpdatedDate();
		
		
		vWAgreementList.setAaIndicatorId("");
		vWAgreementList.setAgreementId(123L);
		vWAgreementList.setAgreementNumber("");
		vWAgreementList.setAgreementStartDate(null);
		vWAgreementList.setArrears(123.00);
		vWAgreementList.setBalance(123.00);
		vWAgreementList.setCharges(123.00);
		vWAgreementList.setCreatedBy("");
		vWAgreementList.setCreatedDate(null);
		vWAgreementList.setCustomerId(123L);
		vWAgreementList.setInstalments("");
		vWAgreementList.setPaymentFrequencyID(12);
		vWAgreementList.setPreviousFolioNumber("");
		vWAgreementList.setPrincipal(123.00);
		vWAgreementList.setReloanedFromAgreementID(123L);
		vWAgreementList.setSettledDate(null);
		vWAgreementList.setSettlementRebate(123.00);
		vWAgreementList.setStatus(12);
		vWAgreementList.setTermAmount(123.00);
		vWAgreementList.setUpdatedBy("");
		vWAgreementList.setUpdatedDate(null);
		
		vWAgreementList.getAaIndicatorId();
		vWAgreementList.getAgreementId();
		vWAgreementList.getAgreementNumber();
		vWAgreementList.getAgreementStartDate();
		vWAgreementList.getArrears();
		vWAgreementList.getBalance();
		vWAgreementList.getCharges();
		vWAgreementList.getCreatedBy();
		vWAgreementList.getCreatedDate();
		vWAgreementList.getCustomerId();
		vWAgreementList.getCustomerId();
		vWAgreementList.getInstalments();
		vWAgreementList.getPaymentFrequencyID();
		vWAgreementList.getPreviousFolioNumber();
		vWAgreementList.getPrincipal();
		vWAgreementList.getReloanedFromAgreementID();
		vWAgreementList.getSettlementRebate();
		vWAgreementList.getSettledDate();
		vWAgreementList.getStatus();
		vWAgreementList.getTermAmount();
		vWAgreementList.getUpdatedBy();
		vWAgreementList.getUpdatedDate();
		
		vWCardPaymentSummary.setCardPaymentAmount(123.00);
		vWCardPaymentSummary.setJourneyID(123L);
		vWCardPaymentSummary.setWeekDate(null);
		
		vWCardPaymentSummary.getCardPaymentAmount();
		vWCardPaymentSummary.getJourneyID();
		vWCardPaymentSummary.getWeekDate();
		
		vWCustomer.setAddress1("");
		vWCustomer.setAddress2("");
		vWCustomer.setAddress3("");
		vWCustomer.setAddress4("");
		vWCustomer.setAgreements(null);
		vWCustomer.setCity("");
		vWCustomer.setCreatedBy("");
		vWCustomer.setCreatedDate(null);
		vWCustomer.setCustomerId(123L);
		vWCustomer.setCustomerNumber("");
		vWCustomer.setCustomerVisits(null);
		vWCustomer.setJourneyCustomer(null);
		vWCustomer.setDob("");
		vWCustomer.setEmail("");
		vWCustomer.setFirstName("");
		vWCustomer.setMiddleName("");
		vWCustomer.setPaymentPerformance(123);
		vWCustomer.setPhoneNumber("");
		vWCustomer.setPostcode("");
		vWCustomer.setSurname("");
		vWCustomer.setTitle("");
		vWCustomer.setUpdatedBy("");
		vWCustomer.setUpdatedDate(null);
		vWCustomer.setMobile("");
		
		vWCustomer.getAddress1();
		vWCustomer.getAddress2();
		vWCustomer.getAddress3();
		vWCustomer.getAddress4();
		vWCustomer.getAgreements();
		vWCustomer.getCity();
		vWCustomer.getCreatedBy();
		vWCustomer.getCreatedDate();
		vWCustomer.getCreatedDate();
		vWCustomer.getCustomerId();
		vWCustomer.getCustomerNumber();
		vWCustomer.getCustomerVisits();
		vWCustomer.getDob();
		vWCustomer.getEmail();
		vWCustomer.getFirstName();
		vWCustomer.getJourneyCustomer();
		vWCustomer.getMiddleName();
		vWCustomer.getMobile();
		vWCustomer.getPaymentPerformance();
		vWCustomer.getPhoneNumber();
		vWCustomer.getPostcode();
		vWCustomer.getSurname();
		vWCustomer.getTitle();
		vWCustomer.getUpdatedBy();
		vWCustomer.getUpdatedDate();
		
		vWCustomerVisitList.setAddressLine1("");
		vWCustomerVisitList.setAddressLine2("");
		vWCustomerVisitList.setAddressLine3("");
		vWCustomerVisitList.setAddressLine4("");
		vWCustomerVisitList.setAgreements(null);
		vWCustomerVisitList.setCity("");
		vWCustomerVisitList.setCollectionDay(12);
		vWCustomerVisitList.setCustomerId(123L);
		vWCustomerVisitList.setCustomerRefNumber("");
		vWCustomerVisitList.setDob("");
		vWCustomerVisitList.setEmail("");
		vWCustomerVisitList.setFirstName("");
		vWCustomerVisitList.setJourneyId(123L);
		vWCustomerVisitList.setJourneyOrder(12);
		vWCustomerVisitList.setLastName("");
		vWCustomerVisitList.setMiddleName("");
		vWCustomerVisitList.setMobile("");
		vWCustomerVisitList.setPaymentPerformance(12);
		vWCustomerVisitList.setPaymentTypeId(12);
		vWCustomerVisitList.setPhone("");
		vWCustomerVisitList.setPostcode("");
		vWCustomerVisitList.setStatus(12);
		vWCustomerVisitList.setTitle("");
		vWCustomerVisitList.setTotalPaidAmount(123.00);
		vWCustomerVisitList.setTotalTermAmount(123.00);
		vWCustomerVisitList.setUserId(123L);
		vWCustomerVisitList.setVisitDate(null);
		vWCustomerVisitList.setVisitId(123L);
		vWCustomerVisitList.setVisitStatus("");
		vWCustomerVisitList.setAtRisk(1);
		vWCustomerVisitList.setVulnerable("");
		
		vWCustomerVisitList.getAddressLine1();
		vWCustomerVisitList.getAddressLine2();
		vWCustomerVisitList.getAddressLine3();
		vWCustomerVisitList.getAddressLine4();
		vWCustomerVisitList.getAgreements();
		vWCustomerVisitList.getCity();
		vWCustomerVisitList.getCollectionDay();
		vWCustomerVisitList.getCustomerId();
		vWCustomerVisitList.getCustomerRefNumber();
		vWCustomerVisitList.getDob();
		vWCustomerVisitList.getEmail();
		vWCustomerVisitList.getFirstName();
		vWCustomerVisitList.getJourneyId();
		vWCustomerVisitList.getJourneyOrder();
		vWCustomerVisitList.getLastName();
		vWCustomerVisitList.getMiddleName();
		vWCustomerVisitList.getMobile();
		vWCustomerVisitList.getPaymentPerformance();
		vWCustomerVisitList.getPaymentTypeId();
		vWCustomerVisitList.getPhone();
		vWCustomerVisitList.getPostcode();
		vWCustomerVisitList.getStatus();
		vWCustomerVisitList.getTitle();
		vWCustomerVisitList.getTotalTermAmount();
		vWCustomerVisitList.getTotalPaidAmount();
		vWCustomerVisitList.getUserId();
		vWCustomerVisitList.getVisitDate();
		vWCustomerVisitList.getVisitId();
		vWCustomerVisitList.getVisitStatus();
		vWCustomerVisitList.getAtRisk();
		vWCustomerVisitList.getVulnerable();
		
		vWJourney.setCreatedBy("");
		vWJourney.setCreatedDate(null);
		vWJourney.setDescription("");
		vWJourney.setJourneyAgent(null);
		vWJourney.setJourneyCustomer(null);
		vWJourney.setJourneyId(123L);
		vWJourney.setUpdatedBy("");
		vWJourney.setUpdatedDate(null);
		
		vWJourney.getCreatedDate();
		vWJourney.getCreatedBy();
		vWJourney.getDescription();
		vWJourney.getJourneyAgent();
		vWJourney.getJourneyCustomer();
		vWJourney.getJourneyId();
		vWJourney.getUpdatedBy(); 
		vWJourney.getUpdatedDate();
		
		vWJourneyAgent.setCreatedBy("");
		vWJourneyAgent.setCreatedDate(null);
		vWJourneyAgent.setEndDate(null);
		vWJourneyAgent.setJourney(null);
		vWJourneyAgent.setStartDate(null);
		vWJourneyAgent.setUpdatedBy("");
		vWJourneyAgent.setUpdatedDate(null);
		vWJourneyAgent.setUserId(123L);
		vWJourneyAgent.setUserJourneyId(127L);
	   
		vWJourneyAgent.getUpdatedDate();
		vWJourneyAgent.getUserJourneyId();		
		vWJourneyAgent.getCreatedBy();
		vWJourneyAgent.getCreatedDate();
		vWJourneyAgent.getEndDate();
		vWJourneyAgent.getJourney();
		vWJourneyAgent.getStartDate();
		vWJourneyAgent.getUpdatedBy();
		vWJourneyAgent.getUserId();
		vWJourneyAgent.getUpdatedBy();
		
		vWJourneyCustomer.setCollectionDay(12);
		vWJourneyCustomer.setCreatedBy("");
		vWJourneyCustomer.setCreatedDate(null);
		vWJourneyCustomer.setCustomer(null);
		vWJourneyCustomer.setCustomerJourneyId(13L);
		vWJourneyCustomer.setEndDate(null);
		vWJourneyCustomer.setJourney(null);
		vWJourneyCustomer.setJourneyOrder(12);
		vWJourneyCustomer.setStartDate(null);
		vWJourneyCustomer.setUpdatedBy("");
		vWJourneyCustomer.setUpdatedDate(null);
		
		vWJourneyCustomer.getCollectionDay();
		vWJourneyCustomer.getCreatedBy();
		vWJourneyCustomer.getCreatedDate();
		vWJourneyCustomer.getCustomer();
		vWJourneyCustomer.getCustomerJourneyId();
		vWJourneyCustomer.getEndDate();
		vWJourneyCustomer.getJourney();
		vWJourneyCustomer.getJourneyOrder();
		vWJourneyCustomer.getStartDate();
		vWJourneyCustomer.getUpdatedBy();
		vWJourneyCustomer.getUpdatedDate();
		
		VWLoginUser.setFirstName("");
		VWLoginUser.setIsActive(false);
		VWLoginUser.setLastName("");
		VWLoginUser.setMacAddress("");
		VWLoginUser.setMiddleName("");
		VWLoginUser.setMobileUserId(123L);
		VWLoginUser.setPin("12");
		VWLoginUser.setTitle("");
		VWLoginUser.setUserId(123L);
		
		VWLoginUser.getFirstName();
		VWLoginUser.getIsActive();
		VWLoginUser.getLastName();
		VWLoginUser.getMacAddress();
		VWLoginUser.getMiddleName();
		VWLoginUser.getMiddleName();
		VWLoginUser.getMobileUserId();
		VWLoginUser.getPin();
		VWLoginUser.getTitle();
		VWLoginUser.getUserId();
		
		vWTransaction.setAllocations(null);
		vWTransaction.setAmountPaid(123.00);
		vWTransaction.setCreatedBy("");
		vWTransaction.setCreatedDate(null);
		vWTransaction.setCustomerId(123L);
		vWTransaction.setPaidDate(null);
		vWTransaction.setPaymentTypeDesc("");
		vWTransaction.setPaymentTypeID(12);;
		vWTransaction.setResponseMessage("");
		vWTransaction.setResponseStatusID(12);
		vWTransaction.setTransactionId(123L);
		vWTransaction.setUpdatedBy("");
		vWTransaction.setUpdatedDate(null);
		vWTransaction.setVisitResultID(12); 		
		
		vWTransaction.getAllocations();
		vWTransaction.getAmountPaid();
		vWTransaction.getCreatedBy();
		vWTransaction.getCreatedDate();
		vWTransaction.getCustomerId();
		vWTransaction.getPaidDate();
		vWTransaction.getPaymentTypeDesc();
		vWTransaction.getPaymentTypeID();
		vWTransaction.getResponseMessage();
		vWTransaction.getResponseStatusID();
		vWTransaction.getTransactionId();
		vWTransaction.getUpdatedBy();
		vWTransaction.getUpdatedDate();
		vWTransaction.getVisitResultID();
		
		vWTransactionAllocation.setAgreementId(123L);
		vWTransactionAllocation.setAllocationId(123L);
		vWTransactionAllocation.setAmount(123.00);
		vWTransactionAllocation.setArrears(123.00);
		vWTransactionAllocation.setBalance(123.00);
		vWTransactionAllocation.setCreatedBy("");
		vWTransactionAllocation.setCreatedDate(null);
		vWTransactionAllocation.setTransaction(null);
		vWTransactionAllocation.setTransactionTypeDesc("");
		vWTransactionAllocation.setTransactionTypeId(12);
		vWTransactionAllocation.setUpdatedBy("");
		vWTransactionAllocation.setUpdatedDate(null);
		
		
		vWTransactionAllocation.getAgreementId();
		vWTransactionAllocation.getAllocationId();
		vWTransactionAllocation.getAmount();
		vWTransactionAllocation.getArrears();
		vWTransactionAllocation.getBalance();
		vWTransactionAllocation.getCreatedBy();
		vWTransactionAllocation.getCreatedDate();
		vWTransactionAllocation.getTransaction();
		vWTransactionAllocation.getTransactionTypeDesc();
		vWTransactionAllocation.getTransactionTypeId();
		vWTransactionAllocation.getUpdatedBy();
		vWTransactionAllocation.getUpdatedDate();
		
		
		vWUser.setActive(true);
		vWUser.setAddressLine1("");
		vWUser.setAddressLine2("");
		vWUser.setAddressLine3("");
		vWUser.setAddressLine4("");
		vWUser.setCity("");
		vWUser.setCreatedBy("");
		vWUser.setCreatedBy("");
		vWUser.setCreatedDate(null);
		vWUser.setEndDate(null);
		vWUser.setFirstName("");
		vWUser.setIsActive(true);
		vWUser.setMiddleName("");
		vWUser.setPostcode("");
		vWUser.setStartDate(null);
		vWUser.setLastName("");
		vWUser.setTitle("");
		vWUser.setUpdatedBy("");
		vWUser.setUpdatedDate(null);
		vWUser.setUserId(123L);
		vWUser.getAddressLine1();
		vWUser.getAddressLine2();
		vWUser.getAddressLine3();
		vWUser.getAddressLine4();
		vWUser.getCity();
		vWUser.getCreatedBy();
		vWUser.getCreatedDate();
		vWUser.getEndDate();
		vWUser.getFirstName();
		vWUser.getIsActive();
		vWUser.getMiddleName();
		vWUser.getPostcode();
		vWUser.getStartDate();
		vWUser.getLastName();
		vWUser.getTitle();
		vWUser.getUpdatedBy();
		vWUser.getUpdatedDate();
		vWUser.getUserId();
		vWUser.isActive();
		vWUser.setUserType("");
		vWUser.setUserTypeId(1);
		vWUser.setEmail("");
		vWUser.getEmail();
		vWUser.getUserType();
		vWUser.getUserTypeId();
		
		vWVisitResult.setAmountPaid(123.00);
		vWVisitResult.setResultDate(null);
		vWVisitResult.setResultID(123L);
		vWVisitResult.setStatusDescription("");
		vWVisitResult.setStatusId(123L);
		vWVisitResult.setVisitId(123L);
	
		vWVisitResult.getAmountPaid();
		vWVisitResult.getResultDate();
		vWVisitResult.getResultID();
		vWVisitResult.getStatusDescription();
		vWVisitResult.getStatusId();
		vWVisitResult.getVisitId();
		
		vWVisitSummary.setCustomer(null);
		vWVisitSummary.setPaymentTypeId(12);
		vWVisitSummary.setStatus(12);
		vWVisitSummary.setTotalPaidAmount(123.00);
		vWVisitSummary.setVisitDate(null);
		vWVisitSummary.setVisitId(123L);

		vWVisitSummary.getCustomer();
		vWVisitSummary.getPaymentTypeId();
		vWVisitSummary.getStatus();
		vWVisitSummary.getTotalPaidAmount();
		vWVisitSummary.getVisitDate();
		vWVisitSummary.getVisitId();
		
		
		vWWeekEnding.setCreatedBy("");
		vWWeekEnding.setCreatedDate(null);
		vWWeekEnding.setEndDate(null);
		vWWeekEnding.setStartDate(null);
		vWWeekEnding.setUpdatedBy("");
		vWWeekEnding.setUpdatedDate(null);
		vWWeekEnding.setWeekId(12);
		vWWeekEnding.setWeekNo(33);
		vWWeekEnding.setYearNo(2016);

	
		vWWeekEnding.getCreatedBy();
		vWWeekEnding.getCreatedDate();
		vWWeekEnding.getEndDate();
		vWWeekEnding.getStartDate();
		vWWeekEnding.getUpdatedBy();
		vWWeekEnding.getUpdatedDate();
		vWWeekEnding.getWeekId();
		vWWeekEnding.getWeekNo();
		vWWeekEnding.getYearNo();
		
		vWTransactionHistory.setAgreementId(123L);
		vWTransactionHistory.setAllocationId(123L);
		vWTransactionHistory.setAmount(123.00);
		vWTransactionHistory.setArrears(233.00);
		vWTransactionHistory.setCustomerId(123L);
		vWTransactionHistory.setJourneyId(123L);
		vWTransactionHistory.setPaidDate(null);
		vWTransactionHistory.setResponseStatusID(12);
		vWTransactionHistory.setTransactionId(123L);
		vWTransactionHistory.setTransactionTypeId(12);
		vWTransactionHistory.setUserId(123L);
		vWTransactionHistory.setVisitDate(null);
		vWTransactionHistory.setWeekNumber("");
		vWTransactionHistory.setYear("");
		
		vWTransactionHistory.getAgreementId();
		vWTransactionHistory.getAllocationId();
		vWTransactionHistory.getAmount();
		vWTransactionHistory.getArrears();
		vWTransactionHistory.getCustomerId();
		vWTransactionHistory.getTransactionId();
		vWTransactionHistory.getTransactionTypeId();
		vWTransactionHistory.getJourneyId();
		vWTransactionHistory.getPaidDate();
		vWTransactionHistory.getResponseStatusID();
		vWTransactionHistory.getUserId();
		vWTransactionHistory.getVisitDate();
		vWTransactionHistory.getWeekNumber();
		vWTransactionHistory.getYear();
		
		vWDashboardAmount.setAmount(123.00);
		vWDashboardAmount.setBalanceDate(null);
		vWDashboardAmount.setBalanceId("");
		vWDashboardAmount.setBalanceTypeId("");
		vWDashboardAmount.setChequeIndicator(false);
		vWDashboardAmount.setJourneyId(123L);
		vWDashboardAmount.setPeriodIndicator("");
		vWDashboardAmount.setReference("");
		
		vWDashboardAmount.getAmount();
		vWDashboardAmount.getBalanceDate();
		vWDashboardAmount.getBalanceId();
		vWDashboardAmount.getBalanceTypeId();
		vWDashboardAmount.getChequeIndicator();
		vWDashboardAmount.getJourneyId();
		vWDashboardAmount.getPeriodIndicator();
		vWDashboardAmount.getReference();
		
		vwAgreementTransaction.setAgreementAmountPaid(123.00);
		vwAgreementTransaction.setAgreementID(123L);
		vwAgreementTransaction.setAgreementMode("");
		vwAgreementTransaction.setCustomerID(123L);
		vwAgreementTransaction.setResultDate(null);
		vwAgreementTransaction.setResultStatusID(12);
		vwAgreementTransaction.setUserId(123L);
		vwAgreementTransaction.setVisitID(123L);
		vwAgreementTransaction.setVisitStatusID(12);
		vwAgreementTransaction.setResultID("");
		
		vwAgreementTransaction.getAgreementAmountPaid();
		vwAgreementTransaction.getAgreementID();
		vwAgreementTransaction.getAgreementMode();
		vwAgreementTransaction.getCustomerID();
		vwAgreementTransaction.getResultDate();
		vwAgreementTransaction.getResultID();
		vwAgreementTransaction.getResultStatusID();
		vwAgreementTransaction.getUserId();
		vwAgreementTransaction.getVisitID();
		vwAgreementTransaction.getVisitStatusID();
		
		vWCashSummary.setAmount(0.00);
		vWCashSummary.getAmount();
		vWCashSummary.setBalanceDate(dateObj);
		vWCashSummary.getBalanceDate();
		vWCashSummary.getBalanceId();
		vWCashSummary.setBalanceId("");
		vWCashSummary.getBalanceTypeDesc();
		vWCashSummary.setBalanceTypeDesc("");
		vWCashSummary.getBalanceTypeId();
		vWCashSummary.setBalanceTypeId("");
		vWCashSummary.getChequeIndicator();
		vWCashSummary.setChequeIndicator("");
		vWCashSummary.getCreatedDate();
		vWCashSummary.setCreatedDate(dateObj);
		vWCashSummary.getJourneyId();
		vWCashSummary.setJourneyId(1);
		vWCashSummary.getPeriodIndicator();
		vWCashSummary.setPeriodIndicator("");
		vWCashSummary.setReference("");
		vWCashSummary.getReference();
		vWCashSummary.getUserId();
		vWCashSummary.setUserId(1);
		vWCashSummary.getWeekNo();
		vWCashSummary.setWeekNo(1);
		vWCashSummary.setReason("");
		vWCashSummary.getReason();
		
		vWJourneySelection.setBranchId(1);
		vWJourneySelection.getBranchId();
		vWJourneySelection.getBranchName();
		vWJourneySelection.setBranchName("");
		vWJourneySelection.setFirstName("");
		vWJourneySelection.getFirstName();
		vWJourneySelection.getJourneyAgentEndDate();
		vWJourneySelection.setJourneyAgentEndDate(dateObj);
		vWJourneySelection.setJourneyAgentStartDate(dateObj);
		vWJourneySelection.getJourneyAgentStartDate();
		vWJourneySelection.getJourneyDescription();
		vWJourneySelection.setJourneyDescription("");
		vWJourneySelection.getJourneyId();
		vWJourneySelection.setJourneyId(1l);
		vWJourneySelection.getJourneySectionEndDate();
		vWJourneySelection.setJourneySectionEndDate(dateObj);
		vWJourneySelection.getJourneySectionStartDate();
		vWJourneySelection.setJourneySectionStartDate(dateObj);
		vWJourneySelection.getLastName();
		vWJourneySelection.setLastName("");
		vWJourneySelection.getUserId();
		vWJourneySelection.setUserId(1l);
		
		vWUserSelection.getAreaId();
		vWUserSelection.setAreaId(1l);
		vWUserSelection.getAreaName();
		vWUserSelection.setAreaName("");
		vWUserSelection.getBranchId();
		vWUserSelection.setBranchId(1l);
		vWUserSelection.getBranchName();
		vWUserSelection.setBranchName("");
		vWUserSelection.getFirstName();
		vWUserSelection.setFirstName("");
		vWUserSelection.getJourneyAgentEndDate();
		vWUserSelection.setJourneyAgentEndDate(dateObj);
		vWUserSelection.getJourneyAgentStartDate();
		vWUserSelection.setJourneyAgentStartDate(dateObj);
		vWUserSelection.getJourneyDescription();
		vWUserSelection.setJourneyDescription("");
		vWUserSelection.getJourneyId();
		vWUserSelection.setJourneyId(1l);
		vWUserSelection.getLastName();
		vWUserSelection.setLastName("");
		vWUserSelection.getRegionId();
		vWUserSelection.setRegionId(1l);
		vWUserSelection.getRegionName();
		vWUserSelection.setRegionName("");
		vWUserSelection.getSectionId();
		vWUserSelection.setSectionId(1l);
		vWUserSelection.getRegionName();
		vWUserSelection.setRegionName("");
		vWUserSelection.getSectionId();
		vWUserSelection.setSectionId(1l);
		vWUserSelection.getSectionName();
		vWUserSelection.setSectionName("");
		vWUserSelection.getUserEndDate();
		vWUserSelection.setUserEndDate(dateObj);
		vWUserSelection.getUserId();
		vWUserSelection.setUserId(1);
		vWUserSelection.getUserStartDate();
		vWUserSelection.setUserStartDate(dateObj);
		vWUserSelection.getUserType();
		vWUserSelection.setUserType("");
		vWUserSelection.getUserTypeId();
		vWUserSelection.setUserTypeId(1);
		
		vWBranchWeekDetails.setBranchClosedWeekId(1);
		vWBranchWeekDetails.setBranchId(1);
		vWBranchWeekDetails.setClosedDateTime(dateObj);
		vWBranchWeekDetails.setFirstName("");
		vWBranchWeekDetails.setLastName("");
		vWBranchWeekDetails.setWeekNo(1);
		vWBranchWeekDetails.setYearNo(1);
		vWBranchWeekDetails.setWeekStatusId(1);
		vWBranchWeekDetails.setWeekStatusDesc("");
		vWBranchWeekDetails.getBranchClosedWeekId();
		vWBranchWeekDetails.getBranchId();
		vWBranchWeekDetails.getClosedDateTime();
		vWBranchWeekDetails.getFirstName();
		vWBranchWeekDetails.getLastName();
		vWBranchWeekDetails.getWeekNo();
		vWBranchWeekDetails.getYearNo();
		vWBranchWeekDetails.getWeekStatusId();
		vWBranchWeekDetails.getWeekStatusDesc();
		
		vWBranchDetails.setAreaId(1L);
		vWBranchDetails.setAreaName("");
		vWBranchDetails.setBranchId(1L);
		vWBranchDetails.setBranchName("");
		vWBranchDetails.setRegionId(1L);
		vWBranchDetails.setRegionName("");
		vWBranchDetails.getAreaId();
		vWBranchDetails.getAreaName();
		vWBranchDetails.getBranchId();
		vWBranchDetails.getBranchName();
		vWBranchDetails.getRegionId();
		vWBranchDetails.getRegionName();
	}
}
