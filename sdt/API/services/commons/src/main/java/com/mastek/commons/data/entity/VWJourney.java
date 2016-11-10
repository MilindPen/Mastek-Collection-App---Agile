package com.mastek.commons.data.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "[dbo].[vwJourney]")
public class VWJourney
{
	/** The journey id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "JourneyID")
	private long journeyId;

	/** The description. */
	@Column(name = "Description")
	private String description;

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

	/** The journey customer. */
	@OneToMany(mappedBy = "journey")
	private Set<VWJourneyCustomer> journeyCustomer = new HashSet<>(0);
	
	/** The journey agent. */
	@OneToMany(mappedBy = "journey")
	private Set<VWJourneyAgent> journeyAgent = new HashSet<>(0);

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

	/**
	 * Gets the journey customer.
	 *
	 * @return the journey customer
	 */
	public Set<VWJourneyCustomer> getJourneyCustomer()
	{
		return journeyCustomer;
	}

	/**
	 * Sets the journey customer.
	 *
	 * @param journeyCustomer the journey customer
	 */
	public void setJourneyCustomer(Set<VWJourneyCustomer> journeyCustomer)
	{
		this.journeyCustomer = journeyCustomer;
	}

	public Set<VWJourneyAgent> getJourneyAgent()
	{
		return journeyAgent;
	}

	public void setJourneyAgent(Set<VWJourneyAgent> journeyAgent)
	{
		this.journeyAgent = journeyAgent;
	}

}
