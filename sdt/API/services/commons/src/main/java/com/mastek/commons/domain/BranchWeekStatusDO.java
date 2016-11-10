package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class BranchWeekStatusDO.
 */
public class BranchWeekStatusDO
{
	/** The branch id. */
	@JsonProperty(value = "branchId")
	long branchId;
	
	/** The week no. */
	@JsonProperty(value = "weekNumber")
	int weekNo;
	
	/** The year no. */
	@JsonProperty(value = "yearNumber")
	int yearNo;
	
	/** The week status id. */
	@JsonProperty(value = "weekStatusId")
	Integer weekStatusId;
	
	/** The week status desc. */
	@JsonProperty(value = "weekStatusDesc")
	String weekStatusDesc;
	
	/** The closed date time. */
	@JsonProperty(value = "closedDateTime")
	String closedDateTime;
	
	/** The first name. */
	@JsonProperty(value = "firstName")
	String firstName;
	
	/** The last name. */
	@JsonProperty(value = "lastName")
	String lastName;

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
	 * Gets the week no.
	 *
	 * @return the week no
	 */
	public int getWeekNo()
	{
		return weekNo;
	}

	/**
	 * Sets the week no.
	 *
	 * @param weekNo the week no
	 */
	public void setWeekNo(int weekNo)
	{
		this.weekNo = weekNo;
	}

	/**
	 * Gets the year no.
	 *
	 * @return the year no
	 */
	public int getYearNo()
	{
		return yearNo;
	}

	/**
	 * Sets the year no.
	 *
	 * @param yearNo the year no
	 */
	public void setYearNo(int yearNo)
	{
		this.yearNo = yearNo;
	}

	/**
	 * Gets the week status id.
	 *
	 * @return the week status id
	 */
	public Integer getWeekStatusId()
	{
		return weekStatusId;
	}

	/**
	 * Sets the week status id.
	 *
	 * @param weekStatusId the week status id
	 */
	public void setWeekStatusId(Integer weekStatusId)
	{
		this.weekStatusId = weekStatusId;
	}

	/**
	 * Gets the week status desc.
	 *
	 * @return the week status desc
	 */
	public String getWeekStatusDesc()
	{
		return weekStatusDesc;
	}

	/**
	 * Sets the week status desc.
	 *
	 * @param weekStatusDesc the week status desc
	 */
	public void setWeekStatusDesc(String weekStatusDesc)
	{
		this.weekStatusDesc = weekStatusDesc;
	}

	/**
	 * Gets the closed date time.
	 *
	 * @return the closed date time
	 */
	public String getClosedDateTime()
	{
		return closedDateTime;
	}

	/**
	 * Sets the closed date time.
	 *
	 * @param closedDateTime the closed date time
	 */
	public void setClosedDateTime(String closedDateTime)
	{
		this.closedDateTime = closedDateTime;
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
	 * Gets the last name.
	 *
	 * @return the last name
	 */
	public String getLastName()
	{
		return lastName;
	}

	/**
	 * Sets the last name.
	 *
	 * @param lastName the last name
	 */
	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

}
