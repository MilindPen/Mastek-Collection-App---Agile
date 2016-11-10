package com.mastek.security.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class UserRequest.
 */
public class UserRequest 
{
	
	/** The email id. */
	@JsonProperty(value = "email")
	String email;

	/**
	 * Gets the email.
	 *
	 * @return the email
	 */
	public String getEmail()
	{
		return email;
	}

	/**
	 * Sets the email.
	 *
	 * @param email the email
	 */
	public void setEmail(String email)
	{
		this.email = email;
	}

}
