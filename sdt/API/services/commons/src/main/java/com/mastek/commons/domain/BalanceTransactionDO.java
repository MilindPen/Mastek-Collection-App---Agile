package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class BalanceTransactionDO.
 */
public class BalanceTransactionDO
{
	
	/** The balance id. */
	@JsonProperty(value="balanceId")
	String balanceId;
	
	/** The journey id. */
	@JsonProperty(value="journeyId")
	String journeyId;
	
	/** The balance date. */
	@JsonProperty(value="balanceDate")
	String balanceDate;
	
	/** The period indicator. */
	@JsonProperty(value="periodIndicator")
	String periodIndicator;
	
	/** The amount. */
	@JsonProperty(value="amount")
	String amount;
	
	/** The reference. */
	@JsonProperty(value="reference")
	String reference;
	
	/** The balance type id. */
	@JsonProperty(value="balanceTypeId")
	String balanceTypeId;
	
	/** The cheque indicator. */
	@JsonProperty(value="chequeIndicator")
	String chequeIndicator;
	
	/** The is deleted. */
	@JsonProperty(value="isDeleted")
	String isDeleted;
	
	/** The reason. */
	@JsonProperty(value="reason")
	String reason;
	
	/** The user id. */
	@JsonProperty(value = "journeyUserId")
	String journeyUserId;
	
	/** The is primary. */
	@JsonProperty(value = "isPrimaryJourney")
	String isPrimaryJourney;
	
	/** The user balance id. */
	@JsonProperty(value="userBalanceId")
	String userBalanceId;

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
	 * Gets the balance date.
	 *
	 * @return the balance date
	 */
	public String getBalanceDate()
	{
		return balanceDate;
	}

	/**
	 * Sets the balance date.
	 *
	 * @param balanceDate the balance date
	 */
	public void setBalanceDate(String balanceDate)
	{
		this.balanceDate = balanceDate;
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
	 * Gets the amount.
	 *
	 * @return the amount
	 */
	public String getAmount()
	{
		return amount;
	}

	/**
	 * Sets the amount.
	 *
	 * @param amount the amount
	 */
	public void setAmount(String amount)
	{
		this.amount = amount;
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
	 * Gets the checks if is deleted.
	 *
	 * @return the checks if is deleted
	 */
	public String getIsDeleted()
	{
		return isDeleted;
	}

	/**
	 * Sets the checks if is deleted.
	 *
	 * @param isDeleted the checks if is deleted
	 */
	public void setIsDeleted(String isDeleted)
	{
		this.isDeleted = isDeleted;
	}

	/**
	 * Gets the journey id.
	 *
	 * @return the journey id
	 */
	public String getJourneyId()
	{
		return journeyId;
	}

	/**
	 * Sets the journey id.
	 *
	 * @param journeyId the journey id
	 */
	public void setJourneyId(String journeyId)
	{
		this.journeyId = journeyId;
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

	/**
	 * Gets the journey user id.
	 *
	 * @return the journey user id
	 */
	public String getJourneyUserId()
	{
		return journeyUserId;
	}

	/**
	 * Sets the journey user id.
	 *
	 * @param journeyUserId the journey user id
	 */
	public void setJourneyUserId(String journeyUserId)
	{
		this.journeyUserId = journeyUserId;
	}

	/**
	 * Gets the checks if is primary journey.
	 *
	 * @return the checks if is primary journey
	 */
	public String getIsPrimaryJourney()
	{
		return isPrimaryJourney;
	}

	/**
	 * Sets the checks if is primary journey.
	 *
	 * @param isPrimaryJourney the checks if is primary journey
	 */
	public void setIsPrimaryJourney(String isPrimaryJourney)
	{
		this.isPrimaryJourney = isPrimaryJourney;
	}

	/**
	 * Gets the user balance id.
	 *
	 * @return the user balance id
	 */
	public String getUserBalanceId()
	{
		return userBalanceId;
	}

	/**
	 * Sets the user balance id.
	 *
	 * @param userBalanceId the user balance id
	 */
	public void setUserBalanceId(String userBalanceId)
	{
		this.userBalanceId = userBalanceId;
	}
	
}
