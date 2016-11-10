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

/**
 * The Class VWDashboardAmount.
 */
@NamedQueries({
		@NamedQuery(name = "VWDashboardAmount.getBalanceTransactions", query = "select da from VWDashboardAmount da where "
				+ "da.balanceDate>= :fromDate and " + "da.balanceDate<= :toDate ") })

@Entity
@Table(name = "[mobile].[vwDashboardAmount]")
public class VWDashboardAmount {

	/** The balance id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private String balanceId;

	/** The journey id. */
	@Column(name = "JourneyID")
	private long journeyId;

	/** The balance date. */
	@Column(name = "BalanceDate")
	private Date balanceDate;

	/** The period indicator. */
	@Column(name = "PeriodIndicator")
	private String periodIndicator;

	/** The amount. */
	@Column(name = "Amount")
	private Double amount;

	/** The reference. */
	@Column(name = "Reference")
	private String reference;

	/** The balance type id. */
	@Column(name = "BalanceTypeID")
	private String balanceTypeId;

	/** The cheque indicator. */
	@Column(name = "Cheque_ind")
	private Boolean chequeIndicator;

	/**
	 * Gets the balance id.
	 *
	 * @return the balance id
	 */
	public String getBalanceId() {
		return balanceId;
	}

	/**
	 * Sets the balance id.
	 *
	 * @param balanceId
	 *            the balance id
	 */
	public void setBalanceId(String balanceId) {
		this.balanceId = balanceId;
	}

	/**
	 * Gets the journey id.
	 *
	 * @return the journey id
	 */
	public long getJourneyId() {
		return journeyId;
	}

	/**
	 * Sets the journey id.
	 *
	 * @param journeyId
	 *            the journey id
	 */
	public void setJourneyId(long journeyId) {
		this.journeyId = journeyId;
	}

	/**
	 * Gets the balance date.
	 *
	 * @return the balance date
	 */
	public Date getBalanceDate() {
		return balanceDate;
	}

	/**
	 * Sets the balance date.
	 *
	 * @param balanceDate
	 *            the balance date
	 */
	public void setBalanceDate(Date balanceDate) {
		this.balanceDate = balanceDate;
	}

	/**
	 * Gets the period indicator.
	 *
	 * @return the period indicator
	 */
	public String getPeriodIndicator() {
		return periodIndicator;
	}

	/**
	 * Sets the period indicator.
	 *
	 * @param periodIndicator
	 *            the period indicator
	 */
	public void setPeriodIndicator(String periodIndicator) {
		this.periodIndicator = periodIndicator;
	}

	/**
	 * Gets the amount.
	 *
	 * @return the amount
	 */
	public Double getAmount() {
		return amount;
	}

	/**
	 * Sets the amount.
	 *
	 * @param amount
	 *            the amount
	 */
	public void setAmount(Double amount) {
		this.amount = amount;
	}

	/**
	 * Gets the reference.
	 *
	 * @return the reference
	 */
	public String getReference() {
		return reference;
	}

	/**
	 * Sets the reference.
	 *
	 * @param reference
	 *            the reference
	 */
	public void setReference(String reference) {
		this.reference = reference;
	}

	/**
	 * Gets the balance type id.
	 *
	 * @return the balance type id
	 */
	public String getBalanceTypeId() {
		return balanceTypeId;
	}

	/**
	 * Sets the balance type id.
	 *
	 * @param balanceTypeId
	 *            the balance type id
	 */
	public void setBalanceTypeId(String balanceTypeId) {
		this.balanceTypeId = balanceTypeId;
	}

	/**
	 * Gets the cheque indicator.
	 *
	 * @return the cheque indicator
	 */
	public Boolean getChequeIndicator() {
		return chequeIndicator;
	}

	/**
	 * Sets the cheque indicator.
	 *
	 * @param chequeIndicator
	 *            the cheque indicator
	 */
	public void setChequeIndicator(Boolean chequeIndicator) {
		this.chequeIndicator = chequeIndicator;
	}

}
