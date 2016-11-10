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
import javax.persistence.Table;
@Entity
@Table(name = "[dbo].[vwJourneyCustomer]")
public class VWJourneyCustomer
{
	/** The customer journey id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CustJnyID")
	private long customerJourneyId;

	/** The customer. */
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "CustomerID")
	private VWCustomer customer;

	/** The journey. */
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "JourneyID")
	private VWJourney journey;

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

	/** The collection day. */
	@Column(name = "CollectionDay")
	private int collectionDay;

	/** The journey order. */
	@Column(name = "JourneyOrderBy")
	private int journeyOrder;

	/**
	 * Gets the customer journey id.
	 *
	 * @return the customer journey id
	 */
	public long getCustomerJourneyId()
	{
		return customerJourneyId;
	}

	/**
	 * Sets the customer journey id.
	 *
	 * @param customerJourneyId the customer journey id
	 */
	public void setCustomerJourneyId(long customerJourneyId)
	{
		this.customerJourneyId = customerJourneyId;
	}

	/**
	 * Gets the collection day.
	 *
	 * @return the collection day
	 */
	public int getCollectionDay()
	{
		return collectionDay;
	}

	/**
	 * Sets the collection day.
	 *
	 * @param collectionDay the collection day
	 */
	public void setCollectionDay(int collectionDay)
	{
		this.collectionDay = collectionDay;
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

	/**
	 * Gets the customer.
	 *
	 * @return the customer
	 */
	public VWCustomer getCustomer()
	{
		return customer;
	}

	/**
	 * Sets the customer.
	 *
	 * @param customer the customer
	 */
	public void setCustomer(VWCustomer customer)
	{
		this.customer = customer;
	}

	/**
	 * Gets the journey.
	 *
	 * @return the journey
	 */
	public VWJourney getJourney()
	{
		return journey;
	}

	/**
	 * Sets the journey.
	 *
	 * @param journey the journey
	 */
	public void setJourney(VWJourney journey)
	{
		this.journey = journey;
	}

	/**
	 * Gets the journeyOrder.
	 *
	 * @return the journeyOrder
	 */
	public int getJourneyOrder()
	{
		return journeyOrder;
	}

	/**
	 * Sets the journeyOrder.
	 *
	 * @param journey the journeyOrder
	 */
	public void setJourneyOrder(int journeyOrder)
	{
		this.journeyOrder = journeyOrder;
	}

}
