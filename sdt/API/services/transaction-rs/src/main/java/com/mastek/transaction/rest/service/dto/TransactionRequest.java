package com.mastek.transaction.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.rest.service.dto.BaseRequest;

/**
 * The Class TransactionRequest.
 */
public class TransactionRequest extends BaseRequest
{
	/** The start date. */
	@JsonProperty(value = "startDate")
	String startDate;

	/** The end date. */
	@JsonProperty(value = "endDate")
	String endDate;
	
	/** The journey id. */
	@JsonProperty(value = "journeyId")
	long journeyId;

	/**
	 * Gets the start date.
	 *
	 * @return the start date
	 */
	public String getStartDate()
	{
		return startDate;
	}

	/**
	 * Sets the start date.
	 *
	 * @param startDate the start date
	 */
	public void setStartDate(String startDate)
	{
		this.startDate = startDate;
	}

	/**
	 * Gets the end date.
	 *
	 * @return the end date
	 */
	public String getEndDate()
	{
		return endDate;
	}

	/**
	 * Sets the end date.
	 *
	 * @param endDate the end date
	 */
	public void setEndDate(String endDate)
	{
		this.endDate = endDate;
	}

	/**
	 * Gets the journey id.
	 *
	 * @return the journey id
	 */
	public long getJourneyId()
	{
		return journeyId;
	}

	/**
	 * Sets the journey id.
	 *
	 * @param journeyId the journey id
	 */
	public void setJourneyId(long journeyId)
	{
		this.journeyId = journeyId;
	}

}
