package com.mastek.transaction.rest.service.dto;
import org.codehaus.jackson.annotate.JsonProperty;
import com.mastek.commons.rest.service.dto.BaseRequest;
public class TransactionHistoryRequest extends BaseRequest
{
	/** The start date. */
	@JsonProperty(value = "startDate")
	String startDate;

	/** The end date. */
	@JsonProperty(value = "endDate")
	String endDate;
	
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

}
