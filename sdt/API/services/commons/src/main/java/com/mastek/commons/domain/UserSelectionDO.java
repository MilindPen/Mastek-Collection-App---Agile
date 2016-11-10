package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

public class UserSelectionDO
{
	/** The user id. */
	@JsonProperty(value = "userId")
	long userId;
	
	/** The first name. */
	@JsonProperty(value = "firstName")
	String firstName;
	
	/** The last name. */
	@JsonProperty(value = "lastName")
	String lastName;
	
	@JsonProperty(value = "userTypeId")
	Integer userTypeId;
	
	@JsonProperty(value = "userType")
	String userType;
	
	/** The journey id. */
	@JsonProperty(value = "journeyId")
	Long journeyId;
	
	/** The description. */
	@JsonProperty(value = "journeyDescription")
	String journeyDescription;
	
	/** The branch id. */
	@JsonProperty(value = "branchId")
	Long branchId;
	
	/** The branch name. */
	@JsonProperty(value = "branchName")
	String branchName;
	
	@JsonProperty(value = "sectionId")
	Long sectionId;
   
	@JsonProperty(value = "sectionName")
   String sectionName;
	
	@JsonProperty(value = "areaId")
	Long areaId;
   
	@JsonProperty(value = "areaName")
   String areaName;
	
	@JsonProperty(value = "regionId")
	Long regionId;
   
	@JsonProperty(value = "regionName")
   String regionName;

	public long getUserId()
	{
		return userId;
	}

	public void setUserId(long userId)
	{
		this.userId = userId;
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

	public Integer getUserTypeId()
	{
		return userTypeId;
	}

	public void setUserTypeId(Integer userTypeId)
	{
		this.userTypeId = userTypeId;
	}

	public String getUserType()
	{
		return userType;
	}

	public void setUserType(String userType)
	{
		this.userType = userType;
	}

	public Long getJourneyId()
	{
		return journeyId;
	}

	public void setJourneyId(Long journeyId)
	{
		this.journeyId = journeyId;
	}

	public String getJourneyDescription()
	{
		return journeyDescription;
	}

	public void setJourneyDescription(String journeyDescription)
	{
		this.journeyDescription = journeyDescription;
	}

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

	public Long getSectionId()
	{
		return sectionId;
	}

	public void setSectionId(Long sectionId)
	{
		this.sectionId = sectionId;
	}

	public String getSectionName()
	{
		return sectionName;
	}

	public void setSectionName(String sectionName)
	{
		this.sectionName = sectionName;
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
