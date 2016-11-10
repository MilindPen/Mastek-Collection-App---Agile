package com.mastek.balancing.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.rest.service.dto.BaseRequest;

/**
 * The Class BranchWeekStatusRequest.
 */
public class BranchWeekStatusRequest extends BaseRequest
{
	
	/** The branch id. */
	@JsonProperty(value = "branchId")
	long branchId;
	
	/** The week no. */
	@JsonProperty(value = "weekNumber")
	int weekNumber;
	
	/** The year no. */
	@JsonProperty(value = "yearNumber")
	int yearNumber;

	/**
	 * Gets the branch id.
	 *
	 * @return the branch id
	 */
	public long getBranchId()
	{
		return branchId;
	}

	/**
	 * Sets the branch id.
	 *
	 * @param branchId the branch id
	 */
	public void setBranchId(long branchId)
	{
		this.branchId = branchId;
	}

	public int getWeekNumber()
	{
		return weekNumber;
	}

	public void setWeekNumber(int weekNumber)
	{
		this.weekNumber = weekNumber;
	}

	public int getYearNumber()
	{
		return yearNumber;
	}

	public void setYearNumber(int yearNumber)
	{
		this.yearNumber = yearNumber;
	}
	
}
