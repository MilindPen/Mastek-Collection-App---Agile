package com.mastek.balancing.business.service;

import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_BRANCH_BALANCE_REPORT_DATA;
import static com.mastek.commons.util.ApplicationConstants.GET_BRANCH_LIST;
import static com.mastek.commons.util.ApplicationConstants.GET_BRANCH_WEEK_STATUS;
import static com.mastek.commons.util.ApplicationConstants.GET_JOURNEY;
import static com.mastek.commons.util.ApplicationConstants.GET_JOURNEY_BALANCE_REPORT_DATA;
import static com.mastek.commons.util.ApplicationConstants.GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS;
import static com.mastek.commons.util.ApplicationConstants.GET_USERS;
import static com.mastek.commons.util.ApplicationConstants.GET_WEEK;
import static com.mastek.commons.util.ApplicationConstants.GET_WEEKLY_CASH_SUMMARY;
import static com.mastek.commons.util.ApplicationConstants.RETRIEVE_BALANCE_TRANSACTIONS;
import static com.mastek.commons.util.ApplicationConstants.SAVE_BRANCH_WEEK_STATUS;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mastek.balancing.data.service.BalancingDAO;
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
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.ServiceException;

/**
 * The Class BalancingServiceImpl.
 */
@Component
public class BalancingServiceImpl implements BalancingService
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(BalancingServiceImpl.class);

	/** The balancing dao. */
	@Autowired
	BalancingDAO balancingDAO;

	/**
	 * Gets the week.
	 *
	 * @param criteriaDate the criteria date
	 * @param userId the user id
	 * @return the week
	 * @throws ServiceException the service exception
	 */
	@Override
	public List<WeekDO> getWeek(String criteriaDate, long userId) throws ServiceException
	{
		logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<WeekDO> weeks = new ArrayList<WeekDO>();
		try
		{
			weeks = balancingDAO.getWeek(criteriaDate, userId);
			logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_WEEK, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return weeks;
	}

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
	@Override
	public List<JourneySelectionDO> getJourney(long branchId, String startDate, String endDate,long userId) throws ServiceException
	{
		logger.info(GET_JOURNEY + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<JourneySelectionDO> journeys = new ArrayList<JourneySelectionDO>();
		try
		{
			journeys = balancingDAO.getJourney(branchId,startDate,endDate,userId);
			logger.info(GET_JOURNEY + DELIMITER + USER_ID + userId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_JOURNEY + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_JOURNEY, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return journeys;
	}

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
	@Override
	public List<UserSelectionDO> getUsers(long branchId, String startDate, String endDate, long userId) throws ServiceException
	{
		logger.info(GET_USERS + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<UserSelectionDO> users = new ArrayList<UserSelectionDO>();
		try
		{
			users = balancingDAO.getUsers(branchId,startDate,endDate,userId);
			logger.info(GET_USERS + DELIMITER + USER_ID + userId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_USERS + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_USERS, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		
		return users;
	}

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
	@Override
	public WeeklySummaryDO getWeeklyCashSummary(String startDate, String endDate, long journeyId, long userId, long loggedInUserId) throws ServiceException
	{
		logger.info(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		WeeklySummaryDO weeklySummaryDO;
		try
		{
			weeklySummaryDO = balancingDAO.getWeeklyCashSummary(startDate, endDate, journeyId, userId, loggedInUserId);
			logger.info(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + loggedInUserId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_WEEKLY_CASH_SUMMARY, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		
		return weeklySummaryDO;
	}

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
	@Override
	public List<RetrieveTransactionsDO> retrieveBalanceTransactions(String startDate, String endDate, long journeyId, long userId, String balanceTypeId, long loggedInUserId) throws ServiceException
	{

		logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		List<RetrieveTransactionsDO> transactions = new ArrayList<RetrieveTransactionsDO>();
		try
		{
			transactions = balancingDAO.retrieveBalanceTransactions(startDate, endDate, journeyId, userId, balanceTypeId, loggedInUserId);
			logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(RETRIEVE_BALANCE_TRANSACTIONS, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return transactions;
	
	}
	
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
	@Override
	public BranchWeekStatusDO getBranchWeekStatus(long branchId, int weekNo, int yearNo, long loggedInUserId) throws ServiceException
	{
		logger.info(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		BranchWeekStatusDO branchWeekStatusDO;
		try
		{
			branchWeekStatusDO = balancingDAO.getBranchWeekStatus(branchId, weekNo, yearNo, loggedInUserId);
			logger.info(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_BRANCH_WEEK_STATUS, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		
		return branchWeekStatusDO;
	}

	/**
	 * Gets the branch list.
	 *
	 * @param loggedInUserId the logged in user id
	 * @return the branch list
	 * @throws ServiceException the service exception
	 */
	@Override
	public List<BranchSelectionDO> getBranchList(long loggedInUserId) throws ServiceException
	{
		logger.info(GET_BRANCH_LIST + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		List<BranchSelectionDO> branchList = new ArrayList<BranchSelectionDO>();
		
		try
		{
			branchList = balancingDAO.getBranchList(loggedInUserId);
			logger.info(GET_BRANCH_LIST + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_BRANCH_LIST + DELIMITER + USER_ID + loggedInUserId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_BRANCH_LIST, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return branchList;
	}
	
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
	@Override
	public List<BranchBalanceReportDO> getBranchBalanceReportData(int weekNumber, int yearNumber, long branchId, long loggedInUserId) throws ServiceException
	{
		logger.info(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		List<BranchBalanceReportDO> branchReportData = new ArrayList<BranchBalanceReportDO>();
		
		try
		{
			branchReportData = balancingDAO.getBranchBalanceReportData(weekNumber, yearNumber, branchId, loggedInUserId);
			logger.info(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_BRANCH_BALANCE_REPORT_DATA, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return branchReportData;
	}

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
	@Override
	public List<JourneyBalanceReportDO> getJourneyBalanceReportData(int weekNumber, int yearNumber, long journeyId, long loggedInUserId) throws ServiceException
	{
		logger.info(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		List<JourneyBalanceReportDO> journeyReportData = new ArrayList<JourneyBalanceReportDO>();
		
		try
		{
			journeyReportData = balancingDAO.getJourneyBalanceReportData(weekNumber, yearNumber, journeyId, loggedInUserId);
			logger.info(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_JOURNEY_BALANCE_REPORT_DATA, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return journeyReportData;
	
	}

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
	@Override
	public boolean saveBranchWeekStatus(long branchId, int weekNumber, int yearNumber, int weekStatusId, long loggedInUserId) throws ServiceException
	{
		logger.info(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		boolean response;
		
		try
		{
			response = balancingDAO.saveBranchWeekStatus(branchId, weekNumber, yearNumber, weekStatusId, loggedInUserId);
			logger.info(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(SAVE_BRANCH_WEEK_STATUS, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return response;
	}

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
	@Override
	public JourneyBalanceReportDetailsDO getJourneyBalanceReportDataDetails(int weekNumber, int yearNumber, long journeyId, long loggedInUserId) throws ServiceException
	{
		logger.info(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		JourneyBalanceReportDetailsDO journeyBalanceReportDetailsDO; 
		try
		{
			journeyBalanceReportDetailsDO = balancingDAO.getJourneyBalanceReportDataDetails(weekNumber, yearNumber, journeyId, loggedInUserId);
			logger.info(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		return journeyBalanceReportDetailsDO;
	}

}
