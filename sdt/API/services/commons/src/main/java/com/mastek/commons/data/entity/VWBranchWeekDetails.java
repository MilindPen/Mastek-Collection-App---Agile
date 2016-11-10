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

@NamedQueries({ @NamedQuery(name = "VWBranchWeekDetails.getStatus", query = "select wd from VWBranchWeekDetails wd where wd.yearNo=:yearNo and wd.weekNo=:weekNo and wd.branchId=:branchId")})

@Entity
@Table(name = "[mobile].[vwBranchClosedWeekDetails]")
public class VWBranchWeekDetails
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BranchClosedWeekID")
	private long branchClosedWeekId;

	@Column(name = "BranchID")
	private long branchId;

	@Column(name = "WeekNo")
	private int weekNo;

	@Column(name = "YearNo")
	private int yearNo;

	@Column(name = "WeekStatusID")
	private Integer weekStatusId;

	@Column(name = "WeekStatusDesc")
	private String weekStatusDesc;
	
	@Column(name = "ClosedDateTime")
	private Date closedDateTime;
	
	@Column(name = "FirstName")
	private String firstName;
	
	@Column(name = "LastName")
	private String lastName;

	public long getBranchClosedWeekId()
	{
		return branchClosedWeekId;
	}

	public void setBranchClosedWeekId(long branchClosedWeekId)
	{
		this.branchClosedWeekId = branchClosedWeekId;
	}

	public long getBranchId()
	{
		return branchId;
	}

	public void setBranchId(long branchId)
	{
		this.branchId = branchId;
	}

	public int getWeekNo()
	{
		return weekNo;
	}

	public void setWeekNo(int weekNo)
	{
		this.weekNo = weekNo;
	}

	public int getYearNo()
	{
		return yearNo;
	}

	public void setYearNo(int yearNo)
	{
		this.yearNo = yearNo;
	}

	public String getWeekStatusDesc()
	{
		return weekStatusDesc;
	}

	public void setWeekStatusDesc(String weekStatusDesc)
	{
		this.weekStatusDesc = weekStatusDesc;
	}

	public Integer getWeekStatusId()
	{
		return weekStatusId;
	}

	public void setWeekStatusId(Integer weekStatusId)
	{
		this.weekStatusId = weekStatusId;
	}

	public Date getClosedDateTime()
	{
		return closedDateTime;
	}

	public void setClosedDateTime(Date closedDateTime)
	{
		this.closedDateTime = closedDateTime;
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
}
