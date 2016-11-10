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

@NamedQueries({
								@NamedQuery(name = "VWWeekEnding.getWeek", query = "select we from VWWeekEnding we where ? between we.startDate and we.endDate"),
								@NamedQuery(name = "VWWeekEnding.getWeekList", query = "select we from VWWeekEnding we where dateadd(d,?,?) between dateadd(d,?,we.startDate) and we.endDate order by we.startDate desc")})
@Entity
@Table(name = "[dbo].[vwWeekEnding]")
public class VWWeekEnding
{

	/** The week id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "WeekID")
	private int weekId;

	/** The year no. */
	@Column(name = "YearNo")
	private int yearNo;

	/** The week no. */
	@Column(name = "WeekNo")
	private int weekNo;

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

	/**
	 * Gets the week id.
	 *
	 * @return the week id
	 */
	public int getWeekId()
	{
		return weekId;
	}

	/**
	 * Sets the week id.
	 *
	 * @param weekId the week id
	 */
	public void setWeekId(int weekId)
	{
		this.weekId = weekId;
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

}
