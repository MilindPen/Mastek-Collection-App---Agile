package com.mastek.commons.exception;

/**
 * The Class DataStoreException.
 */
public class DataStoreException extends Exception {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -6164231761715511033L;
	
	/** The system exception. */
	private final SystemException systemException;
	
	/**
	 * Instantiates a new data store exception.
	 *
	 * @param systemException the system exception
	 */
	public DataStoreException(SystemException systemException){
		super(systemException.getMessage());
		this.systemException=systemException;
	}
	
	/**
	 * Gets the system exception.
	 *
	 * @return the system exception
	 */
	public SystemException getSystemException() {
		return systemException;
	}
	
	

}
