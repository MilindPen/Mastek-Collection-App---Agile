package com.mastek.commons.rest.service.dto;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.AccessDO;

/**
 * The Class BaseRequest.
 */
public abstract class BaseRequest
{

	/** The access. */
	@JsonProperty("access")
	AccessDO access;

	/**
	 * Gets the access.
	 *
	 * @return the access
	 */
	public AccessDO getAccess()
	{
		return access;
	}

	/**
	 * Sets the access.
	 *
	 * @param access the access
	 */
	public void setAccess(AccessDO access)
	{
		this.access = access;
	}

}
