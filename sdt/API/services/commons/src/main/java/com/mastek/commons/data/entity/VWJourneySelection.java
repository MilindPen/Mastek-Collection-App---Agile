package com.mastek.commons.data.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 * The Class VWJourneySelection.
 */
@NamedQueries({@NamedQuery(name = "VWJourneySelection.getJourney", query = "select js from VWJourneySelection js where js.journeyAgentStartDate<= :toDate and "
		+ "(js.journeyAgentEndDate >= :fromDate or js.journeyAgentEndDate is null) and js.journeySectionStartDate<= :toDate and "
		+ "(js.journeySectionEndDate >= :fromDate or js.journeySectionEndDate is null) and js.branchId =:branchId order by branchName,journeyDescription asc"),
	@NamedQuery(name = "VWJourneySelection.getJourneyAll", query = "select js from VWJourneySelection js where js.journeyAgentStartDate<= :toDate and "
			+ "(js.journeyAgentEndDate >= :fromDate or js.journeyAgentEndDate is null) and js.journeySectionStartDate<= :toDate and "
			+ "(js.journeySectionEndDate >= :fromDate or js.journeySectionEndDate is null) order by branchName,journeyDescription asc"),
	@NamedQuery(name="VWJourneySelection.getPrimaryJourney",query="select js from VWJourneySelection js where js.userId=:userId and js.journeyAgentStartDate <= :toDate and (js.journeyAgentEndDate >= :fromDate or js.journeyAgentEndDate is null)")})

@Entity
@Table(name = "[mobile].[vwJourneySelection]")
public class VWJourneySelection
{

	/** The journey id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "JourneyID")
	private long journeyId;

	/** The description. */
	@Column(name = "JourneyDesc")
	private String journeyDescription;
	
	/** The user id. */
	@Column(name = "UserID")
	private long userId;
	
	/** The first name. */
	@Column(name = "FirstName")
	private String firstName;
	
	/** The surname. */
	@Column(name = "Lastname")
	private String lastName;
	
	/** The branch id. */
	@Column(name = "BranchId")
	private long branchId;
	
	/** The branch name. */
	@Column(name = "BranchName")
	private String branchName;
	
	/** The start date. */
	@Column(name = "JourneyAgentStartDate")
	private Date journeyAgentStartDate;

	/** The end date. */
	@Column(name = "JourneyAgentEndDate")
	private Date journeyAgentEndDate;
	
	/** The start date. */
	@Column(name = "JourneySectionStartDate")
	private Date journeySectionStartDate;

	/** The end date. */
	@Column(name = "JourneySectionEndDate")
	private Date journeySectionEndDate;

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
	 * Gets the journey description.
	 *
	 * @return the journey description
	 */
	public String getJourneyDescription()
	{
		return journeyDescription;
	}

	/**
	 * Sets the journey description.
	 *
	 * @param journeyDescription the journey description
	 */
	public void setJourneyDescription(String journeyDescription)
	{
		this.journeyDescription = journeyDescription;
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

	/**
	 * Gets the journey agent start date.
	 *
	 * @return the journey agent start date
	 */
	public Date getJourneyAgentStartDate()
	{
		return journeyAgentStartDate;
	}

	/**
	 * Sets the journey agent start date.
	 *
	 * @param journeyAgentStartDate the journey agent start date
	 */
	public void setJourneyAgentStartDate(Date journeyAgentStartDate)
	{
		this.journeyAgentStartDate = journeyAgentStartDate;
	}

	/**
	 * Gets the journey agent end date.
	 *
	 * @return the journey agent end date
	 */
	public Date getJourneyAgentEndDate()
	{
		return journeyAgentEndDate;
	}

	/**
	 * Sets the journey agent end date.
	 *
	 * @param journeyAgentEndDate the journey agent end date
	 */
	public void setJourneyAgentEndDate(Date journeyAgentEndDate)
	{
		this.journeyAgentEndDate = journeyAgentEndDate;
	}

	/**
	 * Gets the journey section start date.
	 *
	 * @return the journey section start date
	 */
	public Date getJourneySectionStartDate()
	{
		return journeySectionStartDate;
	}

	/**
	 * Sets the journey section start date.
	 *
	 * @param journeySectionStartDate the journey section start date
	 */
	public void setJourneySectionStartDate(Date journeySectionStartDate)
	{
		this.journeySectionStartDate = journeySectionStartDate;
	}

	/**
	 * Gets the journey section end date.
	 *
	 * @return the journey section end date
	 */
	public Date getJourneySectionEndDate()
	{
		return journeySectionEndDate;
	}

	/**
	 * Sets the journey section end date.
	 *
	 * @param journeySectionEndDate the journey section end date
	 */
	public void setJourneySectionEndDate(Date journeySectionEndDate)
	{
		this.journeySectionEndDate = journeySectionEndDate;
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
