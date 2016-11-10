/**
 * 
 */
package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author Monika10793
 *
 */
public class BranchSelectionDO
{
	/** The branch id. */
	@JsonProperty(value = "branchId")
	Long branchId;
	
	/** The branch name. */
	@JsonProperty(value = "branchName")
	String branchName;
	
	@JsonProperty(value = "areaId")
	Long areaId;
   
	@JsonProperty(value = "areaName")
   String areaName;
	
	@JsonProperty(value = "regionId")
	Long regionId;
   
	@JsonProperty(value = "regionName")
   String regionName;

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
