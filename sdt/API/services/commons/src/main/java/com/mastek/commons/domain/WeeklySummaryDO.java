package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

public class WeeklySummaryDO
{
	@JsonProperty(value = "collections")
	Double collections;
	
	@JsonProperty(value = "floatWithdrawn")
	Double floatWithdrawn;
		
	@JsonProperty(value = "loansIssued")
	Double loansIssued;
	
	@JsonProperty(value = "cashBanked")
	Double cashBanked;
	
	@JsonProperty(value = "raf")
	Double raf;

	public Double getCollections()
	{
		return collections;
	}

	public void setCollections(Double collections)
	{
		this.collections = collections;
	}

	public Double getFloatWithdrawn()
	{
		return floatWithdrawn;
	}

	public void setFloatWithdrawn(Double floatWithdrawn)
	{
		this.floatWithdrawn = floatWithdrawn;
	}

	public Double getLoansIssued()
	{
		return loansIssued;
	}

	public void setLoansIssued(Double loansIssued)
	{
		this.loansIssued = loansIssued;
	}

	public Double getCashBanked()
	{
		return cashBanked;
	}

	public void setCashBanked(Double cashBanked)
	{
		this.cashBanked = cashBanked;
	}

	public Double getRaf()
	{
		return raf;
	}

	public void setRaf(Double raf)
	{
		this.raf = raf;
	}
	
}
