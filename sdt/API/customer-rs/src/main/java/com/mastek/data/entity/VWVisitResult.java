package com.mastek.data.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "[dbo].[vwVisitResult]")
public class VWVisitResult
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ResultID")
	private long resultID;
	
	@Column(name = "VisitID")
	private long visitId;
	
	@Column(name = "StatusID")
	private Long statusId;
	
	@Column(name = "StatusDesc")
	private String statusDescription;
	
	@Column(name = "AmountPaid")
	private Double amountPaid;
	
	@Column(name = "ResultDate")
	private Date resultDate;

	public long getResultID()
	{
		return resultID;
	}

	public void setResultID(long resultID)
	{
		this.resultID = resultID;
	}

	public long getVisitId()
	{
		return visitId;
	}

	public void setVisitId(long visitId)
	{
		this.visitId = visitId;
	}

	public Long getStatusId()
	{
		return statusId;
	}

	public void setStatusId(Long statusId)
	{
		this.statusId = statusId;
	}

	public String getStatusDescription()
	{
		return statusDescription;
	}

	public void setStatusDescription(String statusDescription)
	{
		this.statusDescription = statusDescription;
	}

	public Double getAmountPaid()
	{
		return amountPaid;
	}

	public void setAmountPaid(Double amountPaid)
	{
		this.amountPaid = amountPaid;
	}

	public Date getResultDate()
	{
		return resultDate;
	}

	public void setResultDate(Date resultDate)
	{
		this.resultDate = resultDate;
	}

}
