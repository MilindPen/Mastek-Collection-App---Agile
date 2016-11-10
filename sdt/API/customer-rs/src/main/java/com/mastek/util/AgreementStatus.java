package com.mastek.util;

public enum AgreementStatus {

	Active(1),Settled(2),Written_OFF(3);

	/** The status. */
	private final Integer status;

	/**
	 * Instantiates a new status.
	 *
	 * @param status the status
	 */
	AgreementStatus(Integer status)
	{
		this.status = status;
	}

	/**
	 * Gets the status.
	 *
	 * @return the status
	 */
	public Integer getStatus()
	{
		return status;
	}

}
