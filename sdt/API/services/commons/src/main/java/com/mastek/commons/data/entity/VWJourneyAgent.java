package com.mastek.commons.data.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({@NamedQuery(name = "vwJourneyAgent.getJourney", query = " select ja from VWJourneyAgent ja where userId=:userId and ja.startDate<= :fromDate and (ja.endDate >= :toDate or ja.endDate is null)")})

@Entity
@Table(name = "[dbo].[vwJourneyAgent]")
public class VWJourneyAgent
{
	/** The user journey id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "JourneyAgentId")
	private long userJourneyId;

	/** The user. */
	@Column(name = "UserID")
	private long userId;

	//@Column(name = "JourneyID")
	//private long journeyId;

	/** The start date. */
	@Column(name = "StartDate")
	private Date startDate;

	/** The end date. */
	@Column(name = "EndDate")
	private Date endDate;

	/** The created date. */
	@Column(name = "CreatedDate")
	private Date createdDate;

	/** The created by. */
	@Column(name = "CreatedBy")
	private String createdBy;

	/** The updated date. */
	@Column(name = "UpdatedDate")
	private Date updatedDate;

	/** The updated by. */
	@Column(name = "UpdatedBy")
	private String updatedBy;
	
	/** The journey. */
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "JourneyID")
	private VWJourney journey;

	/**
	 * Gets the user journey id.
	 *
	 * @return the user journey id
	 */
	public long getUserJourneyId()
	{
		return userJourneyId;
	}

	/**
	 * Sets the user journey id.
	 *
	 * @param userJourneyId the user journey id
	 */
	public void setUserJourneyId(long userJourneyId)
	{
		this.userJourneyId = userJourneyId;
	}

	/**
	 * Gets the start date.
	 *
	 * @return the start date
	 */
	public Date getStartDate()
	{
		return startDate;
	}

	/**
	 * Sets the start date.
	 *
	 * @param startDate the start date
	 */
	public void setStartDate(Date startDate)
	{
		this.startDate = startDate;
	}

	/**
	 * Gets the end date.
	 *
	 * @return the end date
	 */
	public Date getEndDate()
	{
		return endDate;
	}

	/**
	 * Sets the end date.
	 *
	 * @param endDate the end date
	 */
	public void setEndDate(Date endDate)
	{
		this.endDate = endDate;
	}

	/**
	 * Gets the created date.
	 *
	 * @return the created date
	 */
	public Date getCreatedDate()
	{
		return createdDate;
	}

	/**
	 * Sets the created date.
	 *
	 * @param createdDate the created date
	 */
	public void setCreatedDate(Date createdDate)
	{
		this.createdDate = createdDate;
	}

	/**
	 * Gets the created by.
	 *
	 * @return the created by
	 */
	public String getCreatedBy()
	{
		return createdBy;
	}

	/**
	 * Sets the created by.
	 *
	 * @param createdBy the created by
	 */
	public void setCreatedBy(String createdBy)
	{
		this.createdBy = createdBy;
	}

	/**
	 * Gets the updated date.
	 *
	 * @return the updated date
	 */
	public Date getUpdatedDate()
	{
		return updatedDate;
	}

	/**
	 * Sets the updated date.
	 *
	 * @param updatedDate the updated date
	 */
	public void setUpdatedDate(Date updatedDate)
	{
		this.updatedDate = updatedDate;
	}

	/**
	 * Gets the updated by.
	 *
	 * @return the updated by
	 */
	public String getUpdatedBy()
	{
		return updatedBy;
	}

	/**
	 * Sets the updated by.
	 *
	 * @param updatedBy the updated by
	 */
	public void setUpdatedBy(String updatedBy)
	{
		this.updatedBy = updatedBy;
	}

	public long getUserId()
	{
		return userId;
	}

	public void setUserId(long userId)
	{
		this.userId = userId;
	}
/*
	public long getJourneyId()
	{
		return journeyId;
	}

	public void setJourneyId(long journeyId)
	{
		this.journeyId = journeyId;
	}
*/

	public VWJourney getJourney()
	{
		return journey;
	}

	public void setJourney(VWJourney journey)
	{
		this.journey = journey;
	}
	
}
