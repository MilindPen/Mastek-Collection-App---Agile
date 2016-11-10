/**
 * 
 */
package com.mastek.data.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author monika10793
 *
 */
@Entity
@Table(name = "[dbo].[vwTransactionAllocation]")
public class VWTransactionAllocation
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AllocationID")
	private long allocationID;
	
	//@Column(name = "TransactionID")
	//private long transactionId;
	@ManyToOne
	@JoinColumn(name = "TransactionID")
	VWTransaction transaction;
	
	@Column(name = "AgreementID")
	private long agreementId;
	
	@Column(name = "Amount")
	private Double amount;
	
	@Column(name = "Arrears")
	private Double arrears;
	
	@Column(name = "Balance")
	private Double balance;
	
	@Column(name = "TransactionTypeID")
	private Integer transactionTypeId;
	
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

	public long getAllocationID()
	{
		return allocationID;
	}

	public void setAllocationID(long allocationID)
	{
		this.allocationID = allocationID;
	}

	/*
	public long getTransactionId()
	{
		return transactionId;
	}

	public void setTransactionId(long transactionId)
	{
		this.transactionId = transactionId;
	}
*/
	public long getAgreementId()
	{
		return agreementId;
	}

	public void setAgreementId(long agreementId)
	{
		this.agreementId = agreementId;
	}

	public Double getAmount()
	{
		return amount;
	}

	public void setAmount(Double amount)
	{
		this.amount = amount;
	}

	public Double getArrears()
	{
		return arrears;
	}

	public void setArrears(Double arrears)
	{
		this.arrears = arrears;
	}

	public Double getBalance()
	{
		return balance;
	}

	public void setBalance(Double balance)
	{
		this.balance = balance;
	}

	public Integer getTransactionTypeId()
	{
		return transactionTypeId;
	}

	public void setTransactionTypeId(Integer transactionTypeId)
	{
		this.transactionTypeId = transactionTypeId;
	}

	public String getTransactionTypeDesc()
	{
		return transactionTypeDesc;
	}

	public void setTransactionTypeDesc(String transactionTypeDesc)
	{
		this.transactionTypeDesc = transactionTypeDesc;
	}

	public Date getCreatedDate()
	{
		return createdDate;
	}

	public void setCreatedDate(Date createdDate)
	{
		this.createdDate = createdDate;
	}

	public String getCreatedBy()
	{
		return createdBy;
	}

	public void setCreatedBy(String createdBy)
	{
		this.createdBy = createdBy;
	}

	public Date getUpdatedDate()
	{
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate)
	{
		this.updatedDate = updatedDate;
	}

	public String getUpdatedBy()
	{
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy)
	{
		this.updatedBy = updatedBy;
	}

	public VWTransaction getTransaction()
	{
		return transaction;
	}

	public void setTransaction(VWTransaction transaction)
	{
		this.transaction = transaction;
	}
	
}
