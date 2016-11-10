package com.mastek.balancing.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.UserSelectionDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class UserSelectionResponse.
 */
public class UserSelectionResponse extends BaseResponse
{

	/** The users. */
	@JsonProperty(value = "users")
	private List<UserSelectionDO> users;

	/**
	 * Gets the users.
	 *
	 * @return the users
	 */
	public List<UserSelectionDO> getUsers()
	{
		return users;
	}

	/**
	 * Sets the users.
	 *
	 * @param users the users
	 */
	public void setUsers(List<UserSelectionDO> users)
	{
		this.users = users;
	}
	
}
