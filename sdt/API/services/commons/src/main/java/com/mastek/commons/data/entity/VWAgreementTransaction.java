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
 * The Class VWAgreementTransaction.
 */

@NamedQueries({@NamedQuery(name = "VWAgreementTransaction.getTransactions", query = "select at from VWAgreementTransaction at where " + "at.resultDate between ? and ? and at.userId=:userId")})

@Entity
@Table(name = "[mobile].[vwLatestAgreementTransaction]")
public class VWAgreementTransaction
{

	/** The user id. */
	@Column(name = "UserID")
	private long userId;

	/** The visit id. */
	@Column(name = "VisitID")
	private long visitID;

	/** The customer id. */
	@Column(name = "customerID")
	private long customerID;

	/** The result id. */
	@Column(name = "ResultID")
	private String resultID;

	/** The result date. */
	@Column(name = "ResultDate")
	private Date resultDate;

	/** The result status id. */
	@Column(name = "resultStatusID")
	private int resultStatusID;

	/** The visit status id. */
	@Column(name = "visitStatusID")
	private Integer visitStatusID;

	/** The agreement id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AgreementID")
	private long agreementID;

	/** The agreement mode. */
	@Column(name = "AgreementMode")
	private String agreementMode;

	/** The agreement amount paid. */
	@Column(name = "agreementAmountPaid")
	private Double agreementAmountPaid;
	
	@Column(name = "JourneyID")
	private long journeyId;

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
	 * Gets the visit id.
	 *
	 * @return the visit id
	 */
	public long getVisitID()
	{
		return visitID;
	}

	/**
	 * Sets the visit id.
	 *
	 * @param visitID the visit id
	 */
	public void setVisitID(long visitID)
	{
		this.visitID = visitID;
	}

	/**
	 * Gets the customer id.
	 *
	 * @return the customer id
	 */
	public long getCustomerID()
	{
		return customerID;
	}

	/**
	 * Sets the customer id.
	 *
	 * @param customerID the customer id
	 */
	public void setCustomerID(long customerID)
	{
		this.customerID = customerID;
	}

	/**
	 * Gets the result id.
	 *
	 * @return the result id
	 */
	public String getResultID()
	{
		return resultID;
	}

	/**
	 * Sets the result id.
	 *
	 * @param resultID the result id
	 */
	public void setResultID(String resultID)
	{
		this.resultID = resultID;
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

	/**
	 * Gets the result status id.
	 *
	 * @return the result status id
	 */
	public int getResultStatusID()
	{
		return resultStatusID;
	}

	/**
	 * Sets the result status id.
	 *
	 * @param resultStatusID the result status id
	 */
	public void setResultStatusID(int resultStatusID)
	{
		this.resultStatusID = resultStatusID;
	}

	/**
	 * Gets the visit status id.
	 *
	 * @return the visit status id
	 */
	public Integer getVisitStatusID()
	{
		return visitStatusID;
	}

	/**
	 * Sets the visit status id.
	 *
	 * @param visitStatusID the visit status id
	 */
	public void setVisitStatusID(Integer visitStatusID)
	{
		this.visitStatusID = visitStatusID;
	}

	/**
	 * Gets the agreement id.
	 *
	 * @return the agreement id
	 */
	public long getAgreementID()
	{
		return agreementID;
	}

	/**
	 * Sets the agreement id.
	 *
	 * @param agreementID the agreement id
	 */
	public void setAgreementID(long agreementID)
	{
		this.agreementID = agreementID;
	}

	/**
	 * Gets the agreement mode.
	 *
	 * @return the agreement mode
	 */
	public String getAgreementMode()
	{
		return agreementMode;
	}

	/**
	 * Sets the agreement mode.
	 *
	 * @param agreementMode the agreement mode
	 */
	public void setAgreementMode(String agreementMode)
	{
		this.agreementMode = agreementMode;
	}

	/**
	 * Gets the agreement amount paid.
	 *
	 * @return the agreement amount paid
	 */
	public Double getAgreementAmountPaid()
	{
		return agreementAmountPaid;
	}

	/**
	 * Sets the agreement amount paid.
	 *
	 * @param agreementAmountPaid the agreement amount paid
	 */
	public void setAgreementAmountPaid(Double agreementAmountPaid)
	{
		this.agreementAmountPaid = agreementAmountPaid;
	}
	
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


}
