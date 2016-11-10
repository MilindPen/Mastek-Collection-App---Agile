package com.mastek.transaction.rest.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

public class TransactionResponse extends BaseResponse
{

	@JsonProperty(value="transactions")	
	private List<SynchronizDO> transactions;
	
	//@JsonProperty(value="balanceTransactions")	
	//private List<BalanceTransactionDO> balanceTransactions;
	
	/** The transactions. */
	@JsonProperty(value = "balanceTransactions")
	private List<RetrieveTransactionsDO> balanceTransactions;

	public List<SynchronizDO> getTransactions()
	{
		return transactions;
	}

	public void setTransactions(List<SynchronizDO> transactions)
	{
		this.transactions = transactions;
	}

	public List<RetrieveTransactionsDO> getBalanceTransactions() {
		return balanceTransactions;
	}

	public void setBalanceTransactions(List<RetrieveTransactionsDO> balanceTransactions) {
		this.balanceTransactions = balanceTransactions;
	}

	/*
	public List<BalanceTransactionDO> getBalanceTransactions()
	{
		return balanceTransactions;
	}

	public void setBalanceTransactions(List<BalanceTransactionDO> balanceTransactions)
	{
		this.balanceTransactions = balanceTransactions;
	}*/


}
