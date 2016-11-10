package com.mastek.commons.exception;

/**
 * The class ServiceException
 * @author manish13481
 *
 */
public class ServiceException extends Exception {

	/**
	 * A system exception 
	 */
	private SystemException systemException;
	/**
	 * An application exception
	 */
	private ApplicationException applicationException;

	/**
	 * Gets system exception 
	 * @return
	 */
	public SystemException getSystemException() {
		return systemException;
	}
	/**
	 * Sets system exception
	 * @param systemException
	 */
	public void setSystemException(SystemException systemException) {
		this.systemException = systemException;
	}
	/**
	 * Gets application exception
	 * @return
	 */
	public ApplicationException getApplicationException() {
		return applicationException;
	}
	/**
	 * Set application exception
	 * @param applicationException
	 */
	public void setApplicationException(ApplicationException applicationException) {
		this.applicationException = applicationException;
	}

	public String getErrorCode(){

		if (getSystemException() != null){
			return getSystemException().getType().getErrorCode();
		} else if (getApplicationException() != null){
			return getApplicationException().getType().getErrorCode();
		} else {
			return SystemException.Type.UE.getErrorCode();
		}
	}
	
}
