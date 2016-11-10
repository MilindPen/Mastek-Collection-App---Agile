package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class AgreementDO.
 */
public class AgreementDO
{

	/** The agreement id. */
	@JsonProperty(value = "agreementId")
	long agreementId;

	/** The customer id. */
	@JsonProperty(value = "customerId")
	long customerId;

	/** The agreement number. */
	@JsonProperty(value = "agreementNumber")
	String agreementNumber;

	/** The instalments. */
	@JsonProperty(value = "instalments")
	String instalments;

	/** The term amount. */
	@JsonProperty(value = "termAmount")
	Double termAmount;

	@JsonProperty(value = "settlementRebate")
	Double settlementRebate;

	/** The arrears. */
	@JsonProperty(value = "arrears")
	Double arrears;
	
	/** The status. */
	@JsonProperty(value = "status")
	String status;
	
	@JsonProperty(value = "agreementStartDate")
	String agreementStartDate;
	
	@JsonProperty(value = "principal")
	Double principal;
	
	@JsonProperty(value = "charges")
	Double charges;
	
	@JsonProperty(value = "settledDate")
	String settledDate;
	
	@JsonProperty(value = "balance")
	Double balance;
	
	@JsonProperty(value = "elapsedWeek")
	String elapsedWeek;
	
	@JsonProperty(value = "reloanedFromAgreementID")
	Long reloanedFromAgreementID;
	
	@JsonProperty(value = "previousFolioNumber")
	String previousFolioNumber;
	
	@JsonProperty(value = "totalPayableAmount")
	Double totalPayableAmount;
	
	@JsonProperty(value = "settlementAmount")
	Double settlementAmount;
	
	@JsonProperty(value = "aaIndicatorId")
	String aaIndicatorId;
	
	@JsonProperty(value = "paymentFrequencyID")
	Integer paymentFrequencyID;

	/**
	 * Gets the agreement id.
	 *
	 * @return the agreement id
	 */
	public long getAgreementId()
	{
		return agreementId;
	}

	/**
	 * Sets the agreement id.
	 *
	 * @param agreementId the agreement id
	 */
	public void setAgreementId(long agreementId)
	{
		this.agreementId = agreementId;
	}

	/**
	 * Gets the agreement number.
	 *
	 * @return the agreement number
	 */
	public String getAgreementNumber()
	{
		return agreementNumber;
	}

	/**
	 * Sets the agreement number.
	 *
	 * @param agreementNumber the agreement number
	 */
	public void setAgreementNumber(String agreementNumber)
	{
		this.agreementNumber = agreementNumber;
	}

	/**
	 * Gets the instalments.
	 *
	 * @return the instalments
	 */
	public String getInstalments()
	{
		return instalments;
	}

	/**
	 * Sets the instalments.
	 *
	 * @param instalments the instalments
	 */
	public void setInstalments(String instalments)
	{
		this.instalments = instalments;
	}

	/**
	 * Gets the term amount.
	 *
	 * @return the term amount
	 */
	public Double getTermAmount()
	{
		return termAmount;
	}

	/**
	 * Sets the term amount.
	 *
	 * @param termAmount the term amount
	 */
	public void setTermAmount(Double termAmount)
	{
		this.termAmount = termAmount;
	}

	/**
	 * Gets the arrears.
	 *
	 * @return the arrears
	 */
	public Double getArrears()
	{
		return arrears;
	}

	/**
	 * Sets the arrears.
	 *
	 * @param arrears the arrears
	 */
	public void setArrears(Double arrears)
	{
		this.arrears = arrears;
	}

	/**
	 * Gets the customer id.
	 *
	 * @return the customer id
	 */
	public long getCustomerId()
	{
		return customerId;
	}

	/**
	 * Sets the customer id.
	 *
	 * @param customerId the customer id
	 */
	public void setCustomerId(long customerId)
	{
		this.customerId = customerId;
	}
	
	/**
	 * Gets the status
	 *
	 * @return the status
	 */
	public String getStatus()
	{
		return status;
	}

	/**
	 * Sets the status 
	 *
	 * @param status the status 
	 */
	public void setStatus(String status)
	{
		this.status = status;
	}

	public Double getSettlementRebate()
	{
		return settlementRebate;
	}

	public void setSettlementRebate(Double settlementRebate)
	{
		this.settlementRebate = settlementRebate;
	}

	public String getAgreementStartDate()
	{
		return agreementStartDate;
	}

	public void setAgreementStartDate(String agreementStartDate)
	{
		this.agreementStartDate = agreementStartDate;
	}

	public Double getPrincipal()
	{
		return principal;
	}

	public void setPrincipal(Double principal)
	{
		this.principal = principal;
	}

	public Double getCharges()
	{
		return charges;
	}

	public void setCharges(Double charges)
	{
		this.charges = charges;
	}

	public String getSettledDate()
	{
		return settledDate;
	}

	public void setSettledDate(String settledDate)
	{
		this.settledDate = settledDate;
	}

	public Double getBalance()
	{
		return balance;
	}

	public void setBalance(Double balance)
	{
		this.balance = balance;
	}

	public String getElapsedWeek()
	{
		return elapsedWeek;
	}

	public void setElapsedWeek(String elapsedWeek)
	{
		this.elapsedWeek = elapsedWeek;
	}

	public Long getReloanedFromAgreementID()
	{
		return reloanedFromAgreementID;
	}

	public void setReloanedFromAgreementID(Long reloanedFromAgreementID)
	{
		this.reloanedFromAgreementID = reloanedFromAgreementID;
	}

	public String getPreviousFolioNumber()
	{
		return previousFolioNumber;
	}

	public void setPreviousFolioNumber(String previousFolioNumber)
	{
		this.previousFolioNumber = previousFolioNumber;
	}

	public Double getSettlementAmount()
	{
		return settlementAmount;
	}

	public void setSettlementAmount(Double settlementAmount)
	{
		this.settlementAmount = settlementAmount;
	}

	public Double getTotalPayableAmount()
	{
		return totalPayableAmount;
	}

	public void setTotalPayableAmount(Double totalPayableAmount)
	{
		this.totalPayableAmount = totalPayableAmount;
	}

	/**
	 * @return the aaIndicatorId
	 */
	public String getAaIndicatorId() {
		return aaIndicatorId;
	}

	/**
	 * @param aaIndicatorId the aaIndicatorId to set
	 */
	public void setAaIndicatorId(String aaIndicatorId) {
		this.aaIndicatorId = aaIndicatorId;
	}

	public Integer getPaymentFrequencyID()
	{
		return paymentFrequencyID;
	}

	public void setPaymentFrequencyID(Integer paymentFrequencyID)
	{
		this.paymentFrequencyID = paymentFrequencyID;
	}
	
	
}
