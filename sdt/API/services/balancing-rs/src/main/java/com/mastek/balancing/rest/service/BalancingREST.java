package com.mastek.balancing.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;

/**
 * The Interface BalancingREST.
 */
@Component
@Path("api/balancing")
@Api(value = "api/balancing")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface BalancingREST
{
	
	/**
	 * Gets the week.
	 *
	 * @param weekSelectionRequest the week selection request
	 * @return the week
	 */
	@POST
	@Path("/sdtWeek")
	@ApiOperation(value = "getSDTWeek", notes = "Get list of sdt weeks")
	@ApiResponses(value = {})
	WeekSelectionResponse getWeek(@ApiParam(value = "Get list of sdt weeks", required = true) WeekSelectionRequest weekSelectionRequest);
	
	/**
	 * Gets the journey.
	 *
	 * @param journeySelectionRequest the journey selection request
	 * @return the journey
	 */
	@POST
	@Path("/journeys")
	@ApiOperation(value = "getJourneys", notes = "Get list of journeys")
	@ApiResponses(value = {})
	JourneySelectionResponse getJourney(@ApiParam(value = "Get list of journeys", required = true) JourneySelectionRequest journeySelectionRequest);
	
	/**
	 * Gets the users.
	 *
	 * @param userSelectionRequest the user selection request
	 * @return the users
	 */
	@POST
	@Path("/users")
	@ApiOperation(value = "getUsers", notes = "Get list of users")
	@ApiResponses(value = {})
	UserSelectionResponse getUsers(@ApiParam(value = "Get list of users", required = true )UserSelectionRequest userSelectionRequest);
	
	/**
	 * Gets the weekly cash summary.
	 *
	 * @param weeklySummaryRequest the weekly summary request
	 * @return the weekly cash summary
	 */
	@POST
	@Path("/cashsummary")
	@ApiOperation(value = "cashsummary", notes = "Cash summary")
	@ApiResponses(value = {})
	WeeklySummaryResponse getWeeklyCashSummary(@ApiParam(value = "Cash summary", required = true )WeeklySummaryRequest weeklySummaryRequest);
	
	/**
	 * Retrieve balance transactions.
	 *
	 * @param retrieveTransactionsRequest the retrieve transactions request
	 * @return the retrieve transactions response
	 */
	@POST
	@Path("/transactions")
	@ApiOperation(value = "transactions", notes = "Get balance transactions")
	@ApiResponses(value = {})
	RetrieveTransactionsResponse retrieveBalanceTransactions(@ApiParam(value = "Get balance transactions", required = true )RetrieveTransactionsRequest retrieveTransactionsRequest);
	
	/**
	 * Gets the branch week status.
	 *
	 * @param branchWeekStatusRequest the branch week status request
	 * @return the branch week status
	 */
	@POST
	@Path("/week/status")
	@ApiOperation(value = "getBranchWeekStatus", notes = "Get branch week status")
	@ApiResponses(value = {})
	BranchWeekStatusResponse getBranchWeekStatus(@ApiParam(value = "Get branch week status", required = true )BranchWeekStatusRequest branchWeekStatusRequest);
	
	/**
	 * Gets the branch balance report data.
	 *
	 * @param branchBalanceReportRequest the branch balance report request
	 * @return the branch balance report data
	 */
	@POST
	@Path("/report/branch")
	@ApiOperation(value = "getBranchBalanceReportData", notes = "Get branch balance report")
	@ApiResponses(value = {})
	BranchBalanceReportResponse getBranchBalanceReportData(@ApiParam(value = "Get branch balance report", required = true )BranchBalanceReportRequest branchBalanceReportRequest);
		
	/**
	 * Gets the journey balance report data.
	 *
	 * @param journeyBalanceReportRequest the journey balance report request
	 * @return the journey balance report data
	 */
	@POST
	@Path("/report/journey")
	@ApiOperation(value = "getJourneyBalanceReportData", notes = "Get journey balance report")
	@ApiResponses(value = {})
	JourneyBalanceReportResponse getJourneyBalanceReportData(@ApiParam(value = "Get journey balance report", required = true )JourneyBalanceReportRequest journeyBalanceReportRequest);
	
	/**
	 * Save branch week status.
	 *
	 * @param saveBranchWeekStatusRequest the save branch week status request
	 * @return the save branch week status response
	 */
	@POST
	@Path("/week/status/save")
	@ApiOperation(value = "saveBranchWeekStatus", notes = "Save branch week status")
	@ApiResponses(value = {})
	SaveBranchWeekStatusResponse saveBranchWeekStatus(@ApiParam(value = "Save branch week status", required = true )SaveBranchWeekStatusRequest saveBranchWeekStatusRequest);
}
