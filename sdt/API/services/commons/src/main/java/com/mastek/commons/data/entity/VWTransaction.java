package com.mastek.commons.data.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "[dbo].[vwTransaction]")
public class VWTransaction
{
			  
	/** The transaction id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TransactionID")
	private long transactionId;
	
	/** The customer id. */
	@Column(name = "CustomerID")
	private long customerId;

	
	/** The payment type id. */
	@Column(name = "paymentTypeID")
	private Integer paymentTypeID;
	
	/** The payment type desc. */
	@Column(name = "PaymentTypeDesc")
	private String paymentTypeDesc;
	
	/** The amount paid. */
	@Column(name = "AmountPaid")
	private Double amountPaid;
	
	/** The trans paid date. */
	@Column(name = "PaidDate")
	private Date paidDate;
	
	/** The response message. */
	@Column(name = "ResponseMessage")
	private String responseMessage;
	
	/** The response status id. */
	@Column(name = "ResponseStatusID")
	private Integer responseStatusID;
	
	/** The visit result id. */
	@Column(name = "VisitResultID")
	private Integer visitResultID;
	
	/** The created date. */
	@Column(name = "CreatedDate")
	private Date createdDate;

	/** The created by. */
	@Column(name = "CreatedBy")
	private String createdBy;

	/** The updated date. */
	@Column(name = "UpdateDate")
	private Date updatedDate;

	/** The updated by. */
	@Column(name = "UpdatedBy")
	private String updatedBy;
	
	/** The allocations. */
	@OneToMany(mappedBy = "transaction")
	private Set<VWTransactionAllocation> allocations = new HashSet<>(0);
	
	/**
	 * Gets the transaction id.
	 *
	 * @return the transaction id
	 */
	public long getTransactionId()
	{
		return transactionId;
	}

	/**
	 * Sets the transaction id.
	 *
	 * @param transactionId the transaction id
	 */
	public void setTransactionId(long transactionId)
	{
		this.transactionId = transactionId;
	}

	/**
	 * Gets the amount paid.
	 *
	 * @return the amount paid
	 */
	public Double getAmountPaid()
	{
		return amountPaid;
	}

	/**
	 * Sets the amount paid.
	 *
	 * @param amountPaid the amount paid
	 */
	public void setAmountPaid(Double amountPaid)
	{
		this.amountPaid = amountPaid;
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
	 * Gets the payment type id.
	 *
	 * @return the payment type id
	 */
	public Integer getPaymentTypeID()
	{
		return paymentTypeID;
	}

	/**
	 * Sets the payment type id.
	 *
	 * @param paymentTypeID the payment type id
	 */
	public void setPaymentTypeID(Integer paymentTypeID)
	{
		this.paymentTypeID = paymentTypeID;
	}

	/**
	 * Gets the payment type desc.
	 *
	 * @return the payment type desc
	 */
	public String getPaymentTypeDesc()
	{
		return paymentTypeDesc;
	}

	/**
	 * Sets the payment type desc.
	 *
	 * @param paymentTypeDesc the payment type desc
	 */
	public void setPaymentTypeDesc(String paymentTypeDesc)
	{
		this.paymentTypeDesc = paymentTypeDesc;
	}

	/**
	 * Gets the paid date.
	 *
	 * @return the paid date
	 */
	public Date getPaidDate()
	{
		return paidDate;
	}

	/**
	 * Sets the paid date.
	 *
	 * @param paidDate the paid date
	 */
	public void setPaidDate(Date paidDate)
	{
		this.paidDate = paidDate;
	}

	/**
	 * Gets the response message.
	 *
	 * @return the response message
	 */
	public String getResponseMessage()
	{
		return responseMessage;
	}

	/**
	 * Sets the response message.
	 *
	 * @param responseMessage the response message
	 */
	public void setResponseMessage(String responseMessage)
	{
		this.responseMessage = responseMessage;
	}

	/**
	 * Gets the response status id.
	 *
	 * @return the response status id
	 */
	public Integer getResponseStatusID()
	{
		return responseStatusID;
	}

	/**
	 * Sets the response status id.
	 *
	 * @param responseStatusID the response status id
	 */
	public void setResponseStatusID(Integer responseStatusID)
	{
		this.responseStatusID = responseStatusID;
	}

	/**
	 * Gets the visit result id.
	 *
	 * @return the visit result id
	 */
	public Integer getVisitResultID()
	{
		return visitResultID;
	}

	/**
	 * Sets the visit result id.
	 *
	 * @param visitResultID the visit result id
	 */
	public void setVisitResultID(Integer visitResultID)
	{
		this.visitResultID = visitResultID;
	}

	/**
	 * Gets the allocations.
	 *
	 * @return the allocations
	 */
	public Set<VWTransactionAllocation> getAllocations()
	{
		return allocations;
	}

	/**
	 * Sets the allocations.
	 *
	 * @param allocations the allocations
	 */
	public void setAllocations(Set<VWTransactionAllocation> allocations)
	{
		this.allocations = allocations;
	}
	

}
