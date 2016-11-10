package com.mastek.balancing.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.JourneySelectionDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class JourneySelectionResponse.
 */
public class JourneySelectionResponse extends BaseResponse
{

	/** The journeys. */
	@JsonProperty(value = "journeys")
	private List<JourneySelectionDO> journeys;

	/**
	 * Gets the journeys.
	 *
	 * @return the journeys
	 */
	public List<JourneySelectionDO> getJourneys()
	{
		return journeys;
	}

	/**
	 * Sets the journeys.
	 *
	 * @param journeys the journeys
	 */
	public void setJourneys(List<JourneySelectionDO> journeys)
	{
		this.journeys = journeys;
	}

}
