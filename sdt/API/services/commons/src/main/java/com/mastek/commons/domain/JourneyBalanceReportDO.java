package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

public class JourneyBalanceReportDO
{
	@JsonProperty(value = "userId")
	Integer userId;
	
	@JsonProperty(value = "isPrimaryUser")
	Boolean isPrimaryUser;
	
	@JsonProperty(value = "journeyId")
	Integer journeyId;
		
	@JsonProperty(value = "journeyDesc")
	String journeyDesc;
	
	@JsonProperty(value = "firstName")
	String firstName;
	
	@JsonProperty(value = "lastName")
	String lastName;
	
	@JsonProperty(value = "yearNumber")
	Integer yearNumber;
	
	@JsonProperty(value = "weekNumber")
	Integer weekNumber;
	
	@JsonProperty(value = "declaredCash")
	Double declaredCash;
	
	@JsonProperty(value = "declaredCashBanked")
	Double declaredCashBanked;
	
	@JsonProperty(value = "declaredFloat")
	Double declaredFloat;
	
	@JsonProperty(value = "declaredLoans")
	Double declaredLoans;
	
	@JsonProperty(value = "declaredRaf")
	Double declaredRaf;
	
	@JsonProperty(value = "declaredShortsAndOvers")
	Double declaredShortsAndOvers;
	
	@JsonProperty(value = "actualCash")
	Double actualCash;
	
	@JsonProperty(value = "actualCard")
	Double actualCard;
	
	@JsonProperty(value = "actualCentral")
	Double actualCentral;
	
	@JsonProperty(value = "actualCashBanked")
	Double actualCashBanked;
	
	@JsonProperty(value = "actualFloat")
	Double actualFloat;
	
	@JsonProperty(value = "actualLoans")
	Double actualLoans;
	
	@JsonProperty(value = "actualShortsAndOvers")
	Double actualShortsAndOvers;

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

	public String getJourneyDesc()
	{
		return journeyDesc;
	}

	public void setJourneyDesc(String journeyDesc)
	{
		this.journeyDesc = journeyDesc;
	}

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

	public Integer getYearNumber()
	{
		return yearNumber;
	}

	public void setYearNumber(Integer yearNumber)
	{
		this.yearNumber = yearNumber;
	}

	public Integer getWeekNumber()
	{
		return weekNumber;
	}

	public void setWeekNumber(Integer weekNumber)
	{
		this.weekNumber = weekNumber;
	}

	public Double getDeclaredCash()
	{
		return declaredCash;
	}

	public void setDeclaredCash(Double declaredCash)
	{
		this.declaredCash = declaredCash;
	}

	public Double getDeclaredCashBanked()
	{
		return declaredCashBanked;
	}

	public void setDeclaredCashBanked(Double declaredCashBanked)
	{
		this.declaredCashBanked = declaredCashBanked;
	}

	public Double getDeclaredFloat()
	{
		return declaredFloat;
	}

	public void setDeclaredFloat(Double declaredFloat)
	{
		this.declaredFloat = declaredFloat;
	}

	public Double getDeclaredLoans()
	{
		return declaredLoans;
	}

	public void setDeclaredLoans(Double declaredLoans)
	{
		this.declaredLoans = declaredLoans;
	}

	public Double getDeclaredRaf()
	{
		return declaredRaf;
	}

	public void setDeclaredRaf(Double declaredRaf)
	{
		this.declaredRaf = declaredRaf;
	}

	public Double getDeclaredShortsAndOvers()
	{
		return declaredShortsAndOvers;
	}

	public void setDeclaredShortsAndOvers(Double declaredShortsAndOvers)
	{
		this.declaredShortsAndOvers = declaredShortsAndOvers;
	}

	public Double getActualCash()
	{
		return actualCash;
	}

	public void setActualCash(Double actualCash)
	{
		this.actualCash = actualCash;
	}

	public Double getActualCard()
	{
		return actualCard;
	}

	public void setActualCard(Double actualCard)
	{
		this.actualCard = actualCard;
	}

	public Double getActualCentral()
	{
		return actualCentral;
	}

	public void setActualCentral(Double actualCentral)
	{
		this.actualCentral = actualCentral;
	}

	public Double getActualCashBanked()
	{
		return actualCashBanked;
	}

	public void setActualCashBanked(Double actualCashBanked)
	{
		this.actualCashBanked = actualCashBanked;
	}

	public Double getActualFloat()
	{
		return actualFloat;
	}

	public void setActualFloat(Double actualFloat)
	{
		this.actualFloat = actualFloat;
	}

	public Double getActualLoans()
	{
		return actualLoans;
	}

	public void setActualLoans(Double actualLoans)
	{
		this.actualLoans = actualLoans;
	}

	public Double getActualShortsAndOvers()
	{
		return actualShortsAndOvers;
	}

	public void setActualShortsAndOvers(Double actualShortsAndOvers)
	{
		this.actualShortsAndOvers = actualShortsAndOvers;
	}
	
	
}
