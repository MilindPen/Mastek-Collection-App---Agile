package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

public class CardPaymentDO {
	
	/** The week Date. */
	@JsonProperty(value = "weekDate")
	String weekDate;
	
	/** The card Payment Amount. */
	@JsonProperty(value = "cardPaymentAmount")
	double cardPaymentAmount;

	public String getWeekDate() {
		return weekDate;
	}

	public void setWeekDate(String weekDate) {
		this.weekDate = weekDate;
	}

	public double getCardPaymentAmount() {
		return cardPaymentAmount;
	}

	public void setCardPaymentAmount(double cardPaymentAmount) {
		this.cardPaymentAmount = cardPaymentAmount;
	}

	
}
