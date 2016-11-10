package com.mastek.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonProperty;

public class TransactionHistoryDO
{
	
	@JsonProperty(value = "transactionId")
	long transactionId;
	
	@JsonProperty(value = "agreementId")
	long agreementId;
	
	@JsonProperty(value = "customerId")
	long customerId;
	
	@JsonProperty(value = "paidDate")
	String paidDate;
	
	@JsonProperty(value = "amount")
	Double amount;
	
	@JsonProperty(value = "arrears")
	Double arrears;
	
	@JsonProperty(value = "status")
	String status;
	
	@JsonProperty(value = "weekNumber")
	String weekNumber;
	
	@JsonProperty(value = "year")
	String year;

	public long getTransactionId()
	{
		return transactionId;
	}

	public void setTransactionId(long transactionId)
	{
		this.transactionId = transactionId;
	}

	public String getPaidDate()
	{
		return paidDate;
	}

	public void setPaidDate(String paidDate)
	{
		this.paidDate = paidDate;
	}

	public Double getAmount()
	{
		return amount;
	}

	public void setAmount(Double amount)
	{
		this.amount = amount;
	}

	public Double getArrears()
	{
		return arrears;
	}

	public void setArrears(Double arrears)
	{
		this.arrears = arrears;
	}

	public String getStatus()
	{
		return status;
	}

	public void setStatus(String status)
	{
		this.status = status;
	}

	public String getWeekNumber()
	{
		return weekNumber;
	}

	public void setWeekNumber(String weekNumber)
	{
		this.weekNumber = weekNumber;
	}

	public String getYear()
	{
		return year;
	}

	public void setYear(String year)
	{
		this.year = year;
	}

	public long getAgreementId()
	{
		return agreementId;
	}

	public void setAgreementId(long agreementId)
	{
		this.agreementId = agreementId;
	}

	public long getCustomerId()
	{
		return customerId;
	}

	public void setCustomerId(long customerId)
	{
		this.customerId = customerId;
	}
	
}
