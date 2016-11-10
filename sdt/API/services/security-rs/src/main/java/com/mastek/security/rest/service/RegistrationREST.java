package com.mastek.security.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.mastek.security.rest.service.dto.UserRegistrationRequest;
import com.mastek.security.rest.service.dto.UserRegistrationResponse;
import com.mastek.security.rest.service.dto.UserRequest;
import com.mastek.security.rest.service.dto.UserResponse;
import com.mastek.security.rest.service.dto.UserVerificationRequest;
import com.mastek.security.rest.service.dto.UserVerificationResponse;
import com.mastek.security.rest.service.dto.WeekRequest;
import com.mastek.security.rest.service.dto.WeekResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;

/**
 * The Interface RegistrationREST.
 */
@Component
@Path("api/security")
@Api(value = "api/security")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface RegistrationREST
{

	/**
	 * Verify user.
	 *
	 * @param userVerificationRequest the user verification request
	 * @return the user verification response
	 */
	@POST
	@Path("/user/verification")
	@ApiOperation(value = "verifyUser", notes = "Verify an existing user")
	@ApiResponses(value = {})
	UserVerificationResponse verifyUser(@ApiParam(value = "Verify an existing user", required = true) UserVerificationRequest userVerificationRequest);

	/**
	 * Register user.
	 *
	 * @param userRegistrationRequest the user registration request
	 * @return the user registration response
	 */
	@POST
	@Path("/user/registration")
	@ApiOperation(value = "registerUser", notes = "Register a new user")
	@ApiResponses(value = {})
	UserRegistrationResponse registerUser(@ApiParam(value = "Register a new user", required = true) UserRegistrationRequest userRegistrationRequest);

	/**
	 * Gets the week.
	 *
	 * @param sdtWeekRequest the sdt week request
	 * @return the week
	 */
	@POST
	@Path("/sdtWeek")
	@ApiOperation(value = "getSDTWeek", notes = "Get current sdt week")
	@ApiResponses(value = {})
	WeekResponse getWeek(@ApiParam(value = "Get current SDT week", required = true) WeekRequest sdtWeekRequest);

	/**
	 * Gets the user by email.
	 *
	 * @param userRequest the user request
	 * @return the user by email
	 */
	@POST
	@Path("/user")
	@ApiOperation(value = "getUserByEmail", notes = "Get user by email")
	@ApiResponses(value = {})
	UserResponse getUserByEmail(UserRequest userRequest);
}
