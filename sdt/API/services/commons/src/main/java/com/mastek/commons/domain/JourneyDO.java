package com.mastek.commons.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class JourneyDO.
 */
public class JourneyDO
{
	
	/** The journey id. */
	@JsonProperty(value = "journeyId")
	long journeyId;
	
	/** The description. */
	@JsonProperty(value = "journeyDescription")
	String description;
	
	@JsonProperty(value = "branchId")
	Long branchId;
	
	/** The branch name. */
	@JsonProperty(value = "branchName")
	String branchName;
	
	@JsonProperty(value = "journeyAgentStartDate")
	String journeyAgentStartDate;
	
	@JsonProperty(value = "journeyAgentEndDate")
	String journeyAgentEndDate;

	/**
	 * Gets the journey id.
	 *
	 * @return the journey id
	 */
	public long getJourneyId()
	{
		return journeyId;
	}

	/**
	 * Sets the journey id.
	 *
	 * @param journeyId the journey id
	 */
	public void setJourneyId(long journeyId)
	{
		this.journeyId = journeyId;
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription()
	{
		return description;
	}

	/**
	 * Sets the description.
	 *
	 * @param description the description
	 */
	public void setDescription(String description)
	{
		this.description = description;
	}

	public Long getBranchId() {
		return branchId;
	}

	public void setBranchId(Long branchId) {
		this.branchId = branchId;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getJourneyAgentStartDate() {
		return journeyAgentStartDate;
	}

	public void setJourneyAgentStartDate(String journeyAgentStartDate) {
		this.journeyAgentStartDate = journeyAgentStartDate;
	}

	public String getJourneyAgentEndDate() {
		return journeyAgentEndDate;
	}

	public void setJourneyAgentEndDate(String journeyAgentEndDate) {
		this.journeyAgentEndDate = journeyAgentEndDate;
	}

}
