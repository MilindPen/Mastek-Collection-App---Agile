package com.mastek.security.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.UserDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class UserResponse.
 */
public class UserResponse extends BaseResponse
{
	
	/** The user. */
	@JsonProperty(value = "user")
	UserDO user;

	/**
	 * Gets the user.
	 *
	 * @return the user
	 */
	public UserDO getUser()
	{
		return user;
	}

	/**
	 * Sets the user.
	 *
	 * @param user the user
	 */
	public void setUser(UserDO user)
	{
		this.user = user;
	}

}
