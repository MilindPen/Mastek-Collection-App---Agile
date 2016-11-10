package com.mastek.balancing.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.BranchWeekStatusDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class BranchWeekStatusResponse.
 */
public class BranchWeekStatusResponse extends BaseResponse
{
	
	/** The branch week status. */
	@JsonProperty(value = "branchWeekStatus")
	BranchWeekStatusDO branchWeekStatus;

	/**
	 * Gets the branch week status.
	 *
	 * @return the branch week status
	 */
	public BranchWeekStatusDO getBranchWeekStatus()
	{
		return branchWeekStatus;
	}

	/**
	 * Sets the branch week status.
	 *
	 * @param branchWeekStatus the branch week status
	 */
	public void setBranchWeekStatus(BranchWeekStatusDO branchWeekStatus)
	{
		this.branchWeekStatus = branchWeekStatus;
	}
	
}
