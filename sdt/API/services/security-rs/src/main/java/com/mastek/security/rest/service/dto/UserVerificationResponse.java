package com.mastek.security.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.UserDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

public class UserVerificationResponse extends BaseResponse
{
	@JsonProperty(value = "user")
	UserDO user;

	public UserDO getUser()
	{
		return user;
	}

	public void setUser(UserDO user)
	{
		this.user = user;
	}
	
}
