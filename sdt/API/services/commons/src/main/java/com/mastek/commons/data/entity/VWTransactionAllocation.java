package com.mastek.commons.data.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({@NamedQuery(name = "VWTransactionAllocation.getTransactionHistory", query = "select alloc,weekEnding.yearNo,weekEnding.weekNo from VWTransaction "
		+ "transc,VWTransactionAllocation alloc,VWWeekEnding weekEnding where transc.paidDate >= :startDate and transc.paidDate <= :endDate "
		+ "and transc.transactionId = alloc.transaction.transactionId and alloc.agreementId in (:agreementIds) "
		+ "and weekEnding.startDate <= transc.paidDate and weekEnding.endDate >= transc.paidDate ")})

@Entity
@Table(name = "[dbo].[vwTransactionAllocation]")
public class VWTransactionAllocation
{
	
	/** The allocation id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AllocationID")
	private long allocationId;
	
	/** The transaction. */
	@ManyToOne
	@JoinColumn(name = "TransactionID")
	private VWTransaction transaction;
	
	/** The agreement id. */
	@Column(name = "AgreementID")
	private long agreementId;
	
	/** The amount. */
	@Column(name = "Amount")
	private Double amount;
	
	/** The arrears. */
	@Column(name = "Arrears")
	private Double arrears;
	
	/** The balance. */
	@Column(name = "Balance")
	private Double balance;
	
	/** The transaction type id. */
	@Column(name = "TransactionTypeID")
	private Integer transactionTypeId;
	
	/** The transaction type desc. */
	@Column(name = "TransactionTypeDesc")
	private String transactionTypeDesc;
	
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

	/**
	 * Gets the allocation id.
	 *
	 * @return the allocation id
	 */
	public long getAllocationId()
	{
		return allocationId;
	}

	/**
	 * Sets the allocation id.
	 *
	 * @param allocationId the allocation id
	 */
	public void setAllocationId(long allocationId)
	{
		this.allocationId = allocationId;
	}

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
	 * Gets the amount.
	 *
	 * @return the amount
	 */
	public Double getAmount()
	{
		return amount;
	}

	/**
	 * Sets the amount.
	 *
	 * @param amount the amount
	 */
	public void setAmount(Double amount)
	{
		this.amount = amount;
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

	/**
	 * Gets the transaction type id.
	 *
	 * @return the transaction type id
	 */
	public Integer getTransactionTypeId()
	{
		return transactionTypeId;
	}

	/**
	 * Sets the transaction type id.
	 *
	 * @param transactionTypeId the transaction type id
	 */
	public void setTransactionTypeId(Integer transactionTypeId)
	{
		this.transactionTypeId = transactionTypeId;
	}

	/**
	 * Gets the transaction type desc.
	 *
	 * @return the transaction type desc
	 */
	public String getTransactionTypeDesc()
	{
		return transactionTypeDesc;
	}

	/**
	 * Sets the transaction type desc.
	 *
	 * @param transactionTypeDesc the transaction type desc
	 */
	public void setTransactionTypeDesc(String transactionTypeDesc)
	{
		this.transactionTypeDesc = transactionTypeDesc;
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
	 * Gets the transaction.
	 *
	 * @return the transaction
	 */
	public VWTransaction getTransaction()
	{
		return transaction;
	}

	/**
	 * Sets the transaction.
	 *
	 * @param transaction the transaction
	 */
	public void setTransaction(VWTransaction transaction)
	{
		this.transaction = transaction;
	}
	
}
