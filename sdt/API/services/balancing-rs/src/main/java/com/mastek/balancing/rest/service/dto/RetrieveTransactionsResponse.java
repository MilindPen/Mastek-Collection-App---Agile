package com.mastek.balancing.rest.service.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.rest.service.dto.BaseResponse;

/**
 * The Class RetrieveTransactionsResponse.
 */
public class RetrieveTransactionsResponse extends BaseResponse
{

	/** The transactions. */
	@JsonProperty(value = "transactions")
	private List<RetrieveTransactionsDO> transactions;

	/**
	 * Gets the transactions.
	 *
	 * @return the transactions
	 */
	public List<RetrieveTransactionsDO> getTransactions()
	{
		return transactions;
	}

	/**
	 * Sets the transactions.
	 *
	 * @param transactions the transactions
	 */
	public void setTransactions(List<RetrieveTransactionsDO> transactions)
	{
		this.transactions = transactions;
	}
	
}
