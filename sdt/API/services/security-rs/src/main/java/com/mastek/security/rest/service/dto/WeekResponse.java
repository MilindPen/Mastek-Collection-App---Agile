package com.mastek.security.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.WeekDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

public class WeekResponse extends BaseResponse
{
	@JsonProperty(value="Week")
	private WeekDO weekDO;

	/**
	 * @return the weekDO
	 */
	public WeekDO getWeekDO()
	{
		return weekDO;
	}

	/**
	 * @param weekDO the weekDO to set
	 */
	public void setWeekDO(WeekDO weekDO)
	{
		this.weekDO = weekDO;
	}
}
