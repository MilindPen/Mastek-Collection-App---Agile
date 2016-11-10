package com.mastek.commons.data.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The Class VWVisitResult.
 */
@Entity
@Table(name = "[dbo].[vwVisitResult]")
public class VWVisitResult
{
	
	/** The result id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ResultID")
	private long resultID;
	
	/** The visit id. */
	@Column(name = "VisitID")
	private long visitId;
	
	/** The status id. */
	@Column(name = "StatusID")
	private Long statusId;
	
	/** The status description. */
	@Column(name = "StatusDesc")
	private String statusDescription;
	
	/** The amount paid. */
	@Column(name = "AmountPaid")
	private Double amountPaid;
	
	/** The result date. */
	@Column(name = "ResultDate")
	private Date resultDate;

	/**
	 * Gets the result id.
	 *
	 * @return the result id
	 */
	public long getResultID()
	{
		return resultID;
	}

	/**
	 * Sets the result id.
	 *
	 * @param resultID the result id
	 */
	public void setResultID(long resultID)
	{
		this.resultID = resultID;
	}

	/**
	 * Gets the visit id.
	 *
	 * @return the visit id
	 */
	public long getVisitId()
	{
		return visitId;
	}

	/**
	 * Sets the visit id.
	 *
	 * @param visitId the visit id
	 */
	public void setVisitId(long visitId)
	{
		this.visitId = visitId;
	}

	/**
	 * Gets the status id.
	 *
	 * @return the status id
	 */
	public Long getStatusId()
	{
		return statusId;
	}

	/**
	 * Sets the status id.
	 *
	 * @param statusId the status id
	 */
	public void setStatusId(Long statusId)
	{
		this.statusId = statusId;
	}

	/**
	 * Gets the status description.
	 *
	 * @return the status description
	 */
	public String getStatusDescription()
	{
		return statusDescription;
	}

	/**
	 * Sets the status description.
	 *
	 * @param statusDescription the status description
	 */
	public void setStatusDescription(String statusDescription)
	{
		this.statusDescription = statusDescription;
	}

	/**
	 * Gets the amount paid.
	 *
	 * @return the amount paid
	 */
	public Double getAmountPaid()
	{
		return amountPaid;
	}

	/**
	 * Sets the amount paid.
	 *
	 * @param amountPaid the amount paid
	 */
	public void setAmountPaid(Double amountPaid)
	{
		this.amountPaid = amountPaid;
	}

	/**
	 * Gets the result date.
	 *
	 * @return the result date
	 */
	public Date getResultDate()
	{
		return resultDate;
	}

	/**
	 * Sets the result date.
	 *
	 * @param resultDate the result date
	 */
	public void setResultDate(Date resultDate)
	{
		this.resultDate = resultDate;
	}

}
