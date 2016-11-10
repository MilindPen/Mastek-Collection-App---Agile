/**
 * 
 */
package com.mastek.commons.data.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "[mobile].[vwVisitSummary]")
public class VWVisitSummary
{

	/** The visit id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "VisitID")
	private long visitId;

	/** The customer. */
	@ManyToOne
	@JoinColumn(name = "CustomerID")
	private VWCustomer customer;

	/** The payment type id. */
	@Column(name = "PaymentTypeID")
	private Integer paymentTypeId;

	/** The status. */
	@Column(name = "StatusID")
	private int status;

	/** The visit date. */
	@Column(name = "VisitDate")
	private Date visitDate;

	/** The total paid amount. */
	@Column(name = "TotalPaidAmount")
	private Double totalPaidAmount;

	/**
	 * Gets the visit id.
	 *
	 * @return the visit id
	 */
	public long getVisitId()
	{
		return visitId;
	}

	/**
	 * Sets the visit id.
	 *
	 * @param visitId the visit id
	 */
	public void setVisitId(long visitId)
	{
		this.visitId = visitId;
	}

	/**
	 * Gets the status.
	 *
	 * @return the status
	 */
	public int getStatus()
	{
		return status;
	}

	/**
	 * Sets the status.
	 *
	 * @param status the status
	 */
	public void setStatus(int status)
	{
		this.status = status;
	}

	/**
	 * Gets the payment type id.
	 *
	 * @return the payment type id
	 */
	public Integer getPaymentTypeId()
	{
		return paymentTypeId;
	}

	/**
	 * Sets the payment type id.
	 *
	 * @param paymentTypeId the payment type id
	 */
	public void setPaymentTypeId(Integer paymentTypeId)
	{
		this.paymentTypeId = paymentTypeId;
	}

	/**
	 * Gets the visit date.
	 *
	 * @return the visit date
	 */
	public Date getVisitDate()
	{
		return visitDate;
	}

	/**
	 * Sets the visit date.
	 *
	 * @param visitDate the visit date
	 */
	public void setVisitDate(Date visitDate)
	{
		this.visitDate = visitDate;
	}

	/**
	 * Gets the customer.
	 *
	 * @return the customer
	 */
	public VWCustomer getCustomer()
	{
		return customer;
	}

	/**
	 * Sets the customer.
	 *
	 * @param customer the customer
	 */
	public void setCustomer(VWCustomer customer)
	{
		this.customer = customer;
	}

	/**
	 * Gets the totalPaidAmount.
	 *
	 * @return the totalPaidAmount
	 */
	public Double getTotalPaidAmount()
	{
		return totalPaidAmount;
	}

	/**
	 * Sets the totalPaidAmount.
	 *
	 * @param user the total Paid Amount
	 */
	public void setTotalPaidAmount(Double totalPaidAmount)
	{
		this.totalPaidAmount = totalPaidAmount;
	}

}
