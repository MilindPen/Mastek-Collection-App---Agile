package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class TransactionDO.
 */
public class TransactionDO
{

	/** The transaction id. */
	@JsonProperty(value = "transactionId")
	long transactionId;

	/** The agreement id. */
	@JsonProperty(value = "agreementId")
	long agreementId;

	/** The transaction date time. */
	@JsonProperty(value = "transactionDateTime")
	String transactionDateTime;

	/** The amount. */
	@JsonProperty(value = "amount")
	double amount;

}
