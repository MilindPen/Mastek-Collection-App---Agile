package com.mastek.balancing.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.WeeklySummaryDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class WeeklySummaryResponse.
 */
public class WeeklySummaryResponse extends BaseResponse
{

	/** The weekly summary do. */
	@JsonProperty(value = "weeklySummary")
	WeeklySummaryDO weeklySummaryDO;

	/**
	 * Gets the weekly summary do.
	 *
	 * @return the weekly summary do
	 */
	public WeeklySummaryDO getWeeklySummaryDO()
	{
		return weeklySummaryDO;
	}

	/**
	 * Sets the weekly summary do.
	 *
	 * @param weeklySummaryDO the weekly summary do
	 */
	public void setWeeklySummaryDO(WeeklySummaryDO weeklySummaryDO)
	{
		this.weeklySummaryDO = weeklySummaryDO;
	}
	
}
