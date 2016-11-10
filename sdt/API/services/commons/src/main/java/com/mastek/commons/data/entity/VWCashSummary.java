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
 * The Class VWCashSummary.
 */
@NamedQueries({@NamedQuery(name = "VWCashSummary.getSummary", query = "select cs.balanceTypeId,cs.balanceTypeDesc,sum(cs.amount) from VWCashSummary cs where cs.balanceDate>= :fromDate and "
		+ "cs.balanceDate<= :toDate and cs.userId=:userId and cs.journeyId=:journeyId group by cs.balanceTypeId,cs.balanceTypeDesc "),
					@NamedQuery(name = "VWCashSummary.getTransactions", query = "select cs from VWCashSummary cs where cs.balanceDate>= :fromDate and "
		+ "cs.balanceDate<= :toDate and cs.userId=:userId and cs.journeyId=:journeyId and cs.balanceTypeId in (:balanceTypeIds) "),
					@NamedQuery(name = "VWCashSummary.getBalTransactions", query = "select cs from VWCashSummary cs where cs.balanceDate>= :fromDate and "
							+ "cs.balanceDate<= :toDate and cs.userId=:userId ")})

@Entity
@Table(name = "[mobile].[vwCashSummaryDashboard]")
public class VWCashSummary
{
	
	/** The journey id. */
	@Column(name = "JourneyID")
	private long journeyId;
	
	/** The user id. */
	@Column(name = "UserID")
	private long userId;
	
	/** The balance date. */
	@Column(name = "BalanceDate")
	private Date balanceDate;
	
	/** The balance type id. */
	@Column(name = "BalanceTypeID")
	private String balanceTypeId;
	
	/** The balance type desc. */
	@Column(name = "BalanceTypeDesc")
	private String balanceTypeDesc;

	/** The amount. */
	@Column(name = "Amount")
	private Double amount;

	/** The created date. */
	@Column(name = "CreatedDate")
	private Date createdDate;

	/** The week no. */
	@Column(name = "WeekNo")
	private int weekNo;
	
	/** The balance id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="BalanceID")
	private String balanceId;
	
	/** The reference. */
	@Column(name="Reference")
	private String reference;
	
	/** The cheque indicator. */
	@Column(name="Cheque_ind")
	private String chequeIndicator;
	
	/** The period indicator. */
	@Column(name="PeriodIndicator")
	private String periodIndicator;
	
	/** The Reason. */
	@Column(name="Reason")
	private String reason;

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
	 * Gets the balance date.
	 *
	 * @return the balance date
	 */
	public Date getBalanceDate()
	{
		return balanceDate;
	}

	/**
	 * Sets the balance date.
	 *
	 * @param balanceDate the balance date
	 */
	public void setBalanceDate(Date balanceDate)
	{
		this.balanceDate = balanceDate;
	}

	/**
	 * Gets the balance type id.
	 *
	 * @return the balance type id
	 */
	public String getBalanceTypeId()
	{
		return balanceTypeId;
	}

	/**
	 * Sets the balance type id.
	 *
	 * @param balanceTypeId the balance type id
	 */
	public void setBalanceTypeId(String balanceTypeId)
	{
		this.balanceTypeId = balanceTypeId;
	}

	/**
	 * Gets the balance type desc.
	 *
	 * @return the balance type desc
	 */
	public String getBalanceTypeDesc()
	{
		return balanceTypeDesc;
	}

	/**
	 * Sets the balance type desc.
	 *
	 * @param balanceTypeDesc the balance type desc
	 */
	public void setBalanceTypeDesc(String balanceTypeDesc)
	{
		this.balanceTypeDesc = balanceTypeDesc;
	}

	/**
	 * Gets the amount.
	 *
	 * @return the amount
	 */
	public Double getAmount()
	{
		return amount;
	}

	/**
	 * Sets the amount.
	 *
	 * @param amount the amount
	 */
	public void setAmount(Double amount)
	{
		this.amount = amount;
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
	 * Gets the balance id.
	 *
	 * @return the balance id
	 */
	public String getBalanceId()
	{
		return balanceId;
	}

	/**
	 * Sets the balance id.
	 *
	 * @param balanceId the balance id
	 */
	public void setBalanceId(String balanceId)
	{
		this.balanceId = balanceId;
	}

	/**
	 * Gets the reference.
	 *
	 * @return the reference
	 */
	public String getReference()
	{
		return reference;
	}

	/**
	 * Sets the reference.
	 *
	 * @param reference the reference
	 */
	public void setReference(String reference)
	{
		this.reference = reference;
	}

	/**
	 * Gets the cheque indicator.
	 *
	 * @return the cheque indicator
	 */
	public String getChequeIndicator()
	{
		return chequeIndicator;
	}

	/**
	 * Sets the cheque indicator.
	 *
	 * @param chequeIndicator the cheque indicator
	 */
	public void setChequeIndicator(String chequeIndicator)
	{
		this.chequeIndicator = chequeIndicator;
	}

	/**
	 * Gets the period indicator.
	 *
	 * @return the period indicator
	 */
	public String getPeriodIndicator()
	{
		return periodIndicator;
	}

	/**
	 * Sets the period indicator.
	 *
	 * @param periodIndicator the period indicator
	 */
	public void setPeriodIndicator(String periodIndicator)
	{
		this.periodIndicator = periodIndicator;
	}

	/**
	 * Gets the reason.
	 *
	 * @return the reason
	 */
	public String getReason()
	{
		return reason;
	}

	/**
	 * Sets the reason.
	 *
	 * @param reason the reason
	 */
	public void setReason(String reason)
	{
		this.reason = reason;
	}
	
}
