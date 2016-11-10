package com.mastek.transaction.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.BalanceTransactionResponse;
import com.mastek.transaction.rest.service.dto.CardPaymentRequest;
import com.mastek.transaction.rest.service.dto.CardPaymentResponse;
import com.mastek.transaction.rest.service.dto.TransactionHistoryRequest;
import com.mastek.transaction.rest.service.dto.TransactionHistoryResponse;
import com.mastek.transaction.rest.service.dto.TransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionResponse;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;

/**
 * The Interface TransactionREST.
 */
@Component
@Path("api/transactions")
@Api(value = "api/transactions")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface TransactionREST
{

	/**
	 * Gets the transaction history.
	 *
	 * @param transactionHistoryRequest the transaction history request
	 * @return the transaction history
	 */
	@POST
	@Path("/history")
	@ApiOperation(value = "getTransactionHistory", notes = "get transaction history")
	@ApiResponses(value = {})
	TransactionHistoryResponse getTransactionHistory(@ApiParam(value = "Transaction History Request", required = true) TransactionHistoryRequest transactionHistoryRequest);

	/**
	 * Gets the card payments.
	 *
	 * @param cardPaymentRequest the card payment request
	 * @return the card payments
	 */
	@POST
	@Path("/card/payments")
	@ApiOperation(value = "getCardPayments", notes = "get card payments")
	@ApiResponses(value = {})
	CardPaymentResponse getCardPayments(@ApiParam(value = "Card Payment Request", required = true) CardPaymentRequest cardPaymentRequest);

	/**
	 * Gets the transaction synchroniz result.
	 *
	 * @param transactionSyncRequest the transaction sync request
	 * @return the transaction synchroniz result
	 */
	@POST
	@Path("/sync")
	@ApiOperation(value = "syncTransactions", notes = "sync transactions from offline database")
	@ApiResponses(value = {})
	TransactionSyncResponse getTransactionSynchronizResult(@ApiParam(value = "Transactios Sync Request", required = true) TransactionSyncRequest transactionSyncRequest);

	/**
	 * Sync balance transactions.
	 *
	 * @param balanceTransactionRequest the balance transaction request
	 * @return the balance transaction response
	 */
	@POST
	@Path("/balance/sync")
	@ApiOperation(value = "syncBalanceTransactions", notes = "sync balance transactions from offline database")
	@ApiResponses(value = {})
	BalanceTransactionResponse syncBalanceTransactions(@ApiParam(value = "Balance Transactios Request", required = true) BalanceTransactionRequest balanceTransactionRequest);
	
	/**
	 * Gets the transactions.
	 *
	 * @param transactionRequest the transaction request
	 * @return the transactions
	 */
	@POST
	@Path("/gettransactions")
	@ApiOperation(value = "getTransactions", notes = "get all transactions")
	@ApiResponses(value = {})
	TransactionResponse getTransactions(TransactionRequest transactionRequest);

}
