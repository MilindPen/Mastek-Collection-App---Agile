package com.mastek.balancing.rest.service;

import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_BRANCH_BALANCE_REPORT_DATA;
import static com.mastek.commons.util.ApplicationConstants.GET_BRANCH_WEEK_STATUS;
import static com.mastek.commons.util.ApplicationConstants.GET_JOURNEY;
import static com.mastek.commons.util.ApplicationConstants.GET_JOURNEY_BALANCE_REPORT_DATA;
import static com.mastek.commons.util.ApplicationConstants.GET_USERS;
import static com.mastek.commons.util.ApplicationConstants.GET_WEEK;
import static com.mastek.commons.util.ApplicationConstants.GET_WEEKLY_CASH_SUMMARY;
import static com.mastek.commons.util.ApplicationConstants.REQUEST;
import static com.mastek.commons.util.ApplicationConstants.RESPONSE;
import static com.mastek.commons.util.ApplicationConstants.RETRIEVE_BALANCE_TRANSACTIONS;
import static com.mastek.commons.util.ApplicationConstants.SAVE_BRANCH_WEEK_STATUS;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;

import java.util.List;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
import com.mastek.commons.exception.ApplicationException;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.util.CommonUtil;
import com.mastek.commons.util.PropertyResolver;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;

/**
 * The Class BalancingRESTImpl.
 */
@Api(value = "api/balancing", description = "This API is related to the Branch Balancing")
@Component
public class BalancingRESTImpl implements BalancingREST
{
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(BalancingRESTImpl.class);

	/** The balancing business delegate. */
	@Autowired
	BalancingBusinessDelegate balancingBusinessDelegate;

	/**
	 * Gets the week.
	 *
	 * @param weekSelectionRequest the week selection request
	 * @return the week
	 */
	@Override
	@Path("/sdtWeek")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get list of sdt weeks", response = WeekSelectionRequest.class, httpMethod = "POST")
	public WeekSelectionResponse getWeek(WeekSelectionRequest weekSelectionRequest)
	{

		WeekSelectionResponse response = new WeekSelectionResponse();

		logger.info(GET_WEEK + DELIMITER + USER_ID + weekSelectionRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_WEEK + DELIMITER + USER_ID + weekSelectionRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(weekSelectionRequest));

		List<WeekDO> weeks;
		List<BranchSelectionDO> branchList;
		
		try
		{
			String criteriaDate = weekSelectionRequest.getCriteriaDate();
			
			weeks = balancingBusinessDelegate.getWeek(criteriaDate, weekSelectionRequest.getAccess().getUserId());
			branchList = balancingBusinessDelegate.getBranchList(weekSelectionRequest.getAccess().getUserId());

			if(weeks != null && !weeks.isEmpty()){
				
				response.setErrorMessage(null);
				response.setErrorCode(null);
				response.setSuccess(true);
				response.setWeeks(weeks);
				response.setBranchList(branchList);
				
			}else{
				
				response.setSuccess(false);
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.WSE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(GET_WEEK + DELIMITER + USER_ID + weekSelectionRequest.getAccess().getUserId() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
				
			}

		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_WEEK + DELIMITER + USER_ID + weekSelectionRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_WEEK, se);
			return response;
		}
		logger.debug(GET_WEEK + DELIMITER + USER_ID + weekSelectionRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(GET_WEEK + DELIMITER + USER_ID + weekSelectionRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	
	}

	/**
	 * Gets the journey.
	 *
	 * @param journeySelectionRequest the journey selection request
	 * @return the journey
	 */
	@Override
	@Path("/journeys")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get list of journeys", response = JourneySelectionRequest.class, httpMethod = "POST")
	public JourneySelectionResponse getJourney(JourneySelectionRequest journeySelectionRequest)
	{

		JourneySelectionResponse response = new JourneySelectionResponse();

		logger.info(GET_JOURNEY + DELIMITER + USER_ID + journeySelectionRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_JOURNEY + DELIMITER + USER_ID + journeySelectionRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(journeySelectionRequest));

		List<JourneySelectionDO> journeys;
		try
		{
			journeys = balancingBusinessDelegate.getJourney(journeySelectionRequest.getBranchId(),journeySelectionRequest.getStartDate(),journeySelectionRequest.getEndDate(),journeySelectionRequest.getAccess().getUserId());

			if(journeys != null && !journeys.isEmpty()){
				
				response.setErrorMessage(null);
				response.setErrorCode(null);
				response.setSuccess(true);
				response.setJourneys(journeys);
				
			}else{
				
				response.setSuccess(false);
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.NJFE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(GET_JOURNEY + DELIMITER + USER_ID + journeySelectionRequest.getAccess().getUserId() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
				
			}

		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_JOURNEY + DELIMITER + USER_ID + journeySelectionRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_JOURNEY, se);
			return response;
		}
		logger.debug(GET_JOURNEY + DELIMITER + USER_ID + journeySelectionRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(GET_JOURNEY + DELIMITER + USER_ID + journeySelectionRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	
	}

	/**
	 * Gets the users.
	 *
	 * @param userSelectionRequest the user selection request
	 * @return the users
	 */
	@Override
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get list of users", response = UserSelectionRequest.class, httpMethod = "POST")
	public UserSelectionResponse getUsers(UserSelectionRequest userSelectionRequest)
	{
		UserSelectionResponse response = new UserSelectionResponse();

		logger.info(GET_USERS + DELIMITER + USER_ID + userSelectionRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_USERS + DELIMITER + USER_ID + userSelectionRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(userSelectionRequest));

		List<UserSelectionDO> users;
		try
		{
			users = balancingBusinessDelegate.getUsers(userSelectionRequest.getBranchId(),userSelectionRequest.getStartDate(),userSelectionRequest.getEndDate(),userSelectionRequest.getAccess().getUserId());

			if(users != null && !users.isEmpty()){
				
				response.setErrorMessage(null);
				response.setErrorCode(null);
				response.setSuccess(true);
				response.setUsers(users);
				
			}else{
				
				response.setSuccess(false);
				ApplicationException applicationException = new ApplicationException(ApplicationException.Type.NUFE);
				ServiceException serviceException = new ServiceException();
				serviceException.setApplicationException(applicationException);
				logger.debug(GET_USERS + DELIMITER + USER_ID + userSelectionRequest.getAccess().getUserId() + DELIMITER + applicationException.getType().getErrorCode() + DELIMITER + applicationException.getType().getMessage());
				throw serviceException;
			}

		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_USERS + DELIMITER + USER_ID + userSelectionRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_USERS, se);
			return response;
		}
		logger.debug(GET_USERS + DELIMITER + USER_ID + userSelectionRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(GET_USERS + DELIMITER + USER_ID + userSelectionRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	}

	/**
	 * Gets the weekly cash summary.
	 *
	 * @param weeklySummaryRequest the weekly summary request
	 * @return the weekly cash summary
	 */
	@Override
	@Path("/cashsummary")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Cash summary", response = WeeklySummaryRequest.class, httpMethod = "POST")
	public WeeklySummaryResponse getWeeklyCashSummary(WeeklySummaryRequest weeklySummaryRequest)
	{
		WeeklySummaryResponse response = new WeeklySummaryResponse();

		logger.info(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + weeklySummaryRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + weeklySummaryRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(weeklySummaryRequest));

		WeeklySummaryDO weeklySummaryDO;
		try
		{
			weeklySummaryDO = balancingBusinessDelegate.getWeeklyCashSummary(weeklySummaryRequest.getStartDate(), weeklySummaryRequest.getEndDate(), weeklySummaryRequest.getJourneyId(), weeklySummaryRequest.getUserId(), weeklySummaryRequest.getAccess().getUserId());

			if(weeklySummaryDO != null){
				response.setErrorMessage(null);
				response.setErrorCode(null);
				response.setSuccess(true);
				response.setWeeklySummaryDO(weeklySummaryDO);
			}
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + weeklySummaryRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_WEEKLY_CASH_SUMMARY, se);
			return response;
		}
		logger.debug(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + weeklySummaryRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(GET_WEEKLY_CASH_SUMMARY + DELIMITER + USER_ID + weeklySummaryRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	}

	/**
	 * Retrieve balance transactions.
	 *
	 * @param retrieveTransactionsRequest the retrieve transactions request
	 * @return the retrieve transactions response
	 */
	@Override
	@Path("/transactions")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get balance transactions", response = RetrieveTransactionsRequest.class, httpMethod = "POST")
	public RetrieveTransactionsResponse retrieveBalanceTransactions(RetrieveTransactionsRequest retrieveTransactionsRequest)
	{

		RetrieveTransactionsResponse response = new RetrieveTransactionsResponse();

		logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + retrieveTransactionsRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + retrieveTransactionsRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(retrieveTransactionsRequest));

		List<RetrieveTransactionsDO> transactions;
		try
		{
			transactions = balancingBusinessDelegate.retrieveBalanceTransactions(retrieveTransactionsRequest.getStartDate(), retrieveTransactionsRequest.getEndDate(), retrieveTransactionsRequest.getJourneyId(), retrieveTransactionsRequest.getJourneyUserId(), retrieveTransactionsRequest.getBalanceTypeId(), retrieveTransactionsRequest.getAccess().getUserId());
			response.setErrorMessage(null);
			response.setErrorCode(null);
			response.setSuccess(true);
			response.setTransactions(transactions);
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + retrieveTransactionsRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(RETRIEVE_BALANCE_TRANSACTIONS, se);
			return response;
		}
		logger.debug(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + retrieveTransactionsRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + retrieveTransactionsRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	
	}

	/**
	 * Gets the branch week status.
	 *
	 * @param branchWeekStatusRequest the branch week status request
	 * @return the branch week status
	 */
	@Override
	@Path("/week/status")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get branch week status", response = BranchWeekStatusRequest.class, httpMethod = "POST")
	public BranchWeekStatusResponse getBranchWeekStatus(BranchWeekStatusRequest branchWeekStatusRequest)
	{
		BranchWeekStatusResponse response = new BranchWeekStatusResponse();

		logger.info(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + branchWeekStatusRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + branchWeekStatusRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(branchWeekStatusRequest));

		BranchWeekStatusDO branchWeekStatus;
		try
		{
			branchWeekStatus = balancingBusinessDelegate.getBranchWeekStatus(branchWeekStatusRequest.getBranchId(), branchWeekStatusRequest.getWeekNumber(), branchWeekStatusRequest.getYearNumber(), branchWeekStatusRequest.getAccess().getUserId());

			if(branchWeekStatus != null){
				response.setErrorMessage(null);
				response.setErrorCode(null);
				response.setSuccess(true);
				response.setBranchWeekStatus(branchWeekStatus);
			}
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + branchWeekStatusRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_BRANCH_WEEK_STATUS, se);
			return response;
		}
		logger.debug(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + branchWeekStatusRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(GET_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + branchWeekStatusRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	}

	/**
	 * Gets the branch balance report data.
	 *
	 * @param branchBalanceReportRequest the branch balance report request
	 * @return the branch balance report data
	 */
	@Override
	@Path("/report/branch")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get branch balance report", response = BranchBalanceReportRequest.class, httpMethod = "POST")
	public BranchBalanceReportResponse getBranchBalanceReportData(BranchBalanceReportRequest branchBalanceReportRequest)
	{
		BranchBalanceReportResponse response = new BranchBalanceReportResponse();

		logger.info(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + branchBalanceReportRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + branchBalanceReportRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(branchBalanceReportRequest));

		List<BranchBalanceReportDO> branchReportData;
		try
		{
			branchReportData = balancingBusinessDelegate.getBranchBalanceReportData(branchBalanceReportRequest.getWeekNumber(), branchBalanceReportRequest.getYearNumber(), branchBalanceReportRequest.getBranchId(), branchBalanceReportRequest.getAccess().getUserId());
			response.setErrorMessage(null);
			response.setErrorCode(null);
			response.setSuccess(true);
			response.setBranchReportData(branchReportData);
			
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + branchBalanceReportRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_BRANCH_BALANCE_REPORT_DATA, se);
			return response;
		}
		logger.debug(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + branchBalanceReportRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(GET_BRANCH_BALANCE_REPORT_DATA + DELIMITER + USER_ID + branchBalanceReportRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	}

	/**
	 * Gets the journey balance report data.
	 *
	 * @param journeyBalanceReportRequest the journey balance report request
	 * @return the journey balance report data
	 */
	@Override
	@Path("/report/journey")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Get journey balance report", response = JourneyBalanceReportRequest.class, httpMethod = "POST")
	public JourneyBalanceReportResponse getJourneyBalanceReportData(JourneyBalanceReportRequest journeyBalanceReportRequest)
	{
		JourneyBalanceReportResponse response = new JourneyBalanceReportResponse();

		logger.info(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + journeyBalanceReportRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + journeyBalanceReportRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(journeyBalanceReportRequest));

		List<JourneyBalanceReportDO> journeyReportData;
		JourneyBalanceReportDetailsDO journeyBalanceReportDetailsDO;
		
		try
		{
			journeyReportData = balancingBusinessDelegate.getJourneyBalanceReportData(journeyBalanceReportRequest.getWeekNumber(), journeyBalanceReportRequest.getYearNumber(), journeyBalanceReportRequest.getJourneyId(), journeyBalanceReportRequest.getAccess().getUserId());
			journeyBalanceReportDetailsDO = balancingBusinessDelegate.getJourneyBalanceReportDataDetails(journeyBalanceReportRequest.getWeekNumber(), journeyBalanceReportRequest.getYearNumber(), journeyBalanceReportRequest.getJourneyId(), journeyBalanceReportRequest.getAccess().getUserId());
			response.setErrorMessage(null);
			response.setErrorCode(null);
			response.setSuccess(true);
			response.setJourneyReportData(journeyReportData);
			response.setJourneyBalanceReportDetails(journeyBalanceReportDetailsDO);
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + journeyBalanceReportRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_JOURNEY_BALANCE_REPORT_DATA, se);
			return response;
		}
		logger.debug(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + journeyBalanceReportRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(GET_JOURNEY_BALANCE_REPORT_DATA + DELIMITER + USER_ID + journeyBalanceReportRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	
	}

	/**
	 * Save branch week status.
	 *
	 * @param saveBranchWeekStatusRequest the save branch week status request
	 * @return the save branch week status response
	 */
	@Override
	@Path("/week/status/save")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Save branch week status", response = SaveBranchWeekStatusRequest.class, httpMethod = "POST")
	public SaveBranchWeekStatusResponse saveBranchWeekStatus(SaveBranchWeekStatusRequest saveBranchWeekStatusRequest)
	{
		SaveBranchWeekStatusResponse response = new SaveBranchWeekStatusResponse();
		
		logger.info(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + saveBranchWeekStatusRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + saveBranchWeekStatusRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(saveBranchWeekStatusRequest));
		try
		{
			response.setSuccess(balancingBusinessDelegate.saveBranchWeekStatus(saveBranchWeekStatusRequest.getBranchId(), saveBranchWeekStatusRequest.getWeekNumber(), saveBranchWeekStatusRequest.getYearNumber(), saveBranchWeekStatusRequest.getWeekStatusId(), saveBranchWeekStatusRequest.getAccess().getUserId()));
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + saveBranchWeekStatusRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(SAVE_BRANCH_WEEK_STATUS, se);
			return response;
		}
		logger.debug(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + saveBranchWeekStatusRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
		logger.info(SAVE_BRANCH_WEEK_STATUS + DELIMITER + USER_ID + saveBranchWeekStatusRequest.getAccess().getUserId() + DELIMITER + END);
		return response;
	}

}
