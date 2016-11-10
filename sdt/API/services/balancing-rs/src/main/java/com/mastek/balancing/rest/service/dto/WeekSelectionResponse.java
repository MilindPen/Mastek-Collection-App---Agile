package com.mastek.balancing.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.BranchSelectionDO;
import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class WeekSelectionResponse.
 */
public class WeekSelectionResponse extends BaseResponse
{

	/** The weeks. */
	@JsonProperty(value="Week")
	private List<WeekDO> weeks;
	
	@JsonProperty(value="branchList")
	private List<BranchSelectionDO> branchList;

	/**
	 * Gets the weeks.
	 *
	 * @return the weeks
	 */
	public List<WeekDO> getWeeks()
	{
		return weeks;
	}

	/**
	 * Sets the weeks.
	 *
	 * @param weeks the weeks
	 */
	public void setWeeks(List<WeekDO> weeks)
	{
		this.weeks = weeks;
	}

	public List<BranchSelectionDO> getBranchList()
	{
		return branchList;
	}

	public void setBranchList(List<BranchSelectionDO> branchList)
	{
		this.branchList = branchList;
	}
	
}
