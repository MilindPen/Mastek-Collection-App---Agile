package com.mastek.transaction.rest.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.rest.service.dto.BaseRequest;

public class BalanceTransactionRequest extends BaseRequest
{
	@JsonProperty(value="balanceTransactions")	
	private List<BalanceTransactionDO> balanceTransactions;

	public List<BalanceTransactionDO> getBalanceTransactions()
	{
		return balanceTransactions;
	}

	public void setBalanceTransactions(List<BalanceTransactionDO> balanceTransactions)
	{
		this.balanceTransactions = balanceTransactions;
	}

}
