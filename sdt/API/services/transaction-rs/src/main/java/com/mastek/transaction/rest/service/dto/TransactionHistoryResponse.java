package com.mastek.transaction.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class TransactionHistoryResponse.
 */
public class TransactionHistoryResponse extends BaseResponse
{
	
	/** The transactions. */
	@JsonProperty(value = "transactions")
	List<TransactionHistoryDO> transactions;

	/**
	 * Gets the transactions.
	 *
	 * @return the transactions
	 */
	public List<TransactionHistoryDO> getTransactions()
	{
		return transactions;
	}

	/**
	 * Sets the transactions.
	 *
	 * @param transactions the transactions
	 */
	public void setTransactions(List<TransactionHistoryDO> transactions)
	{
		this.transactions = transactions;
	}
	
}
