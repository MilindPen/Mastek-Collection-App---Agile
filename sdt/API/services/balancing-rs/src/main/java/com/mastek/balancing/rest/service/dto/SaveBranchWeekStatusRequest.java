package com.mastek.balancing.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.rest.service.dto.BaseRequest;

public class SaveBranchWeekStatusRequest extends BaseRequest
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
	
	@JsonProperty(value = "weekStatusId")
	int weekStatusId;

	public long getBranchId()
	{
		return branchId;
	}

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

	public int getWeekStatusId()
	{
		return weekStatusId;
	}

	public void setWeekStatusId(int weekStatusId)
	{
		this.weekStatusId = weekStatusId;
	}
	
}
