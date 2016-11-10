package com.mastek.balancing.business.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mastek.commons.domain.BranchBalanceReportDO;
import com.mastek.commons.domain.BranchSelectionDO;
import com.mastek.commons.domain.BranchWeekStatusDO;
import com.mastek.commons.domain.JourneyBalanceReportDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDO;
import com.mastek.commons.domain.JourneySelectionDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.UserSelectionDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.domain.WeeklySummaryDO;
import com.mastek.commons.exception.ServiceException;

/**
 * The Interface BalancingService.
 */
@Component
public interface BalancingService
{

	/**
	 * Gets the week.
	 *
	 * @param criteriaDate the criteria date
	 * @param userId the user id
	 * @return the week
	 * @throws ServiceException the service exception
	 */
	List<WeekDO> getWeek(String criteriaDate, long userId) throws ServiceException;
	
	/**
	 * Gets the journey.
	 *
	 * @param branchId the branch id
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the journey
	 * @throws ServiceException the service exception
	 */
	List<JourneySelectionDO> getJourney(long branchId, String startDate, String endDate,long userId) throws ServiceException;
	
	/**
	 * Gets the users.
	 *
	 * @param branchId the branch id
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the users
	 * @throws ServiceException the service exception
	 */
	List<UserSelectionDO> getUsers(long branchId,String startDate, String endDate, long userId) throws ServiceException;
	
	/**
	 * Gets the weekly cash summary.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @param loggedInUserId the logged in user id
	 * @return the weekly cash summary
	 * @throws ServiceException the service exception
	 */
	WeeklySummaryDO getWeeklyCashSummary(String startDate, String endDate,long journeyId, long userId, long loggedInUserId) throws ServiceException;
	
	/**
	 * Retrieve balance transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @param balanceTypeId the balance type id
	 * @param loggedInUserId the logged in user id
	 * @return the list
	 * @throws ServiceException the service exception
	 */
	List<RetrieveTransactionsDO> retrieveBalanceTransactions(String startDate, String endDate,long journeyId, long userId,String balanceTypeId, long loggedInUserId) throws ServiceException;
	
	
	/**
	 * Gets the branch week status.
	 *
	 * @param branchId the branch id
	 * @param weekNo the week no
	 * @param yearNo the year no
	 * @param loggedInUserId the logged in user id
	 * @return the branch week status
	 * @throws ServiceException the service exception
	 */
	BranchWeekStatusDO getBranchWeekStatus(long branchId,int weekNo,int yearNo,long loggedInUserId)throws ServiceException;
	
	/**
	 * Gets the branch list.
	 *
	 * @param loggedInUserId the logged in user id
	 * @return the branch list
	 * @throws ServiceException the service exception
	 */
	List<BranchSelectionDO> getBranchList(long loggedInUserId) throws ServiceException;
	
	/**
	 * Gets the branch balance report data.
	 *
	 * @param weekNumber the week number
	 * @param yearNumber the year number
	 * @param branchId the branch id
	 * @param loggedInUserId the logged in user id
	 * @return the branch balance report data
	 * @throws ServiceException the service exception
	 */
	List<BranchBalanceReportDO> getBranchBalanceReportData(int weekNumber,int yearNumber,long branchId,long loggedInUserId) throws ServiceException;
	
	/**
	 * Gets the journey balance report data.
	 *
	 * @param weekNumber the week number
	 * @param yearNumber the year number
	 * @param journeyId the journey id
	 * @param loggedInUserId the logged in user id
	 * @return the journey balance report data
	 * @throws ServiceException the service exception
	 */
	List<JourneyBalanceReportDO> getJourneyBalanceReportData(int weekNumber,int yearNumber,long journeyId,long loggedInUserId) throws ServiceException;
	
	/**
	 * Gets the journey balance report data details.
	 *
	 * @param weekNumber the week number
	 * @param yearNumber the year number
	 * @param journeyId the journey id
	 * @param loggedInUserId the logged in user id
	 * @return the journey balance report data details
	 * @throws ServiceException the service exception
	 */
	JourneyBalanceReportDetailsDO getJourneyBalanceReportDataDetails(int weekNumber,int yearNumber,long journeyId,long loggedInUserId) throws ServiceException;
	
	/**
	 * Save branch week status.
	 *
	 * @param branchId the branch id
	 * @param weekNumber the week number
	 * @param yearNumber the year number
	 * @param weekStatusId the week status id
	 * @param loggedInUserId the logged in user id
	 * @return true, if successful
	 * @throws ServiceException the service exception
	 */
	boolean saveBranchWeekStatus(long branchId,int weekNumber,int yearNumber,int weekStatusId,long loggedInUserId) throws ServiceException;
	
}
