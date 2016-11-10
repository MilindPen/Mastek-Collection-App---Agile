package com.mastek.commons.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({ @NamedQuery(name = "VWBranchDetails.getBranch", query = "select bd from VWBranchDetails bd order by branchName")})

@Entity
@Table(name = "[mobile].[vwBranchDetails]")
public class VWBranchDetails
{
	/** The branch id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BranchId")
	private Long branchId;
	
	/** The branch name. */
	@Column(name = "BranchName")
	private String branchName;
   
	/** The area id. */
	@Column(name = "AreaID")
   private Long areaId;
   
	/** The area name. */
	@Column(name = "AreaName")
   private String areaName;
   
	/** The region id. */
	@Column(name = "RegionID")
   private Long regionId;
   
	/** The region name. */
	@Column(name = "RegionName")
   private String regionName;

	public Long getBranchId()
	{
		return branchId;
	}

	public void setBranchId(Long branchId)
	{
		this.branchId = branchId;
	}

	public String getBranchName()
	{
		return branchName;
	}

	public void setBranchName(String branchName)
	{
		this.branchName = branchName;
	}

	public Long getAreaId()
	{
		return areaId;
	}

	public void setAreaId(Long areaId)
	{
		this.areaId = areaId;
	}

	public String getAreaName()
	{
		return areaName;
	}

	public void setAreaName(String areaName)
	{
		this.areaName = areaName;
	}

	public Long getRegionId()
	{
		return regionId;
	}

	public void setRegionId(Long regionId)
	{
		this.regionId = regionId;
	}

	public String getRegionName()
	{
		return regionName;
	}

	public void setRegionName(String regionName)
	{
		this.regionName = regionName;
	}

}
