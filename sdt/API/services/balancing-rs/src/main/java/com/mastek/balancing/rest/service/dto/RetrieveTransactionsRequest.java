package com.mastek.balancing.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.rest.service.dto.BaseRequest;

/**
 * The Class RetrieveTransactionsRequest.
 */
public class RetrieveTransactionsRequest extends BaseRequest
{

	/** The journey user Id. */
	@JsonProperty(value = "journeyUserId")
	long journeyUserId;

	/** The journey id. */
	@JsonProperty(value = "journeyId")
	long journeyId;
	
	/** The start date. */
	@JsonProperty(value = "startDate")
	String startDate;

	/** The end date. */
	@JsonProperty(value = "endDate")
	String endDate;
	
	/** The balance Type Id. */
	@JsonProperty(value = "balanceTypeId")
	String balanceTypeId;

	/**
	 * Gets the journey user id.
	 *
	 * @return the journey user id
	 */
	public long getJourneyUserId()
	{
		return journeyUserId;
	}

	/**
	 * Sets the journey user id.
	 *
	 * @param journeyUserId the journey user id
	 */
	public void setJourneyUserId(long journeyUserId)
	{
		this.journeyUserId = journeyUserId;
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
	 * Gets the balance type id.
	 *
	 * @return the balance type id
	 */
	public String getBalanceTypeId()
	{
		return balanceTypeId;
	}

	/**
	 * Sets the balance type id.
	 *
	 * @param balanceTypeId the balance type id
	 */
	public void setBalanceTypeId(String balanceTypeId)
	{
		this.balanceTypeId = balanceTypeId;
	}
}
