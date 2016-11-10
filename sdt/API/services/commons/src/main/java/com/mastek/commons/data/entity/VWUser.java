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

@NamedQueries({
	@NamedQuery(name = "VWUser.getUser", query = "select u from VWUser u where u.userId =:userId"),
	@NamedQuery(name = "VWUser.getUserByEmail", query = "select u from VWUser u where u.email =:emailId")})

@Entity
@Table(name = "[dbo].[vwUser]")
public class VWUser
{

	/** The user id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "UserID")
	private long userId;

	/** The title. */
	@Column(name = "Title")
	private String title;

	/** The first name. */
	@Column(name = "FirstName")
	private String firstName;

	/** The middle name. */
	@Column(name = "MiddleName")
	private String middleName;

	/** The surname. */
	@Column(name = "LastName")
	private String lastName;

	/** The address line1. */
	@Column(name = "addressLine1")
	private String addressLine1;

	/** The address line2. */
	@Column(name = "addressLine2")
	private String addressLine2;

	/** The address line3. */
	@Column(name = "addressLine3")
	private String addressLine3;

	/** The address line4. */
	@Column(name = "addressLine4")
	private String addressLine4;

	/** The city. */
	@Column(name = "City")
	private String city;

	/** The postcode. */
	@Column(name = "PostCode")
	private String postcode;

	/** The start date. */
	@Column(name = "StartDate")
	private Date startDate;

	/** The end date. */
	@Column(name = "EndDate")
	private Date endDate;

	/** The is active. */
	@Column(name = "isActive")
	private Boolean isActive;

	/** The created date. */
	@Column(name = "CreatedDate")
	private Date createdDate;

	/** The created by. */
	@Column(name = "CreatedBy")
	private String createdBy;

	/** The updated date. */
	@Column(name = "UpdatedDate")
	private Date updatedDate;

	/** The updated by. */
	@Column(name = "UpdatedUserID")
	private String updatedBy;
	
	@Column(name = "Email")
	private String email;
	
	@Column(name = "UserTypeID")
	private Integer userTypeId;
	
	@Column(name = "UserType")
	private String userType;

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
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle()
	{
		return title;
	}

	/**
	 * Sets the title.
	 *
	 * @param title the title
	 */
	public void setTitle(String title)
	{
		this.title = title;
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
	 * Gets the middle name.
	 *
	 * @return the middle name
	 */
	public String getMiddleName()
	{
		return middleName;
	}

	/**
	 * Sets the middle name.
	 *
	 * @param middleName the middle name
	 */
	public void setMiddleName(String middleName)
	{
		this.middleName = middleName;
	}

	public String getLastName()
	{
		return lastName;
	}

	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

	/**
	 * Gets the address line1.
	 *
	 * @return the address line1
	 */
	public String getAddressLine1()
	{
		return addressLine1;
	}

	/**
	 * Sets the address line1.
	 *
	 * @param addressLine1 the address line1
	 */
	public void setAddressLine1(String addressLine1)
	{
		this.addressLine1 = addressLine1;
	}

	/**
	 * Gets the address line2.
	 *
	 * @return the address line2
	 */
	public String getAddressLine2()
	{
		return addressLine2;
	}

	/**
	 * Sets the address line2.
	 *
	 * @param addressLine2 the address line2
	 */
	public void setAddressLine2(String addressLine2)
	{
		this.addressLine2 = addressLine2;
	}

	/**
	 * Gets the address line3.
	 *
	 * @return the address line3
	 */
	public String getAddressLine3()
	{
		return addressLine3;
	}

	/**
	 * Sets the address line3.
	 *
	 * @param addressLine3 the address line3
	 */
	public void setAddressLine3(String addressLine3)
	{
		this.addressLine3 = addressLine3;
	}

	/**
	 * Gets the address line4.
	 *
	 * @return the address line4
	 */
	public String getAddressLine4()
	{
		return addressLine4;
	}

	/**
	 * Sets the address line4.
	 *
	 * @param addressLine4 the address line4
	 */
	public void setAddressLine4(String addressLine4)
	{
		this.addressLine4 = addressLine4;
	}

	/**
	 * Gets the checks if is active.
	 *
	 * @return the checks if is active
	 */
	public Boolean getIsActive()
	{
		return isActive;
	}

	/**
	 * Sets the checks if is active.
	 *
	 * @param isActive the checks if is active
	 */
	public void setIsActive(Boolean isActive)
	{
		this.isActive = isActive;
	}

	/**
	 * Gets the city.
	 *
	 * @return the city
	 */
	public String getCity()
	{
		return city;
	}

	/**
	 * Sets the city.
	 *
	 * @param city the city
	 */
	public void setCity(String city)
	{
		this.city = city;
	}

	/**
	 * Gets the postcode.
	 *
	 * @return the postcode
	 */
	public String getPostcode()
	{
		return postcode;
	}

	/**
	 * Sets the postcode.
	 *
	 * @param postcode the postcode
	 */
	public void setPostcode(String postcode)
	{
		this.postcode = postcode;
	}

	/**
	 * Gets the start date.
	 *
	 * @return the start date
	 */
	public Date getStartDate()
	{
		return startDate;
	}

	/**
	 * Sets the start date.
	 *
	 * @param startDate the start date
	 */
	public void setStartDate(Date startDate)
	{
		this.startDate = startDate;
	}

	/**
	 * Gets the end date.
	 *
	 * @return the end date
	 */
	public Date getEndDate()
	{
		return endDate;
	}

	/**
	 * Sets the end date.
	 *
	 * @param endDate the end date
	 */
	public void setEndDate(Date endDate)
	{
		this.endDate = endDate;
	}

	/**
	 * Checks if is active.
	 *
	 * @return the boolean
	 */
	public Boolean isActive()
	{
		return isActive;
	}

	/**
	 * Sets the active.
	 *
	 * @param isActive the active
	 */
	public void setActive(Boolean isActive)
	{
		this.isActive = isActive;
	}

	/**
	 * Gets the created date.
	 *
	 * @return the created date
	 */
	public Date getCreatedDate()
	{
		return createdDate;
	}

	/**
	 * Sets the created date.
	 *
	 * @param createdDate the created date
	 */
	public void setCreatedDate(Date createdDate)
	{
		this.createdDate = createdDate;
	}

	/**
	 * Gets the created by.
	 *
	 * @return the created by
	 */
	public String getCreatedBy()
	{
		return createdBy;
	}

	/**
	 * Sets the created by.
	 *
	 * @param createdBy the created by
	 */
	public void setCreatedBy(String createdBy)
	{
		this.createdBy = createdBy;
	}

	/**
	 * Gets the updated date.
	 *
	 * @return the updated date
	 */
	public Date getUpdatedDate()
	{
		return updatedDate;
	}

	/**
	 * Sets the updated date.
	 *
	 * @param updatedDate the updated date
	 */
	public void setUpdatedDate(Date updatedDate)
	{
		this.updatedDate = updatedDate;
	}

	/**
	 * Gets the updated by.
	 *
	 * @return the updated by
	 */
	public String getUpdatedBy()
	{
		return updatedBy;
	}

	/**
	 * Sets the updated by.
	 *
	 * @param updatedBy the updated by
	 */
	public void setUpdatedBy(String updatedBy)
	{
		this.updatedBy = updatedBy;
	}

	public String getEmail()
	{
		return email;
	}

	public void setEmail(String email)
	{
		this.email = email;
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
	
}
