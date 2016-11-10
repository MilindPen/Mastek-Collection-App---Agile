package com.mastek.commons.exception;
public class SystemException extends RuntimeException {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -6164231761715511033L;
	
	/** The type. */
	private final Type type;
	
	/**
	 * Instantiates a new system exception.
	 *
	 * @param type the type
	 */
	public SystemException(Type type) {
		super(type.getMessage());
		this.type=type;		
	}
	
	/**
	 * Instantiates a new system exception.
	 *
	 * @param type the type
	 * @param cause the cause
	 */
	public SystemException(Type type, Throwable cause) {
		super(type.getMessage(), cause);
		this.type=type;	
	}	
	
	/**
	 * Gets the type.
	 *
	 * @return the type
	 */
	public Type getType() {
		return type;
	}

	/**
	 * Gets the serialversionuid.
	 *
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	/**
	 * Private enum Type.
	 *
	 * @author manish13481
	 */
	public enum Type {
		
		UE("UnknownException", "ERR-000", "UnknownException occured"),
		HE("HibernateException", "ERR-100", "HibernateException occured"),
		CVE("ConstraintViolationException", "ERR-101", "ConstraintViolationException occured"), 
		DE("DataException", "ERR-102", "DataException occured"),
		GJDBCE("GenericJDBCException", "ERR-103", "GenericJDBCException occured"),
		JDBCCE("JDBCConnectionException", "ERR-104", "JDBCConnectionException occured"),
		LAE("LockAcquisitionException", "ERR-105", "LockAcquisitionException occured"),
		SQLGE("SQLGrammarException", "ERR-106", "SQLGrammarException occured"),
		SQLSP("SQLProcedureException", "ERR-150", "SQLExceptionInStoredProcedure occured"),
		NRE("NoRecordsFoundException", "ERR-250", "No Records Found Exception"),
		SQLCSP("SQLCustomerUpdateProcedureException", "ERR-151", "SQLCustomerUpdateProcedureException occured"),
		NRECU("NoRecordsFoundInCustomerUpdateException", "ERR-251", "NoRecordsFoundInCustomerUpdateException occured"),
		MJFE("MultipleJourneyFoundException", "ERR-207", "MultipleJourneyFoundException occured"),
		BTSP("SQLBalanceTransactionProcedureException", "ERR-152", "SQLBalanceTransactionProcedureException occured"),
		NRBTE("NoRecordsFoundInBalanceTransactionException", "ERR-252", "NoRecordsFoundInBalanceTransactionException occured"),
		CBFWSP("SQLCloseBranchForWeekProcedureException", "ERR-153", "SQLCloseBranchForWeekProcedureException occured"),
		BBSP("SQLBranchBalanceReportProcedureException", "ERR-154", "SQLBranchBalanceReportProcedureException occured"),
		JBSP("SQLJourneyBalanceReportProcedureException", "ERR-155", "SQLJourneyBalanceReportProcedureException occured"),
		JBDSP("SQLJourneyBalanceReportDetailsProcedureException", "ERR-156", "SQLJourneyBalanceReportDetailsProcedureException occured"),
		JDCSP("SQLJourneyDelegationCustomersProcedureException", "ERR-157", "SQLJourneyDelegationCustomersProcedureException occured"),
		SDCSP("SQLSaveDelegatedCustomersProcedureException", "ERR-158", "SQLSaveDelegatedCustomersProcedureException occured");
		
		/** The name. */
		private String name;
		
		/** The message. */
		private String message;
		/** Error Code. */
		private String errorCode;

		/**
		 * Instantiates a new type.
		 *
		 * @param name the name
		 * @param message the message
		 */
		Type(String name, String errorCode, String message) {
			this.name = name;
			this.errorCode = errorCode;
			this.message = message;
		}

		/**
		 * Gets the name.
		 *
		 * @return the name
		 */
		public String getName() {
			return this.name;
		}

		/**
		 * Gets the message.
		 *
		 * @return the message
		 */
		public String getErrorCode() {
			return this.errorCode;
		}
		/**
		 * Gets the message.
		 *
		 * @return the message
		 */
		public String getMessage() {
			return this.message;
		}		
	}
	
}
