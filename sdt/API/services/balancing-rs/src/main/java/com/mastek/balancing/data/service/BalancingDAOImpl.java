package com.mastek.balancing.data.service;

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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mastek.commons.data.dao.impl.AbstractDAO;
import com.mastek.commons.data.entity.VWBranchDetails;
import com.mastek.commons.data.entity.VWBranchWeekDetails;
import com.mastek.commons.data.entity.VWCashSummary;
import com.mastek.commons.data.entity.VWJourneySelection;
import com.mastek.commons.data.entity.VWUserSelection;
import com.mastek.commons.data.entity.VWWeekEnding;
import com.mastek.commons.domain.BranchBalanceReportDO;
import com.mastek.commons.domain.BranchSelectionDO;
import com.mastek.commons.domain.BranchWeekStatusDO;
import com.mastek.commons.domain.JourneyBalanceReportDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDataDO;
import com.mastek.commons.domain.JourneySelectionDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.UserSelectionDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.domain.WeeklySummaryDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.commons.util.CommonUtil;
import com.mastek.commons.util.PropertyResolver;

import ma.glasnost.orika.MapperFacade;

/**
 * The Class BalancingDAOImpl.
 */
@Repository
public class BalancingDAOImpl extends AbstractDAO implements BalancingDAO
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(BalancingDAOImpl.class);

	/** The mapper facade. */
	@Autowired
	private MapperFacade mapperFacade;

	/**
	 * Gets the week.
	 *
	 * @param criteriaDate the criteria date
	 * @param userId the user id
	 * @return the week
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<WeekDO> getWeek(String criteriaDate, long userId) throws DataStoreException
	{
		logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<WeekDO> weeks = new ArrayList<WeekDO>();
		try
		{
			Date date = new Date();
			if (criteriaDate == null)
				criteriaDate = CommonUtil.getFormattedDate(date, CommonUtil.DATE_FORMAT);

			date = CommonUtil.getDate(criteriaDate, CommonUtil.DATE_FORMAT);
			int no_previous_weeks = Integer.parseInt(PropertyResolver.getAppProperty("sdt.week.select.no_of_previous_weeks"));
			int previous_weeks = -(no_previous_weeks * 7);
			Query query = openSession().getNamedQuery("VWWeekEnding.getWeekList");

			query.setParameter(0, previous_weeks);
			query.setParameter(1, date);
			query.setParameter(2, previous_weeks);
			List<VWWeekEnding> weekEndings = query.list();

			logger.debug("Sdt week list size | " + weekEndings.size());

			WeekDO weekDO;
			for (VWWeekEnding week : weekEndings)
			{
				weekDO = mapperFacade.map(week, WeekDO.class);
				weeks.add(weekDO);
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_WEEK, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_WEEK, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_WEEK, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}
		logger.info(GET_WEEK + DELIMITER + USER_ID + userId + DELIMITER + END);

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
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<JourneySelectionDO> getJourney(long branchId, String startDate, String endDate, long userId) throws DataStoreException
	{
		logger.info(GET_JOURNEY + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<JourneySelectionDO> journeys = new ArrayList<JourneySelectionDO>();
		try
		{
			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query;
			if (branchId == 0)
			{
				query = openSession().getNamedQuery("VWJourneySelection.getJourneyAll");
				query.setDate("fromDate", fromDate);
				query.setDate("toDate", toDate);
			}
			else
			{
				query = openSession().getNamedQuery("VWJourneySelection.getJourney");
				query.setDate("fromDate", fromDate);
				query.setDate("toDate", toDate);
				query.setLong("branchId", branchId);
			}
			List<VWJourneySelection> journeyList = query.list();
			logger.debug("Journey list size | " + journeyList.size());

			JourneySelectionDO journeySelectionDO;
			for (VWJourneySelection journeySelection : journeyList)
			{
				journeySelectionDO = mapperFacade.map(journeySelection, JourneySelectionDO.class);
				journeys.add(journeySelectionDO);
			}

		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_JOURNEY + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_JOURNEY, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_JOURNEY + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_JOURNEY, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_JOURNEY + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_JOURNEY, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_JOURNEY + DELIMITER + USER_ID + userId + DELIMITER + END);

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
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<UserSelectionDO> getUsers(long branchId, String startDate, String endDate, long userId) throws DataStoreException
	{
		logger.info(GET_USERS + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<UserSelectionDO> users = new ArrayList<UserSelectionDO>();
		try
		{
			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query;
			if (branchId == 0)
			{
				query = openSession().getNamedQuery("VWUserSelection.getUsersAll");
				query.setDate("fromDate", fromDate);
				query.setDate("toDate", toDate);
			}
			else
			{
				query = openSession().getNamedQuery("VWUserSelection.getUsers");
				query.setDate("fromDate", fromDate);
				query.setDate("toDate", toDate);
				query.setLong("branchId", branchId);
			}

			List<VWUserSelection> userList = query.list();
			logger.debug("User list size | " + userList.size());

			UserSelectionDO userSelectionDO;
			for (VWUserSelection userSelection : userList)
			{
				userSelectionDO = mapperFacade.map(userSelection, UserSelectionDO.class);
				users.add(userSelectionDO);
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_USERS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_USERS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_USERS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_USERS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_USERS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_USERS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_USERS + DELIMITER + USER_ID + userId + DELIMITER + END);

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
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public WeeklySummaryDO getWeeklyCashSummary(String startDate, String endDate, long journeyId, long userId, long loggedInUserId) throws DataStoreException
	{
		logger.info(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		WeeklySummaryDO weeklySummaryDO = new WeeklySummaryDO();
		try
		{
			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query = openSession().getNamedQuery("VWCashSummary.getSummary");
			query.setDate("fromDate", fromDate);
			query.setDate("toDate", toDate);
			query.setLong("userId", userId);
			query.setLong("journeyId", journeyId);

			List<Object[]> summaryList = query.list();

			logger.debug("Summary list size | " + summaryList.size());

			double collections = 0;
			for (Object[] obj : summaryList)
			{
				String balanceTypeId = (String) obj[0];
				Double amount = (Double) obj[2];

				switch(balanceTypeId)
				{
					case "B":
						weeklySummaryDO.setCashBanked(amount);
						break;
					case "F":
						weeklySummaryDO.setFloatWithdrawn(amount);
						break;
					case "L":
						weeklySummaryDO.setLoansIssued(amount);
						break;
					case "O":
						weeklySummaryDO.setRaf(amount);
						break;
					case "C":
						collections = collections + amount;
						break;
					case "1":
						collections = collections + amount;
						break;
					case "5":
						collections = collections + amount;
						break;
					default:
						break;
				}
				weeklySummaryDO.setCollections(collections);
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_WEEKLY_CASH_SUMMARY, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_WEEKLY_CASH_SUMMARY, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_WEEKLY_CASH_SUMMARY, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
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
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<RetrieveTransactionsDO> retrieveBalanceTransactions(String startDate, String endDate, long journeyId, long userId, String balanceTypeId, long loggedInUserId) throws DataStoreException
	{

		logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		List<RetrieveTransactionsDO> transactions = new ArrayList<RetrieveTransactionsDO>();
		try
		{
			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			List<String> balanceTypeIdList = new ArrayList<>();
			balanceTypeIdList.add(balanceTypeId);

			Query query = openSession().getNamedQuery("VWCashSummary.getTransactions");
			query.setDate("fromDate", fromDate);
			query.setDate("toDate", toDate);
			query.setLong("userId", userId);
			query.setLong("journeyId", journeyId);
			query.setParameterList("balanceTypeIds", balanceTypeIdList);

			List<VWCashSummary> transactionList = query.list();

			RetrieveTransactionsDO retrieveTransactionsDO;
			for (VWCashSummary transaction : transactionList)
			{
				retrieveTransactionsDO = mapperFacade.map(transaction, RetrieveTransactionsDO.class);
				transactions.add(retrieveTransactionsDO);
			}

		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);

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
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public BranchWeekStatusDO getBranchWeekStatus(long branchId, int weekNo, int yearNo, long loggedInUserId) throws DataStoreException
	{
		logger.info(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		BranchWeekStatusDO branchWeekStatusDO;
		try
		{
			Query query = openSession().getNamedQuery("VWBranchWeekDetails.getStatus");
			query.setLong("branchId", branchId);
			query.setInteger("weekNo", weekNo);
			query.setInteger("yearNo", yearNo);
			VWBranchWeekDetails branchWeekDetails = (VWBranchWeekDetails) query.uniqueResult();
			branchWeekStatusDO = mapperFacade.map(branchWeekDetails, BranchWeekStatusDO.class);

			if (branchWeekStatusDO == null)
			{
				branchWeekStatusDO = new BranchWeekStatusDO();
				branchWeekStatusDO.setBranchId(branchId);
				branchWeekStatusDO.setWeekNo(weekNo);
				branchWeekStatusDO.setYearNo(yearNo);
				branchWeekStatusDO.setWeekStatusId(Integer.parseInt(PropertyResolver.getAppProperty("sdt.branch.week_status_id")));
				branchWeekStatusDO.setWeekStatusDesc(PropertyResolver.getAppProperty("sdt.branch.week_status_desc"));
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_BRANCH_WEEK_STATUS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_BRANCH_WEEK_STATUS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_BRANCH_WEEK_STATUS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		return branchWeekStatusDO;
	}

	/**
	 * Gets the branch list.
	 *
	 * @param loggedInUserId the logged in user id
	 * @return the branch list
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<BranchSelectionDO> getBranchList(long loggedInUserId) throws DataStoreException
	{
		logger.info(GET_BRANCH_LIST + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		List<BranchSelectionDO> branchList = new ArrayList<BranchSelectionDO>();

		try
		{
			Query query = openSession().getNamedQuery("VWBranchDetails.getBranch");
			List<VWBranchDetails> branchL = query.list();

			BranchSelectionDO branchSelectionDO;
			for (VWBranchDetails branchDetails : branchL)
			{
				branchSelectionDO = mapperFacade.map(branchDetails, BranchSelectionDO.class);
				branchList.add(branchSelectionDO);
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_BRANCH_LIST + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_BRANCH_LIST, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_BRANCH_LIST + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_BRANCH_LIST, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_BRANCH_LIST + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_BRANCH_LIST, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_BRANCH_LIST + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);

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
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<BranchBalanceReportDO> getBranchBalanceReportData(int weekNumber, int yearNumber, long branchId, long loggedInUserId) throws DataStoreException
	{
		logger.info(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		List<BranchBalanceReportDO> branchReportData = new ArrayList<BranchBalanceReportDO>();

		try
		{
			Query query = openSession().createSQLQuery("EXEC [mobile].[AP_S_BranchBalanceReportData] " + branchId + "," + yearNumber + "," + weekNumber);
			List<Object[]> result = (List<Object[]>) query.list();

			if (result != null)
			{
				logger.debug("Branch report data size | " + result.size());

				BranchBalanceReportDO branchBalanceReportDO;
				for (Object[] res : result)
				{
					if (res.length > 2)
					{
						branchBalanceReportDO = new BranchBalanceReportDO();
						branchBalanceReportDO.setBranchId((Integer) res[0]);
						branchBalanceReportDO.setJourneyId((Integer) res[1]);
						branchBalanceReportDO.setJourneyDesc((String) res[2]);
						branchBalanceReportDO.setUserId((Integer) res[3]);
						branchBalanceReportDO.setFirstName((String) res[4]);
						branchBalanceReportDO.setLastName((String) res[5]);
						branchBalanceReportDO.setYearNumber((Integer) res[6]);
						branchBalanceReportDO.setWeekNumber((Integer) res[7]);

						branchBalanceReportDO.setDeclaredCash(nullChk(res[8]));
						branchBalanceReportDO.setDeclaredCashBanked(nullChk(res[9]));
						branchBalanceReportDO.setDeclaredFloat(nullChk(res[10]));
						branchBalanceReportDO.setDeclaredLoans(nullChk(res[11]));
						branchBalanceReportDO.setDeclaredRaf(nullChk(res[12]));
						branchBalanceReportDO.setDeclaredShort(nullChk(res[13]));

						branchBalanceReportDO.setActualCash(nullChk(res[14]));
						branchBalanceReportDO.setActualCard(nullChk(res[15]));
						branchBalanceReportDO.setActualCentral(nullChk(res[16]));
						branchBalanceReportDO.setActualCashBanked(nullChk(res[17]));
						branchBalanceReportDO.setActualFloat(nullChk(res[18]));
						branchBalanceReportDO.setActualLoans(nullChk(res[19]));
						branchBalanceReportDO.setActualShort(nullChk(res[20]));
						branchBalanceReportDO.setContactNumber(res[21] != null?(String)res[21]:null);
						branchReportData.add(branchBalanceReportDO);
					}
					else
					{
						String errCode = (String) res[0];
						String errMsg = (String) res[1];
						if (errCode.equals("ERR-154"))
						{
							SystemException systemException = new SystemException(SystemException.Type.BBSP);
							logger.error(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + errCode + DELIMITER + errMsg);
							throw systemException;
						}
					}
				}
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_BRANCH_BALANCE_REPORT_DATA, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_BRANCH_BALANCE_REPORT_DATA, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_BRANCH_BALANCE_REPORT_DATA, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		return branchReportData;
	}

	private Double nullChk(Object obj)
	{
		if (obj != null)
		{
			return ((BigDecimal) obj).doubleValue();
		}
		else
		{
			return null;
		}
	}

	/**
	 * Gets the journey balance report data.
	 *
	 * @param weekNumber the week number
	 * @param yearNumber the year number
	 * @param journeyId the journey id
	 * @param loggedInUserId the logged in user id
	 * @return the journey balance report data
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<JourneyBalanceReportDO> getJourneyBalanceReportData(int weekNumber, int yearNumber, long journeyId, long loggedInUserId) throws DataStoreException
	{
		logger.info(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		List<JourneyBalanceReportDO> journeyReportData = new ArrayList<JourneyBalanceReportDO>();

		try
		{
			Query query = openSession().createSQLQuery("EXEC [mobile].[AP_S_JourneyBalanceReportData] " + journeyId + "," + yearNumber + "," + weekNumber);
			List<Object[]> result = (List<Object[]>) query.list();

			if (result != null)
			{
				logger.debug("Journey report data size | " + result.size());

				JourneyBalanceReportDO journeyBalanceReportDO;
				for (Object[] res : result)
				{
					if (res.length > 2)
					{
						journeyBalanceReportDO = new JourneyBalanceReportDO();
						journeyBalanceReportDO.setUserId((Integer) res[0]);
						journeyBalanceReportDO.setIsPrimaryUser((Boolean) res[1]);
						journeyBalanceReportDO.setJourneyId((Integer) res[2]);
						journeyBalanceReportDO.setJourneyDesc((String) res[3]);
						journeyBalanceReportDO.setFirstName((String) res[4]);
						journeyBalanceReportDO.setLastName((String) res[5]);
						journeyBalanceReportDO.setYearNumber((Integer) res[6]);
						journeyBalanceReportDO.setWeekNumber((Integer) res[7]);

						journeyBalanceReportDO.setDeclaredCash(nullChk(res[8]));
						journeyBalanceReportDO.setDeclaredCashBanked(nullChk(res[9]));
						journeyBalanceReportDO.setDeclaredFloat(nullChk(res[10]));
						journeyBalanceReportDO.setDeclaredLoans(nullChk(res[11]));
						journeyBalanceReportDO.setDeclaredRaf(nullChk(res[12]));
						journeyBalanceReportDO.setDeclaredShortsAndOvers(nullChk(res[13]));

						journeyBalanceReportDO.setActualCash(nullChk(res[14]));
						journeyBalanceReportDO.setActualCard(nullChk(res[15]));
						journeyBalanceReportDO.setActualCentral(nullChk(res[16]));
						journeyBalanceReportDO.setActualCashBanked(nullChk(res[17]));
						journeyBalanceReportDO.setActualFloat(nullChk(res[18]));
						journeyBalanceReportDO.setActualLoans(nullChk(res[19]));
						journeyBalanceReportDO.setActualShortsAndOvers(nullChk(res[20]));
						journeyReportData.add(journeyBalanceReportDO);
					}
					else
					{
						String errCode = (String) res[0];
						String errMsg = (String) res[1];
						if (errCode.equals("ERR-155"))
						{
							SystemException systemException = new SystemException(SystemException.Type.JBSP);
							logger.error(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + errCode + DELIMITER + errMsg);
							throw systemException;
						}
					}
				}
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
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
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public boolean saveBranchWeekStatus(long branchId, int weekNumber, int yearNumber, int weekStatusId, long loggedInUserId) throws DataStoreException
	{
		logger.info(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		boolean isSuccess = false;

		try
		{
			Query query = openSession().createSQLQuery("Declare @IsSyncDone int,@ErrorCode varchar(10),@ErrorMessage varchar(4000) Exec [mobile].[AP_I_BranchClosedWeekDetails] " + loggedInUserId + "," + yearNumber + "," + weekNumber + "," + branchId + "," + loggedInUserId + "," + weekStatusId + ",@IsSyncDone OUTPUT,@ErrorCode OUTPUT,@ErrorMessage OUTPUT Select @IsSyncDone result,@ErrorCode errCode,@ErrorMessage errMsg");
			Object[] result = (Object[]) query.uniqueResult();
			Integer syncDone = (Integer) result[0];
			if (syncDone != null && syncDone == 0)
			{
				String errCode = (String) result[1];
				String errMsg = (String) result[2];
				
				if (errCode.equals("ERR-153"))
				{
					SystemException systemException = new SystemException(SystemException.Type.CBFWSP);
					logger.error(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + errCode + DELIMITER + errMsg);
					throw systemException;
				}
			}
			else if (syncDone != null && syncDone == 1)
			{
				isSuccess = true;
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(SAVE_BRANCH_WEEK_STATUS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(SAVE_BRANCH_WEEK_STATUS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(SAVE_BRANCH_WEEK_STATUS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		return isSuccess;
	}

	/**
	 * Gets the journey balance report data details.
	 *
	 * @param weekNumber the week number
	 * @param yearNumber the year number
	 * @param journeyId the journey id
	 * @param loggedInUserId the logged in user id
	 * @return the journey balance report data details
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public JourneyBalanceReportDetailsDO getJourneyBalanceReportDataDetails(int weekNumber, int yearNumber, long journeyId, long loggedInUserId) throws DataStoreException
	{
		logger.info(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + START);
		JourneyBalanceReportDetailsDO journeyBalanceReportDetailsDO = new JourneyBalanceReportDetailsDO();

		try
		{
			Query query = openSession().createSQLQuery("EXEC [mobile].[AP_S_JourneyBalanceReportDetailsData] " + journeyId + "," + yearNumber + "," + weekNumber);
			List<Object[]> result = (List<Object[]>) query.list();

			if (result != null)
			{
				logger.debug("Journey report data details size | " + result.size());

				JourneyBalanceReportDetailsDataDO journeyBalanceReportDetailsDataDO;
				for (Object[] res : result)
				{
					if (res.length > 2)
					{
						journeyBalanceReportDetailsDataDO = new JourneyBalanceReportDetailsDataDO();
						journeyBalanceReportDetailsDataDO.setFirstName((String) res[0]);
						journeyBalanceReportDetailsDataDO.setLastName((String) res[1]);
						journeyBalanceReportDetailsDataDO.setUserId((Integer) res[2]);
						journeyBalanceReportDetailsDataDO.setIsPrimaryUser((Boolean) res[3]);
						journeyBalanceReportDetailsDataDO.setJourneyId((Integer) res[4]);
						journeyBalanceReportDetailsDataDO.setWeekNumber((Integer) res[5]);
						journeyBalanceReportDetailsDataDO.setYearNumber((Integer) res[6]);
						journeyBalanceReportDetailsDataDO.setBalanceType((String) res[7]);
						journeyBalanceReportDetailsDataDO.setReference((String) res[8]);
						journeyBalanceReportDetailsDataDO.setChequeIndicator((Boolean) res[9]);
						journeyBalanceReportDetailsDataDO.setBalanceDate((java.sql.Date) res[10]);
						journeyBalanceReportDetailsDataDO.setAmount(nullChk(res[11]));

						String balanceType = (String) res[7];
						switch(balanceType)
						{
							case "D-C-Cash":
								journeyBalanceReportDetailsDO.getDeclaredCollections().add(journeyBalanceReportDetailsDataDO);
								break;
							case "A-C-Cash":
								journeyBalanceReportDetailsDO.getActualCollections().add(journeyBalanceReportDetailsDataDO);
								break;
							case "D-F-Float":
								journeyBalanceReportDetailsDO.getDeclaredFloats().add(journeyBalanceReportDetailsDataDO);
								break;
							case "A-F-Float":
								journeyBalanceReportDetailsDO.getActualFloats().add(journeyBalanceReportDetailsDataDO);
								break;
							case "D-L-Loans":
								journeyBalanceReportDetailsDO.getDeclaredLoans().add(journeyBalanceReportDetailsDataDO);
								break;
							case "A-L-Loans":
								journeyBalanceReportDetailsDO.getActualLoans().add(journeyBalanceReportDetailsDataDO);
								break;
							case "D-B-Cash Banked":
								journeyBalanceReportDetailsDO.getDeclaredCashBanked().add(journeyBalanceReportDetailsDataDO);
								break;
							case "A-B-Cash Banked":
								journeyBalanceReportDetailsDO.getActualCashBanked().add(journeyBalanceReportDetailsDataDO);
								break;
							case "D-O-Others/RAC":
								journeyBalanceReportDetailsDO.getDeclaredRaf().add(journeyBalanceReportDetailsDataDO);
								break;
							default:
						}
					}
					else
					{
						String errCode = (String) res[0];
						String errMsg = (String) res[1];
						if (errCode.equals("ERR-156"))
						{
							SystemException systemException = new SystemException(SystemException.Type.JBDSP);
							logger.error(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + errCode + DELIMITER + errMsg);
							throw systemException;
						}
					}
				}
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_JOURNEY_BALANCE_REPORT_DATA_DETAILS + DELIMITER + USER_ID + loggedInUserId + DELIMITER + END);
		return journeyBalanceReportDetailsDO;
	}

}
