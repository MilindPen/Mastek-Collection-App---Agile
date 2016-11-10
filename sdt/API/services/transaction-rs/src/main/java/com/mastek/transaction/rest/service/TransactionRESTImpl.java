package com.mastek.transaction.rest.service;

import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_CARD_PAYMENTS;
import static com.mastek.commons.util.ApplicationConstants.GET_TRANSACTIONS;
import static com.mastek.commons.util.ApplicationConstants.GET_TRANSACTION_HISTORY;
import static com.mastek.commons.util.ApplicationConstants.GET_TRANSACTION_SYNC_RESULT;
import static com.mastek.commons.util.ApplicationConstants.REQUEST;
import static com.mastek.commons.util.ApplicationConstants.RESPONSE;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.SYNC_BALANCE_TRANSACTIONS;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.util.CommonUtil;
import com.mastek.commons.util.PropertyResolver;
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
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;

/**
 * The Class TransactionRESTImpl.
 */
@Api(value = "api/transactions", description = "This API performs transaction related operations")
@Component
public class TransactionRESTImpl implements TransactionREST
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(TransactionRESTImpl.class);

	/** The business delegate. */
	@Autowired
	TransactionBusinessDelegate transactionBusinessDelegate;

	/**
	 *  
	 *  Gets transaction history.
	 *
	 * @param transactionHistoryRequest the transaction history request
	 * @return the transaction history
	 */
	@Path("/history")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "getTransactionHistory", response = TransactionHistoryRequest.class, httpMethod = "POST")
	@Override
	public TransactionHistoryResponse getTransactionHistory(TransactionHistoryRequest transactionHistoryRequest)
	{
		TransactionHistoryResponse response = new TransactionHistoryResponse();

		logger.info(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + transactionHistoryRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + transactionHistoryRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(transactionHistoryRequest));

		try
		{
			response.setTransactions(transactionBusinessDelegate.getTransactionHistory(transactionHistoryRequest.getStartDate(), transactionHistoryRequest.getEndDate(), transactionHistoryRequest.getAccess().getUserId()));
			response.setSuccess(true);

			logger.debug(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + transactionHistoryRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + transactionHistoryRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_TRANSACTION_HISTORY + se);
			logger.error(GET_TRANSACTION_HISTORY + " | " + USER_ID + transactionHistoryRequest.getAccess().getUserId() + " | " + se.getErrorCode() + " | " + PropertyResolver.getProperty(se.getErrorCode()));
			return response;
		}

	}

	/**
	 * Gets the card payments.
	 *
	 * @param cardPaymentRequest the card payment request
	 * @return the card payments
	 */
	@Path("/card/payments")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "getCardPayments", response = CardPaymentRequest.class, httpMethod = "POST")
	@Override
	public CardPaymentResponse getCardPayments(CardPaymentRequest cardPaymentRequest)
	{

		CardPaymentResponse response = new CardPaymentResponse();

		logger.info(GET_CARD_PAYMENTS + DELIMITER + USER_ID + cardPaymentRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_CARD_PAYMENTS + DELIMITER + USER_ID + cardPaymentRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(cardPaymentRequest));

		try
		{
			response.setCardPayments(transactionBusinessDelegate.getCardPayments(cardPaymentRequest.getAccess().getUserId(), cardPaymentRequest.getJourneyID(), cardPaymentRequest.getStartDate(), cardPaymentRequest.getEndDate()));
			response.setSuccess(true);

			logger.debug(GET_CARD_PAYMENTS + DELIMITER + USER_ID + cardPaymentRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(GET_CARD_PAYMENTS + DELIMITER + USER_ID + cardPaymentRequest.getAccess().getUserId() + DELIMITER + END);

		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_CARD_PAYMENTS + DELIMITER + USER_ID + cardPaymentRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_CARD_PAYMENTS + se);
			return response;
		}
		return response;
	}

	/**
	 * Gets the transaction synchroniz result.
	 *
	 * @param transactionSyncRequest the transaction sync request
	 * @return the transaction synchroniz result
	 */
	@Path("/sync")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "syncTransactions", response = TransactionSyncRequest.class, httpMethod = "POST")
	@Override
	public TransactionSyncResponse getTransactionSynchronizResult(TransactionSyncRequest transactionSyncRequest)
	{
		TransactionSyncResponse response = new TransactionSyncResponse();
		logger.info(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(transactionSyncRequest));

		try
		{
			response.setSuccess(transactionBusinessDelegate.getTransactionSynchronizResult(transactionSyncRequest));

			logger.debug(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_TRANSACTION_SYNC_RESULT + se);
			return response;
		}

	}

	/**
	 * Sync balance transactions.
	 *
	 * @param balanceTransactionRequest the balance transaction request
	 * @return the balance transaction response
	 */
	@Path("/balance/sync")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "syncBalanceTransactions", response = BalanceTransactionRequest.class, httpMethod = "POST")
	@Override
	public BalanceTransactionResponse syncBalanceTransactions(BalanceTransactionRequest balanceTransactionRequest)
	{
		BalanceTransactionResponse response = new BalanceTransactionResponse();
		logger.info(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(balanceTransactionRequest));
		try
		{
			response.setSuccess(transactionBusinessDelegate.syncBalanceTransactions(balanceTransactionRequest));

			logger.debug(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.error(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + se.getErrorCode() + DELIMITER + PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(SYNC_BALANCE_TRANSACTIONS + se);
			return response;
		}
	}
	
	/**
	 * Gets the transactions.
	 *
	 * @param transactionRequest the transaction request
	 * @return the transactions
	 */
	@Path("/gettransactions")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "getTransactions", response = TransactionRequest.class, httpMethod = "POST")
	@Override
	public TransactionResponse getTransactions(TransactionRequest transactionRequest)
	{
		TransactionResponse response = new TransactionResponse();

		logger.info(GET_TRANSACTIONS + DELIMITER + USER_ID + transactionRequest.getAccess().getUserId() + DELIMITER + START);
		logger.debug(GET_TRANSACTIONS + DELIMITER + USER_ID + transactionRequest.getAccess().getUserId() + DELIMITER + REQUEST + CommonUtil.objToJson(transactionRequest));

		try
		{
			response.setTransactions(transactionBusinessDelegate.getTransactions(transactionRequest.getStartDate(), transactionRequest.getEndDate(), transactionRequest.getAccess().getUserId()));
			//response.setBalanceTransactions(transactionBusinessDelegate.getBalanceTransactions(transactionRequest.getStartDate(), transactionRequest.getEndDate(), transactionRequest.getJourneyId(), transactionRequest.getAccess().getUserId()));
			response.setBalanceTransactions(transactionBusinessDelegate.retrieveBalanceTransactions(transactionRequest.getStartDate(), transactionRequest.getEndDate(), transactionRequest.getAccess().getUserId()));
			response.setSuccess(true);

			logger.debug(GET_TRANSACTIONS + DELIMITER + USER_ID + transactionRequest.getAccess().getUserId() + DELIMITER + RESPONSE + CommonUtil.objToJson(response));
			logger.info(GET_TRANSACTIONS + DELIMITER + USER_ID + transactionRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (ServiceException se)
		{
			response.setSuccess(false);
			response.setErrorCode(se.getErrorCode());
			response.setErrorMessage(PropertyResolver.getProperty(se.getErrorCode()));
			logger.info(GET_TRANSACTIONS + se);
			logger.error(GET_TRANSACTIONS + " | " + USER_ID + transactionRequest.getAccess().getUserId() + " | " + se.getErrorCode() + " | " + PropertyResolver.getProperty(se.getErrorCode()));
			return response;
		}

	}
}
