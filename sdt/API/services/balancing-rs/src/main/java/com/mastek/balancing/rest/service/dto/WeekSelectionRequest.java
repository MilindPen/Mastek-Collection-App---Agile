package com.mastek.balancing.rest.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mastek.commons.rest.service.dto.BaseRequest;

/**
 * The Class WeekSelectionRequest.
 */
public class WeekSelectionRequest extends BaseRequest
{
	/** The criteria date. */
	@JsonProperty("criteriaDate")
	String criteriaDate;

	/**
	 * Gets the criteria date.
	 *
	 * @return the criteria date
	 */
	public String getCriteriaDate()
	{
		return criteriaDate;
	}

	/**
	 * Sets the criteria date.
	 *
	 * @param criteriaDate the criteria date
	 */
	public void setCriteriaDate(String criteriaDate)
	{
		this.criteriaDate = criteriaDate;
	}
}
