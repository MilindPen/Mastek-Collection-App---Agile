package com.mastek.transaction.rest.service.dto;

import java.util.List;

import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

public class CardPaymentResponse extends BaseResponse {

	List<CardPaymentDO> cardPayments;

	public List<CardPaymentDO> getCardPayments() {
		return cardPayments;
	}

	public void setCardPayments(List<CardPaymentDO> cardPayments) {
		this.cardPayments = cardPayments;
	}

}

