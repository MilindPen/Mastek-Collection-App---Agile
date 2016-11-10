package com.mastek.rs.dto.response;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.domain.TransactionHistoryDO;

public class TransactionHistoryResponse extends BaseResponse
{
	@JsonProperty(value = "transactions")
	List<TransactionHistoryDO> transactions;

	public List<TransactionHistoryDO> getTransactions()
	{
		return transactions;
	}

	public void setTransactions(List<TransactionHistoryDO> transactions)
	{
		this.transactions = transactions;
	}
	
}
