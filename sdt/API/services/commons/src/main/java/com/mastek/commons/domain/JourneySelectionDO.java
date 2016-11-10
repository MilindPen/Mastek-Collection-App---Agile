package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class JourneySelectionDO.
 */
public class JourneySelectionDO
{
	/** The journey id. */
	@JsonProperty(value = "journeyId")
	long journeyId;
	
	/** The description. */
	@JsonProperty(value = "journeyDescription")
	String journeyDescription;
	
	/** The user id. */
	@JsonProperty(value = "userId")
	long userId;
	
	/** The first name. */
	@JsonProperty(value = "firstName")
	String firstName;
	
	/** The last name. */
	@JsonProperty(value = "lastName")
	String lastName;
	
	/** The branch id. */
	@JsonProperty(value = "branchId")
	long branchId;
	
	/** The branch name. */
	@JsonProperty(value = "branchName")
	String branchName;

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
	 * Gets the user id.
	 *
	 * @return the user id
	 */
	public long getUserId()
	{
		return userId;
	}

	/**
	 * Sets the user id.
	 *
	 * @param userId the user id
	 */
	public void setUserId(long userId)
	{
		this.userId = userId;
	}

	/**
	 * Gets the first name.
	 *
	 * @return the first name
	 */
	public String getFirstName()
	{
		return firstName;
	}

	/**
	 * Sets the first name.
	 *
	 * @param firstName the first name
	 */
	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}

	/**
	 * Gets the branch id.
	 *
	 * @return the branch id
	 */
	public long getBranchId()
	{
		return branchId;
	}

	/**
	 * Sets the branch id.
	 *
	 * @param branchId the branch id
	 */
	public void setBranchId(long branchId)
	{
		this.branchId = branchId;
	}

	/**
	 * Gets the branch name.
	 *
	 * @return the branch name
	 */
	public String getBranchName()
	{
		return branchName;
	}

	/**
	 * Sets the branch name.
	 *
	 * @param branchName the branch name
	 */
	public void setBranchName(String branchName)
	{
		this.branchName = branchName;
	}

	public String getLastName()
	{
		return lastName;
	}

	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

	public String getJourneyDescription()
	{
		return journeyDescription;
	}

	public void setJourneyDescription(String journeyDescription)
	{
		this.journeyDescription = journeyDescription;
	}
	
}
