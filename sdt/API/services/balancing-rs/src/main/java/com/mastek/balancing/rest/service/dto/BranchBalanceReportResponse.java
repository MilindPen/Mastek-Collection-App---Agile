package com.mastek.balancing.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.BranchBalanceReportDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

public class BranchBalanceReportResponse extends BaseResponse
{
	@JsonProperty(value = "branchReportData")
	List<BranchBalanceReportDO> branchReportData;

	public List<BranchBalanceReportDO> getBranchReportData()
	{
		return branchReportData;
	}

	public void setBranchReportData(List<BranchBalanceReportDO> branchReportData)
	{
		this.branchReportData = branchReportData;
	}
	
}
