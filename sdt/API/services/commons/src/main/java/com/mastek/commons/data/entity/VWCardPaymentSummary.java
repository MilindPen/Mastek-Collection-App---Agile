package com.mastek.commons.data.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
/**
 * The Class VWCardPayment.
 */
@NamedQueries({@NamedQuery(name = "VWCardPaymentSummary.getCardPayments", 
				query = "select ps from VWCardPaymentSummary ps where " 
						//+ "ps.vwCardPaymentSummaryPK.userID = :userID and "
						+ "ps.weekDate >= :fromDate and "
						//+ "ps.vwCardPaymentSummaryPK.weekDate <= :toDate and "
						+ "ps.weekDate <= :toDate and "
						+ "ps.journeyID = :journeyID ")})

@Entity
@Table(name = "[mobile].[vwCardPaymentSummary]")
public class VWCardPaymentSummary {
	
		
	/** The Week Date. */
	@Id
	@Column(name = "WeekDate")
	private Date weekDate;
	
	/** The journey ID. */
	@Column(name = "JourneyID")
	private long journeyID;
	
	/** The Card Payment Amount. */
	@Column(name = "CardPaymentAmount")
	private Double cardPaymentAmount;

	public Date getWeekDate() {
		return weekDate;
	}

	public void setWeekDate(Date startDate) {
		this.weekDate = startDate;
	}		

	public long getJourneyID() {
		return journeyID;
	}

	public void setJourneyID(long journeyID) {
		this.journeyID = journeyID;
	}

	public Double getCardPaymentAmount() {
		return cardPaymentAmount;
	}

	public void setCardPaymentAmount(Double cardPaymentAmount) {
		this.cardPaymentAmount = cardPaymentAmount;
	}
	
}
