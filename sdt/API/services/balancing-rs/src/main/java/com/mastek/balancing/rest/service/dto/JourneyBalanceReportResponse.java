package com.mastek.balancing.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.JourneyBalanceReportDO;
import com.mastek.commons.domain.JourneyBalanceReportDetailsDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

public class JourneyBalanceReportResponse extends BaseResponse
{
	@JsonProperty(value = "journeyReportData")
	List<JourneyBalanceReportDO> journeyReportData;
	
	@JsonProperty(value = "journeyBalanceReportDetails")
	JourneyBalanceReportDetailsDO journeyBalanceReportDetails;

	public List<JourneyBalanceReportDO> getJourneyReportData()
	{
		return journeyReportData;
	}

	public void setJourneyReportData(List<JourneyBalanceReportDO> journeyReportData)
	{
		this.journeyReportData = journeyReportData;
	}

	public JourneyBalanceReportDetailsDO getJourneyBalanceReportDetails()
	{
		return journeyBalanceReportDetails;
	}

	public void setJourneyBalanceReportDetails(JourneyBalanceReportDetailsDO journeyBalanceReportDetails)
	{
		this.journeyBalanceReportDetails = journeyBalanceReportDetails;
	}
	
}
