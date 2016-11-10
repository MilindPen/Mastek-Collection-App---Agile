package com.mastek.commons.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class BaseResponse.
 */
public abstract class BaseResponse
{

	/** The success. */
	@JsonProperty(value = "success")
	boolean success;

	/** The error message. */
	@JsonProperty(value = "errorMessage")
	String errorMessage;

	/** The error code. */
	@JsonProperty(value = "errorCode")
	String errorCode;

	/**
	 * Checks if is success.
	 *
	 * @return true, if is success
	 */
	public boolean isSuccess()
	{
		return success;
	}

	/**
	 * Sets the success.
	 *
	 * @param success the success
	 */
	public void setSuccess(boolean success)
	{
		this.success = success;
	}

	/**
	 * Gets the error message.
	 *
	 * @return the error message
	 */
	public String getErrorMessage()
	{
		return errorMessage;
	}

	/**
	 * Sets the error message.
	 *
	 * @param errorMessage the error message
	 */
	public void setErrorMessage(String errorMessage)
	{
		this.errorMessage = errorMessage;
	}

	/**
	 * Gets the error code.
	 *
	 * @return the error code
	 */
	public String getErrorCode()
	{
		return errorCode;
	}

	/**
	 * Sets the error code.
	 *
	 * @param errorCode the error code
	 */
	public void setErrorCode(String errorCode)
	{
		this.errorCode = errorCode;
	}

}
