package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class UserDO.
 */
public class UserDO
{
	
	/** The user id. */
	@JsonProperty(value = "userId")
	long userId;
	
	/** The mobile user id. */
	@JsonProperty(value = "mobileUserId")
	Long mobileUserId;
	
	/** The title. */
	@JsonProperty(value = "title")
	String title;
	
	/** The first name. */
	@JsonProperty(value = "firstName")
	String firstName;
	
	/** The middle name. */
	@JsonProperty(value = "middleName")
	String middleName;
	
	/** The last name. */
	@JsonProperty(value = "lastName")
	String lastName;
	
	/** The pin. */
	@JsonProperty(value = "pin")
	String pin;
	
	/** The mac address. */
	@JsonProperty(value = "macAddress")
	String macAddress;
	
	/** The is active. */
	@JsonProperty(value = "isActive")
	Boolean isActive;
	
	/** The email. */
	@JsonProperty(value = "email")
	String email;
	
	/** The user type id. */
	@JsonProperty(value = "userTypeId")
	Integer userTypeId;
	
	/** The user type. */
	@JsonProperty(value = "userType")
	String userType;

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
	 * Gets the mobile user id.
	 *
	 * @return the mobile user id
	 */
	public Long getMobileUserId()
	{
		return mobileUserId;
	}

	/**
	 * Sets the mobile user id.
	 *
	 * @param mobileUserId the mobile user id
	 */
	public void setMobileUserId(Long mobileUserId)
	{
		this.mobileUserId = mobileUserId;
	}

	/**
	 * Gets the pin.
	 *
	 * @return the pin
	 */
	public String getPin()
	{
		return pin;
	}

	/**
	 * Sets the pin.
	 *
	 * @param pin the pin
	 */
	public void setPin(String pin)
	{
		this.pin = pin;
	}

	/**
	 * Gets the mac address.
	 *
	 * @return the mac address
	 */
	public String getMacAddress()
	{
		return macAddress;
	}

	/**
	 * Sets the mac address.
	 *
	 * @param macAddress the mac address
	 */
	public void setMacAddress(String macAddress)
	{
		this.macAddress = macAddress;
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
	 * Gets the email.
	 *
	 * @return the email
	 */
	public String getEmail()
	{
		return email;
	}

	/**
	 * Sets the email.
	 *
	 * @param email the email
	 */
	public void setEmail(String email)
	{
		this.email = email;
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
	
}
