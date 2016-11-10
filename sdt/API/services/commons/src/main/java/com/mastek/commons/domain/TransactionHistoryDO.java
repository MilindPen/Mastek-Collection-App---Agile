package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class TransactionHistoryDO.
 */
public class TransactionHistoryDO
{
	
	/** The transaction id. */
	@JsonProperty(value = "transactionId")
	long transactionId;
	
	/** The agreement id. */
	@JsonProperty(value = "agreementId")
	long agreementId;
	
	/** The customer id. */
	@JsonProperty(value = "customerId")
	long customerId;
	
	/** The allocation id. */
	@JsonProperty(value = "allocationId")
	long allocationId;
	
	/** The paid date. */
	@JsonProperty(value = "paidDate")
	String paidDate;
	
	/** The amount. */
	@JsonProperty(value = "amount")
	Double amount;
	
	/** The arrears. */
	@JsonProperty(value = "arrears")
	Double arrears;
	
	/** The status. */
	@JsonProperty(value = "status")
	String status;
	
	/** The week number. */
	@JsonProperty(value = "weekNumber")
	String weekNumber;
	
	/** The year. */
	@JsonProperty(value = "year")
	String year;

	/**
	 * Gets the transaction id.
	 *
	 * @return the transaction id
	 */
	public long getTransactionId()
	{
		return transactionId;
	}

	/**
	 * Sets the transaction id.
	 *
	 * @param transactionId the transaction id
	 */
	public void setTransactionId(long transactionId)
	{
		this.transactionId = transactionId;
	}

	/**
	 * Gets the paid date.
	 *
	 * @return the paid date
	 */
	public String getPaidDate()
	{
		return paidDate;
	}

	/**
	 * Sets the paid date.
	 *
	 * @param paidDate the paid date
	 */
	public void setPaidDate(String paidDate)
	{
		this.paidDate = paidDate;
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
	 * Gets the arrears.
	 *
	 * @return the arrears
	 */
	public Double getArrears()
	{
		return arrears;
	}

	/**
	 * Sets the arrears.
	 *
	 * @param arrears the arrears
	 */
	public void setArrears(Double arrears)
	{
		this.arrears = arrears;
	}

	/**
	 * Gets the status.
	 *
	 * @return the status
	 */
	public String getStatus()
	{
		return status;
	}

	/**
	 * Sets the status.
	 *
	 * @param status the status
	 */
	public void setStatus(String status)
	{
		this.status = status;
	}

	/**
	 * Gets the week number.
	 *
	 * @return the week number
	 */
	public String getWeekNumber()
	{
		return weekNumber;
	}

	/**
	 * Sets the week number.
	 *
	 * @param weekNumber the week number
	 */
	public void setWeekNumber(String weekNumber)
	{
		this.weekNumber = weekNumber;
	}

	/**
	 * Gets the year.
	 *
	 * @return the year
	 */
	public String getYear()
	{
		return year;
	}

	/**
	 * Sets the year.
	 *
	 * @param year the year
	 */
	public void setYear(String year)
	{
		this.year = year;
	}

	/**
	 * Gets the agreement id.
	 *
	 * @return the agreement id
	 */
	public long getAgreementId()
	{
		return agreementId;
	}

	/**
	 * Sets the agreement id.
	 *
	 * @param agreementId the agreement id
	 */
	public void setAgreementId(long agreementId)
	{
		this.agreementId = agreementId;
	}

	/**
	 * Gets the customer id.
	 *
	 * @return the customer id
	 */
	public long getCustomerId()
	{
		return customerId;
	}

	/**
	 * Sets the customer id.
	 *
	 * @param customerId the customer id
	 */
	public void setCustomerId(long customerId)
	{
		this.customerId = customerId;
	}

	/**
	 * Gets the allocation id.
	 *
	 * @return the allocation id
	 */
	public long getAllocationId()
	{
		return allocationId;
	}

	/**
	 * Sets the allocation id.
	 *
	 * @param allocationId the allocation id
	 */
	public void setAllocationId(long allocationId)
	{
		this.allocationId = allocationId;
	}
	
}
