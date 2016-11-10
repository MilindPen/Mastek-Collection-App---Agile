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

/**
 * The Class VWUserSelection.
 */
@NamedQueries({@NamedQuery(name = "VWUserSelection.getUsers", query = "select us from VWUserSelection us where (us.journeyAgentStartDate<= :toDate or us.journeyAgentStartDate is null) and "
		+ "(us.journeyAgentEndDate >= :fromDate or us.journeyAgentEndDate is null) and us.userStartDate<= :toDate and "
		+ "(us.userEndDate >= :fromDate or us.userEndDate is null) and us.branchId = :branchId and us.userTypeId in(2,3) order by branchName,userType,firstName,lastName asc"),
	@NamedQuery(name = "VWUserSelection.getUsersAll", query = "select us from VWUserSelection us where (us.journeyAgentStartDate<= :toDate or us.journeyAgentStartDate is null) and "
			+ "(us.journeyAgentEndDate >= :fromDate or us.journeyAgentEndDate is null) and us.userStartDate<= :toDate and "
			+ "(us.userEndDate >= :fromDate or us.userEndDate is null) and us.userTypeId in(2,3) order by branchName,userType,firstName,lastName asc")})

@Entity
@Table(name = "[mobile].[vwUserSelection]")
public class VWUserSelection
{
	/** The user id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "UserID")
	private long userId;
	
	/** The first name. */
	@Column(name = "FirstName")
	private String firstName;
	
	/** The surname. */
	@Column(name = "Lastname")
	private String lastName;
	
	/** The user type id. */
	@Column(name = "UserTypeID")
	private Integer userTypeId;
	
	/** The user type. */
	@Column(name = "UserType")
	private String userType;
	
	/** The journey id. */
	@Column(name = "JourneyID")
	private Long journeyId;

	/** The description. */
	@Column(name = "JourneyDesc")
	private String journeyDescription;
	
	/** The section id. */
	@Column(name = "SectionID")
   private Long sectionId;
   
	/** The section name. */
	@Column(name = "SectionName")
   private String sectionName;
	
	/** The branch id. */
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
	
	/** The start date. */
	@Column(name = "JourneyAgentStartDate")
	private Date journeyAgentStartDate;

	/** The end date. */
	@Column(name = "JourneyAgentEndDate")
	private Date journeyAgentEndDate;
	
	/** The start date. */
	@Column(name = "UserStartDate")
	private Date userStartDate;

	/** The end date. */
	@Column(name = "UserEndDate")
	private Date userEndDate;

	/**
	 * Gets the user id.
	 *
	 * @return the user id
	 */
	public long getUserId()
	{
		return userId;
	}

	/**
	 * Sets the user id.
	 *
	 * @param userId the user id
	 */
	public void setUserId(long userId)
	{
		this.userId = userId;
	}

	/**
	 * Gets the first name.
	 *
	 * @return the first name
	 */
	public String getFirstName()
	{
		return firstName;
	}

	/**
	 * Sets the first name.
	 *
	 * @param firstName the first name
	 */
	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}

	/**
	 * Gets the last name.
	 *
	 * @return the last name
	 */
	public String getLastName()
	{
		return lastName;
	}

	/**
	 * Sets the last name.
	 *
	 * @param lastName the last name
	 */
	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

	/**
	 * Gets the user type id.
	 *
	 * @return the user type id
	 */
	public Integer getUserTypeId()
	{
		return userTypeId;
	}

	/**
	 * Sets the user type id.
	 *
	 * @param userTypeId the user type id
	 */
	public void setUserTypeId(Integer userTypeId)
	{
		this.userTypeId = userTypeId;
	}

	/**
	 * Gets the user type.
	 *
	 * @return the user type
	 */
	public String getUserType()
	{
		return userType;
	}

	/**
	 * Sets the user type.
	 *
	 * @param userType the user type
	 */
	public void setUserType(String userType)
	{
		this.userType = userType;
	}

	/**
	 * Gets the journey id.
	 *
	 * @return the journey id
	 */
	public Long getJourneyId()
	{
		return journeyId;
	}

	/**
	 * Sets the journey id.
	 *
	 * @param journeyId the journey id
	 */
	public void setJourneyId(Long journeyId)
	{
		this.journeyId = journeyId;
	}

	/**
	 * Gets the journey description.
	 *
	 * @return the journey description
	 */
	public String getJourneyDescription()
	{
		return journeyDescription;
	}

	/**
	 * Sets the journey description.
	 *
	 * @param journeyDescription the journey description
	 */
	public void setJourneyDescription(String journeyDescription)
	{
		this.journeyDescription = journeyDescription;
	}

	/**
	 * Gets the section id.
	 *
	 * @return the section id
	 */
	public Long getSectionId()
	{
		return sectionId;
	}

	/**
	 * Sets the section id.
	 *
	 * @param sectionId the section id
	 */
	public void setSectionId(Long sectionId)
	{
		this.sectionId = sectionId;
	}

	/**
	 * Gets the section name.
	 *
	 * @return the section name
	 */
	public String getSectionName()
	{
		return sectionName;
	}

	/**
	 * Sets the section name.
	 *
	 * @param sectionName the section name
	 */
	public void setSectionName(String sectionName)
	{
		this.sectionName = sectionName;
	}

	/**
	 * Gets the branch id.
	 *
	 * @return the branch id
	 */
	public Long getBranchId()
	{
		return branchId;
	}

	/**
	 * Sets the branch id.
	 *
	 * @param branchId the branch id
	 */
	public void setBranchId(Long branchId)
	{
		this.branchId = branchId;
	}

	/**
	 * Gets the branch name.
	 *
	 * @return the branch name
	 */
	public String getBranchName()
	{
		return branchName;
	}

	/**
	 * Sets the branch name.
	 *
	 * @param branchName the branch name
	 */
	public void setBranchName(String branchName)
	{
		this.branchName = branchName;
	}

	/**
	 * Gets the area id.
	 *
	 * @return the area id
	 */
	public Long getAreaId()
	{
		return areaId;
	}

	/**
	 * Sets the area id.
	 *
	 * @param areaId the area id
	 */
	public void setAreaId(Long areaId)
	{
		this.areaId = areaId;
	}

	/**
	 * Gets the area name.
	 *
	 * @return the area name
	 */
	public String getAreaName()
	{
		return areaName;
	}

	/**
	 * Sets the area name.
	 *
	 * @param areaName the area name
	 */
	public void setAreaName(String areaName)
	{
		this.areaName = areaName;
	}

	/**
	 * Gets the region id.
	 *
	 * @return the region id
	 */
	public Long getRegionId()
	{
		return regionId;
	}

	/**
	 * Sets the region id.
	 *
	 * @param regionId the region id
	 */
	public void setRegionId(Long regionId)
	{
		this.regionId = regionId;
	}

	/**
	 * Gets the region name.
	 *
	 * @return the region name
	 */
	public String getRegionName()
	{
		return regionName;
	}

	/**
	 * Sets the region name.
	 *
	 * @param regionName the region name
	 */
	public void setRegionName(String regionName)
	{
		this.regionName = regionName;
	}

	/**
	 * Gets the journey agent start date.
	 *
	 * @return the journey agent start date
	 */
	public Date getJourneyAgentStartDate()
	{
		return journeyAgentStartDate;
	}

	/**
	 * Sets the journey agent start date.
	 *
	 * @param journeyAgentStartDate the journey agent start date
	 */
	public void setJourneyAgentStartDate(Date journeyAgentStartDate)
	{
		this.journeyAgentStartDate = journeyAgentStartDate;
	}

	/**
	 * Gets the journey agent end date.
	 *
	 * @return the journey agent end date
	 */
	public Date getJourneyAgentEndDate()
	{
		return journeyAgentEndDate;
	}

	/**
	 * Sets the journey agent end date.
	 *
	 * @param journeyAgentEndDate the journey agent end date
	 */
	public void setJourneyAgentEndDate(Date journeyAgentEndDate)
	{
		this.journeyAgentEndDate = journeyAgentEndDate;
	}

	/**
	 * Gets the user start date.
	 *
	 * @return the user start date
	 */
	public Date getUserStartDate()
	{
		return userStartDate;
	}

	/**
	 * Sets the user start date.
	 *
	 * @param userStartDate the user start date
	 */
	public void setUserStartDate(Date userStartDate)
	{
		this.userStartDate = userStartDate;
	}

	/**
	 * Gets the user end date.
	 *
	 * @return the user end date
	 */
	public Date getUserEndDate()
	{
		return userEndDate;
	}

	/**
	 * Sets the user end date.
	 *
	 * @param userEndDate the user end date
	 */
	public void setUserEndDate(Date userEndDate)
	{
		this.userEndDate = userEndDate;
	}

}
