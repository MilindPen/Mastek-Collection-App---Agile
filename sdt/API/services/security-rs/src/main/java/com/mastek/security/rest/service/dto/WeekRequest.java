package com.mastek.security.rest.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mastek.commons.rest.service.dto.BaseRequest;

public class WeekRequest extends BaseRequest
{
	@JsonProperty("criteriaDate")
	String criteriaDate;

	/**
	 * @return the date
	 */
	public String getCriteriaDate()
	{
		return criteriaDate;
	}

	/**
	 * @param date the date to set
	 */
	public void setCriteriaDate(String date)
	{
		this.criteriaDate = date;
	}
}
