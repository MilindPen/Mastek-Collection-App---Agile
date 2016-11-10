package com.mastek.commons.data.entity;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "[dbo].[vwAgreement]")
public class VWAgreement
{

	/** The agreement id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AgreementID")
	private long agreementId;

	/** The agreement number. */
	@Column(name = "AgreementNumber")
	private String agreementNumber;

	/** The customer id. */
	@Column(name = "CustomerID")
	private long customerId;

	/** The principal. */
	@Column(name = "Principal")
	private Double principal;

	/** The charges. */
	@Column(name = "Charges")
	private Double charges;

	/** The term amount. */
	@Column(name = "Terms")
	private Double termAmount;

	/** The instalments. */
	@Column(name = "Instalments")
	private String instalments;

	/** The settled date. */
	@Column(name = "SettledDate")
	private Date settledDate;

	/** The agreement start date. */
	@Column(name = "AgreementStartDate")
	private Date agreementStartDate;

	/** The settlement rebate. */
	@Column(name = "SettlementRebate")
	private Double settlementRebate;

	/** The arrears. */
	@Column(name = "Arrears")
	private Double arrears;

	/** The created date. */
	@Column(name = "CreatedDate")
	private Date createdDate;

	/** The created by. */
	@Column(name = "CreatedBy")
	private String createdBy;

	/** The updated date. */
	@Column(name = "UpdatedDate")
	private Date updatedDate;

	/** The updated by. */
	@Column(name = "UpdatedBy")
	private String updatedBy;
	
	/**  The status. */
	@Column(name = "StatusID")
	private Integer status;
	
	/** The reloaned from agreement id. */
	@Column(name = "ReloanedFromAgreementID")
	private Long reloanedFromAgreementID;
	
	/** The balance. */
	@Column(name = "Balance")
	private Double balance;

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
	 * Gets the charges.
	 *
	 * @return the charges
	 */
	public Double getCharges()
	{
		return charges;
	}

	/**
	 * Sets the charges.
	 *
	 * @param charges the charges
	 */
	public void setCharges(Double charges)
	{
		this.charges = charges;
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
	 * Gets the settled date.
	 *
	 * @return the settled date
	 */
	public Date getSettledDate()
	{
		return settledDate;
	}

	/**
	 * Sets the settled date.
	 *
	 * @param settledDate the settled date
	 */
	public void setSettledDate(Date settledDate)
	{
		this.settledDate = settledDate;
	}

	/**
	 * Gets the agreement start date.
	 *
	 * @return the agreement start date
	 */
	public Date getAgreementStartDate()
	{
		return agreementStartDate;
	}

	/**
	 * Sets the agreement start date.
	 *
	 * @param agreementStartDate the agreement start date
	 */
	public void setAgreementStartDate(Date agreementStartDate)
	{
		this.agreementStartDate = agreementStartDate;
	}
	
	/**
	 * Gets the created date.
	 *
	 * @return the created date
	 */
	public Date getCreatedDate()
	{
		return createdDate;
	}

	/**
	 * Sets the created date.
	 *
	 * @param createdDate the created date
	 */
	public void setCreatedDate(Date createdDate)
	{
		this.createdDate = createdDate;
	}

	/**
	 * Gets the created by.
	 *
	 * @return the created by
	 */
	public String getCreatedBy()
	{
		return createdBy;
	}

	/**
	 * Sets the created by.
	 *
	 * @param createdBy the created by
	 */
	public void setCreatedBy(String createdBy)
	{
		this.createdBy = createdBy;
	}

	/**
	 * Gets the updated date.
	 *
	 * @return the updated date
	 */
	public Date getUpdatedDate()
	{
		return updatedDate;
	}

	/**
	 * Sets the updated date.
	 *
	 * @param updatedDate the updated date
	 */
	public void setUpdatedDate(Date updatedDate)
	{
		this.updatedDate = updatedDate;
	}

	/**
	 * Gets the updated by.
	 *
	 * @return the updated by
	 */
	public String getUpdatedBy()
	{
		return updatedBy;
	}

	/**
	 * Sets the updated by.
	 *
	 * @param updatedBy the updated by
	 */
	public void setUpdatedBy(String updatedBy)
	{
		this.updatedBy = updatedBy;
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
	 * Gets the principal.
	 *
	 * @return the principal
	 */
	public Double getPrincipal()
	{
		return principal;
	}

	/**
	 * Sets the principal.
	 *
	 * @param principal the principal
	 */
	public void setPrincipal(Double principal)
	{
		this.principal = principal;
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

	/**
	 * Sets the status .
	 *
	 * @param status the status
	 */
	public void setStatus(Integer status)
	{
		this.status = status;
	}

	/**
	 * Gets the settlement rebate.
	 *
	 * @return the settlement rebate
	 */
	public Double getSettlementRebate()
	{
		return settlementRebate;
	}

	/**
	 * Sets the settlement rebate.
	 *
	 * @param settlementRebate the settlement rebate
	 */
	public void setSettlementRebate(Double settlementRebate)
	{
		this.settlementRebate = settlementRebate;
	}

	/**
	 * Gets the reloaned from agreement id.
	 *
	 * @return the reloaned from agreement id
	 */
	public Long getReloanedFromAgreementID()
	{
		return reloanedFromAgreementID;
	}

	/**
	 * Sets the reloaned from agreement id.
	 *
	 * @param reloanedFromAgreementID the reloaned from agreement id
	 */
	public void setReloanedFromAgreementID(Long reloanedFromAgreementID)
	{
		this.reloanedFromAgreementID = reloanedFromAgreementID;
	}

	/**
	 * Gets the balance.
	 *
	 * @return the balance
	 */
	public Double getBalance()
	{
		return balance;
	}

	/**
	 * Sets the balance.
	 *
	 * @param balance the balance
	 */
	public void setBalance(Double balance)
	{
		this.balance = balance;
	}
	
}
