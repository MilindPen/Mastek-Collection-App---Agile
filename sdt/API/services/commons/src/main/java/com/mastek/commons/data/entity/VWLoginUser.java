package com.mastek.commons.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({@NamedQuery(name = "VWLoginUser.getUser", query = "select u from VWLoginUser u where u.userId =:userId and u.lastName=:surname and u.isActive=1 ")})

@Entity
@Table(name = "[mobile].[vwLoginUser]")
public class VWLoginUser
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SDTUser")
	private long userId;
	
	@Column(name = "MobileUser")
	private Long mobileUserId;
	
	@Column(name = "Title")
	private String title;
	
	@Column(name = "FirstName")
	private String firstName;
	
	@Column(name = "MiddleName")
	private String middleName;
	
	@Column(name = "LastName")
	private String lastName;
	
	@Column(name = "PIN")
	private String pin;
	
	@Column(name = "MacAddress")
	private String macAddress;
	
	@Column(name = "IsActive")
	private Boolean isActive;

	public Long getMobileUserId()
	{
		return mobileUserId;
	}

	public void setMobileUserId(Long mobileUserId)
	{
		this.mobileUserId = mobileUserId;
	}

	public String getTitle()
	{
		return title;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}

	public String getFirstName()
	{
		return firstName;
	}

	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}

	public String getMiddleName()
	{
		return middleName;
	}

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

	public String getPin()
	{
		return pin;
	}

	public void setPin(String pin)
	{
		this.pin = pin;
	}

	public String getMacAddress()
	{
		return macAddress;
	}

	public void setMacAddress(String macAddress)
	{
		this.macAddress = macAddress;
	}

	public Boolean getIsActive()
	{
		return isActive;
	}

	public void setIsActive(Boolean isActive)
	{
		this.isActive = isActive;
	}

	public long getUserId()
	{
		return userId;
	}

	public void setUserId(long userId)
	{
		this.userId = userId;
	}

}
