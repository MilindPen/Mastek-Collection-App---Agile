package com.mastek.balancing.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.rest.service.dto.BaseRequest;

public class BranchBalanceReportRequest extends BaseRequest
{
	@JsonProperty(value = "weekNumber")
	int weekNumber;

	@JsonProperty(value = "yearNumber")
	int yearNumber;
	
	@JsonProperty(value = "branchId")
	long branchId;

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

	public long getBranchId()
	{
		return branchId;
	}

	public void setBranchId(long branchId)
	{
		this.branchId = branchId;
	}
}
