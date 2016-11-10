package com.mastek.security.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.rest.service.dto.BaseRequest;

public class UserVerificationRequest extends BaseRequest
{
	@JsonProperty(value = "surname")
	String surname;
	
	@JsonProperty(value = "macid")
	String macid;

	public String getSurname()
	{
		return surname;
	}

	public void setSurname(String surname)
	{
		this.surname = surname;
	}

	public String getMacid()
	{
		return macid;
	}

	public void setMacid(String macid)
	{
		this.macid = macid;
	}
	
}
