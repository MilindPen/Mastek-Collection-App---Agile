package com.mastek.commons.data.entity;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
@NamedQueries({@NamedQuery(name = "VWTransactionHistory.getTransactionHistory", query = "select th from VWTransactionHistory th "
		+ "where th.userId=:userId and th.paidDate >= :startDate and th.paidDate <= :endDate "
		+ "and th.visitDate>= :fromDate and th.visitDate<= :toDate")})

@Entity
@Table(name = "[mobile].[vwTransactionHistory]")
public class VWTransactionHistory
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AllocationID")
	private long allocationId;
	
	@Column(name = "TransactionID")
	private long transactionId;
	
	@Column(name = "AgreementID")
	private long agreementId;
	
	@Column(name = "Amount")
	private Double amount;
	
	@Column(name = "Arrears")
	private Double arrears;
	
	@Column(name = "TransactionTypeID")
	private Integer transactionTypeId;
	
	@Column(name = "PaidDate")
	private Date paidDate;
	
	@Column(name = "ResponseStatusID")
	private Integer responseStatusID;
	
	@Column(name = "CustomerID")
	private long customerId;
	
	@Column(name = "JourneyID")
	private long journeyId;
	
	@Column(name = "WeekNo")
	private String weekNumber;
	
	@Column(name = "YearNo")
	private String year;
	
	@Column(name = "VisitDate")
	private Date visitDate;
	
	@Column(name = "UserID")
	private long userId;

	public long getAllocationId()
	{
		return allocationId;
	}

	public void setAllocationId(long allocationId)
	{
		this.allocationId = allocationId;
	}

	public long getTransactionId()
	{
		return transactionId;
	}

	public void setTransactionId(long transactionId)
	{
		this.transactionId = transactionId;
	}

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

	public Integer getTransactionTypeId()
	{
		return transactionTypeId;
	}

	public void setTransactionTypeId(Integer transactionTypeId)
	{
		this.transactionTypeId = transactionTypeId;
	}

	public Date getPaidDate()
	{
		return paidDate;
	}

	public void setPaidDate(Date paidDate)
	{
		this.paidDate = paidDate;
	}

	public Integer getResponseStatusID()
	{
		return responseStatusID;
	}

	public void setResponseStatusID(Integer responseStatusID)
	{
		this.responseStatusID = responseStatusID;
	}

	public long getCustomerId()
	{
		return customerId;
	}

	public void setCustomerId(long customerId)
	{
		this.customerId = customerId;
	}

	public long getJourneyId()
	{
		return journeyId;
	}

	public void setJourneyId(long journeyId)
	{
		this.journeyId = journeyId;
	}

	public String getWeekNumber()
	{
		return weekNumber;
	}

	public void setWeekNumber(String weekNumber)
	{
		this.weekNumber = weekNumber;
	}

	public String getYear()
	{
		return year;
	}

	public void setYear(String year)
	{
		this.year = year;
	}

	public Date getVisitDate()
	{
		return visitDate;
	}

	public void setVisitDate(Date visitDate)
	{
		this.visitDate = visitDate;
	}

	public long getUserId()
	{
		return userId;
	}

	public void setUserId(long userId)
	{
		this.userId = userId;
	}

}
