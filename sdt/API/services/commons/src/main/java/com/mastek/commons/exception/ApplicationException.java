package com.mastek.commons.exception;
public class ApplicationException extends Exception {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 3614250693201804824L;
	
	/** The type. */
	private final Type type;
	
	/**
	 * Instantiates a new application exception.
	 *
	 * @param type the type
	 */
	public ApplicationException(Type type) {
		super(type.getMessage());
		this.type=type;	
	}
	
	/**
	 * Instantiates a new application exception.
	 *
	 * @param type the type
	 * @param cause the cause
	 */
	public ApplicationException(Type type, Throwable cause) {
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
	 * Inner Enum Type.
	 *
	 * @author manish13481
	 */
	public enum Type {

		NVFE("NoVisitsFoundException", "ERR-202", "NoVisitsFoundException occured"),
		NSUE("NotSDTUserException", "ERR-203", "NotSDTUserException occured"),
		DRE("DuplicateRegistrationException", "ERR-204", "DuplicateRegistrationException occured"),
		URE("UserRegistrationException", "ERR-205", "UserRegistrationException occured"),
      FCE("FetchCurrentWeekException","ERR-206","Fetch Current Week Exception Occured"),
      WSE("WeekSelectionException","ERR-208","Week Selection Exception Occured"),
		NJFE("NoJourneysFoundException","ERR-209","NoJourneysFoundException Occured"),
		NUFE("NoUsersFoundException","ERR-210","NoUsersFoundException Occured"),
		BWSNFE("BranchWeekStatusNotFoundException","ERR-211","BranchWeekStatusNotFoundException Occured"),
		IAUE("InactiveUserException","ERR-212","InactiveUserException Occured"),
		ENFE("EmailNotFoundException","ERR-213","EmailNotFoundException Occured"),
		NJAE("NoJourneyAssignedException","ERR-214","NoJourneyAssignedException Occured");
		
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
