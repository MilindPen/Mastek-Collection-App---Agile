package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;


/**
 * The Class AccessDO.
 */
public class AccessDO
{
	
	/** The user id. */
	@JsonProperty(value = "userId")
	long userId;
	
	/** The user type. */
	@JsonProperty(value = "userType")
	String userType;


	/**
	 * Gets the user id.
	 *
	 * @return the user id
	 */
	public long getUserId()
	{
		return userId;
	}

	/**
	 * Sets the user id.
	 *
	 * @param userId the user id
	 */
	public void setUserId(long userId)
	{
		this.userId = userId;
	}

	/**
	 * Gets the user type.
	 *
	 * @return the user type
	 */
	public String getUserType()
	{
		return userType;
	}

	/**
	 * Sets the user type.
	 *
	 * @param userType the user type
	 */
	public void setUserType(String userType)
	{
		this.userType = userType;
	}

}
