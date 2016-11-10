package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class SynchronizDO.
 */
public class SynchronizDO {
	
	/** The visit id. */
	@JsonProperty(value="VisitID")
	private String visitID;
	
	/** The customer id. */
	@JsonProperty(value="CustomerID")
	private String customerID;

	/** The result id. */
	@JsonProperty(value="ResultID")
	private String resultID;
	
	/** The result date. */
	@JsonProperty(value="ResultDate")
	private String resultDate;
    
	/** The result status id. */
	@JsonProperty(value="ResultStatusID")
	private String resultStatusID;

	/** The visit status id. */
	@JsonProperty(value="VisitStatusID")
	private String visitStatusID;

	/** The agreement id. */
	@JsonProperty(value="AgreementID")
	private String agreementID;
	
	/** The agreement mode. */
	@JsonProperty(value="AgreementMode")
	private String agreementMode;

	/** The agreement amount paid. */
	@JsonProperty(value="AgreementAmountPaid")
	private String agreementAmountPaid;
	
	/** The journey id. */
	@JsonProperty(value = "journeyId")
	private long journeyId;
	
	
	/**
	 * Gets the customer id.
	 *
	 * @return the customerID
	 */
	public String getCustomerID() {
		return customerID;
	}

	/**
	 * Sets the customer id.
	 *
	 * @param customerID the customerID to set
	 */
	public void setCustomerID(String customerID) {
		this.customerID = customerID;
	}

	/**
	 * Gets the result id.
	 *
	 * @return the resultID
	 */
	public String getResultID() {
		return resultID;
	}

	/**
	 * Sets the result id.
	 *
	 * @param resultID the resultID to set
	 */
	public void setResultID(String resultID) {
		this.resultID = resultID;
	}

	

	/**
	 * Gets the visit status id.
	 *
	 * @return the visitStatusID
	 */
	public String getVisitStatusID() {
		return visitStatusID;
	}

	/**
	 * Sets the visit status id.
	 *
	 * @param visitStatusID the visitStatusID to set
	 */
	public void setVisitStatusID(String visitStatusID) {
		this.visitStatusID = visitStatusID;
	}

	/**
	 * Gets the agreement id.
	 *
	 * @return the agreementID
	 */
	public String getAgreementID() {
		return agreementID;
	}

	/**
	 * Sets the agreement id.
	 *
	 * @param agreementID the agreementID to set
	 */
	public void setAgreementID(String agreementID) {
		this.agreementID = agreementID;
	}

	/**
	 * Gets the agreement amount paid.
	 *
	 * @return the agreementAmountPaid
	 */
	public String getAgreementAmountPaid() {
		return agreementAmountPaid;
	}

	/**
	 * Sets the agreement amount paid.
	 *
	 * @param agreementAmountPaid the agreementAmountPaid to set
	 */
	public void setAgreementAmountPaid(String agreementAmountPaid) {
		this.agreementAmountPaid = agreementAmountPaid;
	}

	/**
	 * Gets the result date.
	 *
	 * @return the resultDate
	 */
	public String getResultDate() {
		return resultDate;
	}
	
	/**
	 * Gets the agreement mode.
	 *
	 * @return the agreementMode
	 */
	public String getAgreementMode() {
		return agreementMode;
	}

	/**
	 * Sets the agreement mode.
	 *
	 * @param agreementMode the agreementMode to set
	 */
	public void setAgreementMode(String agreementMode) {
		this.agreementMode = agreementMode;
	}

	/**
	 * Gets the result status id.
	 *
	 * @return the resultStatusID
	 */
	public String getResultStatusID() {
		return resultStatusID;
	}
	
	/**
	 * Sets the result date.
	 *
	 * @param resultDate the result date
	 */
	public void setResultDate(String resultDate) {
		this.resultDate = resultDate;
	}

	/**
	 * Sets the result status id.
	 *
	 * @param resultStatusID the resultStatusID to set
	 */
	public void setResultStatusID(String resultStatusID) {
		this.resultStatusID = resultStatusID;
	}

	/**
	 * Gets the visit id.
	 *
	 * @return the visitID
	 */
	public String getVisitID() {
		return visitID;
	}

	/**
	 * Sets the visit id.
	 *
	 * @param visitID the visitID to set
	 */
	public void setVisitID(String visitID) {
		this.visitID = visitID;
	}
	
	/**
	 * Gets the journey id.
	 *
	 * @return the journey id
	 */
	public long getJourneyId()
	{
		return journeyId;
	}

	/**
	 * Sets the journey id.
	 *
	 * @param journeyId the journey id
	 */
	public void setJourneyId(long journeyId)
	{
		this.journeyId = journeyId;
	}
	
}
