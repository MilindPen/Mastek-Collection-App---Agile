package com.mastek.commons.domain;

import java.sql.Date;

import org.codehaus.jackson.annotate.JsonProperty;

public class JourneyBalanceReportDetailsDataDO
{

	@JsonProperty(value = "firstName")
	String firstName;
	
	@JsonProperty(value = "lastName")
	String lastName;
	
	@JsonProperty(value = "userId")
	Integer userId;
	
	@JsonProperty(value = "isPrimaryUser")
	Boolean isPrimaryUser;
	
	@JsonProperty(value = "journeyId")
	Integer journeyId;
	
	@JsonProperty(value = "weekNumber")
	Integer weekNumber;
	
	@JsonProperty(value = "yearNumber")
	Integer yearNumber;
	
	@JsonProperty(value = "balanceType")
	String balanceType;
	
	@JsonProperty(value="reference")
	String reference;
	
	@JsonProperty(value="chequeIndicator")
	Boolean chequeIndicator;
	
	@JsonProperty(value="balanceDate")
	Date balanceDate;
	
	@JsonProperty(value="amount")
	Double amount;

	public String getFirstName()
	{
		return firstName;
	}

	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}

	public String getLastName()
	{
		return lastName;
	}

	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

	public Integer getUserId()
	{
		return userId;
	}

	public void setUserId(Integer userId)
	{
		this.userId = userId;
	}

	public Boolean getIsPrimaryUser()
	{
		return isPrimaryUser;
	}

	public void setIsPrimaryUser(Boolean isPrimaryUser)
	{
		this.isPrimaryUser = isPrimaryUser;
	}

	public Integer getJourneyId()
	{
		return journeyId;
	}

	public void setJourneyId(Integer journeyId)
	{
		this.journeyId = journeyId;
	}

	public Integer getWeekNumber()
	{
		return weekNumber;
	}

	public void setWeekNumber(Integer weekNumber)
	{
		this.weekNumber = weekNumber;
	}

	public Integer getYearNumber()
	{
		return yearNumber;
	}

	public void setYearNumber(Integer yearNumber)
	{
		this.yearNumber = yearNumber;
	}

	public String getBalanceType()
	{
		return balanceType;
	}

	public void setBalanceType(String balanceType)
	{
		this.balanceType = balanceType;
	}

	public String getReference()
	{
		return reference;
	}

	public void setReference(String reference)
	{
		this.reference = reference;
	}

	public Boolean getChequeIndicator()
	{
		return chequeIndicator;
	}

	public void setChequeIndicator(Boolean chequeIndicator)
	{
		this.chequeIndicator = chequeIndicator;
	}

	public Date getBalanceDate()
	{
		return balanceDate;
	}

	public void setBalanceDate(Date balanceDate)
	{
		this.balanceDate = balanceDate;
	}

	public Double getAmount()
	{
		return amount;
	}

	public void setAmount(Double amount)
	{
		this.amount = amount;
	}
	
}
