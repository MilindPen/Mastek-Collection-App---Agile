package com.mastek.commons.domain;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class JourneyBalanceReportDetailsDO
{
	@JsonProperty(value = "declaredCollections")
	List<JourneyBalanceReportDetailsDataDO> declaredCollections = new ArrayList<JourneyBalanceReportDetailsDataDO>();
	
	@JsonProperty(value = "actualCollections")
	List<JourneyBalanceReportDetailsDataDO> actualCollections = new ArrayList<JourneyBalanceReportDetailsDataDO>();
	
	@JsonProperty(value = "declaredFloats")
	List<JourneyBalanceReportDetailsDataDO> declaredFloats = new ArrayList<JourneyBalanceReportDetailsDataDO>();
	
	@JsonProperty(value = "actualFloats")
	List<JourneyBalanceReportDetailsDataDO> actualFloats = new ArrayList<JourneyBalanceReportDetailsDataDO>();
	
	@JsonProperty(value = "declaredLoans")
	List<JourneyBalanceReportDetailsDataDO> declaredLoans = new ArrayList<JourneyBalanceReportDetailsDataDO>();
	
	@JsonProperty(value = "actualLoans")
	List<JourneyBalanceReportDetailsDataDO> actualLoans = new ArrayList<JourneyBalanceReportDetailsDataDO>();
	
	@JsonProperty(value = "declaredCashBanked")
	List<JourneyBalanceReportDetailsDataDO> declaredCashBanked = new ArrayList<JourneyBalanceReportDetailsDataDO>();
	
	@JsonProperty(value = "actualCashBanked")
	List<JourneyBalanceReportDetailsDataDO> actualCashBanked = new ArrayList<JourneyBalanceReportDetailsDataDO>();
	
	@JsonProperty(value = "declaredRaf")
	List<JourneyBalanceReportDetailsDataDO> declaredRaf = new ArrayList<JourneyBalanceReportDetailsDataDO>();

	public List<JourneyBalanceReportDetailsDataDO> getDeclaredCollections()
	{
		return declaredCollections;
	}

	public void setDeclaredCollections(List<JourneyBalanceReportDetailsDataDO> declaredCollections)
	{
		this.declaredCollections = declaredCollections;
	}

	public List<JourneyBalanceReportDetailsDataDO> getActualCollections()
	{
		return actualCollections;
	}

	public void setActualCollections(List<JourneyBalanceReportDetailsDataDO> actualCollections)
	{
		this.actualCollections = actualCollections;
	}

	public List<JourneyBalanceReportDetailsDataDO> getDeclaredFloats()
	{
		return declaredFloats;
	}

	public void setDeclaredFloats(List<JourneyBalanceReportDetailsDataDO> declaredFloats)
	{
		this.declaredFloats = declaredFloats;
	}

	public List<JourneyBalanceReportDetailsDataDO> getActualFloats()
	{
		return actualFloats;
	}

	public void setActualFloats(List<JourneyBalanceReportDetailsDataDO> actualFloats)
	{
		this.actualFloats = actualFloats;
	}

	public List<JourneyBalanceReportDetailsDataDO> getDeclaredLoans()
	{
		return declaredLoans;
	}

	public void setDeclaredLoans(List<JourneyBalanceReportDetailsDataDO> declaredLoans)
	{
		this.declaredLoans = declaredLoans;
	}

	public List<JourneyBalanceReportDetailsDataDO> getActualLoans()
	{
		return actualLoans;
	}

	public void setActualLoans(List<JourneyBalanceReportDetailsDataDO> actualLoans)
	{
		this.actualLoans = actualLoans;
	}

	public List<JourneyBalanceReportDetailsDataDO> getDeclaredCashBanked()
	{
		return declaredCashBanked;
	}

	public void setDeclaredCashBanked(List<JourneyBalanceReportDetailsDataDO> declaredCashBanked)
	{
		this.declaredCashBanked = declaredCashBanked;
	}

	public List<JourneyBalanceReportDetailsDataDO> getActualCashBanked()
	{
		return actualCashBanked;
	}

	public void setActualCashBanked(List<JourneyBalanceReportDetailsDataDO> actualCashBanked)
	{
		this.actualCashBanked = actualCashBanked;
	}

	public List<JourneyBalanceReportDetailsDataDO> getDeclaredRaf()
	{
		return declaredRaf;
	}

	public void setDeclaredRaf(List<JourneyBalanceReportDetailsDataDO> declaredRaf)
	{
		this.declaredRaf = declaredRaf;
	}
	
}
